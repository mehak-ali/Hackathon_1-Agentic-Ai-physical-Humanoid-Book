---
id: lesson3-python-agents-with-rclpy
title: 'Lesson 3: Bridging Agents to ROS 2'
sidebar_label: 'Python Agents with rclpy'
---

## What is an "Agent"?

In the context of AI and robotics, an "agent" is the entity that perceives its environment through sensors and acts upon that environment through actuators. The core logic of the agent is its **policy**: a set of rules or a model that decides what action to take based on the current state.

For our purposes, we can define our agent's logic in a simple Python class, completely separate from any ROS 2 code.

```python
# A simple, reusable agent logic class
class ThresholdAgent:
    def __init__(self, activation_threshold):
        self.threshold = activation_threshold

    def decide(self, sensor_value):
        """
        A simple policy: if sensor_value exceeds the threshold,
        return an 'activate' command. Otherwise, return 'standby'.
        """
        if sensor_value > self.threshold:
            return "activate"
        else:
            return "standby"
```

The beauty of this approach is that the `ThresholdAgent` class is completely independent. It doesn't know anything about ROS 2. We can test it, modify it, or replace it without changing our robot's communication infrastructure.

## Connecting the Agent to the Robotic Nervous System

Now, we need a bridge to connect this abstract agent logic to our robot's ROS 2 network. We will create a ROS 2 node that *hosts* our agent.

This `AgentNode` will perform three key tasks:
1.  **Subscribe** to a sensor topic to get information from the environment.
2.  **Pass** this information to its internal agent instance.
3.  **Publish** the agent's decision as a command to an actuator topic.

Let's assume our robot has:
-   A temperature sensor publishing integer values on a `/temperature` topic.
-   A cooling fan that accepts string commands on a `/fan_command` topic.

Here is the code for the `AgentNode`:

```python
# In a file named agent_node.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32, String

# Assume the ThresholdAgent class from above is in a file named `agent_logic.py`
from agent_logic import ThresholdAgent

class AgentNode(Node):
    def __init__(self):
        super().__init__('agent_node')

        # 1. Instantiate our agent
        self.agent = ThresholdAgent(activation_threshold=100)
        self.get_logger().info(f'Agent loaded with threshold {self.agent.threshold}.')

        # 2. Create the publisher for actuator commands
        self.command_publisher_ = self.create_publisher(String, 'fan_command', 10)

        # 3. Create the subscriber for sensor data
        self.sensor_subscriber_ = self.create_subscription(
            Int32,
            'temperature',
            self.sensor_callback,
            10)

    def sensor_callback(self, msg):
        """
        This function is called every time a message is received
        on the /temperature topic.
        """
        sensor_data = msg.data
        self.get_logger().info(f'Received temperature: {sensor_data}')

        # Get the agent's decision
        decision = self.agent.decide(sensor_data)

        # Publish the decision as a command
        command_msg = String()
        command_msg.data = decision
        self.command_publisher_.publish(command_msg)
        self.get_logger().info(f'Published command: "{decision}"')

def main(args=None):
    rclpy.init(args=args)
    agent_node = AgentNode()
    rclpy.spin(agent_node)
    agent_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This architecture effectively separates our concerns:
-   The core decision-making logic is in `ThresholdAgent`.
-   The communication logic is in `AgentNode`.

This makes our system modular, easier to test, and more scalable. We can now create complex robotic behaviors by building sophisticated agents and connecting them to the robot's "nervous system" with simple, robust ROS 2 bridge nodes.