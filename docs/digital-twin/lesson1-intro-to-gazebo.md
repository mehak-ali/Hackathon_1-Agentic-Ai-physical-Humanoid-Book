---
id: lesson1-intro-to-gazebo
title: 'Lesson 1: Introduction to Gazebo'
sidebar_label: 'Introduction to Gazebo'
---

## What is Gazebo?

**Gazebo** is a powerful 3D robotics simulator. It allows you to accurately simulate populations of robots in complex indoor and outdoor environments. Gazebo offers the ability to accurately and efficiently simulate robots, sensors, and objects in a 3D environment. It generates realistic sensor feedback and physically plausible interactions between objects.

Key features of Gazebo include:
-   **Physics Engine:** Simulates gravity, collisions, and other physical interactions.
-   **Model Management:** Supports various robot and object models (URDF, SDF).
-   **Sensor Simulation:** Mimics the output of common robot sensors (cameras, LiDAR, IMUs).
-   **ROS 2 Integration:** Seamlessly connects with the ROS 2 ecosystem for control and data exchange.

## URDF vs. SDF

Before diving into Gazebo, it's important to understand two key XML formats used to describe robots and environments:

-   **URDF (Unified Robot Description Format):** As we saw in Module 1, URDF is primarily for describing the kinematic and dynamic properties of a single robot. It defines links (rigid bodies) and joints (connections between links). URDF is specific to ROS.

-   **SDF (Simulation Description Format):** SDF is a more comprehensive XML format designed for describing everything in a simulation environment, including robots, static objects, lighting, terrain, and even physics properties of the world itself. Gazebo uses SDF as its native format.

While Gazebo can import URDF files, it internally converts them to SDF. For complex environments and non-robot objects, you will typically use SDF directly.

## Launching Gazebo and Spawning a Robot

Let's launch an empty Gazebo world and then spawn our `simple_humanoid_arm` from Module 1 into it.

### 1. Launch an empty Gazebo world

First, ensure your ROS 2 environment is sourced. Then, you can launch Gazebo:

```bash
gazebo # Or `ign gazebo` if you're using Ignition Gazebo
```

This should open an empty 3D environment.

### 2. Spawn your URDF robot

To spawn a robot described by a URDF file, you typically use a ROS 2 launch file and the `spawn_entity.py` script from `gazebo_ros`.

Let's assume you have your `simple_arm.urdf` file (from Module 1, Lesson 4) located in a `description` folder within a ROS 2 package (e.g., `my_robot_description`).

You would typically have a launch file that looks something like this:

```xml
<!-- In a file like spawn_arm.launch.xml within your ROS 2 package -->
<launch>
  <param name="robot_description" command="cat $(find-pkg-share my_robot_description)/description/simple_arm.urdf" />

  <node name="spawn_entity" pkg="gazebo_ros" exec="spawn_entity.py"
    args="-topic robot_description -entity simple_humanoid_arm"
    output="screen" />
</launch>
```

Then, from your terminal:

```bash
ros2 launch my_robot_description spawn_arm.launch.xml
```

You should see your simple arm model appear in the Gazebo world.

## Basic Gazebo GUI Interaction

Once Gazebo is running, you can interact with the simulation:
-   **Pan:** Middle mouse button click and drag.
-   **Orbit:** Left mouse button click and drag.
-   **Zoom:** Scroll wheel.
-   **Move objects:** Select an object and use the translate/rotate tools on the left sidebar.

In the next lesson, we'll dive deeper into creating custom environments using SDF.
