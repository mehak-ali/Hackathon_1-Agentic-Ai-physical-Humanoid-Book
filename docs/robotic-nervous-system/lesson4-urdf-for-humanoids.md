---
id: lesson4-urdf-for-humanoids
title: 'Lesson 4: Describing the Body (URDF)'
sidebar_label: 'URDF for Humanoids'
---

## What is URDF?

So far, we have built the nervous system for our robot. But we haven't described the robot's physical body. What shape is it? How are its limbs connected?

The **Unified Robot Description Format (URDF)** is an XML-based standard for representing a robot's physical model. It specifies the robot's structure as a tree of links and joints.

-   **`<link>`:** A link is a rigid part of the robot's body, like a torso, an upper arm, or a hand. Links have physical properties like mass, inertia, and visual/collision geometry.
-   **`<joint>`:** A joint connects two links together. It defines the relationship between the links, such as how they are allowed to move relative to each other (e.g., revolute, prismatic, fixed).

ROS 2 tools use this URDF model for many purposes:
-   **Visualization:** Displaying the robot's state in a 3D environment like **RViz2**.
-   **Simulation:** Simulating the robot's physics in a simulator like **Gazebo**.
-   **Kinematics & Dynamics:** Calculating the positions of limbs and the forces required to move them.

## A Simple Humanoid Arm in URDF

Let's model a very simple two-link arm, like a shoulder and an upper arm.

The structure will be: `world -> shoulder_link -> shoulder_joint -> upper_arm_link`

Here is the URDF code to represent this.

```xml
<!-- In a file named simple_arm.urdf -->
<robot name="simple_humanoid_arm">

  <!--
    A "world" link is not required by URDF, but it is a common
    convention in ROS to have a static, unmoving link that
    acts as the root of your robot's model.
  -->
  <link name="world" />

  <!--
    ======================
    SHOULDER LINK
    ======================
  -->
  <link name="shoulder_link">
    <visual>
      <geometry>
        <!-- A small sphere represents the shoulder -->
        <sphere radius="0.1" />
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1" />
      </material>
    </visual>
  </link>

  <!--
    This fixed joint attaches the shoulder to the world.
    It has no motion.
  -->
  <joint name="world_to_shoulder_joint" type="fixed">
    <parent link="world"/>
    <child link="shoulder_link"/>
    <origin xyz="0 0 1" /> <!-- Position the shoulder 1m up -->
  </joint>

  <!--
    ======================
    UPPER ARM LINK
    ======================
  -->
  <link name="upper_arm_link">
    <visual>
      <geometry>
        <!-- A cylinder represents the upper arm -->
        <cylinder radius="0.05" length="0.5" />
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1" />
      </material>
    </visual>
  </link>

  <!--
    This joint connects the upper arm to the shoulder.
    It allows rotation around the Y-axis.
  -->
  <joint name="shoulder_to_upper_arm_joint" type="revolute">
    <parent link="shoulder_link"/>
    <child link="upper_arm_link"/>
    <origin xyz="0 0 -0.25" /> <!-- Connect at the top of the cylinder -->
    <axis xyz="0 1 0" /> <!-- Allow rotation around the Y axis -->
    <limit lower="-1.57" upper="1.57" effort="10" velocity="1"/>
  </joint>

</robot>
```

### Key URDF Tags Explained

-   **`<robot name="...">`**: The root element of the file.
-   **`<link name="...">`**: Defines a new link.
-   **`<visual>`**: Describes how the link looks.
    -   **`<geometry>`**: Defines the shape (`<box>`, `<cylinder>`, `<sphere>`, or `<mesh>`).
    -   **`<material>`**: Defines the color.
-   **`<joint name="..." type="...">`**: Defines a new joint.
    -   **`type`**: Can be `revolute` (rotating), `continuous`, `prismatic` (sliding), `fixed`, `floating`, or `planar`.
    -   **`<parent link="..." />`**: The existing link this joint connects to.
    -   **`<child link="..." />`**: The new link this joint defines the motion of.
    -   **`<origin xyz="..." rpy="..." />`**: The transform (position and orientation) of the child link relative to the parent link.
    -   **`<axis xyz="..." />`**: The axis of rotation or translation for non-fixed joints.

This simple file gives ROS 2 enough information to understand the structure of our robot's arm. With this foundation, you can build up entire humanoid models piece by piece.