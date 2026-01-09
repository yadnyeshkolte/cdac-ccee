---
layout: default
title: Module 5 - OS & SDM
nav_order: 5
has_children: true
---

# Concepts of Operating Systems & Software Development Methodologies

## Module Overview

**Duration:** 74 hours (50 theory + 24 lab)  
**Evaluation:** 100 marks (Theory: 40% + Lab: 30% + Internals: 30%)

This combined module covers Operating System concepts with Linux environment, Shell Programming, and modern Software Development Methodologies including Git, Agile, DevOps, and Testing.

---

## Part A: Operating Systems (26 hours)

**Evaluation:** 35 marks (CCEE: 15 + Lab: 10 + Internals: 10)

### Sessions
1. [Session 1: Introduction to OS](session1-intro-to-os.html)
2. [Session 2: Linux & Shell Basics](session2-linux-shell-basics.html)
3. [Session 3: Shell Programming Advanced](session3-shell-programming-advanced.html)
4. [Sessions 4-5: Processes](session4-5-processes.html)
5. [Sessions 6-7: Memory Management](session6-7-memory-management.html)
6. [Session 8: Virtual Memory](session8-virtual-memory.html)
7. [Session 9: Deadlock](session9-deadlock.html)

### Key OS Topics for CCEE
- OS components and functions
- Linux commands and file permissions
- Shell programming (loops, conditionals)
- CPU scheduling (FCFS, SJF, RR, Priority)
- Memory allocation (First Fit, Best Fit, Worst Fit)
- Paging, segmentation, TLB
- Page replacement (FIFO, LRU, Optimal)
- Deadlock conditions and prevention
- Semaphores and mutex

---

## Part B: Software Development Methodologies (48 hours)

**Evaluation:** 65 marks (CCEE: 25 + Lab: 20 + Internals: 20)

### Sessions

#### Git (4 hours)
1. [Session 1: Git & Version Control](sdm-session1-git.html)

#### Software Engineering (8 hours)
2. [Sessions 2-5: Software Engineering](sdm-session2-5-software-engineering.html)

#### Agile Development (6 hours)
3. [Sessions 6-8: Agile Development](sdm-session6-8-agile.html)

#### DevOps & Containerization (6 hours)
4. [Sessions 9-10: DevOps & Docker](sdm-session9-10-devops-docker.html)
5. [Session 11: Kubernetes](sdm-session11-kubernetes.html)

#### Testing & Integration (14 hours)
6. [Session 12: Testing Fundamentals](sdm-session12-testing-intro.html)
7. [Session 13: Testing Types & STLC](sdm-session13-testing-types.html)
8. [Sessions 14-15: Selenium WebDriver](sdm-session14-15-selenium.html)
9. [Session 16: Jenkins & CI/CD](sdm-session16-jenkins.html)

#### Complete Reference
- [Complete SDM Guide](complete-guide.html)

### Key SDM Topics for CCEE
- Git commands and workflows
- SDLC models (Waterfall, Agile, Spiral, V-Model)
- Requirements Engineering
- Agile/Scrum roles and ceremonies
- DevOps ecosystem and phases
- Docker commands and Dockerfile
- Kubernetes architecture
- Testing types (Unit, Integration, System)
- Selenium WebDriver locators
- Jenkins CI/CD pipelines

---

## Important Formulas

```
# CPU Scheduling
Turnaround Time = Completion Time - Arrival Time
Waiting Time = Turnaround Time - Burst Time
Response Time = First CPU Time - Arrival Time

# Memory Management
Physical Address = (Frame × Page Size) + Offset
EAT = (1 - p) × Memory Access + p × Page Fault Time
```

---

## Practice Tests

[Take MCQ Practice Tests →](practice/)

---

## Reference Books

### Operating Systems
- Operating Systems Principles by Silberschatz, Galvin & Gagne
- Unix Concepts and Applications by Sumitabha Das

### Software Development
- Software Engineering by Ian Sommerville
- Clean Code by Robert C. Martin
- DevOps: Continuous Delivery by Sricharan Vadapalli
