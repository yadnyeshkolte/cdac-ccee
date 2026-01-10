# How to Add MCQ Tests

This guide explains how to add new Multiple Choice Questions (MCQs) to the question bank.

## 1. File Location
MCQ data files are stored in the `_data` directory with the naming convention `mX_mcqY.json`, where:
- `mX` is the module number (e.g., `m7` for C++).
- `mcqY` is the test number (e.g., `mcq1`).

## 2. JSON Structure
The file should contain a JSON array of question objects.

```json
[
  {
    "question": "Question text here. You can use markdown code blocks.",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": 0,
    "explanation": "Detailed explanation for the correct answer."
  }
]
```

### Fields:
- **question**: The question text. Supports Markdown code blocks (see below).
- **options**: An array of exactly 4 strings. Supports inline code.
- **answer**: The index of the correct option (0, 1, 2, or 3).
- **explanation**: Text shown after the user answers.

## 3. Formatting Code

We support GitHub-flavored Markdown style for code blocks.

### Code Blocks
Use triple backticks followed by the language name (e.g., `cpp`, `java`), then a **newline**, then your code.

**Example in JSON string:**
```json
"question": "What is the output?\n```cpp\nint x = 10;\ncout << x;\n```"
```

**Important:** The `\n` after `cpp` (or any language) is required. The format is:
- ` ```languagename ` + newline (`\n`)
- Your code lines (each separated by `\n`)
- ` ``` ` to close

**Renders as:**
What is the output?
```cpp
int x = 10;
cout << x;
```

### Inline Code
Use single backticks for inline variables or short snippets.

**Example:**
```json
"options": ["The value is `true`", "The value is `false`"]
```

## 4. Tips
- **Escape Quotes**: Since this is a JSON file, ensure double quotes inside strings are escaped (`\"`).
- **Newlines**: Use `\n` for line breaks inside the "question" or "explanation" strings.
- **Validation**: Ensure your JSON is valid (no trailing commas).

## 5. Adding the Test Page
After creating the data file (e.g., `m7_mcq3.json`), create a corresponding markdown file in `docs/Module/practice/mcq-test-3.md`:

```markdown
---
layout: default
title: MCQ Test 3
parent: Practice Tests
nav_order: 3
mcq_data: m7_mcq3
---

{% include mcq-interface.html %}
```
