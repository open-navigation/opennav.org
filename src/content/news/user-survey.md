---
title: "Nav2 User Survey Bonanza"
description: "Nav2 User Survey Bonanza"
pubDate: 2023-10-30
author: "Steven Macenski"
image: "/images/news/survey.png"
tags: ["Nav2", "community", "survey"]
---

Since we at Open Navigation are gluttons for punishment, we ran a survey in conjunction with ROSCon 2023 to understand what our users love, hate, and desire for the future. We want to share these results with the community in the spirit of transparency and make sure we address important points in our 2024 roadmap planning! We received responses representing 27 unique organizations using Nav2 in their products.

**The Most Common Requests**

We received three requests that had multiple respondents desired for the future: coverage planning, more comprehensive end-to-end demos and tuning, and reference autonomy systems leveraging Nav2 for an application.

<div style="text-align: center;">

![Fields2Cover Concept](/images/news/f2c-concept.jpeg)

</div>

**Coverage Planning** - Adding Nav2 behavior tree examples and a new task server to conduct complete coverage planning for tasks such as crop row operations, floor cleaning, or mowing. Conveniently, this is a subject close to our minds and something in the late stages of development in close collaboration with Bonsai Robotics using the Fields2Cover library!

**Comprehensive Demos and Tuning** - Create end-to-end demonstrations of Nav2 including detailed tuning guides for realistic applications. Expanding Nav2's Tuning Guide is definitely on our longer term roadmap to continue to add to over time. However, the community's assistance adding their wisdom and knowledge is highly encouraged to speed it up and help your fellow navigators!

**Complete Reference Systems** - Create realistic examples of using Nav2 with autonomy systems and explain best practices with respect to the behavior trees and application layer structure. While this would be a great thing for a company to open-source a version of their deliberation layer, this is not on our roadmap plans to create and open-source since its structure and style is highly dependent on the application at hand and is outside of the scope of the navigation framework. We may one day create something similar to this as a reference, but the creation of the business logic is something out of the scope of today's Nav2 framework.

**Other Requests of Notes**

A few additional features were requested of note

**AI Integration Layers** - It is suggested to create AI costmap layers to process detections, segmentation, and other AI perception outputs into the costmap for planning and control. This is something that we started working on back in 2020 but were unable to complete due to resource allocation and community interest. This can be reprioritized once there are folks interested in collaborating to put together!

**Fuse Documentation w/ Nav2** - It is suggested to create documentation of similar scope and quality as Nav2 for Fuse integrations with Nav2. This is on our roadmap for the end of the year as we migrate from Robot Localization to Fuse! We plan to provide a migration guide and an explanation of key parameters.

**Goal Checker Improvements** - It is suggested to improve the goal checker so that we do not simply try to meet the minimum pose tolerance for the goal, but continue to navigate to improve the accuracy further.

**Pause / Resume** - It is suggested to create a "pause" state in an existing navigation task that can be later resumed. While this can be trivially done via canceling and action and reissuing the goal, it may be adventitious to have this be built-in batteries included. This could be done in the Behavior Tree, one more powerful example of configurable navigation logic provided by Nav2!

**The Niche Asks**

In rapid-fire mode, a few specialized requests were made that are self explanatory:

- Ability to visualize the state lattice tree expansions like in Hybrid-A*
- Updating the plugin tutorials with current APIs
- Make BT action and service clients have reconfigurable waiting timeouts
- Powered-caster omni motion model support
- Support articulated vehicles with changing footprints on state with global planner(s)

**The Odds and Ends**

There were two requests that we received that did not fit neatly into the other categories. The first is one we already support and the second something we will inquire with OSRF at the next available opportunity.

The first was a request for **dynamic footprint support** in the costmap, algorithm and behavior servers for robots with attachments (manipulator pose, carrying payload, etc). This is actually something that already receives complete support across the stack by publishing to the /footprint topic with the update footprint of each costmap you'd like to update. Poof! Then it'll be used for collision checking, planning, control, and behaviors. However, this is a somewhat hidden feature who's only reference is in the configuration documentation for the costmaps. We're making this an action item to provide more explicit, up-front documentation that this is possible.

The second is a **WiFi Guide for working with ROS 2**. We think this is a fabulous idea and something that could be invaluable to have as a concise to-the-point guide. Documentation regarding how to work with ROS 2 over wireless networks explicitly is sorely missing. Currently, if you run into any issues, you have to go immediately to your DDS vendor to see what might be the problem and how to resolve it in DDS configs. There are alot of common default misconfigurations for mobile robotics users that could have their resolution meaningfully streamlined with a short guide on the subject. Great idea!

**Open Navigation's Roadmap Commitments from Survey**

We listen to our users and aim to be the best and easiest to use navigation system available. We take this feedback seriously and are committing our resources directly to resolve some of these requests outright, including:

- Coverage Server & BT Demos
- Fuse Documentation with Nav2
- 1s BT Service Timeouts, Reconfigurable
- Up-front Documentation Regarding Dynamic Footprints
- Update plugin tutorials for modern APIs

We may have the opportunity to address more of these as well, but these are the important ones that we have identified as immediately actionable items for our team. We will also be reaching out to users that highlighted other of these requests to us to get involved and help improve the project by making their requests a reality! We are happy that the vast majority of respondents were open to contributing and helping make their mark on Nav2!

<div style="text-align: center;">

![Survey Results](/images/news/survey-results.png)

</div>

We were very happy to see broad interest from the community to get involved with their own requested features. That level of interest to 'put your money where your mouth is' is great to see!

**Post-Script - How are Users Using Nav2?**

In the survey, we also asked users what ROS distributions and install methods they use to get Nav2. Unsurprisingly, Humble as the current LTS distribution is the most popular install method with the majority of users. Similar numbers also receive Nav2 through the official distribution binaries. We were surprised to see the number of users still on Foxy and Galactic, which are essentially ancient history in Nav2's progression. We highly recommend the 7 respondents on Foxy & Galactic to upgrade soon!

This is actionable information to us as maintainers to make sure we pay special attention to Humble to backport as much as possible to give the latest and greatest to the most users as possible!


<div style="text-align: center;">

[Interested in becoming a sponsor?](https://opennav.org/sponsorship/)

[Want to know more or see how we can work together?](https://opennav.org/support/)

[Want to learn more about Nav2?](https://nav2.org/)

[Follow Us on Linkedin!](https://www.linkedin.com/company/open-nav)

</div>
