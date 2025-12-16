# SP Task

## Task Class

```python
class Task:
  """A unit of work to be performed by an agent."""
  def __init__(self, instruction: str, agent: str, tools: list[str]):
    self.instruction = instruction
    self.agent = agent
    self.tools = tools
```

## Add Task

```python
def add_task(task: Task):
  """Adds a task to the task queue."""
  # Implementation details for adding a task to the queue
  pass
```

## Get Task Instruction

```python
def get_task_instruction(task: Task) -> str:
  """Returns the instruction for a given task.

  Args:
    task: The task to get the instruction for.

  Returns:
    The instruction for the task.
  """
  return task.instruction
```

## Set Task

```python
def _set_task(self, task: Task) -> str:
    self._task = task
    return f"Task set to: {self._task.instruction}"
```

## Run Single Task

```python
def _run_single_task(
    self,
    task: Task,
    team_spec: str,
    context: Optional[str] = None,
) -> str:
    # Function implementation
    pass
```

## Get Task Class

```python
def get_task_class(task_name: str) -> type[Task]:
  """Returns the class for a given task name.

  Args:
    task_name: The name of the task.

  Returns:
    The class for the task.
  """
  # Implementation details for getting the task class
  pass
```
