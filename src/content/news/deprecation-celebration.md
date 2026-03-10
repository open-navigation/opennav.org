---
title: "A Depreciation Celebration!"
description: "Celebrating the end-of-life of ROS 2 Foxy and reflecting on Nav2's significant progress since then."
pubDate: 2023-06-26
author: "Steve Macenski"
image: "/images/news/deprecation.png"
tags: ["development", "maintenance"]
---

ROS 2 Foxy Fitzroy has reached end-of-life status in June 2023. Let's celebrate this milestone and reflect on its significance for robotics development.

![ROS 2 Foxy End of Life](/images/news/deprecation.png)

## A Milestone

Foxy represented the first "product ready" ROS 2 distribution after three years of rapid development cycles. It marked the second LTS distribution following Dashing, but distinguished itself as the first where core systems and robotics tools achieved sufficient maturity for average end-users to adopt and deploy quality products.

Nav2 reached its v1.0 milestone in early 2021, establishing the framework as suitable for non-expert users to build large-scale robotics systems deployable for extended periods. Since then, companies across logistics, oil/gas, mining, vertical farming, and construction have adopted Nav2 worldwide.

## The 3-Year Headache

While Foxy was product-ready, it was neither perfect nor complete for all modern applications. The Nav2 framework evolved rapidly to address contemporary mobile robotics challenges. Post-Humble development shifted focus toward features, algorithm plugins, and capabilities, but significant core framework changes occurred since Foxy's release, creating maintenance burdens.

Software best practices prevent backporting all latest changes to released distributions, maintaining API/ABI consistency for end-user customizations throughout a distribution's lifetime. This constraint prevents new features from reaching legacy distribution users and increases technical maintenance burden as systems diverge.

Foxy's divergence was particularly rapid, making new feature availability nearly impossible for users. Maintainers attempted balancing support with stability and development speed—a struggle over the past 3 years.

## A Cause for Celebration

Foxy's end-of-life status is celebratory! It offers reflection on achievements since the first product-ready ROS 2 distribution and coincides with Iron Irwini's release. Maintaining Foxy support is no longer necessary, particularly given how often we've written "Please upgrade to Humble or newer for _[insert feature]_."

![ROS Distribution Stickers](/images/news/ros-stickers.png)

All active ROS 2 distributions now contain relatively modern Nav2 versions, reducing parallel distribution maintenance complexity. Since Foxy, new distributions include **30% more packages** and **5% increased unit test coverage** (reaching **91%**) for enhanced system reliability.

## Major Features Added Since Foxy

- **All Actions provide active feedback** with contextual result error codes enabling intelligent behavior planning
- **Costmap Filters** allow keepout zones, speed-restricted zones, and binary behavioral regions
- **Smac Global Path Planner and MPPI Trajectory Planner** enable operation with Ackermann, legged, and arbitrarily shaped robots
- **Python3 API** for Nav2 system interaction supporting demos, autonomy applications, and benchmarking
- Additional features including **Velocity Smoothing**, **Composition**, **Path Smoothing**, **Collision Monitoring**, and **Assisted Teleop**

## Looking Forward

Companies like Dexory, Stereolabs, and Polymath Robotics are implementing these features across warehouse, agricultural, and earth-moving applications. We extend gratitude to Open Robotics for ROS support and anticipate Humble's deprecation in 2027.

Such is the nature of progress. Farewell, Foxy!

![Sponsor Graphic](/images/news/sponsor-graphic.png)
