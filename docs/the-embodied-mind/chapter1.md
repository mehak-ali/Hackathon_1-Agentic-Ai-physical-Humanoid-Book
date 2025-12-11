# Chapter 1: What is Physical AI?

## Introduction to Physical AI

Welcome to the exciting world of Physical AI! But what exactly is it?

At its core, **Physical AI** is the bridge between the digital world of artificial intelligence and the physical world we live in. It's about giving software the ability to sense, understand, and interact with its environment. Think of it as the body for the AI's brain.

While a chatbot or a language model exists purely as code on a server, a Physical AI system has sensors to perceive the world (like cameras and microphones) and actuators to affect it (like motors and lights).

This book will guide you, step-by-step, through the fundamental concepts and hands-on skills you need to start building your own Physical AI projects.

## History and Evolution

The dream of intelligent machines is not new. From ancient myths of automated statues to the first industrial robots, humanity has long been fascinated with creating artificial beings.

- **1950s:** The birth of Artificial Intelligence as an academic field.
- **1960s-1970s:** The first robotic arms, like the Unimate, are used in factories. These are programmed, not intelligent.
- **1990s:** AI and robotics begin to merge in research labs.
- **2010s-Today:** The explosion of cheap, powerful microcontrollers, sensors, and AI algorithms (especially machine learning) makes Physical AI accessible to everyone.

What was once the domain of large corporations and research institutions is now something you can explore on your desktop.

## Examples of Physical AI

You probably interact with Physical AI every day without realizing it:

- **Smart Thermostats:** They learn your schedule and preferences to save energy.
- **Robot Vacuums:** They use sensors to navigate your home and avoid obstacles.
- **Voice Assistants:** They use microphones to "hear" your commands and speakers to respond.
- **Self-Driving Cars:** The ultimate example, using a vast array of sensors to navigate the complex, real-world environment.

## Project: "Hello, World!" - Blinking an LED

This is the classic first project for anyone entering the world of hardware. It's a simple, satisfying way to confirm your development environment is set up correctly and to get a feel for making something happen in the physical world.

### You will need:
- A microcontroller (like a Raspberry Pi Pico or Arduino)
- An LED (Light Emitting Diode)
- A resistor (typically 220-330 ohms)
- A breadboard
- Jumper wires

### Instructions:

1.  **Set up your breadboard:** Connect the components as shown in the diagram below. The long leg of the LED (the anode) is the positive side.
    *(Diagram to be added here)*

2.  **Connect to your computer:** Plug your microcontroller into your computer via USB.

3.  **Write the code:** Open your development environment and enter the following MicroPython code:

    ```python
    import machine
    import time

    # Set up the on-board LED pin
    # For many boards, this is pin 25
    led = machine.Pin("LED", machine.Pin.OUT) # Or use the specific pin number

    while True:
        led.on()
        time.sleep(1) # LED is on for 1 second
        led.off()
        time.sleep(1) # LED is off for 1 second
    ```

4.  **Run the code:** Upload the code to your microcontroller.

**Result:** The LED on your breadboard (or the onboard LED) should start blinking, turning on for one second and off for one second, repeatedly.

Congratulations! You've just taken your first step into the world of Physical AI.
