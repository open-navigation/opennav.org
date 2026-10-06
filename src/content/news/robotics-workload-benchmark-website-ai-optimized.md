---
title: "Robotics Workload Benchmark: New Website & AI-Optimized Results for AMD Strix Halo and NVIDIA Jetson Thor"
description: "A new results website and per-platform optimized VLM workloads for the Open Navigation Robotics Workload Benchmark"
pubDate: 2026-10-05
author: "Steven Macenski"
image: ""
tags: ["Nav2", "benchmark", "amd", "nvidia"]
---

Back in July, we announced the [Open Navigation Robotics Workload Benchmark](/news/opennav-robotics-workload-benchmark): an independent, vendor-agnostic benchmark which runs a full autonomous forklift navigation stack and a modern VLM workload *at the same time* on the compute platform under test in a production-scale warehouse. Since then, we've been busy with two major updates we're excited to share today:

1. **A new benchmark website** to make it easy for decision makers, engineers, and everyone in between to explore the platforms, results, and executive summaries without needing to dig through raw logs and plots.
2. **AI-optimized workloads** for the AMD Strix Halo and NVIDIA Jetson Thor, showcasing the power of each platform's acceleration technologies using its optimal VLM serving engine, model quantization, and configuration. This yields **2.2x more successful VLM queries on AMD Strix Halo (76)** and **2.7x more on NVIDIA Jetson Thor (67)** - while still running the full Nav2 robotics workload.

## **A New Home for the Benchmark**

The original release shipped with a technical report, a README, and a directory of analysis figures. That works great for engineers who want to get into the weeds, but it isn't the best format for an engineering manager or executive trying to make a platform decision, or for an engineer who wants to quickly compare one metric across runs. So we built a dedicated website for the benchmark:

<div style="text-align: center;">
<a href="https://open-navigation.github.io/opennav_robotics_workload_benchmark/">
  https://open-navigation.github.io/opennav_robotics_workload_benchmark/
</a>
</div>

[![Open Navigation Robotics Workload Benchmark website.](/images/news/benchmark_website.png)](https://open-navigation.github.io/opennav_robotics_workload_benchmark/)

The website is organized around how people actually make these decisions:

* **Results**: Interactive comparison charts grouped by power and configuration category (Max Power, Max Power AI-Optimized, and Balanced Power), so you can compare apples-to-apples or see how each platform scales.
* **Platforms**: A page per platform with its specifications, an executive summary verdict, key strengths and limitations, and its headline metrics in each category it was evaluated in.
* **Methodology**: The workload, sensor stack, metric definitions, and - just as importantly - the limitations of the benchmark, laid out in plain language.
* **Run it**: Documentation for reproducing the benchmark on your own hardware or adding a new platform.

Everything shown on the site is generated directly from the logs and analysis in the GitHub repository, and the raw per-run data is available to download as CSV and JSON. If you want to verify a number, you can trace it all the way back to the source.

## **AI-Optimized Workloads**

In the original benchmark, every platform ran the exact same AI workload: Gemma 4 31B in the `Q4_K_M` GGUF quantization served by `llama.cpp`. This is intentional - it provides a true 1:1 comparison using a portable, cross-platform stack, which highlights the power of the GPUs in an apples-to-apples sense. However, it doesn't represent the best each platform can do. Both AMD and NVIDIA have invested heavily in specialized inference software and hardware-aware quantizations, and leaving that on the table doesn't tell the full story for teams willing to tune for their target hardware.

So we added a new **Max Power (AI Workload Optimized)** category. Each platform keeps the same Gemma 4 31B model and the same robotics workload, but uses the serving method, quantization, and configuration recommended by each vendor for their hardware:

| | Portable (all platforms) | AMD Strix Halo Optimized | NVIDIA Jetson Thor Optimized |
|---|---|---|---|
| **Serving Engine** | `llama.cpp` | vLLM (ROCm `gfx11` build) | vLLM |
| **Quantization** | GGUF `Q4_K_M` | AWQ 4-bit | NVFP4 |
| **Speculative Decoding** | None | MTP, 3 draft tokens | MTP, 3 draft tokens |
| **Attention Backend** | Default | Triton | Triton |

Both optimized configurations use vLLM with Multi-Token Prediction (MTP) speculative decoding using Google's Gemma 4 assistant model, which drafts several tokens ahead for the main model to verify in a single pass. The Thor uses NVIDIA's NVFP4 4-bit floating point quantization to leverage Blackwell's native FP4 tensor core support, courtesy of NVIDIA's recommended configuration and mirrored on the Jetson AI Lab model zoo. Strix Halo uses an AWQ 4-bit quantization on ROCm's latest vLLM build for RDNA 3.5. The Dockerfiles for each are in `opennav_benchmark_pipeline/docker/ai_workload` so you can reproduce or build upon them.

> Note: Because the inference stacks differ, the optimized category is a comparison of each platform's best foot forward rather than a strict 1:1 comparison. The portable results remain available for that purpose.

## **Results**

The improvements are dramatic on both platforms. Over the same 15-minute benchmark window with the full Nav2 robotics workload running alongside:

![VLM queries processed and query latency, portable vs. optimized AI workloads.](/images/news/vlm_optimized_speedup.png)

* **AMD Strix Halo** completes **76 successful VLM queries (2.2x)**, up from 34. Mean successful query latency drops from 21.2s to 9.6s.
* **NVIDIA Jetson Thor** completes **67 successful VLM queries (2.7x)**, up from 25. Mean successful query latency drops from 25.5s to 10.1s.

Just as notable is the reliability improvement. In the portable configuration, a sizable fraction of queries errored out on both platforms (13 on Strix Halo, 10 on Thor) as the GPU contended with the rest of the system. With the optimized configurations, nearly all queries complete successfully, with the few remaining either cancelled in-flight due to mission completion or exhausting their retries.

![VLM query outcomes for the AI-optimized workloads.](/images/news/vlm_query_outcomes_optimized.png)

The robotics side of the house stays consistent with our original findings. Both platforms complete all missions, and the CPU picture remains largely unchanged: Strix Halo uses ~14% of its CPU, leaving ~86% available to application developers, while Thor uses ~47%. Control loop misses remain at 0.49 per second for Strix Halo and 1.85 per second for Thor, so the trajectory planning findings from the original analysis still hold. A more efficient AI workload is great, but it doesn't change the CPU fundamentals of each platform.

Both platforms show great VLM performance when using the serving engines, model quantizations, and configurations specific to each piece of hardware. With the optimizations applied, Strix Halo and Thor are again quite close in AI workload performance. **If you're deploying VLMs on either platform, the hardware-specific inference stack is well worth the investment** - it's effectively a free 2-2.7x upgrade for your AI workload.

Full results for every run, including the power, thermal, GPU, and CPU breakdowns, are available on the [benchmark website](https://open-navigation.github.io/opennav_robotics_workload_benchmark/) and in the updated technical report.

<a href="https://github.com/open-navigation/opennav_robotics_workload_benchmark/blob/main/docs/Robotics%20Workload%20Platform%20Benchmarking%20Results.pdf?raw=true" download>
  Download the updated technical report here!
</a>

## **What's Next**

The benchmark is designed to grow. We'd love to see additional platforms, additional optimized configurations, and new workloads added by the community. Adding a new platform is straightforward - see the [Adding a Platform](https://open-navigation.github.io/opennav_robotics_workload_benchmark/docs/adding-a-platform) guide - and if you do, please open a PR with your data and analysis so others can learn from it!

https://github.com/open-navigation/opennav_robotics_workload_benchmark

Happy benchmarking!
