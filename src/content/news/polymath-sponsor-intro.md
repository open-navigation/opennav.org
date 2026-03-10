---
title: "Polymath - Sponsor Introductions P.II"
description: "Introducing Polymath Robotics as a Nav2 sponsor, making autonomous vehicles accessible to everyone."
pubDate: 2023-09-08
author: "Steve Macenski"
image: "/images/news/polymath-intro.png"
tags: ["sponsor", "announcement"]
---

This is the second installment in our series introducing Open Navigation LLC's sponsors and partners. Our goal involves highlighting companies leveraging Nav2 technology while providing community transparency about ecosystem stakeholders' influences and priorities.

![Polymath Robotics](/images/news/polymath-intro.png)

## Polymath Robotics Overview

**Location:** San Francisco, California

**Founded:** 2021

**Leadership:**
- **CEO:** Stefan Seltz-Axmacher (formerly Starsky Robotics CEO)
- **CTO:** Ilia Baranov (former engineering manager at Clearpath Robotics and Amazon)

**Mission:** Creating safety-critical navigation systems for industrial vehicles with emphasis on simplicity and deployment ease.

**Focus Areas:** Autonomy systems for mining, forestry, earth moving, agriculture, and shipping yards industries.

## Product Architecture

Polymath's system uses a REST API interface for non-robotics experts. Key components include:

- **Synapses:** Autonomous vehicles controlled via API
- **API Endpoints:** `/gps-waypoints` accepts POST requests with waypoint data and task metadata (maximum speed, reversing permissions)
- **Cortex:** Central command center using custom ROS 2 interfaces and proprietary behavior trees
- **Nav2 Integration:** Receives GPS waypoint instructions via NavigateThroughPoses interface

![System Architecture Diagram](/images/news/polymath-architecture.png)

The system processes feedback from Nav2 and provides status updates and vehicle telemetry back to client applications as REST GET commands.

## Nav2 Collaboration

Polymath contributes to Nav2 development through:

1. **GPS Integrations:** Working on future-looking GPS integrations with Fuse to replace NavSat Transform nodes as Robot Localization is being sunset
2. **Sensor Simulations:** Developing Ouster lidar simulations for Gazebo with various operating modes and hardware configurations
3. **Community Events:** Hosting frequent Silicon Valley events for cross-industry knowledge sharing among ROS and Nav2 users

## Nav2 Usage Details

### Vehicle Types Supported

- Ackermann vehicles
- Articulated machinery
- Skid-steer equipment
- Tracked vehicles

### Planners Utilized

- Smac Planner's Hybrid-A* algorithm
- NavFn planner

### Controllers Used

- Regulated Pure Pursuit (RPP)
- Model Predictive Path Integral

### Navigation Modes

The company employs dual autonomy approaches:

**Hybrid-A\* with Freespace Navigation:** Intelligently navigating scenes of dynamic obstacles.

**NavFn with RPP:** Handles teach-and-repeat or GPS via-points for precise route following where NavFn's infeasibility is not a concern given pre-marked constraints.

## Application Example: Mining Operations

![Mining Application Diagram](/images/news/polymath-mining.png)

Dump trucks must follow unmarked lanes through mines while adapting to dynamic environments. The system switches between:

- **Lane-following mode:** Precise path adherence using NavFn
- **Dynamic autonomy mode:** Circumnavigating personnel and equipment

Context-sensitive optimizations adjust based on internal robot state and environmental conditions. The behavior tree structure enables switching autonomy modes while coordinating equipment operations like blade positioning.

## Key Capabilities

The behavior tree approach supports:

- Complex freespace autonomy modeling
- Simple multi-step task sequences
- Application-specific machinery controls
- Mode switching and context-dependent decisions

## Looking Forward

We're excited to work with the Polymath team and explore how their platform and Nav2 can complement each other.

Thank you, Polymath, for believing in open-source robotics!

**Learn more:** [polymathrobotics.com](https://www.polymathrobotics.com/)
