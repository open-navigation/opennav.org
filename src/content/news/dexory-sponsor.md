---
title: "Dexory - Sponsor Introductions P.I"
description: "Dexory - Sponsor Introductions P.I"
pubDate: 2023-08-08
author: "Steven Macenski"
image: "/images/news/dexory.jpeg"
tags: ["Nav2", "dexory", "sponsors"]
---

**Dexory - A Leader in Warehouse AI and Automation**

Dexory is our first Platinum-level Sponsor based in London, UK. Founded in 2015 and formerly known as BotsAndUs, Dexory recently raised a $19 Million series A to scale their product globally over the coming months -- making the "Sponsor Nav2, Get Funded" adage ring true.

They develop robotics and AI logistics solutions to better drive business decisions for warehouse operators. Via their DexoryView platform, data related to inventory and its state is autonomously collected to build a real-time digital twin of the environment - unlocking key insights across warehouse operations.

<div style="text-align: center;">

![Dexory Robot](/images/news/dexory.jpeg)

</div>

Their robot is truly impressive and loaded with the latest sensors with a massive expanding boom, dotted with data collection sensors. Dexory's autonomous robot is able to scan for data up to 15m high and scans over 7,500 pallets per hour, during normal operation times, even in very narrow aisles (VNAs).

As impressive as their robot is, the real-data insights collected provides the true value and enables customers to know where stock is, increase picking efficiency, and identify gaps for replenishment to drive intelligent business decisions using modern cloud computing.

Dexory is hiring, including roboticists, C++ programmers, computer vision experts, and more! They're a fast-paced and innovative company that I can fully recommend.

This is a great option for those sending me their resumes unsolicited 😉

**Nav2 & You**

The team at Dexory have been long-time partners of Nav2 and the ROS ecosystem. They're using many of the most modern capabilities of Nav2 to power their business, and consistently help improve the community by returning frequent bug fixes and features back to open-source. Dexory and Open Navigation have a long-running strong collaboration which ensures any changes made to Nav2 or its algorithms are integrated back into the framework for the entire community to share. They are a consistent and valuable technical partner in testing and evaluating new systems introduced in ROS 2 to bring them up to a production-ready state for the everyday user.

Dexory's CEO Andrei Danescu understands the value of open-source in his business. He has prioritized it to be on the bleeding edge of technology, attract high-quality talent & collaborations, and reduce a substantial risk due to the industry's high dependence on it. His forward-thinking leadership not only pays it forward for all the value Dexory derives from the community (as a good open-source citizen), but also creates a sustainable model for new innovation that will empower new capabilities for his company for years to come. Since Dexory, as well as many others, leverages most of the newest algorithms and features in Nav2, it's in the company's best interest to support this channel of innovation and its long-term maintenance.

Special note should also be given to Guillaume Doisy, Lead System Architect and former Chief Robotics Officer at Wyca Robotics. His on-going technical and community contributions have been outstanding and led to substantial improvements across the mobile robotics ecosystem. His leadership and involvement in ROS 2 broadly is a benefit to us all!

**On The Use of Nav2**

Dexory uses many of the latest and greatest features of Nav2 to power the robotics elements of their DexoryView product. They use the customizable behavior trees to create multiple unique modes of operation suited to different environments and warehouse specificity. These modes are implemented using custom Navigator plugins with the application-specific task information in the action request.

<div style="text-align: center;">

![Dexory Architecture](/images/news/dexory-architecture.png)

</div>

General navigation is accomplished using Nav2's Hybrid-A* Smac Planner. This algorithm is key due to the large, non-circular robot that needs to ensure feasibility of navigation in confined aisles where it cannot rotate easily to ensure proper alignment of the sensors. The Model Predictive Path Integral (MPPI) controller is used to track the Smac Planner's kinematically feasible path while also allowing for highly dynamic behavior in the presence of obstacles. The MPPI controller can both respect the feasibility of the paths and diverge from them where opportunistically better creating a robust platform, capable of navigating any environment, unstructured and highly dynamic.

Alternative behaviors use maps with semantic information to mark regions for data collection or other specific information of interest. After the robot arrives at the start of a semantic region for an application task, the mode is switched to follow the semantics using the Regulated Pure Pursuit (RPP) controller for accurate and close task tracking. These modes have their own behavior trees.

It's noteworthy to mention that while Dexory has internal customizations for their application specifics (behavior trees, plugins, additional capabilities, etc), all of their customizations use Nav2's provided interfaces for application customization without forking key servers to enable their private modifications. That is powerful because our framework's plugin interfaces, action APIs, and run-time reconfigurability is sufficient to build product-quality systems without major adjustments - a huge vote of confidence in the system's architecture.

<div style="text-align: center;">

[Want to learn more about Dexory?](https://www.dexory.com)

[Interested in becoming a sponsor?](https://opennav.org/sponsorship/)

[Want to know more or see how we can work together?](https://opennav.org/support/)

[Want to learn more about Nav2?](https://nav2.org/)

[Follow Us on Linkedin!](https://www.linkedin.com/company/open-nav)

</div>
