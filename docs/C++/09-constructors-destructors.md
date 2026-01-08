---
layout: default
title: "Session 9: Constructors & Destructors"
parent: Module 7 - C++
nav_order: 7
---

# Session 9: Constructors and Destructors

## 🎯 Learning Objectives
- Understand different types of constructors
- Master copy constructors
- Implement destructors properly
- Learn about dynamic object initialization

---

## 1. What is a Constructor?

A constructor is a special member function that:
- Has the **same name** as the class
- Has **no return type** (not even void)
- Is called **automatically** when object is created
- Used for **initialization**

```cpp
class Student {
    string name;
    int age;
    
public:
    // Constructor
    Student() {
        name = "Unknown";
        age = 0;
        cout << "Constructor called!" << endl;
    }
};

int main() {
    Student s;  // Constructor called automatically!
}
```

---

## 2. Types of Constructors

### Default Constructor
```cpp
class Demo {
public:
    Demo() {  // No parameters
        cout << "Default constructor" << endl;
    }
};

Demo d;  // Calls default constructor
```

### Parameterized Constructor
```cpp
class Student {
    string name;
    int age;
    
public:
    Student(string n, int a) {  // With parameters
        name = n;
        age = a;
    }
    
    void display() {
        cout << name << ", " << age << endl;
    }
};

int main() {
    Student s1("Alice", 20);  // Implicit call
    Student s2 = Student("Bob", 22);  // Explicit call
}
```

### Constructor Overloading
```cpp
class Rectangle {
    int length, width;
    
public:
    // Default constructor
    Rectangle() {
        length = width = 1;
    }
    
    // Single parameter (square)
    Rectangle(int side) {
        length = width = side;
    }
    
    // Two parameters
    Rectangle(int l, int w) {
        length = l;
        width = w;
    }
    
    int area() { return length * width; }
};

int main() {
    Rectangle r1;         // 1x1
    Rectangle r2(5);      // 5x5
    Rectangle r3(4, 6);   // 4x6
    
    cout << r1.area() << endl;  // 1
    cout << r2.area() << endl;  // 25
    cout << r3.area() << endl;  // 24
}
```

---

## 3. Initialization Lists

More efficient way to initialize members.

```cpp
class Student {
    string name;
    int age;
    const int id;       // Must use init list
    int& ref;           // Must use init list
    
public:
    // Without initialization list
    Student(string n, int a, int i, int& r) {
        name = n;   // Assignment, not initialization
        age = a;
        // id = i;  // ERROR! const cannot be assigned
        // ref = r; // ERROR! ref must be initialized
    }
    
    // With initialization list (PREFERRED)
    Student(string n, int a, int i, int& r) 
        : name(n), age(a), id(i), ref(r) {
        // Body can be empty
    }
};
```

### When to Use Initialization List
- **Required**: const members, reference members, base class constructors
- **Recommended**: Always (more efficient for class types)

---

## 4. Copy Constructor

Called when an object is initialized from another object.

```cpp
class Student {
    string name;
    int* marks;
    
public:
    // Regular constructor
    Student(string n, int m) : name(n) {
        marks = new int(m);
    }
    
    // Copy constructor
    Student(const Student& other) {
        name = other.name;
        marks = new int(*other.marks);  // Deep copy
        cout << "Copy constructor called!" << endl;
    }
    
    void display() {
        cout << name << ": " << *marks << endl;
    }
    
    ~Student() { delete marks; }
};

int main() {
    Student s1("Alice", 90);
    
    // Copy constructor called in these cases:
    Student s2 = s1;         // Initialization
    Student s3(s1);          // Explicit copy
    
    s1.display();  // Alice: 90
    s2.display();  // Alice: 90 (independent copy)
}
```

### Shallow Copy vs Deep Copy

```cpp
// SHALLOW COPY (Default - DANGEROUS for pointers!)
class Shallow {
    int* data;
public:
    Shallow(int val) { data = new int(val); }
    
    // Default copy constructor (shallow)
    // Shallow(const Shallow& other) {
    //     data = other.data;  // Both point to same memory!
    // }
    
    ~Shallow() { delete data; }  // Double delete = CRASH!
};

// DEEP COPY (Safe)
class Deep {
    int* data;
public:
    Deep(int val) { data = new int(val); }
    
    Deep(const Deep& other) {
        data = new int(*other.data);  // New memory, copied value
    }
    
    ~Deep() { delete data; }  // Safe
};
```

---

## 5. When is Copy Constructor Called?

```cpp
class Test {
public:
    Test() { cout << "Constructor" << endl; }
    Test(const Test& t) { cout << "Copy Constructor" << endl; }
};

void func(Test t) { }      // Pass by value
Test returnTest() {
    Test t;
    return t;              // Return by value
}

int main() {
    Test t1;               // Constructor
    Test t2 = t1;          // Copy Constructor
    Test t3(t1);           // Copy Constructor
    func(t1);              // Copy Constructor
    Test t4 = returnTest(); // May be optimized (RVO)
}
```

---

## 6. Destructor

Called automatically when object goes out of scope or is deleted.

```cpp
class FileHandler {
    FILE* file;
    
public:
    FileHandler(const char* filename) {
        file = fopen(filename, "w");
        cout << "File opened" << endl;
    }
    
    ~FileHandler() {  // Destructor: ~ClassName()
        if (file) {
            fclose(file);
            cout << "File closed" << endl;
        }
    }
};

int main() {
    {
        FileHandler fh("test.txt");
        // Use file...
    }  // Destructor called here automatically!
    
    FileHandler* fh2 = new FileHandler("test2.txt");
    delete fh2;  // Destructor called on delete
}
```

### Destructor Rules
- Name: `~ClassName()`
- No return type, no parameters
- Only ONE destructor per class (cannot overload)
- Called in **reverse order** of construction

```cpp
class Demo {
    int id;
public:
    Demo(int i) : id(i) {
        cout << "Constructor: " << id << endl;
    }
    ~Demo() {
        cout << "Destructor: " << id << endl;
    }
};

int main() {
    Demo d1(1);
    Demo d2(2);
    Demo d3(3);
}
// Output:
// Constructor: 1
// Constructor: 2
// Constructor: 3
// Destructor: 3  (reverse order)
// Destructor: 2
// Destructor: 1
```

---

## 7. Dynamic Initialization

```cpp
class BankAccount {
    string holder;
    double balance;
    
public:
    BankAccount() : holder(""), balance(0) {}
    
    BankAccount(string h, double b) : holder(h), balance(b) {}
    
    void display() {
        cout << holder << ": $" << balance << endl;
    }
};

int main() {
    int n;
    cout << "Number of accounts: ";
    cin >> n;
    
    // Dynamic array of objects
    BankAccount* accounts = new BankAccount[n];
    
    // Input data
    for (int i = 0; i < n; i++) {
        string name;
        double bal;
        cout << "Name: "; cin >> name;
        cout << "Balance: "; cin >> bal;
        accounts[i] = BankAccount(name, bal);
    }
    
    // Display
    for (int i = 0; i < n; i++) {
        accounts[i].display();
    }
    
    delete[] accounts;  // Don't forget!
}
```

---

## 8. Inner Classes

```cpp
class Outer {
    int outerData;
    
public:
    Outer(int d) : outerData(d) {}
    
    class Inner {  // Nested class
        int innerData;
    public:
        Inner(int d) : innerData(d) {}
        
        void display(const Outer& o) {
            cout << "Outer: " << o.outerData << endl;
            cout << "Inner: " << innerData << endl;
        }
    };
    
    void createInner() {
        Inner i(20);
        i.display(*this);
    }
};

int main() {
    Outer o(10);
    o.createInner();
    
    // Create inner directly
    Outer::Inner i(30);
}
```

---

## 9. Rule of Three

If your class has any of these, it should have all three:
1. **Destructor**
2. **Copy Constructor**
3. **Copy Assignment Operator**

```cpp
class Resource {
    int* data;
    
public:
    // Constructor
    Resource(int val) : data(new int(val)) {}
    
    // 1. Destructor
    ~Resource() { delete data; }
    
    // 2. Copy Constructor
    Resource(const Resource& other) 
        : data(new int(*other.data)) {}
    
    // 3. Copy Assignment
    Resource& operator=(const Resource& other) {
        if (this != &other) {  // Self-assignment check
            delete data;
            data = new int(*other.data);
        }
        return *this;
    }
};
```

---

## 📝 Lab Exercises

### Exercise 1: Constructor Types Demo
```cpp
#include <iostream>
using namespace std;

class Box {
    double length, width, height;
    
public:
    // Default
    Box() : length(1), width(1), height(1) {
        cout << "Default constructor" << endl;
    }
    
    // Parameterized
    Box(double l, double w, double h) 
        : length(l), width(w), height(h) {
        cout << "Parameterized constructor" << endl;
    }
    
    // Copy
    Box(const Box& b) 
        : length(b.length), width(b.width), height(b.height) {
        cout << "Copy constructor" << endl;
    }
    
    ~Box() {
        cout << "Destructor" << endl;
    }
    
    double volume() { return length * width * height; }
};

int main() {
    Box b1;            // Default
    Box b2(2, 3, 4);   // Parameterized
    Box b3 = b2;       // Copy
    
    cout << "b1 volume: " << b1.volume() << endl;
    cout << "b2 volume: " << b2.volume() << endl;
    cout << "b3 volume: " << b3.volume() << endl;
}
```

### Exercise 2: Inner Class Implementation
```cpp
#include <iostream>
using namespace std;

class LinkedList {
    struct Node {
        int data;
        Node* next;
        
        Node(int d) : data(d), next(nullptr) {}
    };
    
    Node* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    void add(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    void display() {
        Node* current = head;
        while (current) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
    
    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    LinkedList list;
    list.add(10);
    list.add(20);
    list.add(30);
    list.display();  // 30 -> 20 -> 10 -> NULL
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - Constructor has **same name as class**, **no return type**
> - Default constructor has **no parameters**
> - **Initialization list** is required for `const` and `reference` members
> - Copy constructor takes **const reference** parameter
> - **Shallow copy** copies pointers, **Deep copy** copies data
> - Destructor: `~ClassName()`, no parameters, only ONE per class
> - Destructors called in **reverse order** of construction
> - **Rule of Three**: Destructor + Copy Constructor + Copy Assignment
> - Copy constructor called on: initialization, pass by value, return by value
> - Use `new[]` with `delete[]`, `new` with `delete`
