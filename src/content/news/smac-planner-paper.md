---
title: "Nav2 Smac Planner Paper Released!"
description: "Our research paper on the Smac Planner family has been published, detailing the algorithms behind Nav2's planners."
pubDate: 2024-01-26
author: "Steve Macenski"
image: "/images/news/smac-planner.png"
tags: ["research", "planning"]
---

A research paper describing Nav2's Feasible Planning Framework—the Smac Planner—is now accessible on Arxiv. The work was authored by Steve Macenski, Matthew Booker, and Josh Wallace.

![Smac Planner visualization](/images/news/smac-planner.png)

## Paper Focus

The paper examines the motivation behind the framework, key details of its architectural design, and explores Cost-Aware behavior developed specifically for mobile robotics. It also covers lattice generation methods and performance benchmarking data.

## Current Implementation

The Smac Planner is actively deployed by dozens of global companies, including sponsors Dexory and Polymath Robotics.

## About the Smac Planner

The framework utilizes templated, centralized A* algorithms with varying Node Templates to enable different search behaviors:

- 2D grid search
- Hybrid feasible search
- Search using arbitrary minimum control sets

### Three Planning Variants

The framework provides three planners optimized for mobile and surface robotics:

- **Cost-Aware 2D-A\*** — For circular differential drive or omnidirectional robots
- **Cost-Aware Hybrid-A\*** — For large, non-circular, or Ackermann-steered robots
- **Cost-Aware State Lattice A\*** — For large, non-circular, or atypical drivetrain platforms

### Key Innovation: Cost-Awareness

Unlike traditional planners that only avoid critical obstacles, this approach considers all values in a cost grid including inflation, voronoi diagrams, keepout-zones, and application-specific constraints.

This means the planner can respect keepout zones and application-specific constraints during the planning process itself, rather than relying on post-processing.

## Resources

- **Paper:** [arxiv.org/abs/2401.13078](https://arxiv.org/abs/2401.13078)
- **Code:** [github.com/ros-planning/navigation2](https://github.com/ros-planning/navigation2/tree/main/nav2_smac_planner)
- **Nav2 Project:** [navigation.ros.org](https://navigation.ros.org/)

This represents another step in our commitment to advancing mobile robotics through open research and development.
