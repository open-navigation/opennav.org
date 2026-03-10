---
title: "Nav2 User Survey Bonanza"
description: "Results from our comprehensive Nav2 user survey at ROSCon 2023, gathering feedback from 27 organizations."
pubDate: 2023-10-30
author: "Steve Macenski"
image: "/images/news/survey.png"
tags: ["community", "survey"]
---

We recently conducted a comprehensive survey of Nav2 users at ROSCon 2023, gathering feedback from 27 organizations. The results are in!

![Nav2 User Survey Results](/images/news/survey.png)

## Most Common Requests

Three features emerged as top priorities:

### 1. Coverage Planning

Users requested behavior tree examples and task servers for operations like crop rows, floor cleaning, or mowing. We note this aligns with our development work on the Fields2Cover library in collaboration with Bonsai Robotics.

### 2. Comprehensive Demos and Tuning

The community wants detailed end-to-end demonstrations with tuning guides for realistic applications. We commit to expanding Nav2's existing tuning documentation over the longer term.

### 3. Complete Reference Systems

Users asked for realistic autonomy system examples, though we clarify this falls outside Nav2's framework scope since business logic varies by application.

## Additional Feature Requests

- AI-powered costmap layers for perception integration
- Enhanced Fuse documentation (planned for year-end)
- Improved goal checker accuracy beyond minimum tolerance
- Native pause/resume functionality for navigation tasks
- State lattice visualization capabilities
- Plugin tutorial updates with current APIs
- Reconfigurable timeout settings for behavior tree services
- Powered-caster omnidirectional motion support
- Articulated vehicle footprint support

## Our Commitments

Based on this feedback, we've prioritized:

- Coverage server and behavior tree demonstrations
- Fuse documentation with Nav2
- One-second behavior tree service timeouts (reconfigurable)
- Dynamic footprint documentation improvements
- Plugin tutorial modernization

## ROS Distribution Insights

Survey data revealed Humble (current LTS) dominates adoption, with concerning numbers still using outdated Foxy and Galactic distributions. We recommend immediate upgrades.

## Community Contributions

Survey respondents showed strong interest in contributing, with the majority open to helping implement requested features.

Thank you to everyone who participated!
