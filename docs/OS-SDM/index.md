---
layout: default
title: OS & Software Development
nav_order: 2
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
1. [Session 1: Introduction to OS](../OperatingSystem/session1-intro-to-os.html)
2. [Session 2: Linux & Shell Basics](../OperatingSystem/session2-linux-shell-basics.html)
3. [Session 3: Shell Programming Advanced](../OperatingSystem/session3-shell-programming-advanced.html)
4. [Sessions 4-5: Processes](../OperatingSystem/session4-5-processes.html)
5. [Sessions 6-7: Memory Management](../OperatingSystem/session6-7-memory-management.html)
6. [Session 8: Virtual Memory](../OperatingSystem/session8-virtual-memory.html)
7. [Session 9: Deadlock](../OperatingSystem/session9-deadlock.html)

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
1. [Complete SDM Guide](../SoftwareDevelopment/complete-guide.html)

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
