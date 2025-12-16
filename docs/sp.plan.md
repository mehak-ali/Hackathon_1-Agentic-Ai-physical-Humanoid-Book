# SP Plan

## Plan Data Model

```python
from pydantic import BaseModel
from typing import List, Optional

class Plan(BaseModel):
    """A travel plan."""
    destination: str
    start_date: str
    end_date: str
    budget: float
    activities: List[str]
    flights: Optional[List[dict]] = None
    hotels: Optional[List[dict]] = None
```

## Mock Plan

```python
def mock_plan() -> Plan:
  """Returns a mock travel plan."""
  return Plan(
    destination='Paris',
    start_date='2024-10-26',
    end_date='2024-11-02',
    budget=2000.0,
    activities=[
      'Visit the Eiffel Tower',
      'Explore the Louvre Museum',
      'Take a cruise on the Seine River',
    ],
  )
```

## Update Plan

```python
def update_plan(plan: Plan, updates: dict) -> Plan:
  """Updates a travel plan with the given updates.

  Args:
    plan: The travel plan to update.
    updates: A dictionary of updates to apply to the plan.

  Returns:
    The updated travel plan.
  """
  for key, value in updates.items():
    setattr(plan, key, value)
  return plan
```
