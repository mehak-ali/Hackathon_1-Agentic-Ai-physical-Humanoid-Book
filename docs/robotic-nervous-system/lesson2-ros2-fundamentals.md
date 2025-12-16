---
id: lesson2-ros2-fundamentals
title: 'Lesson 2: ROS 2 Fundamentals in Practice'
sidebar_label: 'ROS 2 Fundamentals'
---

In this lesson, we'll move from theory to practice. We'll write Python code to create ROS 2 nodes that communicate using Topics and Services. The Python library we use for this is called `rclpy` (ROS Client Library for Python).

## The Anatomy of a ROS 2 Node in Python

Every Python ROS 2 program has a similar structure.

```python
# 1. Import necessary libraries
import rclpy
from rclpy.node import Node
from std_msgs.msg import String # A standard message type

# 2. Define your Node class, inheriting from rclpy.node.Node
class MyNode(Node):
    def __init__(self):
        # Call the parent constructor and give the node a name
        super().__init__('my_node_name')
        # ... your node's setup code (publishers, subscribers, etc.) goes here

# 3. The main entry point of the script
def main(args=None):
    # Initialize the rclpy library
    rclpy.init(args=args)

    # Create an instance of your node
    my_node = MyNode()

    # "Spin" the node, which keeps it alive to send/receive messages
    rclpy.spin(my_node)

    # Clean up and destroy the node when done
    my_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Communication with Topics

Let's create two nodes. One will be a `SensorNode` that publishes simulated sensor data (as a simple string). The other will be a `MonitorNode` that subscribes to this data and prints it.

### The Publisher (`SensorNode`)

This node creates a publisher that sends a "Hello World" message with a counter to the `sensor_data` topic every second.

```python
# In a file named sensor_node.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SensorNode(Node):
    def __init__(self):
        super().__init__('sensor_node')
        # Create a publisher on the 'sensor_data' topic, using String messages
        self.publisher_ = self.create_publisher(String, 'sensor_data', 10)
        # Create a timer that calls the timer_callback function every 1 second
        self.timer_ = self.create_timer(1.0, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Sensor Reading: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    sensor_node = SensorNode()
    rclpy.spin(sensor_node)
    sensor_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### The Subscriber (`MonitorNode`)

This node subscribes to the `sensor_data` topic. Every time it receives a message, its `listener_callback` function is executed.

```python
# In a file named monitor_node.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MonitorNode(Node):
    def __init__(self):
        super().__init__('monitor_node')
        # Create a subscriber on the 'sensor_data' topic
        self.subscription = self.create_subscription(
            String,
            'sensor_data',
            self.listener_callback,
            10)

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    monitor_node = MonitorNode()
    rclpy.spin(monitor_node)
    monitor_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
*To run this, you would execute each Python script in a separate terminal.*

## Communication with Services

Now, let's create a request-response interaction. We'll have a service that adds two integers.

First, we need to define the service interface in a `.srv` file.

**`AddTwoInts.srv`**
```
int64 a
int64 b
---
int64 sum
```
*(This file would be part of a custom interface package, which is a more advanced topic. For now, we will use a built-in example service type `example_interfaces.srv.AddTwoInts` which has the same structure.)*

### The Service Server

This node waits for requests and returns the sum.

```python
# In a file named addition_server_node.py
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class AdditionServerNode(Node):
    def __init__(self):
        super().__init__('addition_server')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request: a={request.a}, b={request.b}. Returning sum={response.sum}')
        return response

def main(args=None):
    rclpy.init(args=args)
    server_node = AdditionServerNode()
    rclpy.spin(server_node)
    server_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### The Service Client

This node sends a request and waits for the response.

```python
# In a file named addition_client_node.py
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class AdditionClientNode(Node):
    def __init__(self):
        super().__init__('addition_client')
        self.client = self.create_client(AddTwoInts, 'add_two_ints')
        # Wait until the service is available
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting again...')
        self.request = AddTwoInts.Request()

    def send_request(self, a, b):
        self.request.a = a
        self.request.b = b
        # Call the service asynchronously
        self.future = self.client.call_async(self.request)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    client_node = AdditionClientNode()
    response = client_node.send_request(5, 10)
    client_node.get_logger().info(f'Result of add_two_ints: {response.sum}')
    client_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```