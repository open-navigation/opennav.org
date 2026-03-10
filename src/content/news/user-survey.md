---
title: "Nav2 User Survey Bonanza"
description: "Results from our comprehensive Nav2 user survey at ROSCon 2023, gathering feedback from 27 organizations."
pubDate: 2023-10-30
author: "Steve Macenski"
image: "/images/news/survey.png"
tags: ["community", "survey"]
---

Open Navigation conducted a survey alongside ROSCon 2023 to gather user feedback on Nav2. The survey included responses from 27 organizations utilizing Nav2 in their products.

![Nav2 User Survey Results](/images/news/survey.png)

## The Most Common Requests

Three features appeared most frequently in user feedback:

### Coverage Planning

Users requested behavior tree examples and a new task server for complete coverage planning operations like crop rows, floor cleaning, and mowing. Open Navigation notes this aligns with their development efforts, done collaboratively with Bonsai Robotics using the Fields2Cover library.

![Fields2Cover Concept](/images/news/f2c-concept.png)

### Comprehensive Demos and Tuning

Users sought end-to-end Nav2 demonstrations with detailed tuning guides for practical applications. Open Navigation plans to expand their tuning documentation and welcomes community contributions.

### Complete Reference Systems

Users desired realistic examples showing Nav2 integration with autonomy systems and best practices for behavior trees. Open Navigation states this falls outside their framework scope, as business logic structure depends on specific applications.

## Other Notable Requests

### AI Integration Layers

Users suggested creating AI costmap layers to process detection and segmentation outputs. Open Navigation began this work in 2020 but paused it due to resource constraints.

### Fuse Documentation

Users requested documentation for Fuse integration with Nav2 as the team migrates from Robot Localization.

### Goal Checker Improvements

Users want improved goal checking beyond minimum pose tolerance.

### Pause/Resume

Users requested a built-in pause state for navigation tasks that can be resumed later.

## Specialized Requests

- Visualizing state lattice tree expansions
- Updating plugin tutorials with current APIs
- Reconfigurable BT action and service client timeouts
- Powered-caster omnidirectional motion model support
- Articulated vehicle support with changing footprints

## Additional Feedback

### Dynamic Footprint Support

Users requested support for robots with attachments. Open Navigation clarified this feature already exists via the `/footprint` topic but lacks prominent documentation.

### WiFi Guide for ROS 2

Users suggested a guide for working with ROS 2 over wireless networks, addressing common configuration issues for mobile robotics.

## Open Navigation's Roadmap Commitments

Open Navigation committed to addressing these items:

- Coverage Server and behavior tree demonstrations
- Fuse documentation with Nav2
- One-second BT service timeouts (reconfigurable)
- Enhanced dynamic footprint documentation
- Updated plugin tutorials for modern APIs

The organization notes strong community interest in contributing to these improvements.

## Usage Statistics

![ROS Distribution Usage](/images/news/ros-distribution-chart.png)

Survey results showed:

- Humble (current LTS) is the most popular ROS distribution among users
- Most users install Nav2 through official distribution binaries
- Seven respondents still use Foxy and Galactic (older distributions)

## Call to Action

We recommend users on older distributions upgrade to Humble or newer immediately to access the latest features and security updates.

Thank you to everyone who participated!

**Learn more:**
- [Nav2 Documentation](https://navigation.ros.org/)
- [Sponsorship Information](/sponsorship)
