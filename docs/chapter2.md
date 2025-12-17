---
id: chapter2
title: Chapter 2 - The Anatomy of a Physical AI
---

# Chapter 2: The Anatomy of a Physical AI

Welcome to the second chapter! In this chapter, we will explore the key components that make up a physical AI system. We will delve into the hardware that enables a machine to perceive, reason, and act in the physical world.

## Sensors: The Eyes and Ears of the AI

Sensors are the sensory organs of a physical AI, allowing it to gather information about its environment. The variety and quality of sensors determine the AI's ability to perceive and understand the world.

- **Cameras:** Provide rich visual data. They are used for object recognition, navigation, and understanding scenes. Different types include monocular, stereo, and 360-degree cameras.
- **LiDAR (Light Detection and Ranging):** Creates precise 3D maps of the environment by measuring distances with laser light. It is essential for autonomous navigation and obstacle avoidance.
- **IMUs (Inertial Measurement Units):** A combination of accelerometers and gyroscopes that measure the robot's orientation, and angular velocity. They are crucial for balance and stabilization in humanoid robots.
- **Force and Torque Sensors:** Provide feedback on the forces and torques exerted on the robot's joints and limbs. This is vital for tasks that require delicate manipulation and interaction with the environment.
- **Microphones:** Allow the AI to perceive sound, enabling voice recognition and interaction with humans.

## Actuators: The Muscles of the AI

Actuators are the components responsible for movement in a physical AI. They convert electrical energy into motion, allowing the robot to walk, grasp, and interact with the world.

- **Electric Motors:** The most common type of actuator in robotics. They come in various forms, including DC motors, stepper motors, and brushless motors, each with different characteristics of precision and power.
- **Servo Motors:** A special type of motor that includes a feedback controller, allowing for precise control of position, velocity, and acceleration. They are widely used in robotic arms and legs.
- **Hydraulic and Pneumatic Systems:** Use fluid pressure to generate powerful movements. While less common in humanoid robots due to their complexity, they are used in industrial settings where high power is required.

## Compute: The Brain of the AI

The compute hardware is where the "thinking" happens. It processes the data from the sensors, runs the AI models, and sends commands to the actuators.

- **Microcontrollers (MCUs):** Small, low-power computers that are often used for real-time control of motors and sensors.
- **Single-Board Computers (SBCs):** More powerful than MCUs, SBCs like the Raspberry Pi or NVIDIA Jetson can run a full operating system and handle more complex tasks like perception and planning.
- **High-Performance GPUs:** For running large-scale AI models, especially for computer vision and deep learning, powerful GPUs are often required. These may be on-board or in a separate, connected computer.

## Power Systems: The Heart of the AI

Power systems are responsible for providing a consistent and reliable source of energy to all the components of the robot.

- **Batteries:** The most common power source for mobile robots. The choice of battery technology (e.g., LiPo, Li-ion) depends on the required power density, capacity, and safety considerations.
- **Power Distribution:** A system of wiring and converters that ensures each component receives the correct voltage and current.
- **Battery Management System (BMS):** A crucial component that monitors the state of the battery, protects it from overcharging and discharging, and ensures its longevity and safety.
