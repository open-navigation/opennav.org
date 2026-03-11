---
title: "A Depreciation Celebration!"
description: "A Depreciation Celebration!"
pubDate: 2023-06-26
author: "Steven Macenski"
image: "/images/news/deprecation.png"
tags: ["Nav2", "foxy", "features"]
---

<div style="text-align: center;">

![ROS 2 Foxy End of Life](/images/news/deprecation.png)

</div>

**A Milestone**

Foxy was the first ROS 2 distribution that we at Open Navigation LLC call product ready. After 3 years of rapid development from A-Turtle through E-Turtle releasing new distributions every 6 months, ROS 2 finally hit a level of sufficient maturity to enable longer-term support. This was the second LTS distribution of ROS 2 (after Dashing) but the first where all of the core systems and robotics tools built on top of it were stable enough for the average end-user to adopt and release quality products.

Nav2 was no different. Early in 2021, we hit our critical v1.0 milestone marking the first time an average non-expert user could use the framework to build large scale robotics systems that could be deployed for long periods of time. Since then, we've seen an explosion of companies in logistics, oil/gas, mining, vertical farming, construction, and more using Nav2 to power their robot products worldwide.

**The 3-Year Headache**

While Foxy was the first product-ready release of Nav2, that does not mean it was perfect, nor complete for every application we support today. The Nav2 framework has been evolving at back-breaking speeds to meet the challenges of today's mobile robotics applications. While development since Humble has moved primarily towards features, algorithm plugins, and capabilities — much development occurred on the core framework since Foxy which has made maintenance and support of Foxy a perpetual headache.

For good software practice, we cannot backport all the latest-and-greatest changes to each released distribution. This is to ensure compatibility for the lifetime of the distribution for end-users that may rely on consistent API/ABI for their application's customizations. That means many important new features or major surgery on the framework cannot be made consistent with legacy distributions, making them fall increasingly out of sync. That not only prevents older distribution's users from accessing new features, but also increases the technical burden on maintainers to support these legacy systems — especially as they diverge.

In the case of Foxy, this divergence was quick, soon after release, making it virtually impossible to make new features available to end-users. We tried our best to support Foxy users while also balancing stability and a desire to quickly develop the system, but it has been a struggle over the past 3 years — until now!

**🎉 A Cause for Celebration 🎉**

With June 2023, Foxy is now end of life — no longer receiving support or updates from OSRF. This major milestone is a cause for celebration across the ROS community. First, it gives us a chance to be retrospective of all that we have accomplished since the first product-ready ROS 2 distribution. So many new tools, optimizations, and ROS 2 companies have emerged. Second, it coincides with the release of Iron Irwini, the latest ROS 2 distribution! Which means one very important thing: stickers

<div style="text-align: center;">

![ROS Distribution Stickers](/images/news/ros-stickers.jpg)

</div>

Finally, it allows many maintainers like us at Open Navigation to collectively breathe a sigh of relief to leave beyond a legacy distribution which looks very different from the systems we develop and deploy today. We must have written "Please upgrade to Humble or newer for <insert feature>" hundreds of times to Foxy users.

Today, all active ROS 2 distributions have a relatively modern version of Nav2 including all the bells and whistles. This vastly reduces the complexity of maintaining multiple distributions in parallel. Since Foxy, new distributions have 30% more packages in Nav2 and contains 5% more unit test coverage (up to 91%) to increase trust in the system via regular automated testing. While [Nav2's Migration Guide](https://navigation.ros.org/migration/index.html) contains a full accounting of noteworthy changes, here are a few major ones we're especially proud of:

- All Actions have active feedback available and contextual result error codes for intelligent behavior planning

- Costmap Filters were introduced to enable keepout zones, speed restricted zones, and binary behavioral regions

- The Smac Global Path Planner and MPPI Trajectory Planner enable Nav2 to operate with ackermann, legged, and arbitrarily shaped robots of all forms

- A Python3 API to interact with the Nav2 system for easy demos, autonomy applications, and benchmarking

- New features like Velocity Smoothing, Composition, Path Smoothing, Collision Monitoring, Assisted Teleop, and much more

These features and more are powering fantastic companies like [Dexory](https://www.linkedin.com/company/dexory/), [Stereolabs](https://www.linkedin.com/company/stereolabs/), and [Polymath Robotics](https://www.linkedin.com/company/polymath-robotics/) to make a huge impact in the real-world today from warehouses and agriculture to earth-moving and more! We could not be more proud of our partners and users in how they're shaping the world around us for the better!

A special thanks to the team at [Open Robotics](https://www.linkedin.com/company/open-source-robotics-foundation/) for their diligent support for ROS! We look forward to Humble's depreciation in 2027 to see what amazing new features we were unable to backport to Humble in M-Turtle (Moderna? Magnetic?).

We suspect we'll say "Please upgrade to Jazzy or newer" a few times, but such is the nature of progress 😁! Rest in Peace Foxy, we can take it from here.

<div style="text-align: center;">

[Interested in becoming a sponsor?](https://opennav.org/sponsorship/)

[Want to know more or see how we can work together?](https://opennav.org/support/)

[Want to learn more about Nav2?](https://nav2.org/)

[Follow Us on Linkedin!](https://www.linkedin.com/company/open-nav)

</div>
