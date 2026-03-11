---
title: "Nvidia - Sponsor Introductions P.IV"
description: "Nvidia - Sponsor Introductions P.IV"
pubDate: 2024-03-11
author: "Steven Macenski"
image: "/images/news/nvidia-sponsor.png"
tags: ["Nav2", "sponsors", "nvidia"]
---

**NVIDIA- Powering the Modern World with AI and Accelerated Computing**

NVIDIA, based in Santa Clara, CA, is our first Gold-level Sponsor. They're the global leader in robotics, perception, AI, gaming, and accelerated computing that we hope we don't need to convince you of. Within the robotics space, they provide:

- **Isaac Sim**, a photo-realistic GPU accelerated simulator suitable for humanoids, mobile robotics, and manipulation. It's used for synthetic data generation to train AI models, reinforcement learning to train the robot brain, and robot simulation for functional testing.

- **Isaac ROS**, a collection of hardware-accelerated, high performance, low latency ROS 2 packages for making autonomous robots which leverage the power of Jetson and other NVIDIA platforms.

- **NITROS**, a hardware-accelerated transportation layer for ROS 2 to stream data through ROS graphs without repeated copies on-and-off the GPU.

- **Jetson**, an AI computing platform for GPU accelerated computing. Jetson is commonly used in robotics and edge-computing applications requiring a low-power mobile GPU to run inferencing of AI models or GPU accelerated computations.

Their software and hardware are powering the AI-enabled portions of the robotics industry. Below you can see one of NVIDIA's provided applications using their Jetson platform to run real-time AI depth estimation and 3D reconstruction to create a world model.

<div style="text-align: center;">

![NVIDIA AI Depth Estimation](/images/news/nvidia-depth.gif)

</div>

This 3D model is then converted into a Costmap - as a provided Costmap Layer - to use in Nav2 for planning and control! How cool is that! You can check out this advanced vision navigation capability [here](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_nvblox).

**Nav2 & You**

NVIDIA's support for Nav2 and the mobile robotics ecosystem enables us to leverage their AI and accelerated computing expertise to create and maintain high-quality AI integrations within the ROS 2 ecosystem. Accelerated computing is quickly gaining popularity in mature robotics deployments. Being able to leverage this new asset in our robots easily is crucial to moving the industry forward and fully utilizing the hardware we have available to us. This means not only integrating AI detections and segmentation outputs, but also Reinforcement Learning and GPU accelerated algorithms in ROS 2 and Nav2 today that are hot spots on lower power CPUs. This area is currently lacking in Nav2 and in partnership with Nvidia, we aim to start filling that void with the latest and greatest from NVIDIA's arsenal.

NVIDIA has also invested in the partnership to allow for the creation of much needed mobile robotics deployed capabilities which everyone (even if you don't use a Jetson or Nvidia GPU) can benefit from! More on that at a later date ;-) They've even provided an Open Navigation-approved Nav2 integration with the new Segway Nova Carter robot platform!

<div style="text-align: center;">

![Nova Carter Robot](/images/news/nova-carter.png)

</div>

**On The Use of Nav2**

NVIDIA is using ROS 2 and Nav2 for their internal robotics developments to bring about the AI- and Vision-based robotics future. Leveraging ROS 2's mature and industry-standard tooling and Nav2's proven autonomy system, they're breaking ground on new technologies that will become staples of the industry!

> "Nav2 is fundamental for Isaac prove out our accelerated computing capabilities on robot to provide a commercial grade solution for adoption into your own robot"
>
> — **Gordon Grigor**, VP Isaac Software at NVIDIA.

<div style="text-align: center;">

[Want to learn more about NVIDIA Robotics?](https://www.nvidia.com/en-us/deep-learning-ai/industries/robotics/)

[Interested in becoming a sponsor?](https://opennav.org/sponsorship/)

[Want to know more or see how we can work together?](https://opennav.org/support/)

[Want to learn more about Nav2?](https://nav2.org/)

[Follow Us on Linkedin!](https://www.linkedin.com/company/open-nav)

</div>
