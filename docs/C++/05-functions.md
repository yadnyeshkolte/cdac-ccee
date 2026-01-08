---
layout: default
title: "Session 5: Functions"
parent: Module 7 - C++
nav_order: 4
---

# Session 5: Functions in C++

## 🎯 Learning Objectives
- Understand function declaration and definition
- Master call by value vs call by reference
- Implement inline functions
- Use math library functions

---

## 1. Function Basics

### Function Declaration (Prototype)
```cpp
// Tells compiler about function signature
returnType functionName(parameterTypes);

// Examples
int add(int, int);           // Just types
int add(int a, int b);       // With parameter names
void greet();                // No parameters
double calculateArea(double);
```

### Function Definition
```cpp
int add(int a, int b) {
    return a + b;
}

void greet() {
    cout << "Hello!" << endl;
}

double calculateArea(double radius) {
    return 3.14159 * radius * radius;
}
```

### Function Call
```cpp
int main() {
    int sum = add(5, 3);          // sum = 8
    greet();                       // Prints "Hello!"
    double area = calculateArea(5.0);
    
    return 0;
}
```

---

## 2. Types of Functions

### No Return, No Parameters
```cpp
void displayMenu() {
    cout << "1. Add" << endl;
    cout << "2. Delete" << endl;
    cout << "3. Exit" << endl;
}
```

### No Return, With Parameters
```cpp
void printSum(int a, int b) {
    cout << "Sum = " << a + b << endl;
}
```

### With Return, No Parameters
```cpp
int getInput() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    return num;
}
```

### With Return, With Parameters
```cpp
int multiply(int a, int b) {
    return a * b;
}
```

---

## 3. Call by Value vs Call by Reference

### Call by Value (Default)
```cpp
void modifyValue(int x) {
    x = 100;  // Only local copy is modified
}

int main() {
    int num = 10;
    modifyValue(num);
    cout << num;  // Still 10! Original unchanged
    return 0;
}
```

### Call by Reference
```cpp
void modifyReference(int& x) {  // Note the &
    x = 100;  // Original variable is modified
}

int main() {
    int num = 10;
    modifyReference(num);
    cout << num;  // Now 100! Original changed
    return 0;
}
```

### Call by Pointer
```cpp
void modifyPointer(int* x) {
    *x = 100;  // Modify via pointer
}

int main() {
    int num = 10;
    modifyPointer(&num);  // Pass address
    cout << num;  // Now 100!
    return 0;
}
```

### Comparison Table

| Aspect | Call by Value | Call by Reference | Call by Pointer |
|--------|---------------|-------------------|-----------------|
| Syntax | `func(int x)` | `func(int& x)` | `func(int* x)` |
| Call | `func(a)` | `func(a)` | `func(&a)` |
| Original | Not modified | Modified | Modified |
| Memory | Copy created | No copy | Pointer copy |
| NULL possible | N/A | No | Yes |

---

## 4. Swap Using Different Methods

### Swap by Value (Won't Work!)
```cpp
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
// Original variables remain unchanged!
```

### Swap by Reference (Works!)
```cpp
void swapByRef(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    swapByRef(x, y);
    cout << x << " " << y;  // 20 10
}
```

### Swap by Pointer (Works!)
```cpp
void swapByPtr(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    swapByPtr(&x, &y);
    cout << x << " " << y;  // 20 10
}
```

---

## 5. Default Arguments

```cpp
// Default values must be rightmost
void greet(string name, string greeting = "Hello") {
    cout << greeting << ", " << name << "!" << endl;
}

int main() {
    greet("Alice");           // Hello, Alice!
    greet("Bob", "Hi");       // Hi, Bob!
    return 0;
}

// Multiple defaults
int volume(int length, int width = 1, int height = 1) {
    return length * width * height;
}

int main() {
    cout << volume(10);         // 10 (10*1*1)
    cout << volume(10, 5);      // 50 (10*5*1)
    cout << volume(10, 5, 2);   // 100 (10*5*2)
}
```

### Default Argument Rules
- Must be rightmost parameters
- Cannot skip middle defaults
- Specified in declaration OR definition (not both)

---

## 6. Function Overloading

Same function name, different parameters.

```cpp
// Overloaded add functions
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << add(5, 3);        // Calls int version → 8
    cout << add(5.5, 3.3);    // Calls double version → 8.8
    cout << add(1, 2, 3);     // Calls 3-param version → 6
}
```

### Overloading Resolution
Compiler selects based on:
1. Number of parameters
2. Type of parameters
3. Order of parameters

**Cannot Overload By:**
- Return type alone
- Default arguments that make signatures ambiguous

---

## 7. Inline Functions

Request to compiler to insert function body at call site.

```cpp
inline int square(int x) {
    return x * x;
}

int main() {
    int result = square(5);  // Compiler may replace with: 5 * 5
    cout << result;          // 25
}
```

### When to Use Inline
✅ Small functions (1-3 lines)
✅ Frequently called functions
✅ Getter/setter methods

### When NOT to Use
❌ Large functions
❌ Functions with loops
❌ Recursive functions
❌ Functions with static variables

### Inline vs Macro
```cpp
// Macro (preprocessor - text replacement)
#define SQUARE(x) ((x) * (x))

// Inline function (type-safe)
inline int square(int x) {
    return x * x;
}

int a = 5;
SQUARE(a++);     // BUG! Expands to: ((a++) * (a++))
square(a++);     // SAFE! a incremented once
```

---

## 8. Recursion

Function calling itself.

### Factorial
```cpp
int factorial(int n) {
    if (n <= 1) return 1;           // Base case
    return n * factorial(n - 1);     // Recursive case
}

// factorial(5) = 5 * factorial(4)
//              = 5 * 4 * factorial(3)
//              = 5 * 4 * 3 * factorial(2)
//              = 5 * 4 * 3 * 2 * factorial(1)
//              = 5 * 4 * 3 * 2 * 1
//              = 120
```

### Fibonacci
```cpp
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
```

### Sum of Digits
```cpp
int sumDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}

// sumDigits(123) = 3 + sumDigits(12)
//                = 3 + 2 + sumDigits(1)
//                = 3 + 2 + 1
//                = 6
```

---

## 9. Math Library Functions

```cpp
#include <cmath>

int main() {
    // Power and roots
    cout << pow(2, 3);      // 8 (2^3)
    cout << sqrt(16);       // 4 (square root)
    cout << cbrt(27);       // 3 (cube root)
    
    // Absolute value
    cout << abs(-5);        // 5 (integer)
    cout << fabs(-5.5);     // 5.5 (floating)
    
    // Rounding
    cout << ceil(4.2);      // 5 (round up)
    cout << floor(4.8);     // 4 (round down)
    cout << round(4.5);     // 5 (nearest integer)
    cout << trunc(4.9);     // 4 (truncate decimal)
    
    // Trigonometric (radians)
    cout << sin(0);         // 0
    cout << cos(0);         // 1
    cout << tan(0);         // 0
    
    // Logarithmic
    cout << log(2.718);     // ~1 (natural log)
    cout << log10(100);     // 2 (base 10)
    cout << log2(8);        // 3 (base 2)
    
    // Min/Max
    cout << fmax(5.5, 3.3); // 5.5
    cout << fmin(5.5, 3.3); // 3.3
    
    return 0;
}
```

---

## 📝 Lab Exercises

### Exercise 1: Calculator with Functions
```cpp
#include <iostream>
using namespace std;

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
double divide(int a, int b) {
    if (b == 0) {
        cout << "Error: Division by zero!" << endl;
        return 0;
    }
    return (double)a / b;
}

int main() {
    int a = 10, b = 3;
    
    cout << "Add: " << add(a, b) << endl;
    cout << "Subtract: " << subtract(a, b) << endl;
    cout << "Multiply: " << multiply(a, b) << endl;
    cout << "Divide: " << divide(a, b) << endl;
    
    return 0;
}
```

### Exercise 2: Reference Parameters
```cpp
#include <iostream>
using namespace std;

// Find min, max, and average using references
void analyze(int arr[], int n, int& min, int& max, double& avg) {
    min = max = arr[0];
    int sum = 0;
    
    for (int i = 0; i < n; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
        sum += arr[i];
    }
    
    avg = (double)sum / n;
}

int main() {
    int arr[] = {23, 45, 12, 67, 34, 89, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    int minVal, maxVal;
    double average;
    
    analyze(arr, n, minVal, maxVal, average);
    
    cout << "Min: " << minVal << endl;
    cout << "Max: " << maxVal << endl;
    cout << "Avg: " << average << endl;
    
    return 0;
}
```

### Exercise 3: Inline Functions
```cpp
#include <iostream>
using namespace std;

inline int square(int x) { return x * x; }
inline int cube(int x) { return x * x * x; }
inline bool isEven(int x) { return x % 2 == 0; }
inline int max(int a, int b) { return (a > b) ? a : b; }

int main() {
    cout << "Square of 5: " << square(5) << endl;
    cout << "Cube of 3: " << cube(3) << endl;
    cout << "Is 4 even? " << isEven(4) << endl;
    cout << "Max of 10, 20: " << max(10, 20) << endl;
    
    return 0;
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - Function prototype ends with `;`
> - Call by value creates a copy, original unchanged
> - Call by reference modifies original (`&` in parameter)
> - Default arguments must be rightmost
> - Function overloading: same name, different parameters
> - Cannot overload by return type alone
> - `inline` is a request, not a command
> - Recursion needs a base case to terminate
> - `#include <cmath>` for math functions
> - `pow(base, exp)`, `sqrt()`, `abs()`, `ceil()`, `floor()`
