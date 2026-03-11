---
title: "ROS REP 2003: QoS of Maps and Sensor Data"
description: "ROS REP 2003: QoS of Maps and Sensor Data"
pubDate: 2023-11-27
author: "Steven Macenski"
image: "/images/news/ros-rep.png"
tags: ["Nav2", "research", "ros2", "standards"]
---

ROS' REP (ROS Enhancement Proposals) program helps developers by standardizing structures, processes, and provide important information about the ROS' internal design rationale. This greatly increases interoperability of subsystems developed by multiple groups when standard units, interfaces, or design patterns are in place. Some important examples of REPs that influence the way we build robots include:

- REP-103: Standardizing Units
- REP-105: Standardizing Mobile Robotics Coordinate frames
- REP-135: Standardizing Driver Namespace Practices
- REP-2000: Describing ROS 2 Versions' Target Platforms & Dependency Versions

These allow us to rely on message data being in SI units, that a structured transformation tree is available, and the versions of important libraries are consistent across multiple organizations and institutions. The result are a myriad of nodes, libraries, and capabilities which users can plug-and-play quickly and easily from hundreds of federated developers worldwide!

## On Quality of Service

ROS 2 introduces the concept of Quality of Service (QoS) from the DDS specification into developer's workflows. These are settings that impact the transport of data over a robotics system on a per-stream basis to give finite control of the network to developers. In simplified terms, we can tune the network moving our data around our computer(s) and remote server(s) with great detail. You can read more about QoS Settings [here](https://docs.ros.org/en/rolling/Concepts/About-Quality-of-Service-Settings.html).

The most essential QoS settings to understand are:

- **History**: Whether to keep all or just the last N messages
- **Depth**: The size N of the history
- **Reliability**: How hard we try to deliver a message
- **Durability**: Whether messages are stored by publishers to be sent to later joining subscriptions

There are further service characteristics (Lifespan, Livelihood, Deadline, and Lease Duration) especially important for real-time or safety-sensitive applications, but are not important for the scope of this article.

<div style="text-align: center;">

![QoS Settings Interface](/images/news/qos-settings.png)

</div>

While this a new and important control to ROS developers with ROS 2, but it comes with the overhead of needing to make wise choices with respect to the QoS profiles for each subscription and publisher in a system. Moreover, it creates new potential issues with ROS' federated developer ecosystem, since many modules may be created to be type and structurally compatible, but without using compatible QoS profiles to communicate amongst them.

Hence - a new set of REP(s) are necessary to fill this gap to ensure modules remain compatible for the same easy plug-and-play that you expect from ROS!

## Introducing REP 2003

REP 2003 being currently considered by the ROS Technical Steering Committee introduces a standardization of QoS settings for two important cases: global representations of the environment (i.e. occupancy grids, visual feature maps, voxel grids) and incoming sensor data (i.e. laser scans, images, IMU). In short, it proposes the following:

**Maps**: Publishers and subscriptions of map data should be done over the Transient-Local Durability QoS profile, with a user-selectable history / depth size. This is analogous to ROS (1)'s Latched profile commonly used for this type of data.

**Sensor Data**: Sensor data from ROS sensor drivers should be published using the SystemDefaultQoS profile, while the subscriptions should use the SensorDataQoS profile. This is to allow for unreliable transmission of sensor data directly from source to the first processing stage.

## How Does This Help Me?

I see tickets and questions on Robotics Stack Exchange multiple times a month which boil down to: your map and/or sensor data aren't coming in with compatible QoS profiles to what you are subscription is using. This will deal with that issue once and for all by establishing the standard which is already best-practices and widely in use. It formalizes tribal knowledge. Hopefully this should reduce a headache for the average ROS user that isn't necessarily a ROS developer.

Further, it helps future developers create their related SLAM, localization, map-serving, sensor-driving, or sensor-processing nodes to be compatible with all other ROS 2 systems developed in the community. We can continue down the road that has made the ROS community powerful and flexible removing one more pesky source of integration issues.

This is also a catalyst for further standardizations of QoS profiles in other regimes, such as QoS standardization for base commands (i.e. cmd_vel).

