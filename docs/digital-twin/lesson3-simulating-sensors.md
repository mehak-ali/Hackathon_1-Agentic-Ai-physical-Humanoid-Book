---
id: lesson3-simulating-sensors
title: 'Lesson 3: Simulating Sensors'
sidebar_label: 'Simulating Sensors'
---

## Why Simulate Sensors?

A robot is only as good as its perception of the world. In simulation, we don't have physical sensors, but we can model their behavior to provide data streams that mimic real-world sensor output. This is crucial for:
-   **Developing Perception Algorithms:** Test your computer vision or point cloud processing code without needing a physical robot.
-   **Debugging:** Is your navigation stack failing because of bad sensor data or a bad algorithm? Simulation helps isolate the problem.
-   **Rapid Prototyping:** Quickly try different sensor configurations (e.g., placing a camera higher or lower, changing LiDAR scan patterns).

Gazebo provides a rich set of sensor plugins that integrate seamlessly with ROS 2, publishing data to standard ROS 2 topics.

## Adding Sensors to a URDF Model

To add a simulated sensor to your robot, you typically extend your existing URDF file with Gazebo-specific tags. These tags tell Gazebo how to render the sensor and which plugin to use to generate its data.

Let's take our `simple_humanoid_arm` from Module 1 and add a simple camera to it. We'll attach the camera to the `upper_arm_link`.

```xml
<!-- In simple_arm_with_camera.urdf -->
<?xml version="1.0"?>
<robot name="simple_humanoid_arm_with_camera">

  <!-- Include the previous arm definition here -->
  <link name="world" />

  <link name="shoulder_link">
    <visual>
      <geometry>
        <sphere radius="0.1" />
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1" />
      </material>
    </visual>
  </link>

  <joint name="world_to_shoulder_joint" type="fixed">
    <parent link="world"/>
    <child link="shoulder_link"/>
    <origin xyz="0 0 1" />
  </joint>

  <link name="upper_arm_link">
    <visual>
      <geometry>
        <cylinder radius="0.05" length="0.5" />
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1" />
      </material>
    </visual>
  </link>

  <joint name="shoulder_to_upper_arm_joint" type="revolute">
    <parent link="shoulder_link"/>
    <child link="upper_arm_link"/>
    <origin xyz="0 0 -0.25" />
    <axis xyz="0 1 0" />
    <limit lower="-1.57" upper="1.57" effort="10" velocity="1"/>
  </joint>

  <!-- ======================== -->
  <!-- ADDING THE CAMERA SENSOR -->
  <!-- ======================== -->
  <link name="camera_link">
    <visual>
      <geometry>
        <box size="0.05 0.05 0.05" />
      </geometry>
      <material name="green">
        <color rgba="0 1 0 1" />
      </material>
    </visual>
    <inertial>
      <mass value="0.1" />
      <inertia ixx="0.0001" ixy="0" ixz="0" iyy="0.0001" iyz="0" izz="0.0001" />
    </inertial>
  </link>

  <joint name="upper_arm_to_camera_joint" type="fixed">
    <origin xyz="0 0.05 0.25" rpy="0 0 0"/>
    <parent link="upper_arm_link"/>
    <child link="camera_link"/>
  </joint>

  <!-- Gazebo specific tags for the camera -->
  <gazebo reference="camera_link">
    <sensor name="camera" type="camera">
      <always_on>true</always_on>
      <update_rate>30.0</update_rate>
      <camera>
        <horizontal_fov>1.089</horizontal_fov>
        <image>
          <width>640</width>
          <height>480</height>
          <format>R8G8B8</format>
        </image>
        <clip>
          <near>0.05</near>
          <far>8.0</far>
        </clip>
      </camera>
      <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
        <camera_name>camera</camera_name>
        <frame_name>camera_link_optical</frame_name>
        <hack_baseline>0.07</hack_baseline>
        <min_distance>0.01</min_distance>
        <point_cloud_cutoff>0.05</point_cloud_cutoff>
        <point_cloud_topic>camera/depth/points</point_cloud_topic>
        <depth_image_topic>camera/depth/image_raw</depth_image_topic>
        <image_topic>camera/image_raw</image_topic>
        <camera_info_topic>camera/camera_info</camera_info_topic>
      </plugin>
    </sensor>
  </gazebo>

</robot>
```

### Key Gazebo Sensor Tags

-   **`<gazebo reference="link_name">`**: This tag is placed outside the standard `<robot>` tag and associates Gazebo-specific properties with a named link in your URDF.
-   **`<sensor name="..." type="...">`**: Defines a new sensor.
    -   **`type`**: Common types include `camera`, `depth`, `gpu_ray` (for LiDAR), `imu`, `contact`, etc.
    -   **`<always_on>`**: If true, the sensor is always active.
    -   **`<update_rate>`**: How often the sensor publishes data (Hz).
    -   **`<camera>` / `<ray>` / `<imu>`**: Specific configuration for the sensor type (FOV, image size, scan properties, noise models).
-   **`<plugin name="..." filename="...">`**: Specifies a Gazebo plugin to interface the simulated sensor with ROS 2.
    -   **`filename`**: The shared library to load (e.g., `libgazebo_ros_camera.so`, `libgazebo_ros_ray_sensor.so`, `libgazebo_ros_imu_sensor.so`).
    -   Inner tags configure the plugin, often specifying output ROS 2 topic names (`image_topic`, `point_cloud_topic`, etc.) and frame names.

### Visualizing Sensor Data in RViz2

Once your robot with sensors is spawned in Gazebo, the Gazebo plugins will start publishing data to the specified ROS 2 topics. You can then use `RViz2` to visualize this data:

1.  Launch RViz2: `rviz2`
2.  Add a `Camera` display for `camera/image_raw` or a `PointCloud2` display for `camera/depth/points` (if using a depth camera plugin).
3.  Ensure the `Fixed Frame` in RViz2 is set correctly (e.g., `world` or `odom`).

Simulating sensors effectively is a cornerstone of robot development, allowing you to test complex perception and navigation stacks in a controlled environment.

Next, we'll explore the world of high-fidelity simulation using Unity.
