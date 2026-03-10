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

The ROS Enhancement Proposals (REP) program standardizes structures and processes, improving interoperability when multiple development groups create robot subsystems. Important examples include:

- **REP-103:** Standardizing Units
- **REP-105:** Standardizing Mobile Robotics Coordinate frames
- **REP-135:** Standardizing Driver Namespace Practices
- **REP-2000:** Describing ROS 2 Versions' Target Platforms & Dependency Versions

These REPs ensure message data being in SI units, that a structured transformation tree is available, and promote compatibility across organizations worldwide.

## Quality of Service Overview

ROS 2 introduces Quality of Service (QoS) settings from the DDS specification, allowing developers to tune the network moving data around computers and remote servers with great detail.

### Essential QoS Settings

- **History:** Whether to keep all or just the last N messages
- **Depth:** The size N of the history
- **Reliability:** Delivery attempt intensity
- **Durability:** Whether publishers store messages for later-joining subscriptions

Additional characteristics (Lifespan, Livelihood, Deadline, Lease Duration) serve real-time or safety-sensitive applications.

![QoS Settings Interface](/images/news/qos-settings.png)

While QoS provides granular control, it comes with the overhead of needing to make wise choices and creates new potential issues when modules lack compatible QoS profiles.

## REP 2003 Proposal

[REP 2003](https://github.com/ros-infrastructure/rep/pull/212), currently under ROS Technical Steering Committee consideration, standardizes QoS for two critical domains:

### Maps

Global environment representations (occupancy grids, feature maps, voxel grids) should use *Transient-Local* Durability QoS profile with user-selectable history/depth size—analogous to ROS 1's *Latched* profile.

### Sensor Data

Sensor drivers publish using *SystemDefaultQoS* profile; subscriptions use *SensorDataQoS* profile, allowing unreliable transmission from source to first processing stage.

## Practical Impact

The proposal addresses recurring community questions about incompatible QoS profiles between publishers and subscribers. REP 2003 will deal with that issue once and for all by establishing the standard which is already best-practices and widely in use.

Benefits include:

- Formalizing existing best practices
- Helping future developers create compatible SLAM, localization, map-serving, and sensor-driving nodes
- Removing integration issues from the ROS ecosystem
- Catalyzing further QoS standardizations (like for base commands)

Read the full REP at [ros.org/reps/rep-2003.html](https://ros.org/reps/rep-2003.html).
