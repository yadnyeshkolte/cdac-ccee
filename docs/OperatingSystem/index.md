---
layout: default
title: Operating System
nav_order: 2
has_children: true
---

# Operating System & Shell Programming

## Module Overview

**Duration:** 26 hours (18 theory + 8 lab)  
**Evaluation:** 35 marks (CCEE: 15 + Lab: 10 + Internals: 10)

This module introduces Operating System concepts with Linux environment and Shell Programming.

---

## Module Structure

### Theory Topics
- Operating System fundamentals
- Linux file system and commands
- Shell programming (basic and advanced)
- Process management and scheduling
- Memory management
- Virtual memory
- Deadlock handling

### Lab Topics
- Linux command practice
- Shell script development
- Process creation and management

---

## Learning Objectives

By the end of this module, you will be able to:

✓ Understand OS architecture and components  
✓ Work proficiently with Linux commands  
✓ Write shell scripts for automation  
✓ Understand process scheduling algorithms  
✓ Explain memory management techniques  
✓ Analyze deadlock scenarios  
✓ Apply OS concepts to real-world problems

---

## Sessions

1. [Session 1: Introduction to OS](session1-intro-to-os.html)
2. [Session 2: Linux & Shell Programming Basics](session2-linux-shell-basics.html)
3. [Session 3: Shell Programming Advanced](session3-shell-programming-advanced.html)
4. [Sessions 4-5: Processes](session4-5-processes.html)
5. [Sessions 6-7: Memory Management](session6-7-memory-management.html)
6. [Session 8: Virtual Memory](session8-virtual-memory.html)
7. [Session 9: Deadlock](session9-deadlock.html)

---

## Key Topics for CCEE Exam

> [!IMPORTANT]
> **Focus Areas:**
> - OS components and functions
> - Linux commands and file permissions
> - Shell programming (loops, conditionals, functions)
> - CPU scheduling algorithms (FCFS, SJF, RR, Priority)
> - Memory allocation (First Fit, Best Fit, Worst Fit)
> - Paging and segmentation
> - Page replacement algorithms (FIFO, LRU, Optimal)
> - Deadlock conditions and prevention
> - Semaphores and mutex

---

## Text Books

- **Operating Systems Principles** by Abraham Silberschatz, Peter Galvin & Greg Gagne / Wiley
- **Unix Concepts and Applications** by Sumitabha Das / McGraw Hill

## Reference Books

- Modern Operating Systems by Andrew Tanenbaum & Herbert Bos / Pearson
- Principles of Operating Systems by Naresh Chauhan / Oxford University Press
- Beginning Linux Programming by Neil Matthew & Richard Stones / Wrox
- Operating System: A Design-Oriented Approach by Charles Crowley / McGraw Hill

---

## Study Tips

### For Theory
1. **Understand Concepts**: Don't just memorize, understand the "why"
2. **Draw Diagrams**: Visualize process states, memory layouts, etc.
3. **Practice Calculations**: Scheduling algorithms, address translation
4. **Compare Techniques**: Create comparison tables

### For Lab
1. **Practice Commands**: Use Linux terminal regularly
2. **Write Scripts**: Start simple, gradually increase complexity
3. **Debug Errors**: Learn from mistakes
4. **Experiment**: Try different approaches

### For Exam
1. **Know Formulas**: Turnaround time, waiting time, EAT
2. **Practice MCQs**: Solve all practice questions in notes
3. **Understand Algorithms**: Be able to trace execution
4. **Review Diagrams**: Process lifecycle, memory hierarchy

---

## Quick Reference

### Important Formulas

```
Turnaround Time = Completion Time - Arrival Time
Waiting Time = Turnaround Time - Burst Time
Response Time = First CPU Time - Arrival Time

Physical Address = (Frame Number × Page Size) + Offset
EAT = (1 - p) × Memory Access + p × Page Fault Time
```

### Common Commands

```bash
# File Operations
ls, cd, pwd, mkdir, rm, cp, mv, touch, cat

# Permissions
chmod, chown, chgrp

# Process Management
ps, top, kill, fg, bg, jobs

# Text Processing
grep, sed, awk, cut, sort, uniq

# System Info
df, du, free, uname, who, date
```

---

*Navigate to individual sessions for detailed notes with diagrams, examples, and practice questions*
