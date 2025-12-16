---
id: lesson2-llm-cognitive-planning
title: 'Lesson 2: Cognitive Planning with LLMs'
sidebar_label: 'LLM Cognitive Planning'
---

## The Challenge: From Language to Action

A human says, "Clean the room." How does a robot translate this high-level, abstract goal into a concrete sequence of low-level actions it can execute? This is the **cognitive planning** problem in robotics, and it's notoriously difficult. Traditional approaches often rely on hand-engineered state machines or complex planning algorithms that struggle with ambiguity and generalization.

**Large Language Models (LLMs)** offer a powerful new paradigm for cognitive planning. They excel at:

-   **Semantic Parsing:** Understanding the meaning and intent behind natural language.
-   **Knowledge Retrieval:** Accessing a vast amount of common-sense knowledge about objects, actions, and environments.
-   **Reasoning:** Generating logical sequences based on instructions and context.

## LLMs as Robot Planners

Instead of writing explicit rules for every possible command, we can leverage LLMs to generate a plan. The core idea is to prompt the LLM to output a structured sequence of actions that the robot's control system can understand.

### The Robot's "Skill Library"

For an LLM to generate executable plans, it needs to know what actions the robot *can* perform. We provide this through a "Skill Library" or "API" defined in the LLM's prompt. Each skill corresponds to a ROS 2 action, service call, or a sequence of low-level commands.

**Example Skill Library (Conceptual):**

-   `navigate_to(location: string)`: Move to a specified location (e.g., "kitchen", "bedroom").
-   `find_object(object_name: string)`: Use computer vision to locate a specific object.
-   `pick_up_object(object_name: string)`: Manipulate the arm to grasp an object.
-   `place_object(object_name: string, destination: string)`: Place an object at a target location.
-   `report_status(message: string)`: Speak a message to the human.

### Designing Effective Prompts

The key to using LLMs for planning is prompt engineering. Your prompt needs to:

1.  **Define the Robot's Persona/Role:** "You are a helpful humanoid robot assistant."
2.  **Provide the Skill Library:** List the available functions with their parameters.
3.  **Give the Human Command:** The natural language instruction from the user.
4.  **Specify Output Format:** Crucially, instruct the LLM to output the plan in a machine-readable format (e.g., JSON, YAML, or a simple list of function calls).

**Example Prompt (Conceptual):**

```
You are a helpful humanoid robot assistant.
Here are the actions you can perform:
- navigate_to(location: string): Moves the robot to a known location (e.g., "kitchen", "table").
- find_object(object_name: string): Uses vision to locate a specified object.
- pick_up_object(object_name: string): Picks up the object using your gripper.
- place_object(object_name: string, destination: string): Places an object at a target.
- report_status(message: string): Speaks a message to the user.

User command: "Go to the kitchen, find the red apple, and bring it to me."

Please output a sequence of actions in JSON format, where each action is an object with 'skill' and 'params'.
```

**Potential LLM Output:**

```json
[
  {"skill": "navigate_to", "params": {"location": "kitchen"}},
  {"skill": "find_object", "params": {"object_name": "red apple"}},
  {"skill": "pick_up_object", "params": {"object_name": "red apple"}},
  {"skill": "navigate_to", "params": {"location": "user_location"}},
  {"skill": "place_object", "params": {"object_name": "red apple", "destination": "user"}}
]
```

## Integrating with ROS 2

This JSON output can then be parsed by a ROS 2 node (e.g., `llm_planner_node`). This node would:

1.  Receive the natural language command from the Whisper node.
2.  Send it to the LLM API (or a local LLM model).
3.  Parse the JSON plan from the LLM.
4.  Execute each skill by calling the corresponding ROS 2 actions or services (e.g., call `nav2_send_goal` for `navigate_to`, publish to a manipulation topic for `pick_up_object`).

## Challenges and Considerations

-   **Hallucination:** LLMs can sometimes generate incorrect or non-existent actions. Robust error checking is essential.
-   **Context Management:** Maintaining long-term memory or conversational context for the LLM is complex.
-   **Safety:** Ensuring the LLM's generated plans are safe and adhere to robot constraints is paramount.
-   **Real-time Performance:** Latency of LLM inference can be a factor.

Despite these challenges, LLMs represent a revolutionary step towards creating robots that can genuinely understand and respond to the nuances of human language, leading us to our ultimate capstone project.
