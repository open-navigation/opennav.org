---
title: "Improving MPPI for High-Inertia Industrial Vehicles"
description: "Deep dive into improving Nav2's MPPI controller to properly respect low acceleration constraints for heavy industrial robots"
pubDate: 2026-04-29
author: "Steven Macenski"
image: "/images/news/low-accel/inter_iteration_feasibility_closed_loop_model_dt_equal_control_frequency.png"
tags: ["Nav2", "MPPI", "controls", "features", "industrial"]
---

If you've ever tried to navigate a 4-ton warehouse robot at walking speed, you know that "move carefully" is not just a suggestion -- it's a physics problem. Heavy industrial vehicles with raised centers of gravity, like Dexory's autonomous inventory scanning towers, cannot accelerate or decelerate the way a lightweight AMR can. Commanding even modest jerks can tip product, stress mechanical joints, or simply cause the drivetrain to fight the controller. Yet until now, Nav2's MPPI controller was tuned for the nimble end of the spectrum, with default acceleration limits of 3.0 m/s^2 -- more than ten times what some industrial platforms can safely handle.

This post walks through the investigation and set of fixes we developed to make MPPI reliably respect low and asymmetric acceleration constraints. The work was motivated by [Dexory](https://www.dexory.com/), whose tall scanning towers require acceleration limits as low as 0.25 m/s^2 forward and -0.5 m/s^2 braking -- an order of magnitude below the defaults.  The result is a set of carefully validated improvements that benefit not just Dexory, but every team pushing Nav2 onto heavier, higher-inertia platforms.

**The Core Problem**

MPPI (Model Predictive Path Integral) control works by sampling thousands of candidate trajectories, scoring them, and blending the best ones into a smooth control output. Internally, the optimizer distinguishes between *control velocities* (`cvx` -- the raw optimization variables) and *state velocities* (`vx` -- what the robot would actually do after the motion model applies physical limits like acceleration caps).

An earlier [PR #5266](https://github.com/ros-navigation/navigation2/pull/5266) changed the optimizer to stop clamping the raw control velocities by acceleration limits, applying those limits only to the state velocities used in trajectory rollouts. This is theoretically correct: the motion model should simulate the vehicle's real behavior, and the optimization should remain free to explore the full control space. However, users operating at low accelerations [reported two problems](https://github.com/ros-navigation/navigation2/issues/5214):

1. **Acceleration limits were not being fully respected** in the output commands
2. **Increased oscillation / wobble** in the angular velocity at steady state

We set out to understand both issues from first principles, fix them properly, and validate each change with data.

## Investigation 1: Unclamped Controls and Angular Response

We created a controlled test: send a straight-line path offset 0.5 m laterally from the robot and drive 8 m forward, using the low-acceleration limits (0.25 m/s^2 forward, -0.5 m/s^2 braking, 1.2 rad/s^2 angular).

**Before unclamping** (original clamped controls), angular velocity response:

<div style="text-align: center;">

![Angular velocity before unclamping](/images/news/low-accel/before.png)

</div>

**After unclamping** (raw controls used in optimization):

<div style="text-align: center;">

![Angular velocity after unclamping](/images/news/low-accel/after.png)

</div>

The unclamped version shows a wider initial correction and slightly more noise at steady state, but converges onto the path faster due to the sharper response -- the optimizer can now fully explore the control space rather than being artificially constrained.

With standard (high) acceleration limits, the difference is minimal -- just a touch more noise at steady state:

<div style="text-align: center;">

![Before with full accel](/images/news/low-accel/before_full_accel.png) ![After with full accel](/images/news/low-accel/after_full_accel.png)

*Left: clamped controls, full acceleration. Right: unclamped controls, full acceleration.*

</div>

Using open-loop odometry with low-acceleration limits showed improved noise compared to closed-loop, explaining why some users found open-loop to be a workable band-aid:

<div style="text-align: center;">

![Before open loop](/images/news/low-accel/before_open_loop.png) ![After open loop](/images/news/low-accel/after_open_loop.png)

*Left: clamped, open-loop. Right: unclamped, open-loop.*

</div>

## Investigation 2: Are Acceleration Limits Actually Respected?

The sharper responses raised a concern: are the acceleration limits truly being enforced in the output commands? We instrumented the controller to publish acceleration data and found a revealing comparison.

**Clamped controls** -- acceleration stays roughly within bounds but with extreme chattering:

<div style="text-align: center;">

![Acceleration with clamped controls](/images/news/low-accel/before_linear_accel_closed_loop_low_accel.png)

</div>

**Unclamped controls** -- much smoother acceleration profile, but the limits are violated during the initial ramp-up:

<div style="text-align: center;">

![Acceleration with unclamped controls](/images/news/low-accel/after_linear_accel_closed_loop_low_accel.png)

</div>

The smoothness improvement with unclamped controls is striking -- the clamped version shows severe chattering because the optimization scores trajectories based on clamped values, unable to distinguish "slightly over the limit" from "massively over." But the constraint violations needed to be fixed.

**Root Cause: Inter-Iteration Feasibility**

After verifying that *intra-trajectory* acceleration constraints were correctly enforced (the optimizer respects limits within each rollout), we identified the real culprit: **the transition between iterations was not dynamically feasible.** The optimal control sequence's first sample was never checked against the robot's current speed. With unclamped controls, this gap was amplified -- the first control could demand any acceleration, regardless of what the robot was actually doing.

**The Fix: Two-Part Acceleration Feasibility**

We implemented two complementary changes:

1. **Hard guardrails in `applyControlSequenceConstraints()`**: Enforce acceleration limits relative to the robot's current speed, ensuring the output trajectory is always executable from the current state.

2. **Soft initialization of `cvx.col(0)`**: Before noising the control sequence for rollouts, clamp the first sample to be within the acceleration-reachable regime from the current speed. This keeps the trajectory shape realistic during scoring rather than relying solely on post-hoc clamping.

The results were immediate. Closed-loop with matched timing:

<div style="text-align: center;">

![Feasibility fix - closed loop](/images/news/low-accel/inter_iteration_feasibility_closed_loop_model_dt_equal_control_frequency.png)

*Acceleration (magenta) now stays within bounds while velocity (cyan) ramps smoothly.*

</div>

Open-loop required one additional insight: the `model_dt` and `control_period` mismatch was effectively doubling the allowed acceleration at the boundary. Using the actual control period for the t=0 constraint fixed this:

<div style="text-align: center;">

![Open loop timing fix](/images/news/low-accel/intra_iteration_open_loop_not_equal_model_control_freq_t=0.png)

</div>

A final subtle bug: the control shifting logic skips the first sample, allowing an extra timestep of acceleration. For the case where `model_dt` equals the control frequency, we hard-set `t=0` to the current speed so that `t=1` must be within one timestep's worth of acceleration:

<div style="text-align: center;">

![Final timing fix](/images/news/low-accel/intra_iteration_open_loop_equal_model_control_freq_t=0.png)

</div>

**Do We Still Need Unclamped Controls?**

With all the feasibility fixes in place, we tested whether clamping the controls again would be acceptable. The answer is a definitive no:

<div style="text-align: center;">

![Re-clamped controls with all fixes](/images/news/low-accel/all_changes_clamped_controls_again.png)

*Re-clamping the controls reintroduces chattering and poor acceleration tracking despite all other fixes.*

</div>

## Investigation 3: Taming the Noise

With acceleration limits properly enforced, we turned to the second reported issue: increased angular velocity noise at steady state.

We characterized the noise by driving a 12 m straight-line path and examining the angular velocity after the robot converged onto the path.

**Before (clamped controls):** General noise around +/- 0.01-0.02 rad/s

<div style="text-align: center;">

![Steady state noise before](/images/news/low-accel/steady_state_noise_before.png)

</div>

**After (unclamped controls):** Noise floor increased to +/- 0.02 rad/s with similar spikes

<div style="text-align: center;">

![Steady state noise after](/images/news/low-accel/steady_state_noise_after.png)

</div>

We systematically evaluated several approaches:

**Removing importance sampling (gamma)** -- Made things worse. The gamma term, while debated in the literature, provides meaningful noise suppression here.

**More aggressive Savitzky-Golay filtering** -- Dropping the SGF to 1st order (weighted moving average) helped noticeably but at the cost of detail:

<div style="text-align: center;">

![SGF order 1](/images/news/low-accel/SGF_order1.png)

</div>

**Increasing temperature** -- Reduced noise magnitude but introduced large sign-changing swings. Not a viable solution:

<div style="text-align: center;">

![Temperature 0.4](/images/news/low-accel/temperature_0.4.png)

</div>

**The Winning Approach: Reducing Sampling Standard Deviation**

The key insight came from back-of-the-envelope math. The default sampling STD of 0.2 for both linear and angular velocities means each sample explores +/- 0.2 m/s per timestep. But with an acceleration limit of 0.25 m/s^2 and a timestep of 0.1s, the robot can only *actually change* by 0.025 m/s -- nearly an order of magnitude less than the sampling range. Most samples are exploring physically unreachable states, adding noise without information.

Reducing the STD to 0.1 produced excellent results:

<div style="text-align: center;">

![Reduced STD full trajectory](/images/news/low-accel/reduced_std_0.1.png)

*Full trajectory with reduced STD -- clean response matching the original clamped behavior.*

</div>

<div style="text-align: center;">

![Reduced STD steady state](/images/news/low-accel/reduced_std_0.1_steady_state.png)

*Steady-state noise well under +/- 0.01 rad/s -- better than the original clamped controls.*

</div>

The steady-state noise is now consistently below +/- 0.01 rad/s with spikes under +/- 0.015 rad/s. This is actually *less noisy* than the original clamped controls while maintaining the benefits of unclamped optimization.

## Summary of Changes

The complete set of improvements includes:

- **Unclamped raw control velocities** in the MPPI optimization, allowing the optimizer to freely explore the control space while the motion model enforces physical limits on state trajectories
- **Inter-iteration acceleration feasibility** ensuring the transition between optimization iterations respects the robot's current dynamic state
- **Proper timing alignment** between `model_dt` and `control_period` for acceleration constraint enforcement at the trajectory boundary
- **Control sequence shift correction** to prevent the shifting logic from granting an extra timestep of unconstrained acceleration
- **Reduced sampling standard deviations** proportional to what the acceleration limits actually allow, eliminating noise from sampling physically unreachable states
- **Asymmetric acceleration limit support** with different forward/braking limits now properly enforced throughout the pipeline

These changes make MPPI viable for the growing class of heavy industrial robots that need precise, low-acceleration control -- warehouse towers, mining vehicles, agricultural platforms, and more. The fixes are not just patches for edge cases; they correct fundamental assumptions in the optimization that happened to be invisible at high acceleration limits but became critical at low ones.

We're excited to see these improvements enable new classes of robots to use Nav2's MPPI controller with confidence. If you're working with high-inertia platforms, give these changes a try and let us know how they work for you!

<div style="text-align: center;">

[Interested in becoming a sponsor?](https://opennav.org/sponsorship/)

[Want to know more or see how we can work together?](https://opennav.org/support/)

[Want to learn more about Nav2?](https://nav2.org/)

[Follow Us on Linkedin!](https://www.linkedin.com/company/open-nav)

</div>
