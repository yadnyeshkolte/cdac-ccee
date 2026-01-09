---
layout: default
title: "SDM Session 12: Testing Fundamentals"
parent: Module 5 - OS & SDM
nav_order: 16
---

# Session 12: Software Testing Fundamentals (2 hours)

## Learning Objectives
- Understand the importance of software testing
- Learn verification vs validation concepts
- Distinguish between QA, QC, and Testing
- Master the seven principles of software testing

---

## Introduction to Software Testing

### What is Software Testing?

**Software Testing** is the process of evaluating and verifying that a software application does what it is supposed to do.

```mermaid
mindmap
  root((Software Testing))
    Purpose
      Find defects
      Ensure quality
      Validate requirements
      Reduce risk
    Types
      Manual Testing
      Automation Testing
      Functional Testing
      Non-Functional Testing
    Activities
      Test Planning
      Test Design
      Test Execution
      Defect Reporting
```

### Testing Definition

> **IEEE Definition:** Testing is the process of executing a program with the intent of finding errors.

| Term | Definition |
|------|------------|
| **Bug/Defect** | Flaw in the software causing incorrect behavior |
| **Error** | Human mistake that produces a defect |
| **Failure** | Deviation from expected behavior |
| **Test Case** | Set of conditions to verify functionality |
| **Test Suite** | Collection of test cases |

---

## Why Testing Code is Important

### Cost of Defects

```mermaid
graph LR
    A[Requirements<br/>$1] --> B[Design<br/>$10]
    B --> C[Development<br/>$100]
    C --> D[Testing<br/>$1,000]
    D --> E[Production<br/>$10,000]
    
    style A fill:#4ecdc4
    style E fill:#ff6b6b
```

**Rule of 10**: Cost of fixing a defect increases 10x at each stage.

| Stage | Cost to Fix | Example |
|-------|-------------|---------|
| Requirements | 1x | $100 |
| Design | 10x | $1,000 |
| Coding | 100x | $10,000 |
| Testing | 1,000x | $100,000 |
| Production | 10,000x | $1,000,000 |

### Importance of Testing

```mermaid
graph TD
    A[Why Testing?] --> B[Find Bugs Early]
    A --> C[Ensure Quality]
    A --> D[Customer Satisfaction]
    A --> E[Reduce Costs]
    A --> F[Security]
    A --> G[Compliance]
    
    style A fill:#4ecdc4
```

| Reason | Description |
|--------|-------------|
| **Quality Assurance** | Ensures software meets requirements |
| **Early Bug Detection** | Cheaper to fix bugs early |
| **Customer Satisfaction** | Reliable software builds trust |
| **Risk Reduction** | Identifies potential failures |
| **Security** | Finds vulnerabilities before hackers |
| **Compliance** | Meets regulatory standards |
| **Documentation** | Test cases document expected behavior |

### Famous Software Failures

| Incident | Cause | Impact |
|----------|-------|--------|
| **Ariane 5 Rocket (1996)** | Integer overflow | $370 million loss |
| **Therac-25 (1985-87)** | Software bug in medical device | Patient deaths |
| **Knight Capital (2012)** | Trading software bug | $440 million loss in 45 min |
| **Boeing 737 MAX (2019)** | Sensor/software issue | 346 deaths |

---

## Verification and Validation

### V&V Concepts

```mermaid
graph TD
    A[V&V] --> B[Verification]
    A --> C[Validation]
    
    B --> B1["Are we building the product RIGHT?"]
    C --> C1["Are we building the RIGHT product?"]
    
    B --> B2[Process-oriented]
    C --> C2[Product-oriented]
    
    style B fill:#4ecdc4
    style C fill:#ffe66d
```

### Verification

**"Are we building the product RIGHT?"**

Ensures the product is being developed correctly according to specifications.

**Activities:**
- Reviews
- Walkthroughs
- Inspections
- Static analysis
- Code reviews

### Validation

**"Are we building the RIGHT product?"**

Ensures the product meets user needs and requirements.

**Activities:**
- Testing
- User acceptance testing
- Beta testing
- Demonstrations

### Comparison Table

| Aspect | Verification | Validation |
|--------|--------------|------------|
| **Question** | Are we building it right? | Are we building the right thing? |
| **Focus** | Process | Product |
| **Methods** | Reviews, inspections | Testing, demos |
| **When** | Before validation | After verification |
| **Objective** | Check compliance to specs | Check user needs |
| **Team** | QA team | Testing team + Users |
| **Type** | Static (no code execution) | Dynamic (code execution) |

### V&V in V-Model

```mermaid
graph TD
    subgraph "Verification (Left Side)"
        A[Requirements] 
        B[System Design]
        C[Architecture Design]
        D[Module Design]
    end
    
    subgraph "Validation (Right Side)"
        H[Acceptance Testing]
        G[System Testing]
        F[Integration Testing]
        E[Unit Testing]
    end
    
    A -.-> H
    B -.-> G
    C -.-> F
    D -.-> E
    
    A --> B --> C --> D --> I[Coding]
    I --> E --> F --> G --> H
    
    style I fill:#ffe66d
```

---

## Quality Assurance vs Quality Control vs Testing

### Definitions

```mermaid
graph TD
    A[Quality] --> B[Quality Assurance - QA]
    A --> C[Quality Control - QC]
    C --> D[Testing]
    
    B --> B1["Process-focused<br/>Prevention of defects"]
    C --> C1["Product-focused<br/>Detection of defects"]
    D --> D1["Subset of QC<br/>Execute and verify"]
    
    style B fill:#ff6b6b
    style C fill:#4ecdc4
    style D fill:#ffe66d
```

### Quality Assurance (QA)

**Focus:** Process-oriented (Prevention)

**Goal:** Prevent defects by improving the development process.

**Activities:**
- Define processes and standards
- Conduct audits
- Process improvement
- Training
- Documentation

### Quality Control (QC)

**Focus:** Product-oriented (Detection)

**Goal:** Identify defects in the product.

**Activities:**
- Product inspections
- Testing
- Reviews
- Defect tracking

### Testing

**Focus:** Subset of QC

**Goal:** Execute software to find defects.

**Activities:**
- Test execution
- Bug reporting
- Test case creation
- Test automation

### Comparison Table

| Aspect | Quality Assurance (QA) | Quality Control (QC) | Testing |
|--------|------------------------|----------------------|---------|
| **Focus** | Process | Product | Product |
| **Goal** | Prevent defects | Detect defects | Find bugs |
| **Approach** | Proactive | Reactive | Reactive |
| **Activities** | Audits, process improvement | Inspections, reviews | Execute test cases |
| **Scope** | Entire SDLC | Development outputs | Software application |
| **Orientation** | Prevention | Detection | Detection |
| **Team** | QA Engineers | QC Analysts | Testers |

### Relationship Diagram

```mermaid
graph TD
    A[Quality Management] --> B[Quality Assurance]
    A --> C[Quality Control]
    C --> D[Testing]
    
    B --> B1[Process Standards]
    B --> B2[Audits]
    B --> B3[Training]
    
    C --> C1[Reviews]
    C --> C2[Inspections]
    C --> C3[Testing]
    
    D --> D1[Unit Testing]
    D --> D2[Integration Testing]
    D --> D3[System Testing]
    
    style A fill:#ff6b6b
    style B fill:#4ecdc4
    style C fill:#ffe66d
    style D fill:#95e1d3
```

---

## Principles of Software Testing

### Seven Principles

```mermaid
mindmap
  root((Testing Principles))
    1. Testing shows presence of defects
    2. Exhaustive testing impossible
    3. Early testing
    4. Defect clustering
    5. Pesticide paradox
    6. Testing is context dependent
    7. Absence-of-errors fallacy
```

### Principle 1: Testing Shows Presence of Defects

**Statement:** Testing can show that defects are present, but cannot prove that there are no defects.

```mermaid
graph LR
    A[Testing] --> B[Finds Bugs]
    A -.-x C[Proves Bug-Free]
    
    style B fill:#4ecdc4
    style C fill:#ff6b6b
```

**Explanation:**
- Testing reduces probability of undiscovered defects
- Zero defects can never be guaranteed
- Even after thorough testing, bugs may exist

**Example:** Testing a login form for 100 inputs doesn't guarantee it works for the 101st input.

### Principle 2: Exhaustive Testing is Impossible

**Statement:** Testing everything (all input combinations) is not feasible.

| Scenario | Possible Combinations |
|----------|----------------------|
| 3 input fields, 10 values each | 10³ = 1,000 |
| 10 input fields, 100 values each | 100¹⁰ = 10²⁰ |
| Complete web form | Practically infinite |

**Solution:** Use risk-based testing and prioritization.

### Principle 3: Early Testing

**Statement:** Testing activities should start as early as possible in the SDLC.

```mermaid
graph LR
    A[Early Testing] --> B[Lower Cost]
    A --> C[Faster Fixes]
    A --> D[Better Quality]
    
    style A fill:#4ecdc4
```

**Benefits:**
- Find defects when they're cheapest to fix
- Requirements testing catches issues before design
- Design testing catches issues before coding

**Shift-Left Testing:** Move testing earlier in the development process.

### Principle 4: Defect Clustering

**Statement:** A small number of modules contain most of the defects.

```mermaid
pie title Defect Distribution
    "20% of Modules" : 80
    "80% of Modules" : 20
```

**Pareto Principle (80/20 Rule):**
- 80% of defects in 20% of modules
- Focus testing on high-risk modules
- Complex modules have more bugs

**Application:**
- Identify and prioritize high-risk areas
- Allocate more testing resources to complex modules

### Principle 5: Pesticide Paradox

**Statement:** Repeating the same tests will not find new bugs.

```mermaid
graph TD
    A[Same Tests] --> B[Same Bugs Found]
    A -.-> C[New Bugs Missed]
    
    D[Updated Tests] --> E[New Bugs Found]
    
    style C fill:#ff6b6b
    style E fill:#4ecdc4
```

**Explanation:**
- Tests become "immune" to defects after running multiple times
- Need to regularly review and update test cases
- Add new test cases for new scenarios

**Solution:**
- Regular test case review
- Exploratory testing
- Test case rotation

### Principle 6: Testing is Context Dependent

**Statement:** Testing approach depends on the type of software.

| Software Type | Testing Focus |
|---------------|---------------|
| **Medical Device** | Safety, reliability, compliance |
| **Banking App** | Security, transaction accuracy |
| **Gaming App** | Performance, user experience |
| **E-commerce** | Functionality, security, performance |
| **Mobile App** | Usability, device compatibility |

**Different contexts require:**
- Different testing techniques
- Different test priorities
- Different tools

### Principle 7: Absence-of-Errors Fallacy

**Statement:** Finding and fixing defects doesn't guarantee success.

```mermaid
graph TD
    A[Bug-Free Software] --> B{Meets User Needs?}
    B -->|Yes| C[Successful Product]
    B -->|No| D[Failed Product]
    
    style C fill:#4ecdc4
    style D fill:#ff6b6b
```

**Explanation:**
- Software can be bug-free but still unusable
- Software can be bug-free but not meet requirements
- User satisfaction is the ultimate measure

**Example:** A perfectly functioning calculator that users wanted as a spreadsheet.

---

## Summary Table: Seven Principles

| # | Principle | Key Point |
|---|-----------|-----------|
| 1 | Testing shows presence of defects | Can't prove absence of bugs |
| 2 | Exhaustive testing impossible | Test smart, not everything |
| 3 | Early testing | Find bugs early = cheaper fixes |
| 4 | Defect clustering | 80/20 rule applies |
| 5 | Pesticide paradox | Update tests regularly |
| 6 | Context dependent | Different apps = different approaches |
| 7 | Absence-of-errors fallacy | Bug-free ≠ successful |

---

## Testing Mindset

### Tester vs Developer Mindset

| Developer Mindset | Tester Mindset |
|-------------------|----------------|
| "This should work" | "Let me break this" |
| Constructive thinking | Destructive thinking |
| Build features | Find defects |
| Optimistic | Skeptical |
| "Happy path" focus | Edge cases focus |

### Good Tester Qualities

```mermaid
mindmap
  root((Good Tester))
    Technical Skills
      Programming knowledge
      Testing tools
      Debugging skills
    Soft Skills
      Critical thinking
      Attention to detail
      Communication
    Domain Knowledge
      Business understanding
      User perspective
      Industry standards
```

---

## CCEE Exam Focus Points

> [!IMPORTANT]
> **Key Concepts for MCQs:**
> - **Verification** = "Building product RIGHT" (Process)
> - **Validation** = "Building RIGHT product" (Product)
> - **QA** = Prevention, Process-focused
> - **QC** = Detection, Product-focused
> - **Testing** = Subset of QC
> - **7 Principles**: Memorize all seven!
> - **Defect Clustering** = 80/20 rule

> [!TIP]
> **Common Exam Questions:**
> - What is verification vs validation?
> - Difference between QA and QC?
> - Why early testing is important?
> - What is pesticide paradox?
> - Can testing prove absence of bugs? (No - Principle 1)

---

## Quick Reference

### V&V Quick Comparison

| Verification | Validation |
|--------------|------------|
| Process | Product |
| Static | Dynamic |
| Reviews | Testing |
| Right way | Right product |

### QA/QC/Testing

| QA | QC | Testing |
|----|----|----|
| Prevent | Detect | Execute |
| Process | Product | Product |
| Proactive | Reactive | Reactive |

---
## Assignment

### Read More Testing Concepts
As per the syllabus, students are encouraged to research the following advanced testing concepts used in the industry:

1.  **Agile Testing**: How testing fits into Scrum sprints.
2.  **DevSecOps**: Integrating security testing into DevOps pipelines.
3.  **Chaos Engineering**: Intentional failure injection (e.g., Netflix Chaos Monkey).
4.  **AI in Testing**: Using AI/ML for test generation and self-healing tests.
5.  **Shift-Left vs Shift-Right**: Testing early vs testing in production.
6.  **TDD (Test Driven Development)**: Writing tests before code.
7.  **BDD (Behavior Driven Development)**: Using Gherkin syntax (Given/When/Then).

---

*End of Session 12: Software Testing Fundamentals*
