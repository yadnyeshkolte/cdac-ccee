# 🎓 CDAC CCEE Learning Docs

A comprehensive Jekyll-based learning portal for CDAC CCEE modules with interactive MCQ tests, modern UI, and organized content structure.

## 🚀 Quick Start

### Prerequisites
- Ruby (2.7 or higher)
- Bundler gem
- Jekyll gem

### Installation & Running

```bash
# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve

# Visit the site
# Open http://127.0.0.1:4000/cdac-ccee/ in your browser
```

---

## 📁 Project Structure

```
cdac-ccee/
├── _config.yml              # Jekyll configuration
├── _data/                   # MCQ question data (JSON files)
│   ├── m1_mcq1.json        # Module 1, MCQ Test 1
│   ├── m1_mcq2.json        # Module 1, MCQ Test 2
│   ├── m2_mcq1.json        # Module 2, MCQ Test 1
│   └── ...
├── _includes/              # Reusable HTML components
│   ├── sidebar.html        # Navigation sidebar
│   ├── header.html         # Site header
│   └── footer.html         # Site footer
├── _layouts/               # Page layouts
│   ├── default.html        # Default page layout
│   ├── mcq.html           # MCQ test page layout
│   └── page.html          # Simple page layout
├── assets/                 # Static assets
│   ├── css/
│   │   └── custom.css     # Custom styling
│   └── js/
│       ├── navigation.js  # Navigation functionality
│       └── mcq.js         # MCQ test logic
├── docs/                   # Learning content
│   ├── JavaCore/          # Module 1 - Java Core
│   │   ├── index.md       # Module landing page
│   │   ├── 00-intro.md    # Introduction
│   │   ├── datatypes.md   # Content pages
│   │   └── practice/      # Practice tests
│   │       ├── index.md   # Practice landing page
│   │       ├── mcq-test-1.md
│   │       └── mcq-test-2.md
│   ├── Database/          # Module 2 - Database
│   ├── WebTechnologies/   # Module 3
│   └── ...                # Other modules
├── index.markdown          # Home page
└── about.markdown          # About page
```

---

## 📝 How to Add New Content

### 1. Adding a New Module

**Step 1**: Create the module directory
```bash
mkdir -p docs/YourModuleName
mkdir -p docs/YourModuleName/practice
```

**Step 2**: Create `docs/YourModuleName/index.md`
```yaml
---
layout: default
title: Module X - Your Module Name
nav_order: X
has_children: true
permalink: /docs/YourModuleName/
---

# Module X: Your Module Name

Welcome to Module X. Brief description of what this module covers.
```

**Step 3**: Create `docs/YourModuleName/practice/index.md`
```yaml
---
layout: default
title: Practice
parent: Module X - Your Module Name
has_children: true
nav_order: 10
---

# Practice

Practice what you have learned in Module X.
```

### 2. Adding a New Note/Content Page

Create a new markdown file in your module directory:

**File**: `docs/YourModuleName/topic-name.md`
```yaml
---
layout: default
title: Topic Name
parent: Module X - Your Module Name
nav_order: 1
---

# Topic Name

Your content here...

## Subtopic 1
Content...

## Subtopic 2
Content...
```

**Navigation Order Tips**:
- `nav_order: 0` - Introduction pages
- `nav_order: 1-9` - Content pages
- `nav_order: 10` - Practice section

### 3. Adding Nested Content (Sub-sections)

For content with sub-pages:

**Parent Page**: `docs/YourModuleName/main-topic.md`
```yaml
---
layout: default
title: Main Topic
parent: Module X - Your Module Name
has_children: true
nav_order: 2
---

# Main Topic
Overview of the main topic...
```

**Child Page**: `docs/YourModuleName/main-topic/subtopic.md`
```yaml
---
layout: default
title: Subtopic Name
parent: Main Topic
grand_parent: Module X - Your Module Name
nav_order: 1
---

# Subtopic Name
Detailed content...
```

---

## 📝 How to Add New Content

### Adding New Notes/Content Pages

**Step 1**: Navigate to your module directory
```bash
cd docs/YourModuleName/
```

**Step 2**: Create a new markdown file with a descriptive name
```bash
# Example: For a topic about "Inheritance in Java"
touch inheritance.md
```

**Step 3**: Add the front matter and content

**File**: `docs/JavaCore/inheritance.md`
```yaml
---
layout: default
title: Inheritance in Java
parent: Module 1 - Java Core
nav_order: 5
---

# Inheritance in Java

## What is Inheritance?
Inheritance is a fundamental OOP concept...

## Types of Inheritance
1. Single Inheritance
2. Multilevel Inheritance
3. Hierarchical Inheritance

## Code Example
\```java
class Parent {
    void display() {
        System.out.println("Parent class");
    }
}

class Child extends Parent {
    void show() {
        System.out.println("Child class");
    }
}
\```

## Key Points
- Use `extends` keyword for inheritance
- Java supports single inheritance only
- Use `super` to access parent class members
```

**Front Matter Explanation**:
- `layout: default` - Uses the default page layout (required)
- `title` - Display name in navigation and page header
- `parent` - Must match the module title exactly (case-sensitive)
- `nav_order` - Order in the navigation (lower numbers appear first)

**Navigation Order Guidelines**:
- `0` - Introduction/Overview pages
- `1-9` - Main content pages
- `10` - Practice section
- Use increments of 1 for sequential topics

---

## 🎯 How to Add MCQ Tests

### Step-by-Step Guide

**Step 1**: Create the question data file in `_data/` directory

**File**: `_data/m1_mcq3.json`
```json
[
  {
    "question": "What is polymorphism in Java?",
    "options": [
      "Ability to take many forms",
      "Ability to hide data",
      "Ability to inherit properties",
      "Ability to create objects"
    ],
    "answer": 0
  },
  {
    "question": "Which keyword is used for inheritance in Java?",
    "options": [
      "implements",
      "extends",
      "inherits",
      "super"
    ],
    "answer": 1
  },
  {
    "question": "What is the default value of a boolean variable?",
    "options": [
      "true",
      "false",
      "0",
      "null"
    ],
    "answer": 1
  }
]
```

**JSON Format Rules**:
- Array of question objects
- Each question must have:
  - `question`: String - The question text (supports inline markdown!)
  - `options`: Array of 4 strings - Answer choices (supports inline markdown!)
  - `answer`: Number - Index of correct answer (0-3, zero-based)
- Ensure valid JSON syntax (use a JSON validator if needed)

### 💡 Markdown Support in Questions

You can use **backticks** for inline code in questions and options. This is perfect for programming questions!

**Example with code:**
```json
{
  "question": "What will be the output? `public class Foo { public static void main(String[] args) { try { return; } finally { System.out.println(\"Finally\"); } } }`",
  "options": [
    "`Finally`",
    "Compilation fails.",
    "The code runs with no output.",
    "An exception is thrown at runtime."
  ],
  "answer": 0
}
```

**Supported Markdown:**
- Inline code: `` `code here` ``
- Bold: `**bold text**`
- Italic: `*italic text*`

**Step 2**: Create the MCQ test page in the module's practice directory

**File**: `docs/JavaCore/practice/mcq-test-3.md`
```yaml
---
layout: mcq
title: MCQ Test 3
parent: Practice
grand_parent: Module 1 - Java Core
nav_order: 3
mcq_data: m1_mcq3
---

# MCQ Test 3

This test covers advanced Java concepts including polymorphism and inheritance.
```

**Front Matter Explanation**:
- `layout: mcq` - Uses the MCQ layout (required for tests)
- `title` - Display name (e.g., "MCQ Test 3")
- `parent: Practice` - Must be exactly "Practice"
- `grand_parent` - Must match the module title exactly
- `nav_order` - Test number (1, 2, 3, ...)
- `mcq_data: m1_mcq3` - References the JSON file (without .json extension)

### MCQ Naming Convention

Follow this pattern for consistency:

**Data Files**: `_data/mX_mcqY.json`
- `X` = Module number (1-9)
- `Y` = Test number (1, 2, 3, ...)

**Test Pages**: `docs/ModuleName/practice/mcq-test-Y.md`
- `Y` = Test number (1, 2, 3, ...)

**Examples**:
| Module | Test | Data File | Test Page |
|--------|------|-----------|-----------|
| Module 1 | Test 1 | `m1_mcq1.json` | `docs/JavaCore/practice/mcq-test-1.md` |
| Module 2 | Test 3 | `m2_mcq3.json` | `docs/Database/practice/mcq-test-3.md` |
| Module 5 | Test 2 | `m5_mcq2.json` | `docs/OperatingSystem/practice/mcq-test-2.md` |

### Quick Checklist for Adding MCQs

- [ ] Create JSON file in `_data/` with correct naming (`mX_mcqY.json`)
- [ ] Validate JSON syntax (all questions have 4 options, answer index is 0-3)
- [ ] Create markdown file in `docs/ModuleName/practice/`
- [ ] Set `layout: mcq` in front matter
- [ ] Set `parent: Practice` (exactly as shown)
- [ ] Set `grand_parent` to match module title exactly
- [ ] Set `mcq_data` to match JSON filename (without .json)
- [ ] Test the MCQ in browser before committing

### 🔄 Automatic MCQ Navigation (Enabled on All Modules!)

The `mcq-navigation` include is now enabled on ALL modules! It automatically detects MCQ files in `_data/` and displays navigation cards with question counts on each module's Practice page.

**How to Add a New MCQ Test (Simplified):**

1. **Create JSON file**: `_data/mX_mcqY.json` (e.g., `m6_mcq3.json`)
2. **Create test page**: `docs/ModuleName/practice/mcq-test-Y.md`

**Test page template** (just copy and adjust):
```yaml
---
layout: mcq
title: MCQ Test 3
parent: Practice
grand_parent: Module 6 - Advanced Web Java
nav_order: 3
mcq_data: m6_mcq3
---

# MCQ Test 3

Description of this test.
```

**Auto-Navigation Already Enabled For:**

| Module | Include in practice/index.md |
|--------|------------------------------|
| M1 - Java Core | `{% include mcq-navigation.html module_prefix="m1" module_dir="JavaCore" %}` |
| M2 - Database | `{% include mcq-navigation.html module_prefix="m2" module_dir="Database" %}` |
| M3 - Web Technologies | `{% include mcq-navigation.html module_prefix="m3" module_dir="WebTechnologies" %}` |
| M4 - Algorithms & Data Structures | `{% include mcq-navigation.html module_prefix="m4" module_dir="AlgorithmsDataStructures" %}` |
| M5 - OS & SDM | `{% include mcq-navigation.html module_prefix="m5" module_dir="OS-SDM" %}` |
| M6 - Advanced Web Java | `{% include mcq-navigation.html module_prefix="m6" module_dir="Adv.WebJava" %}` |
| M7 - C++ | `{% include mcq-navigation.html module_prefix="m7" module_dir="C++" %}` |
| M8 - ASP.NET C# | `{% include mcq-navigation.html module_prefix="m8" module_dir="ASP.NET-C#" %}` |
| M9 - Aptitude | `{% include mcq-navigation.html module_prefix="m9" module_dir="Aptitude" %}` |

---

## 🔗 Linking Best Practices

### Internal Links

**Link to another page in the same module**:
```markdown
See [Data Types]({{ '/docs/JavaCore/datatypes' | relative_url }}) for more info.
```

**Link to a page in another module**:
```markdown
Check out [SQL Basics]({{ '/docs/Database/3-sqlcommands-basics' | relative_url }}).
```

**Link to home page**:
```markdown
[Back to Home]({{ '/' | relative_url }})
```

### External Links

```markdown
[Official Java Documentation](https://docs.oracle.com/javase/)
```

### Anchor Links (Same Page)

```markdown
## Section 1
Content...

## Section 2
Jump back to [Section 1](#section-1)
```

---

## 🎨 Styling & Formatting

### Buttons & UI Elements

You can easily add buttons and labels to your content using these CSS classes.

**Buttons**:
```html
<a href="#" class="btn btn-primary">Primary Button</a>
<a href="#" class="btn btn-outline">Outline Button</a>
<a href="#" class="btn btn-accent">Accent Button</a>
```
_Result:_
[Primary Button](#){: .btn .btn-primary} [Outline Button](#){: .btn .btn-outline} [Accent Button](#){: .btn .btn-accent}

**Labels/Tags**:
```html
<span class="label label-blue">Blue</span>
<span class="label label-green">Green</span>
<span class="label label-yellow">Yellow</span>
<span class="label label-red">Red</span>
<span class="label label-purple">Purple</span>
```
_Result:_
<span class="label label-blue">Blue</span> <span class="label label-green">Green</span> <span class="label label-yellow">Yellow</span>

### Code Blocks
```markdown
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`
```

### Callout Boxes
```markdown
> **Note**: This is an important note.

> **Tip**: Pro tip for better understanding.

> **Warning**: Be careful with this approach.
```

### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

---

## 🔧 Configuration

### Site Configuration (`_config.yml`)

```yaml
title: Learning
description: Learning materials for modules.
baseurl: "/cdac-ccee"
url: "https://yadnyeshkolte.github.io"

# Navigation
nav_sort: case_insensitive

# Search
search_enabled: true
```

### Navigation Order

Pages are sorted by `nav_order` in the front matter:
- Lower numbers appear first
- `nav_order: 0` - Home page
- `nav_order: 1-9` - Modules
- `nav_order: 100` - About page

---

## 📊 Module Reference

### Module Number to Directory Mapping

Use this table to map module numbers to their directories when adding MCQ files:

| Module No | Module Name | Directory | Data File Prefix |
|-----------|-------------|-----------|------------------|
| **M1** | Java Core | `docs/JavaCore/` | `m1_` |
| **M2** | Database | `docs/Database/` | `m2_` |
| **M3** | Web Technologies | `docs/WebTechnologies/` | `m3_` |
| **M4** | Algorithms & Data Structures | `docs/AlgorithmsDataStructures/` | `m4_` |
| **M5** | OS & SDM (OS + Software Development) | `docs/OS-SDM/` | `m5_` |
| **M6** | Advanced Web Java | `docs/Adv.WebJava/` | `m6_` |
| **M7** | C++ | `docs/C++/` | `m7_` |
| **M8** | ASP.NET C# | `docs/ASP.NET-C#/` | `m8_` |
| **M9** | Aptitude | `docs/Aptitude/` | `m9_` |

### Current MCQ Tests

| Module | Directory | MCQ Tests |
|--------|-----------|-----------|
| Module 1 - Java Core | `docs/JavaCore/` | 2 tests |
| Module 2 - Database | `docs/Database/` | 2 tests |
| Module 3 - Web Technologies | `docs/WebTechnologies/` | 8 tests |
| Module 4 - Algorithms & Data Structures | `docs/AlgorithmsDataStructures/` | 2 tests |
| Module 5 - OS & SDM | `docs/OS-SDM/` | 6 tests |
| Module 6 - Advanced Web Java | `docs/Adv.WebJava/` | 7 tests |
| Module 7 - C++ | `docs/C++/` | 2 tests |
| Module 8 - ASP.NET C# | `docs/ASP.NET-C#/` | 4 tests |
| Module 9 - Aptitude | `docs/Aptitude/` | 2 tests |

---

## 🐛 Troubleshooting

### MCQ Test Not Showing Questions

1. Check that the `mcq_data` value matches the JSON filename (without .json)
2. Verify the JSON file exists in `_data/` directory
3. Ensure JSON is valid (use a JSON validator)
4. Check browser console for JavaScript errors

### Navigation Not Working

1. Verify `parent` and `grand_parent` match exactly (case-sensitive)
2. Check that parent pages have `has_children: true`
3. Ensure `nav_order` is set correctly

### Page Not Found (404)

1. Check the `permalink` in the module's `index.md`
2. Ensure permalink matches the directory structure
3. Verify the file has the correct front matter

---

## 🚀 Deployment

### GitHub Pages

1. Push your changes to the `main` branch
2. Go to repository Settings → Pages
3. Set source to `main` branch
4. Site will be available at `https://yadnyeshkolte.github.io/cdac-ccee/`

### Local Testing Before Deploy

```bash
# Build the site
bundle exec jekyll build

# Check the _site directory for generated files
ls _site/

# Serve and test
bundle exec jekyll serve
```

---

## 📄 License

Copyright © @yadnyeshkolte

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

---

## 📞 Support

For issues or questions, please open an issue on GitHub.
