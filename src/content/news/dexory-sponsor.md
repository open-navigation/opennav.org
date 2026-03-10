---
title: "Dexory - Sponsor Introductions P.I"
description: "Welcoming Dexory as our first Platinum sponsor, bringing warehouse automation expertise to the Nav2 community."
pubDate: 2023-08-08
author: "Steve Macenski"
image: "/images/news/dexory.png"
tags: ["sponsor", "announcement"]
---

We're kicking off our sponsor introduction series with Dexory, our first Platinum-level sponsor! This series is designed to highlight companies leveraging Nav2 technology while promoting transparency about ecosystem stakeholders. Our goal is community involvement and growth through openness about influential partners.

![Dexory warehouse robot](/images/news/dexory.png)

## About Dexory

Dexory is based in London, UK, founded in 2015 (formerly BotsAndUs). They recently raised $19 million in Series A funding (June 2023) to expand globally.

Dexory develops robotics and AI logistics solutions for warehouse operations. Their DexoryView platform autonomously collects inventory data to create a real-time digital twin of the environment.

### Robot Capabilities

Their autonomous robot features impressive specifications:

- Extended boom with data collection sensors
- Can scan warehouse locations **up to 15 meters high**
- Processes **over 7,500 pallets per hour** during normal operation
- Navigates **very narrow aisles (VNAs)**
- **24/7 operation** without disruption to warehouse activities

### Value Proposition

The platform provides warehouse operators with real-time inventory visibility, increased picking efficiency, and replenishment gap identification through cloud-based analytics.

Dexory is actively recruiting roboticists, C++ programmers, and computer vision specialists.

## Nav2 Integration & Partnership

### Technical Contributions

Dexory consistently returns bug fixes and features to open-source Nav2 and collaborates on production-readiness testing for ROS 2 systems.

### Leadership Philosophy

CEO Andrei Danescu prioritizes open-source adoption for technological innovation, talent attraction, and risk mitigation within the robotics sector.

### Key Contributors

Guillaume Doisy (Lead System Architect, former Wyca Robotics Chief Roboticist) has made significant Nav2 and ROS 2 ecosystem contributions.

![Dexory navigation architecture](/images/news/dexory-architecture.png)

## Nav2 Technical Implementation

### Navigation Algorithms Used

**Smac Planner (Hybrid-A\*):** Handles path planning for the large, non-circular robot in confined spaces where rotation is limited.

**Model Predictive Path Integral (MPPI):** Controls kinematically feasible paths while enabling dynamic obstacle responses. The system can both respect feasibility and diverge opportunistically when needed.

**Regulated Pure Pursuit (RPP):** Applied when switching to semantic region tracking for task-specific operations.

### Behavioral Architecture

Custom behavior trees enable multiple operation modes suited to different warehouse environments. Tasks use customizable Navigator plugins without forking core Nav2 servers.

### Semantic Mapping

Alternative navigation modes utilize maps with semantic information marking data collection regions and areas of operational interest.

### Architecture Philosophy

Dexory achieves product-quality systems through Nav2's plugin interfaces, action APIs, and runtime reconfigurability without major framework modifications.

## Why Sponsorship Matters

As a commercial user of Nav2, Dexory understands the value of contributing back to the open-source community. Their Platinum sponsorship helps ensure continued development, maintenance, and new features that benefit all users.

## Thank You, Dexory

We're grateful to have Dexory as our first Platinum sponsor and look forward to their continued involvement in the Nav2 community.

This is the first in our series of sponsor introductions. Stay tuned for more!

**Learn more:** [dexory.com](https://www.dexory.com/)
