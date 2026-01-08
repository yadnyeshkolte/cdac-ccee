---
layout: default
title: "Session 4: Control Structures"
parent: Module 7 - C++
nav_order: 3
---

# Session 4: Conditional and Looping Statements

## 🎯 Learning Objectives
- Master all conditional statements
- Understand all loop types
- Work with arrays (1D and 2D)
- Handle command line arguments

---

## 1. Conditional Statements

### if Statement
```cpp
int age = 18;

if (age >= 18) {
    cout << "You can vote!" << endl;
}
```

### if-else Statement
```cpp
int num = 10;

if (num % 2 == 0) {
    cout << "Even number" << endl;
} else {
    cout << "Odd number" << endl;
}
```

### if-else if-else Ladder
```cpp
int marks = 85;

if (marks >= 90) {
    cout << "Grade: A+" << endl;
} else if (marks >= 80) {
    cout << "Grade: A" << endl;
} else if (marks >= 70) {
    cout << "Grade: B" << endl;
} else if (marks >= 60) {
    cout << "Grade: C" << endl;
} else {
    cout << "Grade: F" << endl;
}
```

### Nested if
```cpp
int a = 10, b = 20, c = 15;

if (a > b) {
    if (a > c) {
        cout << "a is largest" << endl;
    } else {
        cout << "c is largest" << endl;
    }
} else {
    if (b > c) {
        cout << "b is largest" << endl;
    } else {
        cout << "c is largest" << endl;
    }
}
```

---

## 2. Switch Statement

```cpp
int day = 3;

switch (day) {
    case 1:
        cout << "Monday" << endl;
        break;
    case 2:
        cout << "Tuesday" << endl;
        break;
    case 3:
        cout << "Wednesday" << endl;
        break;
    case 4:
        cout << "Thursday" << endl;
        break;
    case 5:
        cout << "Friday" << endl;
        break;
    case 6:
        cout << "Saturday" << endl;
        break;
    case 7:
        cout << "Sunday" << endl;
        break;
    default:
        cout << "Invalid day" << endl;
}
```

### Switch Rules
- Expression must be `int`, `char`, or `enum`
- `case` values must be constant expressions
- `break` prevents fall-through
- `default` is optional but recommended

### Fall-Through Example
```cpp
char grade = 'B';

switch (grade) {
    case 'A':
    case 'B':
    case 'C':
        cout << "Passed!" << endl;
        break;
    case 'F':
        cout << "Failed!" << endl;
        break;
}
```

---

## 3. Loops

### for Loop
```cpp
// Basic for loop
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
// Output: 1 2 3 4 5

// Reverse loop
for (int i = 5; i >= 1; i--) {
    cout << i << " ";
}
// Output: 5 4 3 2 1

// Step of 2
for (int i = 0; i <= 10; i += 2) {
    cout << i << " ";
}
// Output: 0 2 4 6 8 10
```

### while Loop
```cpp
int i = 1;

while (i <= 5) {
    cout << i << " ";
    i++;
}
// Output: 1 2 3 4 5

// Condition checked BEFORE body execution
// May execute 0 times if condition is false initially
```

### do-while Loop
```cpp
int i = 1;

do {
    cout << i << " ";
    i++;
} while (i <= 5);
// Output: 1 2 3 4 5

// Condition checked AFTER body execution
// Always executes AT LEAST ONCE
```

### Infinite Loops
```cpp
// Method 1
for (;;) {
    // runs forever
}

// Method 2
while (true) {
    // runs forever
}

// Method 3
do {
    // runs forever
} while (1);
```

### Range-based for Loop (C++11)
```cpp
int arr[] = {10, 20, 30, 40, 50};

for (int x : arr) {
    cout << x << " ";
}
// Output: 10 20 30 40 50

// With reference (to modify)
for (int& x : arr) {
    x *= 2;  // Doubles each element
}
```

---

## 4. Jump Statements

### break Statement
```cpp
// Exit loop entirely
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    cout << i << " ";
}
// Output: 1 2 3 4
```

### continue Statement
```cpp
// Skip current iteration
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
// Output: 1 2 4 5
```

### return Statement
```cpp
int findNumber(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;  // Exit function immediately
        }
    }
    return -1;  // Not found
}
```

### goto Statement (Avoid!)
```cpp
int i = 1;

start:  // Label
    cout << i << " ";
    i++;
    if (i <= 5) goto start;

// Note: goto is considered bad practice
// Use loops instead
```

---

## 5. Arrays

### 1D Array Declaration
```cpp
// Method 1: Size declaration
int arr[5];  // Uninitialized, contains garbage

// Method 2: With initialization
int arr2[5] = {10, 20, 30, 40, 50};

// Method 3: Partial initialization (rest = 0)
int arr3[5] = {10, 20};  // {10, 20, 0, 0, 0}

// Method 4: Size from initializer
int arr4[] = {10, 20, 30};  // Size = 3

// Method 5: All zeros
int arr5[5] = {0};
int arr6[5] = {};  // C++11
```

### Accessing Array Elements
```cpp
int arr[5] = {10, 20, 30, 40, 50};

cout << arr[0];  // 10 (first element)
cout << arr[4];  // 50 (last element)
arr[2] = 100;    // Modify element

// Array traversal
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
```

### Array Size
```cpp
int arr[] = {10, 20, 30, 40, 50};

// Method 1
int size = sizeof(arr) / sizeof(arr[0]);

// Method 2 (C++17)
#include <iterator>
int size2 = size(arr);

// Method 3 (C++11)
#include <array>
array<int, 5> arr2 = {10, 20, 30, 40, 50};
int size3 = arr2.size();
```

### 2D Array
```cpp
// Declaration
int matrix[3][4];  // 3 rows, 4 columns

// With initialization
int matrix2[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

// Access
cout << matrix2[0][0];  // 1 (first row, first col)
cout << matrix2[1][2];  // 6 (second row, third col)

// Traversal
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        cout << matrix2[i][j] << " ";
    }
    cout << endl;
}
```

### Matrix Operations
{% raw %}
```cpp
// Matrix Addition
int A[2][2] = {{1, 2}, {3, 4}};
int B[2][2] = {{5, 6}, {7, 8}};
int C[2][2];

for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        C[i][j] = A[i][j] + B[i][j];
    }
}

// Matrix Transpose
int original[2][3] = {{1, 2, 3}, {4, 5, 6}};
int transpose[3][2];

for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        transpose[j][i] = original[i][j];
    }
}
```
{% endraw %}

---

## 6. Command Line Arguments

```cpp
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    // argc = argument count (number of arguments)
    // argv = argument vector (array of C-strings)
    
    cout << "Number of arguments: " << argc << endl;
    
    for (int i = 0; i < argc; i++) {
        cout << "argv[" << i << "] = " << argv[i] << endl;
    }
    
    return 0;
}

// Run: ./program hello world 123
// Output:
// Number of arguments: 4
// argv[0] = ./program
// argv[1] = hello
// argv[2] = world
// argv[3] = 123
```

### Converting Arguments
```cpp
#include <iostream>
#include <cstdlib>  // For atoi, atof
using namespace std;

int main(int argc, char* argv[]) {
    if (argc >= 3) {
        int a = atoi(argv[1]);    // String to int
        int b = atoi(argv[2]);
        double d = atof(argv[1]); // String to double
        
        cout << "Sum: " << a + b << endl;
    }
    return 0;
}

// Run: ./program 10 20
// Output: Sum: 30
```

---

## 📝 Lab Exercises

### Exercise 1: Pattern Printing
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5;
    
    // Right-angled triangle
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    
    // Output:
    // *
    // * *
    // * * *
    // * * * *
    // * * * * *
    
    return 0;
}
```

### Exercise 2: Find Max/Min in Array
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {23, 45, 12, 67, 34, 89, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    int maxVal = arr[0];
    int minVal = arr[0];
    
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }
    
    cout << "Maximum: " << maxVal << endl;
    cout << "Minimum: " << minVal << endl;
    
    return 0;
}
```

### Exercise 3: Command Line Calculator
```cpp
#include <iostream>
#include <cstdlib>
using namespace std;

int main(int argc, char* argv[]) {
    if (argc != 4) {
        cout << "Usage: calc <num1> <operator> <num2>" << endl;
        return 1;
    }
    
    double num1 = atof(argv[1]);
    char op = argv[2][0];
    double num2 = atof(argv[3]);
    double result;
    
    switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': 
            if (num2 == 0) {
                cout << "Error: Division by zero!" << endl;
                return 1;
            }
            result = num1 / num2; 
            break;
        default:
            cout << "Invalid operator!" << endl;
            return 1;
    }
    
    cout << "Result: " << result << endl;
    return 0;
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - `switch` works with `int`, `char`, `enum` only (not `float`, `string`)
> - `break` exits the loop, `continue` skips to next iteration
> - `do-while` always executes at least once
> - Array indices start from **0**
> - `sizeof(arr)/sizeof(arr[0])` gives array size
> - 2D array: `arr[row][column]`
> - `argc` includes program name, so minimum value is 1
> - `argv[0]` is always the program name
> - Range-based for loop: `for (int x : arr)`
> - Default case in switch handles unmatched values
