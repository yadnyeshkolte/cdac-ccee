---
layout: default
title: "Session 16: Templates"
parent: Module 7 - C++
nav_order: 14
---

# Session 16: Templates

## 🎯 Learning Objectives
- Create function templates
- Implement class templates
- Understand template specialization
- Use multiple template parameters

---

## 1. What are Templates?

Templates enable **generic programming** - writing code that works with any data type.

```cpp
// Without templates - need separate functions
int maxInt(int a, int b) { return (a > b) ? a : b; }
double maxDouble(double a, double b) { return (a > b) ? a : b; }
string maxString(string a, string b) { return (a > b) ? a : b; }

// With templates - ONE function for all types
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}
```

---

## 2. Function Templates

### Basic Syntax
```cpp
template <typename T>  // or: template <class T>
T add(T a, T b) {
    return a + b;
}

int main() {
    cout << add(5, 3) << endl;        // int: 8
    cout << add(2.5, 3.7) << endl;    // double: 6.2
    cout << add<int>(5, 3) << endl;   // Explicit type
}
```

### Multiple Template Parameters
```cpp
template <typename T, typename U>
auto multiply(T a, U b) -> decltype(a * b) {
    return a * b;
}

int main() {
    cout << multiply(5, 3.5) << endl;    // 17.5 (int * double)
    cout << multiply(2.5, 4) << endl;    // 10.0 (double * int)
}
```

### Non-Type Template Parameters
```cpp
template <typename T, int SIZE>
class Array {
    T data[SIZE];
public:
    int size() { return SIZE; }
    T& operator[](int index) { return data[index]; }
};

int main() {
    Array<int, 5> arr;
    cout << arr.size() << endl;  // 5
}
```

---

## 3. Function Template Examples

### Swap Function
```cpp
template <typename T>
void swap(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    swap(x, y);
    cout << x << " " << y << endl;  // 20 10
    
    string s1 = "Hello", s2 = "World";
    swap(s1, s2);
    cout << s1 << " " << s2 << endl;  // World Hello
}
```

### Find in Array
```cpp
template <typename T>
int find(T arr[], int size, T target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main() {
    int nums[] = {10, 20, 30, 40, 50};
    cout << find(nums, 5, 30) << endl;  // 2
    
    string words[] = {"apple", "banana", "cherry"};
    cout << find(words, 3, string("banana")) << endl;  // 1
}
```

### Sort Function
```cpp
template <typename T>
void bubbleSort(T arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                T temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int nums[] = {5, 2, 8, 1, 9};
    bubbleSort(nums, 5);
    // nums is now: 1, 2, 5, 8, 9
}
```

---

## 4. Class Templates

### Basic Class Template
```cpp
template <typename T>
class Stack {
    T* data;
    int top;
    int capacity;
    
public:
    Stack(int cap = 100) : capacity(cap), top(-1) {
        data = new T[capacity];
    }
    
    ~Stack() { delete[] data; }
    
    void push(T item) {
        if (top < capacity - 1) {
            data[++top] = item;
        }
    }
    
    T pop() {
        if (top >= 0) {
            return data[top--];
        }
        throw "Stack underflow";
    }
    
    bool isEmpty() { return top == -1; }
    int size() { return top + 1; }
};

int main() {
    Stack<int> intStack(10);
    intStack.push(10);
    intStack.push(20);
    cout << intStack.pop() << endl;  // 20
    
    Stack<string> strStack(10);
    strStack.push("Hello");
    strStack.push("World");
    cout << strStack.pop() << endl;  // World
}
```

### Class Template with Multiple Parameters
```cpp
template <typename K, typename V>
class Pair {
    K key;
    V value;
    
public:
    Pair(K k, V v) : key(k), value(v) {}
    
    K getKey() const { return key; }
    V getValue() const { return value; }
    
    void setKey(K k) { key = k; }
    void setValue(V v) { value = v; }
};

int main() {
    Pair<int, string> p1(1, "One");
    Pair<string, double> p2("pi", 3.14159);
    
    cout << p1.getKey() << ": " << p1.getValue() << endl;
    cout << p2.getKey() << ": " << p2.getValue() << endl;
}
```

---

## 5. Template Specialization

Override template for specific types.

### Full Specialization
```cpp
template <typename T>
class Printer {
public:
    void print(T value) {
        cout << "Generic: " << value << endl;
    }
};

// Specialization for bool
template <>
class Printer<bool> {
public:
    void print(bool value) {
        cout << "Boolean: " << (value ? "true" : "false") << endl;
    }
};

int main() {
    Printer<int> intPrinter;
    intPrinter.print(42);  // Generic: 42
    
    Printer<bool> boolPrinter;
    boolPrinter.print(true);  // Boolean: true
}
```

### Function Template Specialization
```cpp
template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

// Specialization for const char*
template <>
const char* getMax<const char*>(const char* a, const char* b) {
    return (strcmp(a, b) > 0) ? a : b;
}

int main() {
    cout << getMax(10, 20) << endl;        // 20
    cout << getMax("apple", "banana") << endl;  // banana
}
```

---

## 6. Default Template Arguments

```cpp
template <typename T = int, int SIZE = 10>
class Buffer {
    T data[SIZE];
public:
    int capacity() { return SIZE; }
};

int main() {
    Buffer<> defaultBuffer;          // int, 10
    Buffer<double> doubleBuffer;      // double, 10
    Buffer<char, 100> charBuffer;     // char, 100
}
```

---

## 7. Template in Separate Files

**MyTemplate.h**
```cpp
#ifndef MYTEMPLATE_H
#define MYTEMPLATE_H

template <typename T>
class MyClass {
    T data;
public:
    MyClass(T d);
    T getData();
    void setData(T d);
};

// Implementation MUST be in header for templates!
template <typename T>
MyClass<T>::MyClass(T d) : data(d) {}

template <typename T>
T MyClass<T>::getData() { return data; }

template <typename T>
void MyClass<T>::setData(T d) { data = d; }

#endif
```

> **Important**: Template implementations must be in header files because the compiler needs to see the full implementation to generate code for each type.

---

## 📝 Lab Exercise: Generic LinkedList

```cpp
#include <iostream>
using namespace std;

template <typename T>
class LinkedList {
    struct Node {
        T data;
        Node* next;
        Node(T d) : data(d), next(nullptr) {}
    };
    
    Node* head;
    int count;
    
public:
    LinkedList() : head(nullptr), count(0) {}
    
    void addFront(T value) {
        Node* newNode = new Node(value);
        newNode->next = head;
        head = newNode;
        count++;
    }
    
    void addBack(T value) {
        Node* newNode = new Node(value);
        if (!head) {
            head = newNode;
        } else {
            Node* current = head;
            while (current->next) {
                current = current->next;
            }
            current->next = newNode;
        }
        count++;
    }
    
    bool remove(T value) {
        if (!head) return false;
        
        if (head->data == value) {
            Node* temp = head;
            head = head->next;
            delete temp;
            count--;
            return true;
        }
        
        Node* current = head;
        while (current->next && current->next->data != value) {
            current = current->next;
        }
        
        if (current->next) {
            Node* temp = current->next;
            current->next = temp->next;
            delete temp;
            count--;
            return true;
        }
        return false;
    }
    
    void display() {
        Node* current = head;
        while (current) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
    
    int size() { return count; }
    
    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    LinkedList<int> intList;
    intList.addBack(10);
    intList.addBack(20);
    intList.addFront(5);
    intList.display();  // 5 -> 10 -> 20 -> NULL
    
    LinkedList<string> strList;
    strList.addBack("Hello");
    strList.addBack("World");
    strList.display();  // Hello -> World -> NULL
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - `template <typename T>` or `template <class T>` - both work
> - Template code is generated at **compile time** for each type used
> - Function templates can deduce type from arguments
> - Class templates require explicit type: `Stack<int>`
> - Template implementation must be in **header file**
> - **Template specialization**: custom implementation for specific type
> - Non-type parameters: `template <typename T, int SIZE>`
> - Default template arguments: `template <typename T = int>`
> - Templates enable **generic programming** and **code reuse**
> - STL containers (vector, map) are class templates
