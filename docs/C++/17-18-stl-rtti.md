---
layout: default
title: "Sessions 17-18: STL & RTTI"
parent: Module 7 - C++
nav_order: 15
---

# Sessions 17 & 18: STL and RTTI

## 🎯 Learning Objectives
- Master Standard Template Library containers
- Work with iterators and algorithms
- Understand RTTI (Runtime Type Information)

---

## 1. What is STL?

The **Standard Template Library** provides:
- **Containers**: Store collections of objects
- **Iterators**: Access elements in containers
- **Algorithms**: Operations on containers (sort, find, etc.)
- **Function Objects**: Objects that act like functions

---

## 2. STL Containers

### Sequence Containers

| Container | Description | Access |
|-----------|-------------|--------|
| `vector` | Dynamic array | Random O(1) |
| `deque` | Double-ended queue | Random O(1) |
| `list` | Doubly linked list | Sequential O(n) |
| `array` | Fixed-size array | Random O(1) |
| `forward_list` | Singly linked list | Sequential O(n) |

### Associative Containers

| Container | Description | Ordered |
|-----------|-------------|---------|
| `set` | Unique keys | Yes |
| `multiset` | Duplicate keys allowed | Yes |
| `map` | Key-value pairs, unique keys | Yes |
| `multimap` | Key-value pairs, duplicate keys | Yes |

### Unordered Containers (C++11)

| Container | Description | Hash-based |
|-----------|-------------|------------|
| `unordered_set` | Unique keys | Yes |
| `unordered_map` | Key-value pairs | Yes |

### Container Adapters

| Container | Description | Underlying |
|-----------|-------------|------------|
| `stack` | LIFO | deque/vector/list |
| `queue` | FIFO | deque/list |
| `priority_queue` | Heap | vector |

---

## 3. Vector

Dynamic array that can grow/shrink.

```cpp
#include <vector>
using namespace std;

int main() {
    // Declaration
    vector<int> v1;                    // Empty
    vector<int> v2(5);                 // 5 zeros
    vector<int> v3(5, 10);             // 5 tens
    vector<int> v4 = {1, 2, 3, 4, 5};  // Initializer list
    
    // Adding elements
    v1.push_back(10);     // Add to end
    v1.push_back(20);
    v1.emplace_back(30);  // Construct in place (faster)
    
    // Accessing elements
    cout << v1[0] << endl;      // 10 (no bounds check)
    cout << v1.at(1) << endl;   // 20 (bounds checked)
    cout << v1.front() << endl; // First element
    cout << v1.back() << endl;  // Last element
    
    // Size and capacity
    cout << v1.size() << endl;     // Number of elements
    cout << v1.capacity() << endl; // Allocated space
    cout << v1.empty() << endl;    // Is empty?
    
    // Modifying
    v1.pop_back();          // Remove last
    v1.insert(v1.begin(), 5);  // Insert at position
    v1.erase(v1.begin() + 1);  // Remove at position
    v1.clear();             // Remove all
    
    // Iteration
    for (int i = 0; i < v4.size(); i++) {
        cout << v4[i] << " ";
    }
    
    for (int x : v4) {  // Range-based (C++11)
        cout << x << " ";
    }
    
    for (auto it = v4.begin(); it != v4.end(); ++it) {
        cout << *it << " ";
    }
}
```

---

## 4. Stack

LIFO (Last In, First Out) container adapter.

```cpp
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    
    // Push elements
    s.push(10);
    s.push(20);
    s.push(30);
    
    // Access top
    cout << s.top() << endl;  // 30
    
    // Pop elements
    while (!s.empty()) {
        cout << s.top() << " ";  // 30 20 10
        s.pop();
    }
    
    cout << s.size() << endl;  // 0
}
```

---

## 5. Queue

FIFO (First In, First Out) container adapter.

```cpp
#include <queue>
using namespace std;

int main() {
    queue<string> q;
    
    // Enqueue
    q.push("Alice");
    q.push("Bob");
    q.push("Charlie");
    
    // Access front and back
    cout << q.front() << endl;  // Alice
    cout << q.back() << endl;   // Charlie
    
    // Dequeue
    while (!q.empty()) {
        cout << q.front() << " ";  // Alice Bob Charlie
        q.pop();
    }
}
```

---

## 6. Map

Key-value pairs with unique keys.

```cpp
#include <map>
using namespace std;

int main() {
    map<string, int> ages;
    
    // Insert
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages.insert({"Charlie", 35});
    ages.insert(make_pair("David", 28));
    
    // Access
    cout << ages["Alice"] << endl;  // 25
    cout << ages.at("Bob") << endl; // 30
    
    // Check existence
    if (ages.find("Eve") != ages.end()) {
        cout << "Eve found" << endl;
    } else {
        cout << "Eve not found" << endl;
    }
    
    if (ages.count("Alice") > 0) {
        cout << "Alice exists" << endl;
    }
    
    // Iterate
    for (auto& pair : ages) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    // C++17 structured bindings
    for (auto& [name, age] : ages) {
        cout << name << ": " << age << endl;
    }
    
    // Erase
    ages.erase("Bob");
    
    cout << ages.size() << endl;
}
```

---

## 7. Set

Unique elements in sorted order.

```cpp
#include <set>
using namespace std;

int main() {
    set<int> s;
    
    // Insert (duplicates ignored)
    s.insert(30);
    s.insert(10);
    s.insert(20);
    s.insert(10);  // Ignored
    
    // Iterate (sorted order)
    for (int x : s) {
        cout << x << " ";  // 10 20 30
    }
    
    // Find
    if (s.find(20) != s.end()) {
        cout << "20 found" << endl;
    }
    
    // Contains (C++20)
    // if (s.contains(20)) { ... }
    
    // Count
    cout << s.count(10) << endl;  // 1 (0 or 1 for set)
    
    // Erase
    s.erase(20);
}
```

---

## 8. Iterators

Objects that point to elements in containers.

```cpp
#include <vector>
#include <iterator>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    
    // Forward iterator
    vector<int>::iterator it = v.begin();
    cout << *it << endl;  // 10
    ++it;
    cout << *it << endl;  // 20
    
    // Reverse iterator
    vector<int>::reverse_iterator rit = v.rbegin();
    cout << *rit << endl;  // 50
    
    // Const iterator (read-only)
    vector<int>::const_iterator cit = v.cbegin();
    // *cit = 100;  // ERROR!
    
    // Auto (C++11)
    for (auto it = v.begin(); it != v.end(); ++it) {
        cout << *it << " ";
    }
}
```

### Iterator Types
- `begin()` / `end()` - Forward iteration
- `rbegin()` / `rend()` - Reverse iteration
- `cbegin()` / `cend()` - Const forward
- `crbegin()` / `crend()` - Const reverse

---

## 9. Algorithms

```cpp
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    
    // Sort
    sort(v.begin(), v.end());           // Ascending
    sort(v.begin(), v.end(), greater<int>());  // Descending
    
    // Find
    auto it = find(v.begin(), v.end(), 5);
    if (it != v.end()) {
        cout << "Found at index: " << (it - v.begin()) << endl;
    }
    
    // Count
    int countOf5 = count(v.begin(), v.end(), 5);
    
    // Min/Max
    auto minIt = min_element(v.begin(), v.end());
    auto maxIt = max_element(v.begin(), v.end());
    cout << "Min: " << *minIt << ", Max: " << *maxIt << endl;
    
    // Reverse
    reverse(v.begin(), v.end());
    
    // Fill
    fill(v.begin(), v.end(), 0);
    
    // Transform
    vector<int> squared(v.size());
    transform(v.begin(), v.end(), squared.begin(), 
              [](int x) { return x * x; });
    
    // For each
    for_each(v.begin(), v.end(), [](int x) {
        cout << x << " ";
    });
    
    // Binary search (on sorted container)
    sort(v.begin(), v.end());
    bool found = binary_search(v.begin(), v.end(), 5);
    
    // Unique (remove consecutive duplicates)
    auto last = unique(v.begin(), v.end());
    v.erase(last, v.end());
}
```

---

## 10. RTTI (Runtime Type Information)

Determine object type at runtime.

### typeid Operator

```cpp
#include <typeinfo>
using namespace std;

class Animal {
public:
    virtual ~Animal() {}  // Must have virtual function
};

class Dog : public Animal {};
class Cat : public Animal {};

int main() {
    // Basic types
    int x = 10;
    cout << typeid(x).name() << endl;  // "i" or "int"
    
    double y = 3.14;
    cout << typeid(y).name() << endl;  // "d" or "double"
    
    // Polymorphic types
    Animal* a1 = new Dog();
    Animal* a2 = new Cat();
    
    cout << typeid(*a1).name() << endl;  // "Dog" (runtime type)
    cout << typeid(*a2).name() << endl;  // "Cat"
    
    // Compare types
    if (typeid(*a1) == typeid(Dog)) {
        cout << "a1 is a Dog" << endl;
    }
    
    delete a1;
    delete a2;
}
```

### dynamic_cast

```cpp
class Animal {
public:
    virtual ~Animal() {}
    virtual void speak() { cout << "Animal" << endl; }
};

class Dog : public Animal {
public:
    void speak() override { cout << "Woof!" << endl; }
    void fetch() { cout << "Fetching..." << endl; }
};

int main() {
    Animal* a = new Dog();
    
    // Safe downcast
    Dog* d = dynamic_cast<Dog*>(a);
    if (d) {
        d->fetch();  // Safe to call Dog-specific method
    }
    
    // Reference version (throws bad_cast on failure)
    try {
        Animal& aRef = *a;
        Dog& dRef = dynamic_cast<Dog&>(aRef);
        dRef.fetch();
    } catch (bad_cast& e) {
        cout << "Cast failed: " << e.what() << endl;
    }
    
    delete a;
}
```

---

## 📝 Lab Exercise: Contact Manager

```cpp
#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
using namespace std;

class Contact {
public:
    string name;
    string phone;
    string email;
    
    Contact() {}
    Contact(string n, string p, string e) 
        : name(n), phone(p), email(e) {}
};

int main() {
    map<string, Contact> contacts;
    
    // Add contacts
    contacts["alice"] = Contact("Alice Smith", "123-456-7890", "alice@email.com");
    contacts["bob"] = Contact("Bob Jones", "234-567-8901", "bob@email.com");
    contacts["charlie"] = Contact("Charlie Brown", "345-678-9012", "charlie@email.com");
    
    // Display all
    cout << "=== All Contacts ===" << endl;
    for (auto& [key, contact] : contacts) {
        cout << contact.name << ": " << contact.phone << endl;
    }
    
    // Search
    string searchKey = "bob";
    if (contacts.find(searchKey) != contacts.end()) {
        Contact& c = contacts[searchKey];
        cout << "\nFound: " << c.name << endl;
        cout << "Phone: " << c.phone << endl;
        cout << "Email: " << c.email << endl;
    }
    
    // Delete
    contacts.erase("charlie");
    
    // Count
    cout << "\nTotal contacts: " << contacts.size() << endl;
    
    return 0;
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - **vector**: dynamic array, `push_back()`, `pop_back()`, random access
> - **stack**: LIFO, `push()`, `pop()`, `top()`
> - **queue**: FIFO, `push()`, `pop()`, `front()`, `back()`
> - **map**: key-value pairs, sorted by key, unique keys
> - **set**: unique elements, sorted, no duplicates
> - **Iterators**: `begin()`, `end()`, `*it` to dereference
> - **Algorithms**: `sort()`, `find()`, `count()`, `reverse()`, `min_element()`, `max_element()`
> - **typeid**: returns type information, requires `<typeinfo>`
> - **dynamic_cast**: safe downcast, returns nullptr on failure (pointer) or throws bad_cast (reference)
> - RTTI requires at least one **virtual function** in base class
> - `typeid(*ptr).name()` gives **runtime type** for polymorphic types
