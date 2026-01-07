---
layout: default
title: Session 1 - Introduction to Operating Systems
parent: Module 5 - OS & SDM
nav_order: 2
---

# Session 1: Introduction to Operating Systems

## What is an Operating System?

An **Operating System (OS)** is system software that acts as an intermediary between computer hardware and application software/users.

### Key Characteristics:
- **System Software**: Manages hardware and provides services to applications
- **Resource Manager**: Allocates CPU, memory, I/O devices, and storage
- **Interface Provider**: Offers a user-friendly interface to interact with hardware

### How is OS Different from Application Software?

| Operating System | Application Software |
|-----------------|---------------------|
| Manages hardware resources | Uses resources provided by OS |
| Runs continuously | Runs when needed |
| Low-level operations | High-level operations |
| Platform-dependent | Often platform-independent |
| Examples: Windows, Linux | Examples: MS Word, Chrome |

### Why is OS Hardware Dependent?

> [!IMPORTANT]
> OS is hardware-dependent because it directly interacts with hardware components through device drivers and must be compiled for specific processor architectures (x86, ARM, etc.)

**Reasons:**
1. **Direct Hardware Access**: OS needs to know exact hardware specifications
2. **Device Drivers**: Hardware-specific code to control devices
3. **Instruction Set Architecture (ISA)**: Different CPUs have different instruction sets
4. **Memory Management**: Hardware-specific memory addressing

---

## Components of an Operating System

```mermaid
graph TD
    A[Operating System] --> B[Kernel]
    A --> C[Shell/UI]
    A --> D[File System]
    A --> E[Device Drivers]
    A --> F[System Libraries]
    
    B --> B1[Process Management]
    B --> B2[Memory Management]
    B --> B3[I/O Management]
    B --> B4[Security]
    
    C --> C1[CLI - Command Line]
    C --> C2[GUI - Graphical Interface]
    
    style B fill:#ff9999
    style C fill:#99ccff
    style D fill:#99ff99
```

### 1. **Kernel** (Core Component)
- Heart of the OS
- Manages system resources
- Provides low-level services
- Types: Monolithic, Microkernel, Hybrid

### 2. **Shell/User Interface**
- **CLI (Command Line Interface)**: Text-based (e.g., Bash, CMD)
- **GUI (Graphical User Interface)**: Visual (e.g., Windows Explorer, GNOME)

### 3. **File System**
- Organizes and stores data
- Examples: NTFS, ext4, FAT32, APFS

### 4. **Device Drivers**
- Software that controls hardware devices
- Acts as translator between OS and hardware

### 5. **System Libraries**
- Pre-written code for common operations
- Examples: libc, glibc

---

## Basic Computer Organization for OS

```mermaid
graph LR
    A[CPU] <--> B[Memory/RAM]
    A <--> C[I/O Devices]
    B <--> C
    A <--> D[Storage]
    
    style A fill:#ffcccc
    style B fill:#ccffcc
    style C fill:#ccccff
    style D fill:#ffffcc
```

### Essential Components:

1. **CPU (Central Processing Unit)**
   - Executes instructions
   - Contains ALU, Control Unit, Registers
   - Operates in User Mode or Kernel Mode

2. **Memory (RAM)**
   - Temporary storage for running programs
   - Fast access, volatile

3. **Storage (Hard Disk/SSD)**
   - Permanent data storage
   - Slower than RAM, non-volatile

4. **I/O Devices**
   - Input: Keyboard, Mouse
   - Output: Monitor, Printer
   - Both: Network Card, USB

5. **Bus System**
   - Data Bus: Transfers data
   - Address Bus: Specifies memory locations
   - Control Bus: Carries control signals

---

## Examples of Operating Systems

### 1. **Desktop OS**
- **Windows** (10, 11): Most popular for personal computers
- **macOS**: Apple's desktop OS
- **Linux** (Ubuntu, Fedora): Open-source, customizable

**Characteristics:**
- User-friendly GUI
- Multi-tasking
- Support for wide range of applications

### 2. **Server OS**
- **Windows Server**: Enterprise-level server management
- **Linux Server** (RHEL, CentOS, Ubuntu Server): Web servers, databases
- **Unix** (Solaris, AIX): Legacy enterprise systems

**Characteristics:**
- High reliability and uptime
- Advanced security features
- Support for multiple concurrent users
- Network services (DNS, DHCP, Web servers)

### 3. **Mobile OS**
- **Android**: Google's Linux-based OS
- **iOS**: Apple's mobile OS
- **HarmonyOS**: Huawei's OS

**Characteristics:**
- Touch-optimized interface
- Power management for battery life
- App ecosystem
- Connectivity features (WiFi, Bluetooth, Cellular)

### 4. **Embedded OS**
- **Embedded Linux**: IoT devices, routers
- **VxWorks**: Industrial automation
- **FreeRTOS**: Microcontrollers

**Characteristics:**
- Minimal resource usage
- Specific-purpose design
- Often real-time capabilities
- No user interface in many cases

### 5. **Real-Time OS (RTOS)**
- **QNX**: Automotive systems
- **RTLinux**: Industrial control
- **VxWorks**: Aerospace, defense

**Characteristics:**
- **Deterministic**: Guaranteed response time
- **Time-critical**: Must meet strict deadlines
- **Hard RTOS**: Missing deadline = system failure (e.g., airbag systems)
- **Soft RTOS**: Missing deadline = degraded performance (e.g., video streaming)

### Comparison: Why Are These Different?

```mermaid
graph TD
    A[Operating Systems] --> B[Desktop OS]
    A --> C[Server OS]
    A --> D[Mobile OS]
    A --> E[Embedded OS]
    A --> F[RTOS]
    
    B --> B1[User Experience Focus]
    B --> B2[Multi-application Support]
    
    C --> C1[Reliability & Uptime]
    C --> C2[Multi-user Support]
    
    D --> D1[Power Efficiency]
    D --> D2[Touch Interface]
    
    E --> E1[Minimal Resources]
    E --> E2[Specific Purpose]
    
    F --> F1[Deterministic Timing]
    F --> F2[Time-Critical Operations]
```

---

## Functions of an Operating System

### 1. **Process Management**
- Creating and deleting processes
- Scheduling processes on CPU
- Process synchronization
- Inter-process communication (IPC)

### 2. **Memory Management**
- Allocating and deallocating memory
- Keeping track of memory usage
- Virtual memory management
- Memory protection

### 3. **File System Management**
- Creating, deleting, reading, writing files
- Directory management
- Access control and permissions
- File backup and recovery

### 4. **I/O Device Management**
- Managing device drivers
- Buffering and caching
- Spooling (e.g., print queue)
- Device allocation and deallocation

### 5. **Security and Protection**
- User authentication
- Access control
- Encryption
- Malware protection

### 6. **Networking**
- Network protocols (TCP/IP)
- Network connections
- Data transmission
- Network security

### 7. **User Interface**
- Command-line interface (CLI)
- Graphical user interface (GUI)
- System utilities

```mermaid
mindmap
  root((OS Functions))
    Process Management
      Scheduling
      Synchronization
      IPC
    Memory Management
      Allocation
      Virtual Memory
      Protection
    File System
      CRUD Operations
      Permissions
      Backup
    I/O Management
      Drivers
      Buffering
      Spooling
    Security
      Authentication
      Encryption
      Access Control
    Networking
      Protocols
      Connections
      Security
```

---

## User Space vs Kernel Space

### Architecture Overview

```mermaid
graph TB
    subgraph "User Space"
        A[User Applications]
        B[System Libraries]
    end
    
    subgraph "Kernel Space"
        C[System Calls Interface]
        D[Kernel]
        E[Device Drivers]
    end
    
    subgraph "Hardware"
        F[CPU, Memory, Devices]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    
    style A fill:#e1f5ff
    style B fill:#b3e5fc
    style C fill:#ffccbc
    style D fill:#ff8a65
    style E fill:#ff6e40
    style F fill:#d7ccc8
```

### User Space
- **Definition**: Memory area where user applications run
- **Privileges**: Limited access to hardware
- **Protection**: Cannot directly access kernel memory or hardware
- **Examples**: Web browsers, text editors, games

### Kernel Space
- **Definition**: Memory area where kernel and drivers run
- **Privileges**: Full access to all hardware and memory
- **Protection**: Protected from user applications
- **Examples**: Process scheduler, memory manager, device drivers

> [!CAUTION]
> User programs cannot directly access kernel space. Any attempt results in a protection fault and program termination.

---

## User Mode vs Kernel Mode

### CPU Operating Modes

| Aspect | User Mode | Kernel Mode |
|--------|-----------|-------------|
| **Access Level** | Restricted | Unrestricted |
| **Memory Access** | Limited to user space | Full memory access |
| **Instructions** | Non-privileged only | All instructions |
| **Hardware Access** | Through system calls | Direct access |
| **Crash Impact** | Only application crashes | System crash possible |
| **Also Called** | Unprivileged mode | Privileged/Supervisor mode |

### Mode Switching

```mermaid
sequenceDiagram
    participant App as User Application
    participant CPU as CPU (User Mode)
    participant Kernel as Kernel (Kernel Mode)
    participant HW as Hardware
    
    App->>CPU: Execute normal code
    Note over CPU: Running in User Mode
    
    App->>CPU: Need to read file
    CPU->>Kernel: System Call (trap)
    Note over CPU,Kernel: Mode switch to Kernel Mode
    
    Kernel->>HW: Access disk
    HW->>Kernel: Return data
    
    Kernel->>CPU: Return to user mode
    Note over CPU: Mode switch to User Mode
    
    CPU->>App: Return file data
```

### How Mode Switching Works:
1. Application needs privileged operation (e.g., read file)
2. Application makes **system call**
3. CPU switches from User Mode to Kernel Mode
4. Kernel executes the operation
5. CPU switches back to User Mode
6. Control returns to application

---

## Interrupts

### What is an Interrupt?

An **interrupt** is a signal to the CPU that an event needs immediate attention, causing the CPU to temporarily stop its current task.

### Types of Interrupts

```mermaid
graph TD
    A[Interrupts] --> B[Hardware Interrupts]
    A --> C[Software Interrupts]
    
    B --> B1[Maskable]
    B --> B2[Non-Maskable]
    
    B1 --> B1a[Keyboard press]
    B1 --> B1b[Mouse click]
    B1 --> B1c[Network packet]
    
    B2 --> B2a[Power failure]
    B2 --> B2b[Hardware error]
    
    C --> C1[System Calls]
    C --> C2[Exceptions]
    
    C1 --> C1a[read, write, open]
    C2 --> C2a[Division by zero]
    C2 --> C2b[Page fault]
    
    style B fill:#ffcccc
    style C fill:#ccccff
```

### 1. **Hardware Interrupts**
- Generated by hardware devices
- **Maskable**: Can be ignored/disabled temporarily
- **Non-Maskable (NMI)**: Cannot be ignored (critical errors)

**Examples:**
- Timer interrupt (for scheduling)
- Keyboard interrupt (key pressed)
- Disk I/O completion

### 2. **Software Interrupts**
- Generated by software/programs
- **System Calls**: Intentional interrupts to request OS services
- **Exceptions**: Error conditions (divide by zero, invalid memory access)

### Interrupt Handling Process

```mermaid
sequenceDiagram
    participant CPU
    participant Program
    participant IVT as Interrupt Vector Table
    participant ISR as Interrupt Service Routine
    
    Program->>CPU: Executing instruction
    Note over CPU: Interrupt occurs
    
    CPU->>CPU: Save current state
    CPU->>IVT: Look up interrupt handler
    IVT->>ISR: Jump to handler address
    
    ISR->>ISR: Handle interrupt
    ISR->>CPU: Return from interrupt
    
    CPU->>CPU: Restore saved state
    CPU->>Program: Resume execution
```

**Steps:**
1. **Interrupt occurs**: Hardware or software generates interrupt
2. **Save state**: CPU saves current program state (registers, PC)
3. **Identify interrupt**: Check interrupt vector table
4. **Execute ISR**: Run Interrupt Service Routine (handler)
5. **Restore state**: Restore saved program state
6. **Resume**: Continue executing interrupted program

---

## System Calls

### What are System Calls?

**System calls** are the programming interface between user applications and the kernel. They allow programs to request services from the OS.

> [!IMPORTANT]
> System calls are the ONLY way for user programs to access kernel services and hardware resources.

### Categories of System Calls

```mermaid
mindmap
  root((System Calls))
    Process Control
      fork
      exec
      exit
      wait
    File Management
      open
      read
      write
      close
    Device Management
      ioctl
      read
      write
    Information Maintenance
      getpid
      alarm
      sleep
    Communication
      pipe
      shmget
      mmap
```

### 1. **Process Control**
- `fork()`: Create new process
- `exec()`: Execute a program
- `exit()`: Terminate process
- `wait()`: Wait for child process

### 2. **File Management**
- `open()`: Open file
- `read()`: Read from file
- `write()`: Write to file
- `close()`: Close file
- `lseek()`: Move file pointer

### 3. **Device Management**
- `ioctl()`: Device-specific operations
- `read()`: Read from device
- `write()`: Write to device

### 4. **Information Maintenance**
- `getpid()`: Get process ID
- `alarm()`: Set alarm
- `sleep()`: Suspend execution
- `time()`: Get system time

### 5. **Communication**
- `pipe()`: Create pipe for IPC
- `shmget()`: Get shared memory
- `mmap()`: Map files to memory
- `socket()`: Create network socket

### System Call Execution Flow

```mermaid
sequenceDiagram
    participant App as User Application
    participant Lib as C Library
    participant Trap as Trap Handler
    participant Kernel
    participant HW as Hardware
    
    App->>Lib: Call function (e.g., read())
    Lib->>Lib: Prepare system call
    Lib->>Trap: Trigger software interrupt
    
    Note over Trap,Kernel: Switch to Kernel Mode
    
    Trap->>Kernel: Pass system call number & params
    Kernel->>Kernel: Validate parameters
    Kernel->>HW: Perform operation
    HW->>Kernel: Return result
    
    Note over Trap,Kernel: Switch to User Mode
    
    Kernel->>Lib: Return result
    Lib->>App: Return to application
```

### Example: Reading a File

```c
// User program
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd;
    char buffer[100];
    
    // System call: open
    fd = open("file.txt", O_RDONLY);
    
    // System call: read
    read(fd, buffer, 100);
    
    // System call: close
    close(fd);
    
    return 0;
}
```

**What happens:**
1. `open()` triggers system call to kernel
2. Kernel validates permissions
3. Kernel opens file and returns file descriptor
4. `read()` triggers another system call
5. Kernel reads data from disk
6. Data copied to user buffer
7. `close()` releases resources

---

## Key Concepts Summary

### Interrupts vs System Calls

| Aspect | Interrupts | System Calls |
|--------|-----------|--------------|
| **Trigger** | Asynchronous (unpredictable) | Synchronous (programmed) |
| **Source** | Hardware or exceptions | User programs |
| **Purpose** | Handle events | Request OS services |
| **Examples** | Keyboard press, timer | read(), write(), fork() |
| **Initiated by** | External events | Program instruction |

### User Mode vs Kernel Mode

```mermaid
graph LR
    A[User Mode] -->|System Call| B[Kernel Mode]
    B -->|Return| A
    C[Hardware Interrupt] -->|Interrupt| B
    B -->|IRET| A
    
    style A fill:#e1f5ff
    style B fill:#ff8a65
    style C fill:#ffeb3b
```

---

## Practice Questions

### Multiple Choice Questions

1. **Which of the following is NOT a function of an operating system?**
   - A) Process Management
   - B) Memory Management
   - C) Compiling Programs
   - D) I/O Management
   
   **Answer: C** - Compiling is done by compilers, not the OS

2. **What is the primary difference between User Mode and Kernel Mode?**
   - A) Speed of execution
   - B) Access privileges to hardware
   - C) Memory size
   - D) Number of processes
   
   **Answer: B** - Kernel mode has unrestricted hardware access

3. **Which type of interrupt cannot be ignored by the CPU?**
   - A) Maskable interrupt
   - B) Software interrupt
   - C) Non-maskable interrupt
   - D) Timer interrupt
   
   **Answer: C** - NMI cannot be disabled

4. **What mechanism allows user programs to request OS services?**
   - A) Direct hardware access
   - B) System calls
   - C) Interrupts
   - D) Polling
   
   **Answer: B** - System calls are the interface to kernel services

5. **Which OS is an example of RTOS?**
   - A) Windows 10
   - B) Android
   - C) QNX
   - D) Ubuntu
   
   **Answer: C** - QNX is a real-time OS

### Short Answer Questions

1. **Explain why an OS is hardware-dependent.**
2. **Differentiate between kernel space and user space.**
3. **What happens when a system call is made?**
4. **Why do we need both user mode and kernel mode?**
5. **Compare desktop OS with embedded OS.**

---

## Important Points to Remember

> [!NOTE]
> **For CCEE Exam:**
> - Understand the difference between interrupts and system calls
> - Know the components of an OS and their functions
> - Be clear about user/kernel mode and space
> - Memorize examples of different types of OS
> - Understand why OS is hardware-dependent

> [!TIP]
> **Study Strategy:**
> - Draw diagrams to visualize concepts
> - Create comparison tables for different OS types
> - Practice explaining mode switching process
> - Memorize common system calls and their purposes

---

## Additional Resources

- **Practice**: Try identifying system calls in simple C programs
- **Explore**: Check your own OS type and components
- **Research**: Look up the kernel type of Linux (monolithic) vs Windows (hybrid)

---

*End of Session 1 Notes*
