---
title: "Nav2 Smac Planner Paper Released!"
description: "Nav2 Smac Planner Paper Released"
pubDate: 2024-01-26
author: "Steven Macenski"
image: "/images/news/smac-planner.png"
tags: ["Nav2", "research", "planning"]
---

This work is in use today by dozens of companies worldwide, including Sponsors Dexory, and Polymath Robotics!

<div style="text-align: center;">

![Smac Planner visualization](/images/news/smac-planner.png)

</div>

The Nav2 Smac Planner is a framework for generic search-based planning techniques built on a templated, centralized A* algorithm. Varying Node Templates can be used to create different search behaviors, including but not limited to 2D grid search, hybrid feasible search, and search using arbitrary minimum control sets to describe atypical robot kinematics.

These templates can be used with the heuristic search algorithm to create many different types of planning behavior while removing the boilerplate of reimplementing optimal search and focus on only the planner specific details.

In this way, it is simple to add new planners or tweak existing planners with well-isolated and clearly defined stages.

The Smac Planner was create to fill a gap in openly available feasible and high performance planning algorithms. SBPL has long been unmaintained and has poor performance even on modern computing platforms. OMPL is excellent for higher dimensional planning problems like those found in manipulation, but struggles to compute high-quality paths in a reasonable timeframe for planning problems found in mobile and surface robotics applications.

Thus, framework currently provides three planners, two of which target feasible planning with mobile-robotics optimized behaviors:

- **Smac Cost-Aware 2D-A\***: When you have a circular differential drive or omnidirectional robot platform in a hetreogeneous fleet of robots leveraging one of the other Smac Planners to provide analogous behavior without additional computations expenses of feasible search.

- **Smac Cost-Aware Hybrid-A\***: When you have a large, non-circular, or Ackermann steered robot requiring feasible paths based on robot kinematic constraints such as footprint or drivetrain

- **Smac Cost-Aware State Lattice**: When you have a large, non-circular, or atypical drivetrain robot platform

## Why Cost-Aware?

Cost-Aware, yes. Rather than simply avoiding critical obstacles as is done in the literature around Hybrid-A* and most state lattice planners, we need path planners to be aware of all of the values in a cost grid, not simply lethal collisions. Additional costs can be due to inflation or voronoi diagrams, influencing the planner's behavior away from obstacles or application specific-constraints such as keepout-zones and regions of higher cost due to application constraints.

While modern optimization-based path post-processing algorithms can steer a computed path away from obstacles, it cannot effectively constraint a path currently routed through a keep-out zone through a completely different regime. Thus, cost constraints must be considered during the planning problem itself for the applications of these autonomous driving algorithms for mobile and surface robotics applications.

<div style="text-align: center;">

![Cost-aware vs non-cost-aware planning](/images/news/smac-comparison.png)

*Left, cost aware feasible planning. Right, non-cost-aware feasible planning.*

</div>

An added benefit of this method is reducing the need to complete expensive post-processing of paths. While the Smac Planner does apply a light smoothing algorithm (< 0.1ms), it pales in comparison to the costs associated with minimizing complex objective functions (> 200ms) while also providing better behavior for mobile roboticists.

## When Should I Use Smac Planner?

Great question! There are many situations when you may want to use the Smac Planning algorithms:

- **Smac Cost-Aware Hybrid-A\***: When you have a large, non-circular, or Ackermann steered robot requiring feasible paths based on robot kinematic constraints such as footprint or drivetrain

- **Smac Cost-Aware State Lattice**: When you have a large, non-circular, or atypical drivetrain robot platform

- **Smac Cost-Aware 2D-A\***: When you have a circular differential drive or omnidirectional robot platform in a hetreogeneous fleet of robots leveraging one of the other Smac Planners to provide analogous behavior without additional computations expenses of feasible search.

Checkout the paper on [Arxiv](https://arxiv.org/pdf/2401.13078.pdf) and try out the planner yourself on [GitHub](https://github.com/ros-planning/navigation2/tree/main/nav2_smac_planner)!

