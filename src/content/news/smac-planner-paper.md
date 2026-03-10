---
title: "Nav2 Smac Planner Paper Released!"
description: "Our research paper on the Smac Planner family has been published, detailing the algorithms behind Nav2's planners."
pubDate: 2024-01-26
author: "Steve Macenski"
image: "/images/news/smac-planner.png"
tags: ["research", "planning"]
---

We're excited to announce the release of our peer-reviewed paper describing Nav2's Feasible Planning Framework, known as the Smac Planner. The paper is now available on ArXiv and was authored by Steve Macenski, Matthew Booker, and Josh Wallace.

![Smac Planner visualization](/images/news/smac-planner.png)

## About the Smac Planner

The framework implements search-based planning techniques built on a templated, centralized A* algorithm. It provides three planning variants:

- **Cost-Aware 2D-A\*** - For circular differential drive or omnidirectional robots
- **Cost-Aware Hybrid-A\*** - For large non-circular or Ackermann-steered robots
- **Cost-Aware State Lattice A\*** - For atypical drivetrain platforms

## Core Innovation

The planners incorporate cost-awareness, meaning they consider all values in a cost grid rather than simply avoiding obstacles. This approach enables path planning that respects keepout zones and application-specific constraints during the planning process itself, rather than relying on post-processing.

## Real-World Applications

The technology is deployed by multiple companies worldwide, including sponsors Dexory and Polymath Robotics.

## Resources

- **Paper:** [arxiv.org/abs/2401.13078](https://arxiv.org/abs/2401.13078)
- **Code:** [github.com/ros-planning/navigation2](https://github.com/ros-planning/navigation2/tree/main/nav2_smac_planner)
- **Nav2 Project:** [navigation.ros.org](https://navigation.ros.org/)

This represents another step in our commitment to advancing mobile robotics through open research and development.
