# SP Specify

## Integration Specification

```python
integration_spec: {
  'name': 'travel_agent',
  'description': 'A multi-agent system for automated travel planning and booking.',
  'agents': [
    {
      'name': 'travel_concierge_agent',
      'description': 'The main conversational agent that interacts with the user.',
      'tools': [
        'search_flights',
        'book_flight',
        'search_hotels',
        'book_hotel',
      ],
    },
    {
      'name': 'flight_agent',
      'description': 'A specialized agent for finding and booking flights.',
      'tools': [
        'search_flights',
        'book_flight',
      ],
    },
    {
      'name': 'hotel_agent',
      'description': 'A specialized agent for finding and booking hotels.',
      'tools': [
        'search_hotels',
        'book_hotel',
      ],
    },
  ],
}
```

## Connection Specification

```python
connection_spec: {
  'type': 'http',
  'url': 'https://api.example.com/travel',
  'headers': {
    'Authorization': 'Bearer <your-api-key>',
  },
}
```

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

## Build Function Declaration

```python
def build_function_declaration(tool_name: str) -> dict:
  """Builds a function declaration for a given tool name.

  Args:
    tool_name: The name of the tool.

  Returns:
    A dictionary representing the function declaration.
  """
  if tool_name == 'search_flights':
    return {
      'name': 'search_flights',
      'description': 'Searches for flights based on the user\'s criteria.',
      'parameters': {
        'type': 'object',
        'properties': {
          'origin': {
            'type': 'string',
            'description': 'The origin airport code.',
          },
          'destination': {
            'type': 'string',
            'description': 'The destination airport code.',
          },
          'departure_date': {
            'type': 'string',
            'description': 'The departure date in YYYY-MM-DD format.',
          },
          'return_date': {
            'type': 'string',
            'description': 'The return date in YYYY-MM-DD format.',
          },
        },
        'required': [
          'origin',
          'destination',
          'departure_date',
        ],
      },
    }
  elif tool_name == 'book_flight':
    return {
      'name': 'book_flight',
      'description': 'Books a flight for the user.',
      'parameters': {
        'type': 'object',
        'properties': {
          'flight_id': {
            'type': 'string',
            'description': 'The ID of the flight to book.',
          },
        },
        'required': ['flight_id'],
      },
    }
  else:
    return {}
```

```