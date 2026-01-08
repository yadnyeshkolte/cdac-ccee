---
layout: default
title: "Session 11: Polymorphism"
parent: Module 7 - C++
nav_order: 9
---

# Session 11: Polymorphism

## 🎯 Learning Objectives
- Understand compile-time and runtime polymorphism
- Master function and operator overloading
- Use friend functions with operators
- Implement const member functions

---

## 1. Types of Polymorphism

| Type | Also Called | Binding Time | Examples |
|------|-------------|--------------|----------|
| **Compile-time** | Static / Early Binding | Compilation | Function overloading, Operator overloading |
| **Runtime** | Dynamic / Late Binding | Execution | Virtual functions |

---

## 2. Function Overloading (Compile-time)

Same function name, different parameters.

```cpp
class Calculator {
public:
    // Different number of parameters
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // Different parameter types
    double add(double a, double b) {
        return a + b;
    }
    
    // Different parameter order
    string add(string a, int n) {
        string result = "";
        for (int i = 0; i < n; i++) result += a;
        return result;
    }
    
    string add(int n, string a) {
        return add(a, n);  // Delegate
    }
};

int main() {
    Calculator calc;
    cout << calc.add(5, 3) << endl;           // 8
    cout << calc.add(1, 2, 3) << endl;        // 6
    cout << calc.add(2.5, 3.7) << endl;       // 6.2
    cout << calc.add("Hi", 3) << endl;        // HiHiHi
}
```

### Function Overloading Rules
✅ Different number of parameters
✅ Different types of parameters
✅ Different order of parameters
❌ Different return type only (NOT allowed)
❌ Default arguments causing ambiguity

---

## 3. Operator Overloading

Redefine operators for user-defined types.

### Overloadable Operators
```
+  -  *  /  %  ^  &  |  ~  !  =  <  >
+=  -=  *=  /=  %=  ^=  &=  |=
<<  >>  >>=  <<=  ==  !=  <=  >=
&&  ||  ++  --  ,  ->*  ->  ()  []
new  delete  new[]  delete[]
```

### Non-Overloadable Operators
```
.       (member access)
.*      (pointer-to-member)
::      (scope resolution)
?:      (ternary)
sizeof  (size of)
typeid  (type identification)
```

### Syntax for Operator Overloading

```cpp
// Member function
ReturnType operator symbol (parameters) {
    // Implementation
}

// Friend function
friend ReturnType operator symbol (parameters) {
    // Implementation
}
```

---

## 4. Overloading Arithmetic Operators

```cpp
class Complex {
    double real, imag;
    
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    
    // + operator as member function
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    // - operator as member function
    Complex operator-(const Complex& other) const {
        return Complex(real - other.real, imag - other.imag);
    }
    
    // * operator
    Complex operator*(const Complex& other) const {
        return Complex(
            real * other.real - imag * other.imag,
            real * other.imag + imag * other.real
        );
    }
    
    void display() const {
        cout << real << (imag >= 0 ? "+" : "") << imag << "i" << endl;
    }
};

int main() {
    Complex c1(3, 4);
    Complex c2(1, 2);
    
    Complex sum = c1 + c2;    // (4+6i)
    Complex diff = c1 - c2;   // (2+2i)
    Complex prod = c1 * c2;   // (-5+10i)
    
    sum.display();
    diff.display();
    prod.display();
}
```

---

## 5. Overloading Comparison Operators

```cpp
class Date {
    int day, month, year;
    
public:
    Date(int d, int m, int y) : day(d), month(m), year(y) {}
    
    bool operator==(const Date& other) const {
        return day == other.day && 
               month == other.month && 
               year == other.year;
    }
    
    bool operator!=(const Date& other) const {
        return !(*this == other);
    }
    
    bool operator<(const Date& other) const {
        if (year != other.year) return year < other.year;
        if (month != other.month) return month < other.month;
        return day < other.day;
    }
    
    bool operator>(const Date& other) const {
        return other < *this;
    }
    
    bool operator<=(const Date& other) const {
        return !(other < *this);
    }
    
    bool operator>=(const Date& other) const {
        return !(*this < other);
    }
};
```

---

## 6. Overloading Increment/Decrement

```cpp
class Counter {
    int value;
    
public:
    Counter(int v = 0) : value(v) {}
    
    // Pre-increment: ++obj
    Counter& operator++() {
        value++;
        return *this;
    }
    
    // Post-increment: obj++
    Counter operator++(int) {  // int is dummy parameter
        Counter temp = *this;
        value++;
        return temp;  // Return old value
    }
    
    // Pre-decrement: --obj
    Counter& operator--() {
        value--;
        return *this;
    }
    
    // Post-decrement: obj--
    Counter operator--(int) {
        Counter temp = *this;
        value--;
        return temp;
    }
    
    int getValue() const { return value; }
};

int main() {
    Counter c(5);
    
    cout << (++c).getValue() << endl;  // 6 (increment, then use)
    cout << (c++).getValue() << endl;  // 6 (use, then increment)
    cout << c.getValue() << endl;       // 7
}
```

---

## 7. Overloading Assignment Operator

```cpp
class String {
    char* data;
    int length;
    
public:
    String(const char* str = "") {
        length = strlen(str);
        data = new char[length + 1];
        strcpy(data, str);
    }
    
    // Copy assignment operator
    String& operator=(const String& other) {
        if (this != &other) {  // Self-assignment check
            delete[] data;     // Free old memory
            
            length = other.length;
            data = new char[length + 1];
            strcpy(data, other.data);
        }
        return *this;
    }
    
    ~String() { delete[] data; }
    
    void print() const { cout << data << endl; }
};
```

---

## 8. Overloading << and >> with Friend

```cpp
class Point {
    int x, y;
    
public:
    Point(int a = 0, int b = 0) : x(a), y(b) {}
    
    // Friend for output (<<)
    friend ostream& operator<<(ostream& out, const Point& p) {
        out << "(" << p.x << ", " << p.y << ")";
        return out;
    }
    
    // Friend for input (>>)
    friend istream& operator>>(istream& in, Point& p) {
        cout << "Enter x y: ";
        in >> p.x >> p.y;
        return in;
    }
};

int main() {
    Point p1(3, 4);
    cout << "Point: " << p1 << endl;  // Point: (3, 4)
    
    Point p2;
    cin >> p2;  // Enter x y: 5 6
    cout << "Point: " << p2 << endl;  // Point: (5, 6)
}
```

---

## 9. Overloading Subscript Operator []

```cpp
class Array {
    int* arr;
    int size;
    
public:
    Array(int s) : size(s) {
        arr = new int[size]();  // Zero-initialize
    }
    
    // Non-const version (for modification)
    int& operator[](int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of bounds");
        }
        return arr[index];
    }
    
    // Const version (for read-only access)
    const int& operator[](int index) const {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of bounds");
        }
        return arr[index];
    }
    
    int getSize() const { return size; }
    
    ~Array() { delete[] arr; }
};

int main() {
    Array arr(5);
    
    arr[0] = 10;  // Uses non-const []
    arr[1] = 20;
    arr[2] = 30;
    
    for (int i = 0; i < arr.getSize(); i++) {
        cout << arr[i] << " ";  // Uses const [] for reading
    }
}
```

---

## 10. Friend Functions

```cpp
class Box {
    double length, width, height;
    
public:
    Box(double l, double w, double h) 
        : length(l), width(w), height(h) {}
    
    // Friend function declaration
    friend double calculateVolume(const Box& b);
    
    // Friend class declaration
    friend class BoxFactory;
};

// Friend function definition (outside class)
double calculateVolume(const Box& b) {
    return b.length * b.width * b.height;  // Can access private!
}

class BoxFactory {
public:
    Box createCube(double side) {
        return Box(side, side, side);
    }
    
    void resize(Box& b, double factor) {
        b.length *= factor;  // Can access private!
        b.width *= factor;
        b.height *= factor;
    }
};
```

---

## 11. Const Member Functions

Cannot modify object state.

```cpp
class Circle {
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    // Const member function - cannot modify members
    double getArea() const {
        // radius = 10;  // ERROR! Cannot modify
        return 3.14159 * radius * radius;
    }
    
    // Non-const version - can modify
    void setRadius(double r) {
        radius = r;  // OK
    }
    
    // Const version for const objects
    double getRadius() const { return radius; }
};

int main() {
    const Circle c(5);  // Const object
    
    cout << c.getArea() << endl;    // OK - const function
    cout << c.getRadius() << endl;  // OK - const function
    // c.setRadius(10);  // ERROR! Cannot call non-const on const object
}
```

---

## 📝 Lab Exercise: Date and Time Classes

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

class Time {
    int hours, minutes, seconds;
    
public:
    Time(int h = 0, int m = 0, int s = 0) 
        : hours(h), minutes(m), seconds(s) {
        normalize();
    }
    
    void normalize() {
        minutes += seconds / 60;
        seconds %= 60;
        hours += minutes / 60;
        minutes %= 60;
        hours %= 24;
    }
    
    Time operator+(const Time& t) const {
        return Time(hours + t.hours, minutes + t.minutes, seconds + t.seconds);
    }
    
    Time operator-(const Time& t) const {
        int s1 = hours * 3600 + minutes * 60 + seconds;
        int s2 = t.hours * 3600 + t.minutes * 60 + t.seconds;
        int diff = abs(s1 - s2);
        return Time(diff / 3600, (diff % 3600) / 60, diff % 60);
    }
    
    friend ostream& operator<<(ostream& out, const Time& t) {
        out << setfill('0') << setw(2) << t.hours << ":"
            << setw(2) << t.minutes << ":"
            << setw(2) << t.seconds;
        return out;
    }
    
    friend istream& operator>>(istream& in, Time& t) {
        char c;
        in >> t.hours >> c >> t.minutes >> c >> t.seconds;
        t.normalize();
        return in;
    }
};

int main() {
    Time t1(10, 30, 45);
    Time t2(5, 45, 30);
    
    cout << "Time 1: " << t1 << endl;
    cout << "Time 2: " << t2 << endl;
    cout << "Sum: " << (t1 + t2) << endl;
    cout << "Diff: " << (t1 - t2) << endl;
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - **Compile-time**: Function overloading, Operator overloading
> - **Runtime**: Virtual functions
> - Cannot overload: `.` `.*` `::` `?:` `sizeof` `typeid`
> - **Pre-increment** `++obj` returns reference, **Post-increment** `obj++` returns copy
> - Post-increment has **dummy `int` parameter**
> - `friend` functions can access private members
> - `<<` and `>>` operators must be overloaded as **friend functions**
> - `const` member functions: `returnType func() const`
> - `const` objects can only call `const` member functions
> - Operator overloading doesn't change precedence or associativity
