---
id: 0001
title: Rename 'Start Reading' to 'Book'
stage: general
date_iso: 2025-12-16
surface: agent
model: gemini-1.5-flash
feature: none
branch: main
user: User
command: change next page start reading page name into book
labels:
  - UI
  - text-change
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - docusaurus.config.js
  - src/pages/index.js
tests_yaml:
  - null
---
### Prompt

```text
change next page start reading page name into book
```

### Response

The user requested to change all instances of "Start Reading" to "Book".

- Modified `docusaurus.config.js` to change the navbar item label and footer link label from 'Start Reading' to 'Book'.
- Modified `src/pages/index.js` to change the homepage button text from 'Start Reading' to 'Book'.
