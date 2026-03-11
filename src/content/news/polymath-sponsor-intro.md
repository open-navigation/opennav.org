---
title: "Polymath - Sponsor Introductions P.II"
description: "Polymath - Sponsor Introductions P.II"
pubDate: 2023-09-08
author: "Steven Macenski"
image: "/images/news/polymath-intro.png"
tags: ["Nav2", "sponsors", "polymath"]
---

**Polymath - Automating the Heavy, Dirty, and Dangerous**

Polymath Robotics is our first Silver-level Sponsor based in San Francisco, California. Founded in 2021, Polymath's founders are key industry experts: CEO Stefan Seltz-Axmacher, former CEO of Starsky Robotics and CTO Ilia Baranov, former engineering manager at Clearpath Robotics and Amazon.

Their talented team creates safety-critical navigation systems for industrial vehicles that are radically simple to enable and deploy. They fill an important gap in the autonomy ecosystem by providing safe autonomy systems to traditionally ignored sectors due to their high risk nature. They convert some of the largest heavy equipment found in mining, forestry, earth moving, agriculture, shipping yards, and more into fully autonomous robots.

Polymath's product consists of all the usual elements of autonomous navigation, but provided over an easy-to-use and familiar REST API that can be consumed easily by non-robotics experts. The API endpoints control the autonomous vehicles, called Synapses. For example, their /gps-waypoints API receives a POST from an application containing 1+ waypoints in json format along with task metadata such as maximum speed and if reversing is allowed. This command is bridged to their central command center, named Cortex (brilliant naming schema), over a set of custom ROS 2 interfaces. Cortex contains a complex proprietary behavior tree which decides to either queue, process, or reject this command. If/when the command is sent, Cortex issues the GPS waypoint instruction to Nav2 via the NavigateThroughPoses interface. The feedback status from Nav2 are processed within Cortex and provided back to an application as REST GET commands along with general vehicle telemetry. Finally, the task completion is sent to the client application once Nav2 is finished.

<div style="text-align: center;">

![System Architecture Diagram](/images/news/polymath-architecture.png)

</div>

No need to know about ROS, planning, control, or how it all comes together. They work with clients to develop a strategy to perform their particular automation task utilizing reusable primitives and capabilities across a broad set of industrial vehicles to scale to new and unseen challenges. Further, safety and performance are tracked at all times to provide peace of mind, data to make improvements, and unprecedented traceability.

While Polymath is not currently hiring, we'd recommend you keep an eye on them. They're working on some cool stuff - real-world tonka trucks!

**Nav2 & You**

The team at Polymath works to refine and deploy Nav2, uncovering novel and relevant problems to the hardening of ROS 2 and Nav2 on large-scale industrial vehicles. They've been great partners during design discussions and providing resources to Nav2 maintainers to help the entire ROS community. Open Navigation has engaged with everyone on Polymath's staff from the CEO down to the engineering team and there is a universal sense of openness to help the community and Nav2 thrive. Their openness and collaborative spirit is a model for a productive and mutually beneficial relationship between commercial companies and open-source developers.

Some current projects that Polymath is helping with include (1) future-looking GPS integrations with Fuse to replace the NavSat Transform node in Robot Localization as that package is being sunset by maintainers in the coming months and (2) Ouster lidar simulations for Gazebo including different operating modes and hardware sensor configurations. Polymath also hosts frequent events in Silicon Valley including many ROS and Nav2 users which provides a unique opportunity for cross-industry and cross-corporation knowledge sharing and collaboration.

**On The Use of Nav2**

Polymath leverages Nav2 as their navigation framework for core locomotion tasks - transforming heavy equipment into fully autonomous robots. They automate massive machinery of various types: ackermann, articulated, skid-steer, and tracked -- all using Nav2's provided algorithms. This includes the use of multiple Nav2 planners such as the Smac Planner's Hybrid-A* & NavFn, as well as controllers such as Regulated Pure Pursuit (RPP) & Model Predictive Path Integral. This highlights Nav2's maturity and establishes firmly that Nav2 can scale up to even the largest equipment in the world with ease. Even better still, all smaller robots in the community benefit from mature systems proven in the most extreme environments.

Polymath typically utilizes the Hybrid-A* planner in conjunction with freespace navigation behaviors when a vehicle needs to intelligently navigate a scene of dynamic obstacles and changing environments given the practical driving constraints on Ackermann and Articulated machinery. NavFn and RPP are employed with Teach-and-Repeat or previously demarcated GPS via-points to create restricted navigation behavior where a robot must follow a marked route precisely. Since these routes are previously driven or marked with practical constraints in mind, NavFn's infeasibility is not a concern and excels for this task by always remaining in the center of marked footprint swept regions.

An illustrative example of a Polymath application that requires not just one but both styles of autonomy is found in the mining industry.

Dump trucks are required to follow lanes, sometimes unmarked beyond a path previously traveled by other equipment, to safely traverse the mine. Once within the pit of the mine, the vehicle must transition into a dynamic autonomy mode to circumnavigate personnel and other equipment operating which are constantly moving and changing throughout the day. Further, Polymath has additional context-sensitive optimizations which are made based on the internal robot state and external environmental conditions.

<div style="text-align: center;">

![Mining Application](/images/news/polymath-mining.png)

</div>

This mining application is not unique; these navigation styles, among others, are commonplace throughout Polymath's client's requirements. The flexibility afforded by the use of Behavior Trees in Nav2 makes switching navigation modes and creating context-dependent decisions streamlined. It allows easy use of a shared framework and set of capabilities. It is easy to not only swap between modes of autonomy, but also include application specific details like operating the heavy machinery's tools, such as lowering and raising dozer blades during the task. The behavior tree structure is the core of Polymath's - and many in the modern robotics world's - autonomy systems. It can be used to model complex freespace autonomy as well as simpler tasks comprising many steps.

<div style="text-align: center;">

[Want to learn more about Polymath Robotics?](https://www.polymathrobotics.com/)

[Interested in becoming a sponsor?](https://opennav.org/sponsorship/)

[Want to know more or see how we can work together?](https://opennav.org/support/)

[Want to learn more about Nav2?](https://nav2.org/)

[Follow Us on Linkedin!](https://www.linkedin.com/company/open-nav)

</div>
