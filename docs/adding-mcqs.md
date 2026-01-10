# How to Add MCQ Tests

This guide explains how to add new Multiple Choice Questions (MCQs) to the question bank.

## 1. File Location

MCQ data files are stored in the `_data` directory with the naming convention `mX_mcqY.json`, where:
- `mX` is the module number (e.g., `m7` for C++, `m3` for Web Technologies)
- `mcqY` is the test number (e.g., `mcq1`, `mcq2`)

### Module Reference Table

| Module No | Module Name | Data File Prefix |
|-----------|-------------|------------------|
| M1 | Java Core | `m1_` |
| M2 | Database | `m2_` |
| M3 | Web Technologies | `m3_` |
| M4 | Algorithms & Data Structures | `m4_` |
| M5 | OS & SDM | `m5_` |
| M6 | Advanced Web Java | `m6_` |
| M7 | C++ | `m7_` |
| M8 | ASP.NET C# | `m8_` |
| M9 | Aptitude | `m9_` |

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
- **explanation**: (Optional) Text shown after the user answers.

## 3. Formatting Code

We support GitHub-flavored Markdown style for code blocks.

### Code Blocks
Use triple backticks followed by the language name (e.g., `cpp`, `java`), then a **newline**, then your code.

**Example in JSON string:**
```json
"question": "What is the output?\n```cpp\nint x = 10;\ncout << x;\n```"
```

**Important:** The `\n` after the language name is required. The format is:
- ` ```languagename ` + newline (`\n`)
- Your code lines (each separated by `\n`)
- ` ``` ` to close

### Inline Code
Use single backticks for inline variables or short snippets.

**Example:**
```json
"options": ["The value is `true`", "The value is `false`"]
```

## 4. Tips

- **Escape Quotes**: Since this is a JSON file, ensure double quotes inside strings are escaped (`\"`).
- **Escape HTML**: If options contain HTML tags like `<div>`, they should be escaped as `&lt;div&gt;` to display as text.
- **Newlines**: Use `\n` for line breaks inside the "question" or "explanation" strings.
- **Validation**: Ensure your JSON is valid (no trailing commas). Use a JSON validator.

## 5. Adding the Test Page

After creating the data file (e.g., `m7_mcq3.json`), create a corresponding markdown file.

### Step-by-Step:

1. **Create the JSON file**: `_data/mX_mcqY.json`
2. **Create the test page**: `docs/ModuleName/practice/mcq-test-Y.md`

### Test Page Template

```yaml
---
layout: mcq
title: MCQ Test 3
parent: Practice
grand_parent: Module 7 - C++
nav_order: 3
mcq_data: m7_mcq3
---

# MCQ Test 3

Description of what this test covers.
```

### Front Matter Explained:

| Field | Description |
|-------|-------------|
| `layout` | Must be `mcq` (uses the MCQ layout) |
| `title` | Display name (e.g., "MCQ Test 3") |
| `parent` | Usually `Practice` (must match your practice index) |
| `grand_parent` | Must match the module title exactly (case-sensitive) |
| `nav_order` | Test number (1, 2, 3, ...) |
| `mcq_data` | References the JSON file name without `.json` extension |

### Module Parent Names Reference

| Module | grand_parent Value |
|--------|--------------------|
| M1 | `Module 1 - Java Core` |
| M2 | `Module 2 - Database` |
| M3 | `Module 3 - Web Technologies` |
| M4 | `Module 4 - Algorithms & Data Structures` |
| M5 | `Module 5 - OS & SDM` |
| M6 | `Module 6 - Advanced Web Java` |
| M7 | `Module 7 - C++` |
| M8 | `Module 8 - ASP.NET C#` |
| M9 | `Module 9 - Aptitude` |

## 6. Quick Checklist

- [ ] Create JSON file in `_data/` with correct naming (`mX_mcqY.json`)
- [ ] Ensure each question has exactly 4 options
- [ ] Verify answer index is 0-3 (zero-based)
- [ ] Validate JSON syntax (no trailing commas)
- [ ] Create markdown file in `docs/ModuleName/practice/`
- [ ] Use `layout: mcq` in front matter
- [ ] Set correct `parent` and `grand_parent` values
- [ ] Set `mcq_data` to match JSON filename (without .json)
- [ ] Test the MCQ in browser before committing

## 7. Automatic Navigation

The practice index pages use `{% include mcq-navigation.html %}` to automatically detect and display MCQ tests. When you add a new JSON file and test page, it will appear automatically!
