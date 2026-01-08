---
layout: default
title: "Session 1: Getting Started"
parent: Module 7 - C++
nav_order: 1
---

# Session 1: Getting Started with C++

## 🎯 Learning Objectives
- Set up C++ development environment
- Understand why C++ is important
- Write your first C++ program

---

## 1. Why C++?

C++ is a **powerful, high-performance language** used in:
- **System Programming**: Operating systems, device drivers
- **Game Development**: Unreal Engine, AAA games
- **Embedded Systems**: IoT devices, microcontrollers
- **Finance**: High-frequency trading systems
- **Competitive Programming**: Fast execution speed

### Key Advantages
| Feature | Benefit |
|---------|---------|
| Speed | Compiled to machine code, no interpreter |
| Control | Direct memory access via pointers |
| OOP | Supports classes, inheritance, polymorphism |
| Portability | Runs on almost any platform |

---

## 2. C++ vs C

| Feature | C | C++ |
|---------|---|-----|
| Paradigm | Procedural | Multi-paradigm (OOP + Procedural) |
| Data Hiding | No (everything exposed) | Yes (private, protected, public) |
| Memory | malloc/free | new/delete (+ constructors) |
| Function Overloading | ❌ Not supported | ✅ Supported |
| References | ❌ Not supported | ✅ Supported |
| Namespace | ❌ Not supported | ✅ Supported |
| Exception Handling | ❌ Not supported | ✅ try-catch |

---

## 3. History of C++

| Year | Milestone |
|------|-----------|
| 1979 | Bjarne Stroustrup begins work on "C with Classes" |
| 1983 | Renamed to C++ |
| 1998 | C++98 - First ISO standard |
| 2011 | C++11 - Major update (auto, lambda, smart pointers) |
| 2014 | C++14 - Bug fixes and improvements |
| 2017 | C++17 - Filesystem, optional, variant |
| 2020 | C++20 - Concepts, ranges, coroutines |

---

## 4. Features of C++

### Core Features
1. **Object-Oriented Programming**
   - Classes and Objects
   - Encapsulation, Inheritance, Polymorphism, Abstraction

2. **Low-level Memory Manipulation**
   - Pointers and References
   - Manual memory management

3. **Rich Standard Library (STL)**
   - Containers: vector, map, set, queue
   - Algorithms: sort, find, transform

4. **Platform Independence**
   - Write once, compile anywhere

5. **Operator Overloading**
   - Customize behavior of operators for custom types

---

## 5. First C++ Program

```cpp
#include <iostream>  // Header for input/output
using namespace std; // Use standard namespace

int main() {
    cout << "Hello, World!" << endl;
    return 0;  // Return success to OS
}
```

### Breakdown:
- `#include <iostream>` - Includes input/output library
- `using namespace std` - Avoids writing `std::` everywhere
- `int main()` - Entry point of program
- `cout` - Console output stream
- `<<` - Insertion operator
- `endl` - End line + flush buffer
- `return 0` - Exit code (0 = success)

---

## 6. C++ Program Structure

```cpp
// 1. Preprocessor Directives
#include <iostream>
#define PI 3.14159

// 2. Namespace
using namespace std;

// 3. Global Declarations (avoid if possible)
int globalVar = 100;

// 4. Function Prototypes
void greet();

// 5. Main Function
int main() {
    greet();
    return 0;
}

// 6. Function Definitions
void greet() {
    cout << "Welcome to C++!" << endl;
}
```

---

## 7. Compilation Process

```
Source Code (.cpp)
       ↓
   Preprocessor (handles #include, #define)
       ↓
   Compiler (converts to assembly)
       ↓
   Assembler (converts to object code .obj)
       ↓
   Linker (links libraries, creates executable)
       ↓
   Executable (.exe)
```

### Compile Commands
```bash
# Using g++
g++ -o myprogram myprogram.cpp

# With C++17 standard
g++ -std=c++17 -o myprogram myprogram.cpp

# Run
./myprogram
```

---

## 📝 Lab Exercises

### Exercise 1: Hello World
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

### Exercise 2: Add Two Numbers
```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, sum;
    cout << "Enter two numbers: ";
    cin >> a >> b;
    sum = a + b;
    cout << "Sum = " << sum << endl;
    return 0;
}
```

### Exercise 3: Compound Interest
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double principal, rate, time, amount;
    
    cout << "Enter Principal: ";
    cin >> principal;
    cout << "Enter Rate (%): ";
    cin >> rate;
    cout << "Enter Time (years): ";
    cin >> time;
    
    // A = P(1 + r/100)^t
    amount = principal * pow((1 + rate/100), time);
    
    cout << "Compound Interest = " << (amount - principal) << endl;
    cout << "Total Amount = " << amount << endl;
    return 0;
}
```

### Exercise 4: Power of a Number
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double base, exponent;
    cout << "Enter base: ";
    cin >> base;
    cout << "Enter exponent: ";
    cin >> exponent;
    
    cout << base << "^" << exponent << " = " << pow(base, exponent) << endl;
    return 0;
}
```

### Exercise 5: Swap Two Numbers
```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Enter two numbers: ";
    cin >> a >> b;
    
    cout << "Before: a = " << a << ", b = " << b << endl;
    
    // Method 1: Using temp variable
    int temp = a;
    a = b;
    b = temp;
    
    // Method 2: Without temp (arithmetic)
    // a = a + b;
    // b = a - b;
    // a = a - b;
    
    // Method 3: XOR swap
    // a = a ^ b;
    // b = a ^ b;
    // a = a ^ b;
    
    cout << "After: a = " << a << ", b = " << b << endl;
    return 0;
}
```

### Exercise 6: Area of Rectangle
```cpp
#include <iostream>
using namespace std;

int main() {
    double length, width, area;
    
    cout << "Enter length: ";
    cin >> length;
    cout << "Enter width: ";
    cin >> width;
    
    area = length * width;
    
    cout << "Area of Rectangle = " << area << endl;
    return 0;
}
```

### Exercise 7: Add Binary Numbers
```cpp
#include <iostream>
#include <string>
using namespace std;

string addBinary(string a, string b) {
    string result = "";
    int carry = 0;
    int i = a.length() - 1;
    int j = b.length() - 1;
    
    while (i >= 0 || j >= 0 || carry) {
        int sum = carry;
        if (i >= 0) sum += a[i--] - '0';
        if (j >= 0) sum += b[j--] - '0';
        
        result = char(sum % 2 + '0') + result;
        carry = sum / 2;
    }
    return result;
}

int main() {
    string bin1, bin2;
    cout << "Enter first binary number: ";
    cin >> bin1;
    cout << "Enter second binary number: ";
    cin >> bin2;
    
    cout << "Sum = " << addBinary(bin1, bin2) << endl;
    return 0;
}
// Example: 1010 + 1011 = 10101
```

### Exercise 8: Add Characters (Character Arithmetic)
```cpp
#include <iostream>
using namespace std;

int main() {
    char ch1, ch2;
    
    cout << "Enter first character: ";
    cin >> ch1;
    cout << "Enter second character: ";
    cin >> ch2;
    
    // Characters are stored as ASCII values
    int sum = ch1 + ch2;
    
    cout << "ASCII of '" << ch1 << "' = " << (int)ch1 << endl;
    cout << "ASCII of '" << ch2 << "' = " << (int)ch2 << endl;
    cout << "Sum of ASCII values = " << sum << endl;
    cout << "Sum as character = " << (char)sum << endl;
    
    // Character arithmetic examples
    cout << "\n--- Character Arithmetic ---" << endl;
    cout << "'A' + 1 = " << (char)('A' + 1) << " (B)" << endl;
    cout << "'a' - 'A' = " << ('a' - 'A') << " (difference: 32)" << endl;
    cout << "'5' - '0' = " << ('5' - '0') << " (converts char to int)" << endl;
    
    return 0;
}
```

---

## 🎯 Key Points to Remember

> **CCEE Important**:
> - C++ was developed by **Bjarne Stroustrup** in 1979
> - First standardized in **1998** (C++98)
> - `int main()` is the **entry point**
> - `cout` for output, `cin` for input
> - `<<` is insertion operator, `>>` is extraction operator
> - Default return type of `main()` is `int`
> - C++ supports both **procedural** and **OOP** paradigms
