---
title: "Semantic Navigation using SAM3 on Edge with AMD Strix Halo"
description: ""
pubDate: 2026-07-08
author: "Steven Macenski"
image: ""
tags: ["semantic segmentation", "SAM3", "AMD Strix Halo"]
---

We've recently been working with AMD (Nav2 Gold Sponsor) on integrating generalized semantic segmentation for autonomous navigation with [Nav2](https://docs.nav2.org/). We're excited to announce a fully featured semantic navigation solution running on the edge on an [AMD Strix Halo](https://www.amd.com/en/blogs/2025/amd-ryzen-ai-max-personal-ai-supercomputing-guide.html) using Meta's [SAM3](https://ai.meta.com/sam3) foundation model for text-prompted semantic segmentation. SAM3 turns a camera stream into a live, locally-run text/image-based segmentation of the robot's environment that Nav2 can reason about for terrain-aware navigation, detection of small or otherwise hard-to-see obstacles, changing situational context, handling of dynamic obstacles, and much more in a fully generalized way without retraining per-object class.

Pretty cool, right? ;-) 

SAM3 is a state-of-the-art text-promptable foundation model. It accepts text prompts regarding what to segment from the image ("person", "pallet", "wet floor sign", "curb", "mud", "ceiling", ...) and returns masks for each class and ID of each object within a class. Gone are the days of fixed detectors or segmentation algorithm classes: the same model can be used at run-time to find various environments, objects, surfaces, and more **without retraining or fine-tuning**! Combining this with Nav2's costmap, behavior tree, and/or algorithm plugins, SAM3 is extremely powerful and empowers intelligent applications to be developed understanding the world more fully. This enables the robot to make decisions about navigation or behaviors driven not by obstacles but by rich semantic context.

<div style="text-align: center;">

<iframe width="560" height="315" src="https://www.youtube.com/embed/a4E9vwTxbZE?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="SAM3 Semantic Navigation on AMD Strix Halo"></iframe>

</div>

This enables applications to:

  * Make trade-offs in planning and control about navigating via certain surfaces over others
  * Detect small or far away objects difficult to pick up on depth cameras or lidars without having to know every possible object you may encounter ahead of time
  * Make decisions about the nature of the situation the robot is currently in to adjust its behavior or algorithms.
  * Detect dynamic objects to remove from the static scene for dynamic tracking and/or localization improvements
  * The list goes on!

We've been able to demonstrate this state-of-the-art server-class foundation model workflow **running locally** on AMD's Strix Halo (same architecture as the X100), which is also capable of performing workloads on the edge like Detection, Segmentation, VLMs, VLAs, LLMs, and more with 32 powerful x86 CPU cores to boot. The newest generations of AI-enabled processors are absolutely amazing for robotics!


## Terrain-Aware Navigation

One of the most obvious applications is using semantic segmentation for terrain-aware navigation. You can tell the robot what surfaces are safe to drive on and what to avoid, identify dynamic agents, and detect small obstacles or irregularities; and it just works. For outdoor environments, we segment human-created surfaces using `"sidewalk, cement, or pavement"` and label natural surfaces like `"grass or plants"` as illegal cost to avoid. It does well on sidewalks, blacktop, concrete pavement, and even gravel paths without any tuning.

<div style="text-align: center;">

<iframe width="560" height="315" src="https://www.youtube.com/embed/6vNGW-jOVkI?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="SAM3 Outdoor Terrain Navigation"></iframe>

</div>

Indoors, you can segment the floor simply using `"floor"` and walls using `"wall"` and it does a perfect job, essentially even mapping the freespace of the room without any fine-tuning or sophisticated prompt engineering. You can go further with more classes too. For example, segmenting `["floor", "wall", "desk", "chair", "shelf or cabinet"]` gives a much richer understanding of the environment for navigation and behavior decisions. Note the color changes for relative costs of various objects and surfaces in the costmap.

<div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">

<iframe width="49%" height="315" src="https://www.youtube.com/embed/jL1m8J5KgRs?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="SAM3 Indoor Office Navigation"></iframe>

<iframe width="49%" height="315" src="https://www.youtube.com/embed/UQdmIIM90WI?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="SAM3 Indoor Hallway Navigation"></iframe>

</div>

We all know in our various environments there are constantly small and nuanced things on the ground we need to contend with. Cables, debris, spills, low-profile pallets. Now with this integration you can detect and avoid them without any fine-tuning or per-type detector!

<div style="text-align: center;">
<img src="/images/news/sam3-examples.gif" alt="SAM3 detecting cables, spills, debris, pallets, and other low-profile obstacles" />
</div>

You can also change prompts at runtime via a service call, so the robot can adapt to different environments or tasks mid-mission. There are many uses of semantic data from SAM3 beyond terrain navigation: behavior enhancement based on situational awareness, localization pipeline improvement, extracting dynamic obstacles for tracking, and so forth.

## Running on the Edge

The AMD Strix Halo (Ryzen AI Max+ 395, X100) pairs an NPU and a Radeon GPU with 32 x86 cores and unified memory in a single package, so SAM3 amazingly fits and runs on the edge without an external accelerator. 5-10 Hz for a server class semantic segmentation algorithm is pretty impressive!

| Prompts | New detect every frame (ms) | New Detect every 1s, track between |
| ------- | ------------------ | --------------------- |
| 1       |  154.6 (6.46 Hz)   |  103.8 (9.63 Hz)      |
| 2       |  183.3 (5.45 Hz)   |  136.0 (7.35 Hz)      |
| 4       |  305.6 (3.27 Hz)   |  211.3 (4.73 Hz)      |

Our work also provides a hybrid mode that runs full SAM3 detection on keyframes and uses SAM2-style tracker propagation between them, giving a 40-100% throughput improvement while maintaining detection quality. The choice of redetecting each frame or tracking between keyframes depends on the FOV of the sensor and how dynamic your environment is.

## Getting Started

We have a full [tutorial on the Nav2 documentation site](https://docs.nav2.org/tutorials/docs/navigation2_with_sam3_semantic_segmentation.html) walking through everything from installing ROCm and Python dependencies through launching Nav2 with semantic costmaps. The source code is available on [GitHub](https://github.com/open-navigation/opennav_amd_semantic_navigation). The setup script handles the dependency complexity so you don't have to. 

We hope this is useful and inspires some creative applications. Happy segmenting!

<div style="text-align: center;">

[Interested in becoming a sponsor?](https://opennav.org/sponsorship/)

[Want to know more or see how we can work together?](https://opennav.org/support/)

[Want to learn more about Nav2?](https://nav2.org/)

[Follow Us on Linkedin!](https://www.linkedin.com/company/open-nav)

</div>
