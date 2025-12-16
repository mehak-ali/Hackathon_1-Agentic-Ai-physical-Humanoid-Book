---
id: lesson1-intro-to-ros2
title: 'Lesson 1: What is a Robotic Nervous System?'
sidebar_label: 'Introduction to ROS 2'
---

## The Need for a Nervous System

Imagine building a humanoid robot. You have sensors for sight (cameras), balance (IMUs), and touch. You also have actuators like motors in the arms and legs.

How do all these parts talk to each other? How does a signal from the camera get processed into a command to move an arm?

This is where a **middleware** comes in. A middleware is a software layer that sits between the operating system and the applications. In robotics, it acts like a central nervous system, carrying messages between the brain (your AI logic), the senses (sensors), and the muscles (actuators).

**Robot Operating System (ROS)** is the most popular open-source middleware for robotics. We will be using its latest version, **ROS 2**.

## Core Architecture of ROS 2

ROS 2 is not a traditional operating system like Windows or Linux. Instead, it's a collection of tools and libraries that help you build robot applications as a network of small, independent programs.

The three most fundamental concepts are:

1.  **Nodes:** A **Node** is the smallest unit of computation in ROS 2. Think of it as a single, dedicated program responsible for one task. For example, you might have one node for reading camera data, another for processing that data, and a third for controlling the arm motors.

2.  **Topics:** Nodes need to exchange data. They do this using **Topics**. A Topic is like a named data channel or a bus. A node can **publish** (send) messages to a topic, and any number of other nodes can **subscribe** (receive) messages from that topic. This is a decoupled, one-to-many communication system.

    *   *Analogy:* A radio station broadcasts on a specific frequency (the topic). The DJ is the publisher, and anyone with a radio tuned to that frequency is a subscriber.

3.  **Services:** Sometimes, you need a direct request-response interaction, not just a one-way broadcast. For this, ROS 2 provides **Services**. A node can offer a Service, and another node (a client) can send a request and wait for a response. This is a two-way, one-to-one communication.

    *   *Analogy:* Making a phone call. You (the client) dial a specific number, ask a question (the request), and wait for an answer (the response).

## The Command Line: Your First Tool

ROS 2 comes with a powerful set of command-line tools to inspect and interact with this network of nodes.

Open a terminal where you have ROS 2 installed and sourced, and try these commands:

-   **List all running nodes:**
    ```bash
    ros2 node list
    ```

-   **List all active topics:**
    ```bash
    ros2 topic list
    ```

-   **Listen to the data on a topic:**
    ```bash
    ros2 topic echo /some_topic_name
    ```

In the next lesson, we will write our own Python nodes to create this communication network from scratch.