---
layout: default
title: "Sessions 2-3: C++ Basics"
parent: Module 7 - C++
nav_order: 2
---

# Sessions 2 & 3: Beginning with C++

## 🎯 Learning Objectives
- Understand C++ program structure and tokens
- Master all C++ operators
- Work with static and constant members
- Learn C++17 features

---

## 1. C++ Tokens

Tokens are the smallest individual units in a program.

| Token Type | Examples |
|------------|----------|
| **Keywords** | `int`, `class`, `return`, `if`, `while` |
| **Identifiers** | `myVar`, `calculateSum`, `Student` |
| **Literals** | `42`, `3.14`, `'A'`, `"Hello"` |
| **Operators** | `+`, `-`, `*`, `/`, `==`, `&&` |
| **Punctuators** | `;`, `,`, `{`, `}`, `(`, `)` |

### Keywords (C++17 has 84 keywords)
```cpp
// Common keywords
auto     break    case     char     const
continue default  do       double   else
enum     extern   float    for      goto
if       int      long     register return
short    signed   sizeof   static   struct
switch   typedef  union    unsigned void
volatile while

// C++ specific
bool     catch    class    const_cast  delete
dynamic_cast explicit export  false   friend
inline   mutable  namespace new     operator
private  protected public  reinterpret_cast
static_cast template this   throw   true
try      typeid   typename using   virtual
wchar_t
```

### Identifier Rules
```cpp
// Valid identifiers
int myVariable;      // ✅
int _private;        // ✅
int camelCase123;    // ✅

// Invalid identifiers
int 123abc;          // ❌ Cannot start with digit
int my-var;          // ❌ No hyphens
int class;           // ❌ Reserved keyword
```

---

## 2. Data Types

### Primitive Data Types

| Type | Size | Range |
|------|------|-------|
| `bool` | 1 byte | true/false |
| `char` | 1 byte | -128 to 127 |
| `short` | 2 bytes | -32,768 to 32,767 |
| `int` | 4 bytes | -2.1B to 2.1B |
| `long` | 4/8 bytes | Platform dependent |
| `long long` | 8 bytes | Very large numbers |
| `float` | 4 bytes | 6-7 decimal digits |
| `double` | 8 bytes | 15-16 decimal digits |

### C++11 Fixed-Width Types
```cpp
#include <cstdint>

int8_t   a;  // Exactly 8 bits
int16_t  b;  // Exactly 16 bits
int32_t  c;  // Exactly 32 bits
int64_t  d;  // Exactly 64 bits
uint32_t e;  // Unsigned 32 bits
```

---

## 3. Variable Initialization

### Different Ways to Initialize
```cpp
// 1. C-style initialization
int a = 10;

// 2. Constructor initialization
int b(20);

// 3. Uniform initialization (C++11) - RECOMMENDED
int c{30};
int d = {40};

// 4. Auto type deduction (C++11)
auto x = 100;      // int
auto y = 3.14;     // double
auto z = "hello";  // const char*
```

### Why Uniform Initialization?
```cpp
int x = 3.14;   // Compiles! Silently truncates to 3
int y{3.14};    // ERROR! Narrowing conversion not allowed
```

---

## 4. Constants

### const Keyword
```cpp
const int MAX_SIZE = 100;  // Cannot be modified
const double PI = 3.14159;

// Pointer to const
const int* ptr = &x;  // Cannot modify value through ptr
*ptr = 10;            // ERROR!

// Const pointer
int* const ptr2 = &x; // Pointer itself cannot change
ptr2 = &y;            // ERROR!

// Const pointer to const
const int* const ptr3 = &x;  // Neither can change
```

### constexpr (C++11)
```cpp
// Compile-time constant
constexpr int square(int n) {
    return n * n;
}

constexpr int result = square(5);  // Computed at compile time
int arr[square(3)];                // Array of size 9
```

---

## 5. Static Members

### Static Variables
```cpp
void counter() {
    static int count = 0;  // Initialized only once
    count++;
    cout << "Count: " << count << endl;
}

int main() {
    counter();  // Count: 1
    counter();  // Count: 2
    counter();  // Count: 3
}
```

### Static Class Members
```cpp
class Student {
public:
    static int totalStudents;  // Shared by all objects
    string name;
    
    Student(string n) : name(n) {
        totalStudents++;
    }
    
    static void showTotal() {  // Static member function
        cout << "Total: " << totalStudents << endl;
    }
};

// Must define outside class
int Student::totalStudents = 0;

int main() {
    Student s1("Alice");
    Student s2("Bob");
    Student::showTotal();  // Total: 2
}
```

> **Key Point**: Static members belong to the class, not to objects. Access via `ClassName::member`.

---

## 6. Operators in C++

### Arithmetic Operators
```cpp
int a = 10, b = 3;

cout << a + b;   // 13 (Addition)
cout << a - b;   // 7  (Subtraction)
cout << a * b;   // 30 (Multiplication)
cout << a / b;   // 3  (Integer Division)
cout << a % b;   // 1  (Modulus/Remainder)
```

### Relational Operators
```cpp
int a = 10, b = 20;

cout << (a == b);  // 0 (false) - Equal to
cout << (a != b);  // 1 (true)  - Not equal
cout << (a > b);   // 0 (false) - Greater than
cout << (a < b);   // 1 (true)  - Less than
cout << (a >= b);  // 0 (false) - Greater or equal
cout << (a <= b);  // 1 (true)  - Less or equal
```

### Logical Operators
```cpp
bool x = true, y = false;

cout << (x && y);  // 0 (AND - both must be true)
cout << (x || y);  // 1 (OR - at least one true)
cout << (!x);      // 0 (NOT - inverts value)
```

### Unary Operators
```cpp
int a = 5;

cout << ++a;  // 6 (Pre-increment: increment first, then use)
cout << a++;  // 6 (Post-increment: use first, then increment)
cout << a;    // 7

cout << --a;  // 6 (Pre-decrement)
cout << a--;  // 6 (Post-decrement)
cout << a;    // 5

cout << -a;   // -5 (Unary minus)
cout << +a;   // 5  (Unary plus)
```

### Ternary Operator
```cpp
int a = 10, b = 20;
int max = (a > b) ? a : b;  // If true, return a; else return b
cout << max;  // 20

// Equivalent to:
// if (a > b) max = a;
// else max = b;
```

### Assignment Operators
```cpp
int a = 10;

a += 5;   // a = a + 5;  → 15
a -= 3;   // a = a - 3;  → 12
a *= 2;   // a = a * 2;  → 24
a /= 4;   // a = a / 4;  → 6
a %= 4;   // a = a % 4;  → 2
```

### Bitwise Operators
```cpp
int a = 5;   // 0101 in binary
int b = 3;   // 0011 in binary

cout << (a & b);   // 1   (AND: 0001)
cout << (a | b);   // 7   (OR:  0111)
cout << (a ^ b);   // 6   (XOR: 0110)
cout << (~a);      // -6  (NOT: inverts all bits)
cout << (a << 1);  // 10  (Left shift: 1010)
cout << (a >> 1);  // 2   (Right shift: 0010)
```

---

## 7. Operator Precedence

| Priority | Operators | Associativity |
|----------|-----------|---------------|
| 1 (Highest) | `()` `[]` `->` `.` | Left to Right |
| 2 | `++` `--` `!` `~` `*` `&` `sizeof` | Right to Left |
| 3 | `*` `/` `%` | Left to Right |
| 4 | `+` `-` | Left to Right |
| 5 | `<<` `>>` | Left to Right |
| 6 | `<` `<=` `>` `>=` | Left to Right |
| 7 | `==` `!=` | Left to Right |
| 8 | `&` (Bitwise AND) | Left to Right |
| 9 | `^` (Bitwise XOR) | Left to Right |
| 10 | `\|` (Bitwise OR) | Left to Right |
| 11 | `&&` (Logical AND) | Left to Right |
| 12 | `\|\|` (Logical OR) | Left to Right |
| 13 | `?:` (Ternary) | Right to Left |
| 14 | `=` `+=` `-=` etc. | Right to Left |
| 15 (Lowest) | `,` | Left to Right |

---

## 8. C++17 Features

### Structured Bindings
```cpp
#include <tuple>

auto getTuple() {
    return make_tuple(1, "hello", 3.14);
}

int main() {
    auto [x, y, z] = getTuple();  // C++17
    cout << x << " " << y << " " << z;
}
```

### if with Initializer
```cpp
// C++17: Initialize variable inside if
if (int x = getValue(); x > 10) {
    cout << "x is greater than 10";
}
// x is not visible here
```

### Inline Variables
```cpp
// Can define static inline in header
class Config {
public:
    static inline int maxSize = 100;  // C++17
};
```

---

## 9. Expressions

An expression is a combination of operators and operands that produces a value.

```cpp
// Simple expressions
5 + 3           // Arithmetic expression → 8
x > y           // Relational expression → bool
a && b          // Logical expression → bool

// Complex expressions
(a + b) * (c - d)
x = y = z = 10  // Chained assignment
++i * 2 + j--
```

---

## 📝 Lab Exercises

### Exercise 1: Student Class
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

class Student {
public:
    int rollNo;
    string name;
    int day, month, year;  // DOB
    int marks;
    
    void input() {
        cout << "Enter Roll No: "; cin >> rollNo;
        cout << "Enter Name: "; cin >> name;
        cout << "Enter DOB (dd mm yyyy): ";
        cin >> day >> month >> year;
        cout << "Enter Total Marks: "; cin >> marks;
    }
    
    void display() {
        cout << rollNo << "\t" << name << "\t"
             << day << "/" << month << "/" << year << "\t"
             << marks << endl;
    }
};

bool compareByRoll(Student a, Student b) {
    return a.rollNo < b.rollNo;
}

bool compareByMarks(Student a, Student b) {
    return a.marks > b.marks;
}

int main() {
    Student students[10];
    
    for (int i = 0; i < 10; i++) {
        cout << "\n--- Student " << i+1 << " ---\n";
        students[i].input();
    }
    
    // Sort by roll number
    sort(students, students + 10, compareByRoll);
    cout << "\n=== Sorted by Roll No ===\n";
    for (int i = 0; i < 10; i++) students[i].display();
    
    // Sort by marks
    sort(students, students + 10, compareByMarks);
    cout << "\n=== Sorted by Marks ===\n";
    for (int i = 0; i < 10; i++) students[i].display();
    
    return 0;
}
```

### Exercise 2: Implement All Operators
```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    
    // Arithmetic
    cout << "=== Arithmetic ===" << endl;
    cout << "a + b = " << a + b << endl;
    cout << "a - b = " << a - b << endl;
    cout << "a * b = " << a * b << endl;
    cout << "a / b = " << a / b << endl;
    cout << "a % b = " << a % b << endl;
    
    // Relational
    cout << "\n=== Relational ===" << endl;
    cout << "a == b: " << (a == b) << endl;
    cout << "a != b: " << (a != b) << endl;
    cout << "a > b: " << (a > b) << endl;
    cout << "a < b: " << (a < b) << endl;
    
    // Logical
    cout << "\n=== Logical ===" << endl;
    bool x = true, y = false;
    cout << "x && y: " << (x && y) << endl;
    cout << "x || y: " << (x || y) << endl;
    cout << "!x: " << (!x) << endl;
    
    // Bitwise
    cout << "\n=== Bitwise ===" << endl;
    cout << "a & b: " << (a & b) << endl;
    cout << "a | b: " << (a | b) << endl;
    cout << "a ^ b: " << (a ^ b) << endl;
    cout << "~a: " << (~a) << endl;
    cout << "a << 1: " << (a << 1) << endl;
    cout << "a >> 1: " << (a >> 1) << endl;
    
    // Ternary
    cout << "\n=== Ternary ===" << endl;
    int max = (a > b) ? a : b;
    cout << "Max of a,b: " << max << endl;
    
    return 0;
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - C++ has **84 keywords** (as of C++17)
> - `auto` deduces type automatically (C++11)
> - `const` = runtime constant, `constexpr` = compile-time constant
> - Static variables retain value between function calls
> - Static class members are shared by all objects
> - `++a` returns incremented value, `a++` returns original value
> - Ternary operator: `condition ? ifTrue : ifFalse`
> - Operator precedence: `*, /, %` before `+, -`
> - `&&` has higher precedence than `||`
> - Uniform initialization `{}` prevents narrowing conversions
