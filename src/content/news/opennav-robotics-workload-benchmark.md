---
title: "AMD Strix Halo vs. NVIDIA Jetson Thor, Orin AGX for Real Robotics Workloads"
description: "Open Navigation Robotics Workload Benchmark"
pubDate: 2026-07-23
author: "Steven Macenski"
image: ""
tags: ["Nav2", "benchmark", "amd", "nvidia"]
---

We're happy to announce a new robotics and AI workload benchmark designed to test compute platform using realistic computational loads of a fully-autonomous robotics product in a medium production-scale warehouse environment (180,000 sqft). The aim is to benchmark the performance of a representative real-world deployed application in all its complexities to better assess the performance, shortcomings, and characteristics of compute platforms as would be seen by end-use robotics users. 

<div style="text-align: center;">

<iframe width="560" height="315" src="https://www.youtube.com/embed/j5NtcGJvQyM?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Open Navigation Robotics Workload Benchmark"></iframe>

</div>

This work does not replace synthetic microbenchmarks of computational power, efficiency, and individual program performance analysis, but augments it to provide an additional axis of data for the selection process. We believe this is a critial and missing resource to evaluate robotics compute platforms in a way that reflects the real-world performance and trade-offs that users will experience when deploying their robots.

We built this benchmark and ran it on three platforms: AMD Strix Halo (X100), NVIDIA Jetson Thor, and NVIDIA Jetson Orin AGX to compare and contrast their performance on a representative real-world robotics workload and modern VLM AI workload. This benchmark is available in our GitHub repository, and we encourage robotics teams to run it on their own hardware and share results to build a more comprehensive picture of the landscape. It is made easy to add additional platforms or reproduce the results yourself!

https://github.com/open-navigation/opennav_robotics_workload_benchmark

Note that this work was a collaboration with AMD, however the benchmark was designed to be reproducible on any platform and executed independently without influence.

## **Benchmark Design**


The robot is a material-handling forklift moving at 2 m/s with a sensor stack that reflects modern deployments:

* 2x 2D safety LIDAR (30 Hz, 25 m)
* 3x 3D LIDAR (10 Hz, 30 m, 32 beams @ 512 resolution)
* 3x RGBD cameras (10 Hz, 320x240)
* 1x RGB camera (5 Hz, 640x480) feeding the VLM
* 1x IMU (100 Hz)
* Differential drive controller

We also added measured driver loads for the RGBD cameras, 2D LIDARs, and 3D LIDARs (Orbbec Gemini 355, Ouster OS-1 32, SICK TIM-571), characterized on each hardware platform. Drivers have non-trivial loads which need to be represented for the benchmark to be complete. This is not only for total measured load, but also to simulate the operating system scheduling implications and contention.

![Gazebo simulation environment.](/images/news/gazebo.png)

The robotics workload runs a continuous pick-and-place mission loop across a 180,000 sqft facility, exercising localization, perception across all sensors, global path planning, optimal trajectory planning, fault handling, collision monitoring, velocity smoothing, and behavior-tree autonomy that consumes AI results. Every 100 missions, the robot returns to the dock to simulate a charging session before continuing. The AI workload runs Gemma 4.0 31B (Q4_K_M) on the RGB stream for scene understanding, feeding the behavior tree to adjust path, speed, and control strategy as fast as possible on each platform.



The platform under test acts as the robot's onboard compute. A separate machine networked to the platform runs the simulation and feeds sensor data and hardware actions to the platform so that the simulation load is isolated from the compute platform being evaluated. This way, the platform is under an equivalent workload to what it would see in a real deployment ('platform in the loop'). Both the robotics and AI workloads are composed in Dockerfiles to be identical and portable to each platform easily.

![Benchmark architecture diagram.](/images/news/benchmark_architecture.png)

This benchmark can be easily reproduced using the documentation in ``opennav_benchmark_pipeline/README.md``, and we encourage robotics teams to run it on their own hardware and share results to build a more comprehensive picture of the landscape. It is made easy to add additional platforms or reproduce the results yourself!

## **Platform Results Analysis**

In the inaugural evaluation of the benchmark, we compared the AMD Strix Halo (X100), NVIDIA Jetson Thor, and NVIDIA Jetson Orin AGX platforms. The Thor and Strix Halo are both modern, high-performance platforms designed for robotics and AI workloads, while the Orin AGX is a previous-generation platform that remains widely deployed in production.

<a href="https://github.com/open-navigation/opennav_robotics_workload_benchmark/blob/main/docs/Robotics%20Workload%20Platform%20Benchmarking%20Results.pdf?raw=true" download>
  Download the full technical report here!
</a>

We test this principally in each of their full-power configurations which are most commonly used in industry to leverage the full capabilities of the platform for the most demanding GPU workloads. Their power levels are shown below. We also run this in a power-constrained mode whose results can be found in ``opennav_benchmark_analysis/output`` along with the figures analyzed here. Most trends are broadly similar in the power-constrained mode, albeit with reduced performance across the board.

| Platform | Max TDP |
|---|---|
| AMD Strix Halo | 120 W |
| NVIDIA Jetson Thor | 130 W |
| NVIDIA Jetson Orin AGX | 65 W |

![Platform balance radar comparing AMD Strix Halo, NVIDIA Jetson Thor, and Orin AGX across key metrics.](/images/news/platform_balance_radar.png)

As we can see, the GPU and memory capabilities are effectively a tie between AMD Strix Halo and NVIDIA Jetson Thor. Strix Halo edges ever so slightly ahead on GPU, but the two are close enough to be considered equivalent in practice. The CPU performance however is where they separate, with Strix Halo delivering roughly 400% the available CPU capability-per-watt and 2.7x by CPU core availability, representing more headroom left over compared to the Thor (18.1% vs 49.8%, 1.6x the headroom by utilization).

Gemma 31B saturates the GPU on all three platforms as we run inference as fast as we can in the behavior tree, so the meaningful metric is completed VLM queries over the run's duration rather than GPU utilization. The Orin AGX completes zero, which is not surprising given it was built before VLMs became popular. It is so slow, in fact, that the mission finishes before any query returns, preempting it. Thor completes 25 of 35 requested. Strix Halo completes 34 of 47. While AMD's Strix Halo is 26% more performant in the VLM workload, when normalized by power consumption, they are within 5% of each other. In other independent benchmark testing passing in a variety of warehouse scenes and queries, we found that the performance difference between the two platforms is within 5% of each other.

<div style="text-align: center;">
<img src="/images/news/vlm_performance.jpg" alt="VLM performance comparison across platforms." style="max-width: 50%;" />
</div>

![VLM query outcomes across platforms.](/images/news/vlm_query_outcomes.png)

![Absolute compute headroom comparison across platforms.](/images/news/absolute_compute_headroom.png)

Thor retains production-ready with sufficient CPU headroom remaining after the benchmark robotics and AI loads to compute additional application-specific tasks. However, Strix Halo leaves roughly **82% of CPU available to application developers**, multiples of times larger than Thor's total CPU capability - providing much room for future growth and processing for materially heavier algorithms, more sensor data, or operating at further increased speeds for higher task throughput. However, Thor is very much still up to the task if additional workloads are minimal.

The Orin AGX runs at 93.6% mean CPU utilization, fully saturated with no usable real-time margin. As we see later, it is unable to keep up with the workloads, not completing missions, and missing important control loop deadlines.

![Control loop scheduling misses comparison across platforms.](/images/news/control_loop_misses.png)

In the 15-minute benchmark testing window, both Strix Halo and Thor complete all missions while the Orin AGX completes only 3 of 10. Control-loop scheduling misses average **5.8x per second** for the Orin AGX, **1.6x** for Thor, and **0.45x** for Strix Halo. Thor's misses come from its ARM cores maxing out on trajectory planning computations, unable to keep up in peak load periods. While there is CPU bandwidth left, the individual cores cannot keep with the MPC schedule and that work cannot be offloaded to the GPU. Strix Halo's x86 cores hold the control loop comfortably with occasional misses 3.4x less often than Thor and able to plan global paths 25.3% faster across the warehouse space.

> Note: Both Thor & Strix Halo may be improved by setting thread priorities for the trajectory planners in a deployed application.

![Completed missions comparison across platforms.](/images/news/completed_missions.png)

## **Conclusions**

Both NVIDIA Jetson Thor and AMD's Strix Halo (X100) are genuinely capable and both carry a demanding GPU and robotics CPU workload well. However, the case for AMD's Strix Halo is strong if your application demands heavy CPU workloads: GPU parity with Thor plus nearly 3x more available CPU cores at comparable power. Nvidia's Thor also has a variety of accelerated software available through the Isaac SDK which AMD does not have parity to as of the time of writing.

As a practioner's note: Many products today pair a Jetson Orin with a separate x86 machine to get both strong AI inference and strong general-purpose compute, often for legacy reasons. AMD's X100 / Strix Halo combines best-in-class GPU performance with high-performance x86 in a single package, which may draw less total power, reduced costs, and create less integration overhead which at least deserves consideration for new designs for those in that situation.

*The full dataset, additional figures, and reports are available in our GitHub repository.*
