---
title: "ROS REP 2003: QoS of Maps and Sensor Data"
description: "A new ROS Enhancement Proposal standardizing Quality of Service settings for maps and sensor data in ROS 2."
pubDate: 2023-11-27
author: "Steve Macenski"
image: "/images/news/ros-rep.png"
tags: ["research", "ros2", "standards"]
---

We're excited to announce the acceptance of ROS REP 2003, a new standard for Quality of Service (QoS) settings in ROS 2 navigation systems.

![ROS REP 2003](/images/news/ros-rep.png)

## Introduction to ROS Enhancement Proposals

The ROS Enhancement Proposals (REP) program standardizes structures and processes, establishing design rationale that improves subsystem interoperability across the robotics developer community. Key examples include standardized units, coordinate frames for mobile robotics, driver namespace practices, and ROS 2 platform versions.

## Quality of Service Overview

ROS 2 introduces Quality of Service (QoS) settings from the DDS specification, enabling "per-stream" network transport tuning. The essential QoS parameters include:

- **History:** Retention of all or recent N messages
- **Depth:** Size N of historical messages
- **Reliability:** Delivery attempt intensity
- **Durability:** Publisher message persistence for late subscribers

While QoS provides granular control, it introduces complexity: modules may be created to be type and structurally compatible, but without using compatible QoS profiles.

## REP 2003 Proposal

[REP 2003](https://github.com/ros-infrastructure/rep/pull/212) standardizes QoS for two critical domains:

**Maps:** Global environment representations (occupancy grids, feature maps, voxel grids) should use *Transient-Local* Durability with user-selectable history/depth—analogous to ROS 1's latched profile.

**Sensor Data:** Drivers publish via *SystemDefaultQoS*; subscriptions use *SensorDataQoS* for unreliable transmission from source to initial processing.

## Practical Impact

The proposal addresses recurring community questions about incompatible QoS profiles between publishers and subscribers. By formalizing existing best practices, it reduces integration friction and enables developers to create compatible SLAM, localization, mapping, and sensor-processing nodes across the ecosystem.

Read the full REP at [ros.org/reps](https://ros.org/reps/rep-2003.html).
