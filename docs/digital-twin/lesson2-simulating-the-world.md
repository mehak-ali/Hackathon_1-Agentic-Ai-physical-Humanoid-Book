---
id: lesson2-simulating-the-world
title: 'Lesson 2: Simulating the World with SDF'
sidebar_label: 'Simulating the World'
---

## Introduction to SDF for World Files

In Gazebo, the entire simulation environment, including static objects, robots, lighting, and physics properties, is described using **SDF (Simulation Description Format)** files. While URDF is great for robots, SDF is more powerful for defining the *world* they inhabit.

An SDF file typically has a `<sdf>` root element, containing one or more `<world>` elements. Each `<world>` element can then contain various entities.

## Building a Simple Custom World

Let's create a `.sdf` file for a simple world containing a ground plane, some light, and a few basic shapes.

```xml
<!-- In a file named simple_room.sdf -->
<?xml version="1.0" ?>
<sdf version="1.6"> <!-- Specify the SDF version -->
  <world name="simple_room_world">

    <!-- A global light source -->
    <include>
      <uri>model://sun</uri>
    </include>

    <!-- A ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>

    <!-- A simple box model -->
    <model name="my_box">
      <pose>1 0 0.5 0 0 0</pose> <!-- x y z roll pitch yaw -->
      <link name="box_link">
        <inertial>
          <mass>1.0</mass>
          <inertia>
            <ixx>0.166667</ixx> <ixy>0</ixy> <ixz>0</ixz>
            <iyy>0.166667</iyy> <iyz>0</iyz>
            <izz>0.166667</izz>
          </inertia>
        </inertial>
        <visual name="box_visual">
          <geometry>
            <box>
              <size>1 1 1</size> <!-- 1x1x1 meter box -->
            </box>
          </geometry>
          <material>
            <ambient>0.0 0.0 1.0 1</ambient> <!-- Blue color -->
            <diffuse>0.0 0.0 1.0 1</diffuse>
          </material>
        </visual>
        <collision name="box_collision">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <!-- A simple cylinder model -->
    <model name="my_cylinder">
      <pose> -1 0 0.5 0 0 0</pose>
      <link name="cylinder_link">
        <inertial>
          <mass>1.0</mass>
          <inertia>
            <ixx>0.145833</ixx> <ixy>0</ixy> <ixz>0</ixz>
            <iyy>0.145833</iyy> <iyz>0</iyz>
            <izz>0.125</izz>
          </inertia>
        </inertial>
        <visual name="cylinder_visual">
          <geometry>
            <cylinder>
              <radius>0.5</radius>
              <length>1.0</length>
            </cylinder>
          </geometry>
          <material>
            <ambient>1.0 0.0 0.0 1</ambient> <!-- Red color -->
            <diffuse>1.0 0.0 0.0 1</diffuse>
          </material>
        </visual>
        <collision name="cylinder_collision">
          <geometry>
            <cylinder>
              <radius>0.5</radius>
              <length>1.0</length>
            </cylinder>
          </geometry>
        </collision>
      </link>
    </model>

  </world>
</sdf>
```

## Key SDF Elements Explained

-   **`<sdf version="...">`**: The root element, specifying the SDF version.
-   **`<world name="...">`**: Defines a simulation world. A single SDF file can define multiple worlds.
-   **`<include>`**: A very useful tag to include pre-existing models from Gazebo's model database. `model://sun` and `model://ground_plane` are common examples.
-   **`<model name="...">`**: Defines a new model (like our box or cylinder). Models can be composed of multiple links and joints, similar to robots.
-   **`<pose>`**: Specifies the `x y z` position and `roll pitch yaw` orientation of an entity relative to its parent.
-   **`<link name="...">`**: Represents a rigid body in the model.
-   **`<inertial>`**: Defines the physical properties for dynamics simulation:
    -   **`<mass>`**: The mass of the link in kilograms.
    -   **`<inertia>`**: The 3x3 rotational inertia matrix (for a box, these are standard values).
-   **`<visual name="...">`**: Describes how the link looks in the simulator.
    -   **`<geometry>`**: Defines the shape (`<box>`, `<cylinder>`, `<sphere>`, `<mesh>`).
    -   **`<material>`**: Defines the color and other visual properties.
-   **`<collision name="...">`**: Defines the physical shape used for collision detection. It's often the same as the visual geometry but can be simplified for performance.

## Launching Your Custom World

To launch Gazebo with your custom world, save the above XML as `simple_room.sdf` in a location Gazebo can find (e.g., within a ROS 2 package, or explicitly by setting the `GAZEBO_MODEL_PATH` environment variable). Then, you can use:

```bash
gazebo simple_room.sdf # For Ignition Gazebo, use `ign gazebo simple_room.sdf`
```

You should see your custom room with a blue box and a red cylinder, along with the sun and ground plane.

Understanding these SDF elements is crucial for building detailed and interactive simulated environments for your robots. In the next lesson, we'll learn how to add sensors to our robot models within these worlds.
