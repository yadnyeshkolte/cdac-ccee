---
layout: default
title: "SDM Sessions 6-8: Agile Development"
parent: Module 5 - OS & SDM
nav_order: 13
---

# Sessions 6-8: Agile Development (6 hours)

## Learning Objectives
- Understand the Agile philosophy and principles
- Learn Scrum framework roles, events, and artifacts
- Understand Extreme Programming (XP) practices
- Master Atlassian Jira for project management
- Apply Agile methodology to web development

---

## Introduction to Agile Development

### What is Agile?

**Agile** is an iterative approach to project management and software development that helps teams deliver value to customers faster with fewer headaches.

```mermaid
mindmap
  root((Agile))
    Philosophy
      Iterative development
      Incremental delivery
      Respond to change
      Customer collaboration
    Benefits
      Faster delivery
      Higher quality
      Customer satisfaction
      Team morale
    Frameworks
      Scrum
      Kanban
      XP
      Lean
```

### Traditional vs Agile

| Aspect | Traditional (Waterfall) | Agile |
|--------|------------------------|-------|
| **Approach** | Sequential, linear | Iterative, incremental |
| **Requirements** | Fixed upfront | Evolving |
| **Delivery** | Single delivery at end | Continuous releases |
| **Customer Involvement** | Limited | Continuous |
| **Documentation** | Extensive | Just enough |
| **Change** | Resistance | Embraced |
| **Testing** | End phase | Continuous |
| **Risk** | High (late discovery) | Low (early feedback) |

---

## Agile Manifesto

### Four Core Values

```mermaid
graph TB
    A[Agile Manifesto] --> B["Individuals and Interactions<br/>OVER<br/>Processes and Tools"]
    A --> C["Working Software<br/>OVER<br/>Comprehensive Documentation"]
    A --> D["Customer Collaboration<br/>OVER<br/>Contract Negotiation"]
    A --> E["Responding to Change<br/>OVER<br/>Following a Plan"]
    
    style A fill:#4ecdc4
    style B fill:#ffe66d
    style C fill:#ffe66d
    style D fill:#ffe66d
    style E fill:#ffe66d
```

| Value | Emphasis | Not Ignoring |
|-------|----------|--------------|
| **Individuals and Interactions** | Human communication | Processes still matter |
| **Working Software** | Functional product | Documentation where needed |
| **Customer Collaboration** | Partnership | Contracts protect both parties |
| **Responding to Change** | Adaptability | Plans provide direction |

### 12 Agile Principles

| # | Principle | Focus |
|---|-----------|-------|
| 1 | Highest priority is customer satisfaction through early and continuous delivery | **Customer Value** |
| 2 | Welcome changing requirements, even late in development | **Adaptability** |
| 3 | Deliver working software frequently (weeks rather than months) | **Frequent Delivery** |
| 4 | Business people and developers must work together daily | **Collaboration** |
| 5 | Build projects around motivated individuals | **Trust & Support** |
| 6 | Most efficient method is face-to-face conversation | **Communication** |
| 7 | Working software is the primary measure of progress | **Results Focus** |
| 8 | Agile processes promote sustainable development | **Pace** |
| 9 | Continuous attention to technical excellence and good design | **Quality** |
| 10 | Simplicity—maximizing work not done—is essential | **Simplicity** |
| 11 | Best architectures emerge from self-organizing teams | **Self-Organization** |
| 12 | Regular reflection on how to become more effective | **Improvement** |

---

## Agile Development Components

### Key Agile Components

```mermaid
graph TD
    A[Agile Components] --> B[User Stories]
    A --> C[Sprint/Iteration]
    A --> D[Backlog]
    A --> E[Daily Standup]
    A --> F[Retrospective]
    A --> G[Demo/Review]
    
    B --> B1["As a [user], I want [goal], so that [benefit]"]
    C --> C1[Time-boxed work period]
    D --> D1[Prioritized list of work]
    E --> E1[Daily sync meeting]
    F --> F1[Team improvement discussion]
    G --> G1[Show completed work]
    
    style A fill:#4ecdc4
```

### User Stories

Format:
```
As a [type of user],
I want [goal/desire],
So that [benefit/reason].
```

**Examples:**

| User Story | Acceptance Criteria |
|------------|---------------------|
| As a customer, I want to reset my password so that I can regain access if I forget it | - Reset link sent to email<br>- Link expires in 24 hours<br>- Password must meet complexity rules |
| As an admin, I want to view sales reports so that I can track business performance | - Filter by date range<br>- Export to PDF/Excel<br>- Shows charts and graphs |

### Story Points & Estimation

| Story Points | Relative Effort | Example |
|--------------|-----------------|---------|
| 1 | Very small | Change button text |
| 2 | Small | Add new field to form |
| 3 | Medium | New report page |
| 5 | Large | User authentication |
| 8 | Very large | Payment integration |
| 13 | Extra large | New module |

---

## Benefits of Agile

```mermaid
graph LR
    A[Agile Benefits] --> B[Faster Time to Market]
    A --> C[Higher Quality]
    A --> D[Customer Satisfaction]
    A --> E[Reduced Risk]
    A --> F[Better Team Morale]
    A --> G[Improved Visibility]
    
    style A fill:#4ecdc4
```

| Benefit | Description |
|---------|-------------|
| **Faster Delivery** | Working software delivered in weeks |
| **Flexibility** | Adapt to changing requirements |
| **Quality** | Continuous testing and feedback |
| **Transparency** | Regular demos and progress updates |
| **Risk Reduction** | Early identification of issues |
| **Customer Focus** | Continuous stakeholder involvement |
| **Team Empowerment** | Self-organizing teams |

---

## Agile Tools for Web Development

| Tool | Purpose | Key Features |
|------|---------|--------------|
| **Jira** | Project Management | Sprints, backlog, boards, reports |
| **Trello** | Kanban Boards | Simple cards, lists, drag-drop |
| **Azure DevOps** | Full ALM | Repos, pipelines, boards, tests |
| **GitHub Projects** | Issue Tracking | Integrated with repos |
| **Slack** | Communication | Channels, integrations |
| **Confluence** | Documentation | Wiki, templates |

---

## Scrum Framework

### Scrum Overview

```mermaid
graph LR
    A[Product Backlog] --> B[Sprint Planning]
    B --> C[Sprint Backlog]
    C --> D[Daily Scrum]
    D --> E[Sprint Work]
    E --> D
    E --> F[Sprint Review]
    F --> G[Sprint Retrospective]
    G --> H[Product Increment]
    H -.-> A
    
    style A fill:#ff6b6b
    style H fill:#4ecdc4
```

### Scrum Roles

```mermaid
graph TD
    subgraph "Scrum Team"
        A[Product Owner]
        B[Scrum Master]
        C[Development Team]
    end
    
    A --> A1["• Defines features<br/>• Prioritizes backlog<br/>• Accepts/rejects work<br/>• Represents stakeholders"]
    B --> B1["• Facilitates Scrum process<br/>• Removes impediments<br/>• Coaches team<br/>• Shields from distractions"]
    C --> C1["• Self-organizing<br/>• Cross-functional<br/>• 3-9 members<br/>• Delivers increment"]
    
    style A fill:#ff6b6b
    style B fill:#4ecdc4
    style C fill:#ffe66d
```

| Role | Responsibilities |
|------|------------------|
| **Product Owner** | • Define product vision<br/>• Manage product backlog<br/>• Prioritize features<br/>• Accept/reject work<br/>• Communicate with stakeholders |
| **Scrum Master** | • Facilitate Scrum events<br/>• Remove blockers<br/>• Coach the team<br/>• Protect the team<br/>• Ensure Scrum practices |
| **Development Team** | • Deliver product increments<br/>• Self-organize<br/>• Cross-functional skills<br/>• Estimate work<br/>• Make technical decisions |

### Scrum Events

```mermaid
graph TD
    A[Sprint<br/>1-4 weeks] --> B[Sprint Planning<br/>4-8 hours]
    B --> C[Daily Scrum<br/>15 minutes]
    C --> D[Development Work]
    D --> C
    D --> E[Sprint Review<br/>2-4 hours]
    E --> F[Sprint Retrospective<br/>1.5-3 hours]
    F --> G[Next Sprint]
    
    style A fill:#ff6b6b
    style B fill:#4ecdc4
    style C fill:#ffe66d
    style E fill:#95e1d3
    style F fill:#ffd3b6
```

| Event | Duration | Purpose | Participants |
|-------|----------|---------|--------------|
| **Sprint** | 1-4 weeks | Time-boxed iteration | Entire team |
| **Sprint Planning** | Max 8 hours | Plan sprint work | PO, SM, Dev Team |
| **Daily Scrum** | 15 minutes | Sync and plan day | Dev Team, SM |
| **Sprint Review** | Max 4 hours | Demo completed work | All + Stakeholders |
| **Sprint Retrospective** | Max 3 hours | Improve process | PO, SM, Dev Team |

### Daily Scrum (Standup)

**Three Questions:**

```mermaid
graph TD
    A[Daily Scrum] --> B[What did I do yesterday?]
    A --> C[What will I do today?]
    A --> D[Any impediments?]
    
    style A fill:#4ecdc4
```

**Rules:**
- Same time, same place daily
- Maximum 15 minutes
- Standing (traditionally)
- Focus on work, not status

### Scrum Artifacts

```mermaid
graph TB
    A[Product Backlog] --> B[Ordered list of all work]
    C[Sprint Backlog] --> D[Selected items for sprint + plan]
    E[Product Increment] --> F[Sum of completed items]
    
    A --> C --> E
    
    style A fill:#ff6b6b
    style C fill:#4ecdc4
    style E fill:#ffe66d
```

| Artifact | Description | Owner |
|----------|-------------|-------|
| **Product Backlog** | Ordered list of everything needed in product | Product Owner |
| **Sprint Backlog** | Items selected for sprint + delivery plan | Development Team |
| **Product Increment** | Sum of all completed backlog items | Team |

### Sprint Retrospective Questions

| Category | Sample Questions |
|----------|------------------|
| **What went well?** | - Good collaboration<br/>- Met sprint goal<br/>- Quality code |
| **What could be improved?** | - Better testing<br/>- More clear requirements<br/>- Communication |
| **Action items** | - Add code review checklist<br/>- Daily PO availability<br/>- Improve CI pipeline |

---

## Extreme Programming (XP)

### XP Overview

**Extreme Programming** takes proven practices to "extreme" levels for rapid, high-quality software development.

```mermaid
mindmap
  root((XP Practices))
    Planning
      User Stories
      Release Planning
      Iteration Planning
      Small Releases
    Design
      Simple Design
      Refactoring
      System Metaphor
      CRC Cards
    Coding
      Pair Programming
      Collective Ownership
      Coding Standards
      Continuous Integration
    Testing
      Test-Driven Development
      Acceptance Tests
      Unit Tests
      Customer Tests
```

### Key XP Practices

| Practice | Description |
|----------|-------------|
| **Pair Programming** | Two developers, one computer |
| **Test-Driven Development (TDD)** | Write tests before code |
| **Continuous Integration** | Integrate code multiple times daily |
| **Refactoring** | Improve code without changing behavior |
| **Simple Design** | Simplest solution that works |
| **Collective Code Ownership** | Anyone can modify any code |
| **Coding Standards** | Consistent code style |
| **40-Hour Week** | Sustainable pace |

### Pair Programming

```mermaid
graph LR
    A[Driver] --> B[Writes code]
    C[Navigator] --> D[Reviews, thinks strategically]
    
    A <-->|Switch roles| C
    
    style A fill:#4ecdc4
    style C fill:#ffe66d
```

**Benefits:**
- Fewer bugs
- Knowledge sharing
- Better design
- Instant code review

### Test-Driven Development (TDD)

```mermaid
graph LR
    A[Write Test] --> B[Run Test<br/>Should Fail]
    B --> C[Write Code]
    C --> D[Run Test<br/>Should Pass]
    D --> E[Refactor]
    E --> A
    
    style A fill:#ff6b6b
    style D fill:#4ecdc4
```

**Red-Green-Refactor Cycle:**
1. **Red**: Write failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code quality

---

## Scrum vs XP Comparison

| Aspect | Scrum | XP |
|--------|-------|---|
| **Iteration Length** | 1-4 weeks | 1-2 weeks |
| **Change During Sprint** | Not encouraged | Allowed (swap equal-sized stories) |
| **Order of Features** | Product Owner decides | Team can change |
| **Engineering Practices** | Not prescribed | Pair programming, TDD, refactoring |
| **Focus** | Project management | Engineering practices |
| **Team Size** | 3-9 developers | 2-12 developers |

---

## Atlassian Jira

### Jira Overview

**Jira** is the #1 agile project management tool used by teams to plan, track, and release software.

### Jira Concepts

```mermaid
graph TD
    A[Project] --> B[Epic]
    B --> C[Story]
    C --> D[Task]
    D --> E[Sub-task]
    
    A --> F[Sprint]
    F --> C
    F --> G[Board]
    
    style A fill:#4ecdc4
    style B fill:#ffe66d
    style C fill:#95e1d3
```

| Concept | Description | Example |
|---------|-------------|---------|
| **Project** | Container for all work | "E-Commerce Website" |
| **Epic** | Large body of work | "User Authentication" |
| **Story** | User story/requirement | "As a user, I want to login" |
| **Task** | Unit of work | "Create login form" |
| **Sub-task** | Breakdown of task | "Add email validation" |
| **Sprint** | Time-boxed iteration | "Sprint 5 (Jan 1-14)" |
| **Board** | Visual workflow | Scrum/Kanban board |

### Creating a Project in Jira

1. **Navigate**: Projects → Create Project
2. **Choose Template**: Scrum, Kanban, or Basic
3. **Configure**: Set project name, key, lead
4. **Setup Board**: Configure columns and swim lanes

### Jira Workflow

```mermaid
stateDiagram-v2
    [*] --> ToDo
    ToDo --> InProgress: Start Work
    InProgress --> InReview: Submit for Review
    InReview --> InProgress: Changes Requested
    InReview --> Done: Approved
    Done --> [*]
    
    InProgress --> Blocked: Issue Found
    Blocked --> InProgress: Resolved
```

### Creating Sprint with Tasks

**Steps:**
1. **Create Epic**: Large feature (e.g., "Shopping Cart")
2. **Add Stories**: Break epic into user stories
3. **Add Tasks/Sub-tasks**: Technical tasks for each story
4. **Estimate**: Assign story points
5. **Create Sprint**: Define sprint duration
6. **Add to Sprint**: Move stories to sprint
7. **Start Sprint**: Set goals, begin work

### Jira Board Views

| View | Purpose |
|------|---------|
| **Backlog** | Manage and prioritize stories |
| **Active Sprint** | Current sprint board |
| **Reports** | Burndown, velocity, cumulative flow |
| **Timeline** | Gantt-style view |

---

## Case Study: Web Application Using Agile

### Project: E-Commerce Website

**Team:**
- 1 Product Owner
- 1 Scrum Master
- 4 Developers

**Sprint Length:** 2 weeks

### Sprint 0: Setup

| Task | Description |
|------|-------------|
| Setup development environment | IDE, Git, Node.js |
| Create project repository | GitHub with branching strategy |
| Setup Jira project | Create board, add initial stories |
| Define Definition of Done | Acceptance criteria |

### Product Backlog (Initial)

```mermaid
graph TD
    A[Epic: User Management] --> A1[User Registration]
    A --> A2[User Login]
    A --> A3[Password Reset]
    
    B[Epic: Product Catalog] --> B1[List Products]
    B --> B2[Product Details]
    B --> B3[Search Products]
    
    C[Epic: Shopping Cart] --> C1[Add to Cart]
    C --> C2[View Cart]
    C --> C3[Checkout]
```

### Sprint 1 Execution

**Sprint Goal:** Complete user registration and login

| Day | Activity |
|-----|----------|
| Day 1 | Sprint Planning - Select stories, create tasks |
| Day 2-3 | Develop registration backend |
| Day 4-5 | Develop login functionality |
| Day 6-7 | Frontend integration |
| Day 8 | Testing and bug fixes |
| Day 9 | Sprint Review - Demo to stakeholders |
| Day 10 | Sprint Retrospective |

### Sprint Burndown Chart

```mermaid
graph LR
    subgraph "Sprint Burndown"
        A[Day 1: 21 points] --> B[Day 3: 15 points]
        B --> C[Day 5: 10 points]
        C --> D[Day 7: 5 points]
        D --> E[Day 9: 0 points]
    end
```

### Sprint Retrospective Example

| What Went Well | What to Improve | Actions |
|----------------|-----------------|---------|
| Good team collaboration | Need better test coverage | Add unit tests for all new code |
| Met sprint goal | Requirements unclear initially | PO to provide acceptance criteria upfront |
| Clean code reviews | Deployment issues | Setup CI/CD pipeline |

---

## CCEE Exam Focus Points

> [!IMPORTANT]
> **Key Concepts for MCQs:**
> - Four Agile Manifesto values
> - Scrum roles: Product Owner, Scrum Master, Dev Team
> - Scrum events: Sprint, Planning, Daily, Review, Retro
> - Scrum artifacts: Product Backlog, Sprint Backlog, Increment
> - User story format: "As a..., I want..., So that..."
> - XP practices: Pair Programming, TDD, CI
> - Daily Scrum: 15 minutes, 3 questions

> [!TIP]
> **Common Exam Questions:**
> - Who prioritizes the backlog? (Product Owner)
> - What is sprint duration? (1-4 weeks)
> - Daily Scrum duration? (15 minutes)
> - XP practice where two developers work together? (Pair Programming)
> - Write test before code? (TDD)

---

## Quick Reference

### Scrum Cheat Sheet

| Term | Definition |
|------|------------|
| Sprint | Time-boxed iteration (1-4 weeks) |
| Velocity | Story points completed per sprint |
| Burndown | Chart showing work remaining |
| Epic | Large user story |
| Spike | Research/exploration task |
| Grooming | Refining/estimating backlog |

### Agile vs Waterfall Quick Compare

| Waterfall | Agile |
|-----------|-------|
| Sequential | Iterative |
| Rigid | Flexible |
| Document-heavy | Working software focus |
| Late feedback | Continuous feedback |

---

*End of Sessions 6-8: Agile Development*
