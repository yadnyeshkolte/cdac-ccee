# CDAC Java Learning Notes

A comprehensive collection of Java concepts, Object-Oriented Programming (OOP), JDBC, File I/O, and Algorithm implementations learned during CDAC training.

---

## Core Java Concepts

### Data Types & Variables

| Data Type | Size | Bytes | Range | Example |
| --- | --- | --- | --- | --- |
| `byte` | 8 bits | 1 | -128 to 127 | `byte b = 100;` |
| `short` | 16 bits | 2 | -32,768 to 32,767 | `short s = 32000;` |
| `int` | 32 bits | 4 | -2³¹ to 2³¹-1 | `int i = 100000;` |
| `long` | 64 bits | 8 | -2⁶³ to 2⁶³-1 | `long l = 9876543210L;` |
| `float` | 32 bits | 4 | ~6-7 decimal digits | `float f = 5.5f;` |
| `double` | 64 bits | 8 | ~15 decimal digits | `double d = 5.5;` |
| `char` | 16 bits | 2 | Unicode characters | `char c = 'A';` |
| `boolean` | 1 bit | 1* | true/false | `boolean flag = true;` |

#### Important Points:

```java
// char is always 16 bits in Java (Unicode)
char letter = 'A';

// Type casting - be careful with overflow
int largeNum = 100000;
short smallNum = (short) largeNum; // Results in overflow: -31072

// Valid identifier names
int _a = 10;        // Valid - starts with underscore
int $b = 20;        // Valid - starts with $ (not recommended)
// int 1a = 30;     // Invalid - cannot start with number

// Local variables must be initialized
void method() {
    int x;
    // System.out.println(x); // Compilation error - not initialized
    x = 10; // Must initialize before use
    System.out.println(x); // Now valid
}

// Choosing appropriate data types
long mobileNumber = 9876543210L; // Use long for 10-digit numbers
```

---

## Operators

### Operator Precedence (Highest to Lowest)

1. **Unary operators**: `++`, `--`, `!`, `~`
2. **Arithmetic operators**: `*`, `/`, `%`
3. **Addition/Subtraction**: `+`, `-`
4. **Relational operators**: `<`, `>`, `<=`, `>=`
5. **Equality operators**: `==`, `!=`
6. **Logical AND**: `&&`
7. **Logical OR**: `||`
8. **Assignment operators**: `=`, `+=`, `-=`, etc.

### Examples:

```java
// Pre-increment vs Post-increment
int x = 5;
int result1 = ++x * 2; // x becomes 6 first, then 6 * 2 = 12
System.out.println(result1); // Output: 12

// Post-increment
int a = 5;
int result2 = a++ + ++a;
// a++ uses 5, then a becomes 6
// ++a increments to 7, then uses 7
// Result: 5 + 7 = 12
System.out.println(result2); // Output: 12

// Logical operators
boolean result = 10 < 20 && 20 < 30 && 10 < 30; // true

// Type casting in operations
float f = (float)(5.0 / 2); // Explicit casting required
// or
float f2 = 5.0f / 2; // Using float literal
```

---

## Conditional Statements

### if-else Statement

```java
// Common mistake: using = instead of ==
int x = 10;
if (x == 10) { // Correct - comparison
    System.out.println("Equal");
}

// if (x = 10) // Wrong - assignment, compilation error
```

### switch Statement

```java
// Supported types: int, char, byte, short, String, enum
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Invalid day");
        // default doesn't have to be last
}

// Switch with String (Java 7+)
String fruit = "Apple";
switch (fruit) {
    case "Apple":
        System.out.println("Red fruit");
        break;
    case "Banana":
        System.out.println("Yellow fruit");
        break;
}
```

### Loop Control

```java
// break - exits the loop
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // Exits loop when i is 5
    }
    System.out.println(i);
}

// continue - skips current iteration
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue; // Skip even numbers
    }
    System.out.println(i); // Prints odd numbers only
}

// do-while - executes at least once
int count = 0;
do {
    System.out.println("Count: " + count);
    count++;
} while (count < 5);
```

---

## Object-Oriented Programming (OOP)

### Classes and Objects

**Class**: A blueprint/template for creating objects.
**Object**: An instance of a class.

```java
// Class can exist without creating any object
public class Student {
    // Instance variables
    int rollNo;
    String name;
    int emarks;
    int cmarks;
    int mmarks;
    
    // Default constructor
    Student() {
        rollNo = 0;
        name = "Empty";
        emarks = 0;
        cmarks = 0;
        mmarks = 0;
    }
    
    // Parameterized constructor
    Student(int rollNo, String name, int emarks, int cmarks, int mmarks) {
        this.rollNo = rollNo;
        this.name = name;
        this.emarks = emarks;
        this.cmarks = cmarks;
        this.mmarks = mmarks;
    }
    
    // Method to display student details
    void displayDetails() {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
        System.out.println("English Marks: " + emarks);
        System.out.println("Computer Marks: " + cmarks);
        System.out.println("Math Marks: " + mmarks);
    }
}

// Creating objects
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student(1, "Raj", 85, 90, 88);
        
        s2.displayDetails();
        // Output:
        // Roll No: 1
        // Name: Raj
        // (and other details)
    }
}
```

---

## Constructors

### Key Points:

1. **No return type** (not even void)
2. **Same name as class**
3. Called automatically when object is created
4. Can be overloaded
5. Cannot be declared static
6. Can be private (used in Singleton pattern)

```java
public class Demo {
    int x;
    
    // Default constructor
    Demo() {
        x = 0;
    }
    
    // Parameterized constructor
    Demo(int x) {
        this.x = x; // 'this' refers to current object
    }
    
    // Constructor chaining using this()
    Demo(int x, int y) {
        this(x); // Calls Demo(int x)
        System.out.println("Second constructor");
    }
}

// Using constructors
public class Main {
    public static void main(String[] args) {
        Demo d1 = new Demo();
        Demo d2 = new Demo(100);
        System.out.println(d2.x); // Output: 100
    }
}

// Private constructor (Singleton pattern)
class Singleton {
    private static Singleton instance;
    
    private Singleton() {
        // Private constructor
    }
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton(); // Can call from within class
        }
        return instance;
    }
}
```

---

## The `this` Keyword

**Purpose**: Refers to the current object instance.

```java
public class Person {
    String name;
    int age;
    
    // Using 'this' to differentiate between parameters and instance variables
    Person(String name, int age) {
        this.name = name; // this.name = instance variable
        this.age = age;   // name/age = parameters
    }
    
    // Returning current object
    Person setName(String name) {
        this.name = name;
        return this; // Returns current object for method chaining
    }
    
    Person setAge(int age) {
        this.age = age;
        return this;
    }
}

// Method chaining
Person p = new Person("", 0);
p.setName("Raj").setAge(20); // Chaining methods
```

---

## Static Members

**Static members belong to the class, not to individual objects.**

```java
public class Counter {
    static int count = 0; // Shared among all objects
    int instanceVar = 0;  // Individual to each object
    
    Counter() {
        count++; // Increments for every object created
        instanceVar++;
    }
    
    static void displayCount() {
        System.out.println("Count: " + count);
        // System.out.println(instanceVar); // Error: can't access non-static
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter(); // count = 1
        Counter c2 = new Counter(); // count = 2
        
        Counter.displayCount(); // Output: Count: 2
        
        System.out.println(c1.instanceVar); // Output: 1
        System.out.println(c2.instanceVar); // Output: 1
    }
}

// Example with static and instance variables
class Example {
    static int x = 50;
    int y = 20;
    
    void modify() {
        x = 100; // Changes for all instances
        y = 30;  // Changes only for this instance
    }
}

Example e1 = new Example();
Example e2 = new Example();
e1.modify();
System.out.println(e1.x + " " + e1.y); // Output: 100 30
System.out.println(e2.x + " " + e2.y); // Output: 100 20 (x is shared, y is not)
```

---

## Encapsulation

**Definition**: Wrapping data (variables) and code (methods) together, hiding internal details.

**Implementation**: Private variables + Public methods (getters/setters)

```java
public class BankAccount {
    private double balance; // Private - cannot be accessed directly
    
    // Constructor
    public BankAccount(double initialBalance) {
        if (initialBalance > 0) {
            this.balance = initialBalance;
        }
    }
    
    // Getter - public method to access private data
    public double getBalance() {
        return balance;
    }
    
    // Setter - public method to modify private data with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
        } else {
            System.out.println("Insufficient balance");
        }
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        // account.balance = 5000; // Error: cannot access private field
        
        account.deposit(500);
        System.out.println("Balance: " + account.getBalance());
        account.withdraw(200);
    }
}
```

---

## Inheritance

**Definition**: A mechanism where one class acquires properties and methods of another class.

```java
// Parent/Super class
class Animal {
    String name;
    
    Animal(String name) {
        this.name = name;
    }
    
    void eat() {
        System.out.println(name + " is eating");
    }
    
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

// Child/Sub class
class Dog extends Animal {
    String breed;
    
    Dog(String name, String breed) {
        super(name); // Calls parent constructor
        this.breed = breed;
    }
    
    // Method overriding
    @Override
    void sound() {
        System.out.println("Bark");
    }
    
    void fetch() {
        System.out.println(name + " is fetching");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }
    
    @Override
    void sound() {
        System.out.println("Meow");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", "Labrador");
        dog.eat();    // Inherited from Animal
        dog.sound();  // Overridden in Dog
        dog.fetch();  // Specific to Dog
        
        Cat cat = new Cat("Whiskers");
        cat.sound();  // Output: Meow
    }
}
```

### Constructor Chaining in Inheritance

```java
class A {
    A() {
        System.out.println("A constructor");
    }
}

class B extends A {
    B() {
        super(); // Implicit call to parent constructor (happens automatically)
        System.out.println("B constructor");
    }
}

// Output when creating object of B:
// A constructor
// B constructor
```

---

## Polymorphism

**Definition**: Ability of an object to take many forms.

### Types:

1. **Compile-time Polymorphism** (Method Overloading)
2. **Runtime Polymorphism** (Method Overriding)

### Method Overloading (Compile-time)

```java
class Calculator {
    // Same method name, different parameters
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    double add(double a, double b) {
        return a + b;
    }
}

// Usage
Calculator calc = new Calculator();
System.out.println(calc.add(5, 10));        // Output: 15
System.out.println(calc.add(5, 10, 15));    // Output: 30
System.out.println(calc.add(5.5, 10.5));    // Output: 16.0
```

### Method Overriding (Runtime Polymorphism)

```java
class Shape {
    void draw() {
        System.out.println("Drawing Shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing Circle");
    }
}

class Rectangle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing Rectangle");
    }
}

// Runtime polymorphism
public class Main {
    public static void main(String[] args) {
        Shape s;
        
        s = new Circle();
        s.draw(); // Output: Drawing Circle (decided at runtime)
        
        s = new Rectangle();
        s.draw(); // Output: Drawing Rectangle
    }
}
```

### Abstract Classes and Methods

```java
abstract class Animal {
    abstract void sound(); // Abstract method - no implementation
    
    void breathe() { // Concrete method
        System.out.println("Breathing");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark"); // Must provide implementation
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Meow");
    }
}
```

---

## Access Modifiers

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| `public` | ✓ | ✓ | ✓ | ✓ |
| `protected` | ✓ | ✓ | ✓ | ✗ |
| `default` (no modifier) | ✓ | ✓ | ✗ | ✗ |
| `private` | ✓ | ✗ | ✗ | ✗ |

```java
// File: AccessDemo.java
public class AccessDemo {
    public int publicVar = 10;
    protected int protectedVar = 20;
    int defaultVar = 30;        // Package-private
    private int privateVar = 40;
    
    public void display() {
        System.out.println(privateVar); // Accessible within class
    }
}

// File: SubClass.java (in same package)
class SubClass extends AccessDemo {
    void show() {
        System.out.println(publicVar);    // ✓ Accessible
        System.out.println(protectedVar); // ✓ Accessible
        System.out.println(defaultVar);   // ✓ Accessible (same package)
        // System.out.println(privateVar); // ✗ Not accessible
    }
}

// File: Test.java (in same package)
class Test {
    void test() {
        AccessDemo obj = new AccessDemo();
        System.out.println(obj.publicVar);    // ✓ Accessible
        System.out.println(obj.protectedVar); // ✓ Accessible (same package)
        System.out.println(obj.defaultVar);   // ✓ Accessible (same package)
        // System.out.println(obj.privateVar); // ✗ Not accessible
    }
}
```

---

## The `final` Keyword

### 1. Final Variables (Constants)

```java
final int MAX_VALUE = 100;
// MAX_VALUE = 200; // Compilation error - cannot modify

final double PI = 3.14159;
```

### 2. Final Methods (Cannot be overridden)

```java
class Parent {
    final void display() {
        System.out.println("Parent display");
    }
}

class Child extends Parent {
    // @Override
    // void display() { } // Compilation error - cannot override final method
}
```

### 3. Final Classes (Cannot be inherited)

```java
final class Utility {
    static void helper() {
        System.out.println("Helper method");
    }
}

// class SubUtility extends Utility { } // Compilation error - cannot extend final class
```

---

## The `super` Keyword

**Purpose**: Refers to the parent class.

```java
class A {
    int x = 10;
    
    void display() {
        System.out.println("A");
    }
}

class B extends A {
    int x = 20;
    
    void display() {
        System.out.println("B");
    }
    
    void show() {
        System.out.println(x);        // Output: 20 (current class)
        System.out.println(super.x);  // Output: 10 (parent class)
        
        display();       // Output: B (current class)
        super.display(); // Output: A (parent class)
    }
}
```

---

## Arrays

```java
// Array initialization
int[] numbers = new int[5]; // Default values: 0, 0, 0, 0, 0

String[] names = new String[3]; // Default values: null, null, null

// Array with initial values
int[] scores = {85, 90, 78, 92, 88};

// Accessing array elements
System.out.println(scores[0]); // Output: 85

// Array length
System.out.println(scores.length); // Output: 5

// Iterating through array
for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}

// Enhanced for loop
for (int score : scores) {
    System.out.println(score);
}
```

---


## Java Collections Framework

### ArrayList

**Definition**: Dynamic array that can grow or shrink in size.

```java
import java.util.ArrayList;
import java.util.Iterator;

public class ArrayListExample {
    public static void main(String[] args) {
        // Creating ArrayList
        ArrayList<String> list = new ArrayList<>();
        
        // Adding elements
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");
        
        // Adding at specific index
        list.add(1, "Mango");
        
        // Accessing elements
        System.out.println(list.get(0)); // Output: Apple
        
        // Modifying elements
        list.set(0, "Avocado");
        
        // Removing elements
        list.remove("Banana");
        list.remove(0); // Remove by index
        
        // Size of ArrayList
        System.out.println("Size: " + list.size());
        
        // Check if element exists
        if (list.contains("Cherry")) {
            System.out.println("Cherry found");
        }
        
        // Clear all elements
        // list.clear();
    }
}
```

#### Ways to Iterate ArrayList

```java
ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.add(30);

// 1. For loop
for (int i = 0; i < numbers.size(); i++) {
    System.out.println(numbers.get(i));
}

// 2. Enhanced for loop (for-each)
for (Integer num : numbers) {
    System.out.println(num);
}

// 3. Iterator
Iterator<Integer> iterator = numbers.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

// 4. forEach with Lambda (Java 8+)
numbers.forEach(num -> System.out.println(num));

// 5. forEach with method reference
numbers.forEach(System.out::println);
```

---

### HashMap

**Definition**: Stores key-value pairs. Keys are unique, values can be duplicate.

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        // Creating HashMap
        HashMap<String, Integer> map = new HashMap<>();
        
        // Adding key-value pairs
        map.put("Apple", 100);
        map.put("Banana", 150);
        map.put("Cherry", 200);
        
        // Accessing value by key
        System.out.println(map.get("Apple")); // Output: 100
        
        // Updating value
        map.put("Apple", 120); // Overwrites existing value
        
        // Removing entry
        map.remove("Banana");
        
        // Check if key exists
        if (map.containsKey("Cherry")) {
            System.out.println("Cherry exists");
        }
        
        // Check if value exists
        if (map.containsValue(200)) {
            System.out.println("Value 200 exists");
        }
        
        // Size of HashMap
        System.out.println("Size: " + map.size());
        
        // Get or default
        int value = map.getOrDefault("Mango", 0); // Returns 0 if key not found
    }
}
```

#### Ways to Iterate HashMap

```java
HashMap<String, Integer> scores = new HashMap<>();
scores.put("John", 85);
scores.put("Jane", 92);
scores.put("Bob", 78);

// 1. Using keySet() - iterate over keys
for (String key : scores.keySet()) {
    System.out.println(key + ": " + scores.get(key));
}

// 2. Using values() - iterate over values only
for (Integer value : scores.values()) {
    System.out.println(value);
}

// 3. Using entrySet() - iterate over key-value pairs (MOST EFFICIENT)
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// 4. forEach with Lambda (Java 8+)
scores.forEach((key, value) -> System.out.println(key + ": " + value));

// 5. Iterator with entrySet()
Iterator<Map.Entry<String, Integer>> iterator = scores.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<String, Integer> entry = iterator.next();
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

---

### HashSet

**Definition**: Stores unique elements (no duplicates). Order is not guaranteed.

```java
import java.util.HashSet;
import java.util.Iterator;

public class HashSetExample {
    public static void main(String[] args) {
        // Creating HashSet
        HashSet<String> set = new HashSet<>();
        
        // Adding elements
        set.add("Apple");
        set.add("Banana");
        set.add("Cherry");
        set.add("Apple"); // Duplicate - will not be added
        
        System.out.println(set.size()); // Output: 3 (not 4)
        
        // Check if element exists
        if (set.contains("Banana")) {
            System.out.println("Banana exists");
        }
        
        // Removing element
        set.remove("Cherry");
        
        // Check if empty
        System.out.println("Is empty: " + set.isEmpty());
        
        // Clear all elements
        // set.clear();
    }
}
```

#### Ways to Iterate HashSet

```java
HashSet<String> fruits = new HashSet<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");

// 1. Enhanced for loop
for (String fruit : fruits) {
    System.out.println(fruit);
}

// 2. Iterator
Iterator<String> iterator = fruits.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

// 3. forEach with Lambda (Java 8+)
fruits.forEach(fruit -> System.out.println(fruit));

// 4. forEach with method reference
fruits.forEach(System.out::println);
```

---

### LinkedList (Implements List and Queue)

**Definition**: Doubly-linked list implementation. Better for insertion/deletion operations.

```java
import java.util.LinkedList;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        
        // Adding elements
        list.add("First");
        list.add("Second");
        list.add("Third");
        
        // Adding at beginning/end
        list.addFirst("Zero");
        list.addLast("Fourth");
        
        // Accessing elements
        System.out.println(list.getFirst()); // Output: Zero
        System.out.println(list.getLast());  // Output: Fourth
        
        // Removing elements
        list.removeFirst();
        list.removeLast();
        
        // Using as Queue
        list.offer("A"); // Add to end
        list.offer("B");
        System.out.println(list.poll()); // Remove and return first element
    }
}
```

#### Ways to Iterate LinkedList

```java
LinkedList<Integer> numbers = new LinkedList<>();
numbers.add(10);
numbers.add(20);
numbers.add(30);

// Same iteration methods as ArrayList
// 1. For loop, 2. Enhanced for loop, 3. Iterator, 4. forEach
```

---

### Queue Interface

**Definition**: FIFO (First In First Out) data structure.

```java
import java.util.Queue;
import java.util.LinkedList;
import java.util.PriorityQueue;

public class QueueExample {
    public static void main(String[] args) {
        // Using LinkedList as Queue
        Queue<String> queue = new LinkedList<>();
        
        // Adding elements
        queue.offer("First");  // Preferred - returns false if fails
        queue.add("Second");   // Throws exception if fails
        queue.offer("Third");
        
        // Accessing elements
        System.out.println(queue.peek()); // Output: First (doesn't remove)
        System.out.println(queue.element()); // Same but throws exception if empty
        
        // Removing elements
        System.out.println(queue.poll()); // Output: First (removes and returns)
        System.out.println(queue.remove()); // Same but throws exception if empty
        
        // Size
        System.out.println("Size: " + queue.size());
        
        // PriorityQueue - elements ordered by natural ordering or comparator
        Queue<Integer> pq = new PriorityQueue<>();
        pq.offer(30);
        pq.offer(10);
        pq.offer(20);
        
        System.out.println(pq.poll()); // Output: 10 (smallest element first)
        System.out.println(pq.poll()); // Output: 20
    }
}
```

#### Ways to Iterate Queue

```java
Queue<String> queue = new LinkedList<>();
queue.offer("A");
queue.offer("B");
queue.offer("C");

// 1. Enhanced for loop (doesn't remove elements)
for (String item : queue) {
    System.out.println(item);
}

// 2. Iterator
Iterator<String> iterator = queue.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

// 3. Poll until empty (removes elements)
while (!queue.isEmpty()) {
    System.out.println(queue.poll());
}

// 4. forEach with Lambda
queue.forEach(item -> System.out.println(item));
```

---

In Java, collections that save data in an *ordered way* include **List implementations (ArrayList, LinkedList, Vector)** for maintaining insertion order, and **LinkedHashSet / LinkedHashMap** for preserving insertion order in sets and maps. If you want elements sorted automatically, you’d use **TreeSet** or **TreeMap**, which keep data in *natural order* (like alphabetical or numerical).

### 1. **Insertion Order (the order you add elements)**
- **ArrayList / LinkedList / Vector** → Always keep elements in the order you inserted them.  
- **LinkedHashSet** → A Set that removes duplicates but still remembers the order you added items.  
- **LinkedHashMap** → A Map that remembers the order of key-value pairs you inserted.

### 2. **Sorted Order (automatic ordering)**
- **TreeSet** → Stores unique elements in sorted order (e.g., numbers ascending, strings alphabetically).  
- **TreeMap** → Stores key-value pairs sorted by keys.  

### 3. **Random / No Order**
- **HashSet** → No guaranteed order.  
- **HashMap** → No guaranteed order of keys.  

---

## 📊 Quick Comparison

| Collection Type   | Maintains Insertion Order? | Maintains Sorted Order? | Allows Duplicates? |
|-------------------|----------------------------|--------------------------|--------------------|
| ArrayList         | ✅ Yes                     | ❌ No                   | ✅ Yes             |
| LinkedList        | ✅ Yes                     | ❌ No                   | ✅ Yes             |
| Vector            | ✅ Yes                     | ❌ No                   | ✅ Yes             |
| LinkedHashSet     | ✅ Yes                     | ❌ No                   | ❌ No              |
| LinkedHashMap     | ✅ Yes                     | ❌ No                   | ❌ Keys only       |
| TreeSet           | ❌ No (insertion ignored)  | ✅ Yes (sorted)         | ❌ No              |
| TreeMap           | ❌ No (insertion ignored)  | ✅ Yes (sorted by key)  | ❌ Keys only       |
| HashSet / HashMap | ❌ No                     | ❌ No                   | ❌ No              |

---

## 🎯 Key Takeaway
- Use **List** if you want duplicates and insertion order.  
- Use **LinkedHashSet / LinkedHashMap** if you want uniqueness but still preserve insertion order.  
- Use **TreeSet / TreeMap** if you want automatic sorting.  

---

## Useful Java Methods Tables

### String Methods

| Method | Description | Example |
|--------|-------------|---------|
| `length()` | Returns length of string | `"Hello".length()` → 5 |
| `charAt(int index)` | Returns character at index | `"Hello".charAt(1)` → 'e' |
| `substring(int start)` | Returns substring from start | `"Hello".substring(2)` → "llo" |
| `substring(int start, int end)` | Returns substring | `"Hello".substring(1, 4)` → "ell" |
| `equals(Object obj)` | Compares content | `"Hi".equals("Hi")` → true |
| `equalsIgnoreCase(String str)` | Case-insensitive comparison | `"Hi".equalsIgnoreCase("hi")` → true |
| `contains(CharSequence s)` | Checks if contains substring | `"Hello".contains("ell")` → true |
| `startsWith(String prefix)` | Checks if starts with prefix | `"Hello".startsWith("He")` → true |
| `endsWith(String suffix)` | Checks if ends with suffix | `"Hello".endsWith("lo")` → true |
| `indexOf(String str)` | Returns first index of substring | `"Hello".indexOf("l")` → 2 |
| `lastIndexOf(String str)` | Returns last index of substring | `"Hello".lastIndexOf("l")` → 3 |
| `replace(char old, char new)` | Replaces characters | `"Hello".replace('l', 'p')` → "Heppo" |
| `toLowerCase()` | Converts to lowercase | `"Hello".toLowerCase()` → "hello" |
| `toUpperCase()` | Converts to uppercase | `"Hello".toUpperCase()` → "HELLO" |
| `trim()` | Removes leading/trailing spaces | `" Hi ".trim()` → "Hi" |
| `split(String regex)` | Splits string into array | `"A,B,C".split(",")` → ["A","B","C"] |
| `isEmpty()` | Checks if string is empty | `"".isEmpty()` → true |
| `toCharArray()` | Converts to char array | `"Hi".toCharArray()` → ['H','i'] |

### ArrayList Methods

| Method | Description | Example |
|--------|-------------|---------|
| `add(E element)` | Adds element at end | `list.add("A")` |
| `add(int index, E element)` | Adds at specific index | `list.add(0, "A")` |
| `get(int index)` | Returns element at index | `list.get(0)` |
| `set(int index, E element)` | Replaces element at index | `list.set(0, "B")` |
| `remove(int index)` | Removes element at index | `list.remove(0)` |
| `remove(Object o)` | Removes first occurrence | `list.remove("A")` |
| `size()` | Returns number of elements | `list.size()` |
| `isEmpty()` | Checks if empty | `list.isEmpty()` |
| `contains(Object o)` | Checks if contains element | `list.contains("A")` |
| `clear()` | Removes all elements | `list.clear()` |
| `indexOf(Object o)` | Returns first index of element | `list.indexOf("A")` |
| `lastIndexOf(Object o)` | Returns last index of element | `list.lastIndexOf("A")` |
| `addAll(Collection c)` | Adds all elements from collection | `list.addAll(list2)` |
| `sort(Comparator c)` | Sorts list | `list.sort(Comparator.naturalOrder())` |

### HashMap Methods

| Method | Description | Example |
|--------|-------------|---------|
| `put(K key, V value)` | Adds/updates key-value pair | `map.put("A", 1)` |
| `get(Object key)` | Returns value for key | `map.get("A")` |
| `remove(Object key)` | Removes entry | `map.remove("A")` |
| `containsKey(Object key)` | Checks if key exists | `map.containsKey("A")` |
| `containsValue(Object value)` | Checks if value exists | `map.containsValue(1)` |
| `size()` | Returns number of entries | `map.size()` |
| `isEmpty()` | Checks if empty | `map.isEmpty()` |
| `clear()` | Removes all entries | `map.clear()` |
| `keySet()` | Returns set of keys | `map.keySet()` |
| `values()` | Returns collection of values | `map.values()` |
| `entrySet()` | Returns set of entries | `map.entrySet()` |
| `putAll(Map m)` | Adds all entries from map | `map.putAll(map2)` |
| `getOrDefault(K key, V default)` | Returns value or default | `map.getOrDefault("B", 0)` |

### HashSet Methods

| Method | Description | Example |
|--------|-------------|---------|
| `add(E element)` | Adds element (if not present) | `set.add("A")` |
| `remove(Object o)` | Removes element | `set.remove("A")` |
| `contains(Object o)` | Checks if contains element | `set.contains("A")` |
| `size()` | Returns number of elements | `set.size()` |
| `isEmpty()` | Checks if empty | `set.isEmpty()` |
| `clear()` | Removes all elements | `set.clear()` |
| `addAll(Collection c)` | Adds all elements | `set.addAll(set2)` |
| `retainAll(Collection c)` | Keeps only common elements | `set.retainAll(set2)` |
| `removeAll(Collection c)` | Removes all specified elements | `set.removeAll(set2)` |

---

## Object Comparison: equals() and hashCode()

### Understanding equals()

```java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Override equals() to compare object content
    @Override
    public boolean equals(Object obj) {
        // Check if same reference
        if (this == obj) {
            return true;
        }
        
        // Check if null or different class
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        
        // Cast and compare fields
        Person person = (Person) obj;
        return age == person.age && 
               (name != null ? name.equals(person.name) : person.name == null);
    }
    
    // IMPORTANT: Always override hashCode() when overriding equals()
    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + age;
        return result;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("John", 25);
        Person p2 = new Person("John", 25);
        Person p3 = p1;
        
        // Without equals() override: p1 == p2 would be false (different objects)
        System.out.println(p1.equals(p2)); // true (same content)
        System.out.println(p1 == p2);      // false (different references)
        System.out.println(p1 == p3);      // true (same reference)
        
        // Using in HashSet/HashMap
        HashSet<Person> set = new HashSet<>();
        set.add(p1);
        System.out.println(set.contains(p2)); // true (because equals() is overridden)
    }
}
```

### equals() vs == Comparison Table

| Comparison | `==` | `equals()` |
|------------|------|-----------|
| **For primitives** | Compares values | N/A (primitives don't have methods) |
| **For objects** | Compares references (memory address) | Compares content (if overridden) |
| **String example** | `s1 == s2` checks if same object | `s1.equals(s2)` checks if same content |
| **Default behavior** | Always compares references | Compares references (unless overridden) |
| **Can be overridden?** | No | Yes |

```java
// Example demonstrating difference
String s1 = new String("Hello");
String s2 = new String("Hello");
String s3 = s1;

System.out.println(s1 == s2);      // false (different objects)
System.out.println(s1.equals(s2)); // true (same content)
System.out.println(s1 == s3);      // true (same reference)
```

## File I/O Operations

### Working with Objects and Serialization

```java
package fileio;

import java.io.Serializable;

// Object to be written to file must implement Serializable
public class YadnyeshObject implements Serializable {
    private static final long serialVersionUID = 1L;
    
    int id;
    String name;
    byte age;
    short marks;
    
    public YadnyeshObject(int id, String name, byte age, short marks) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.marks = marks;
    }
    
    @Override
    public String toString() {
        return "ID: " + id + ", Name: " + name + ", Age: " + age + ", Marks: " + marks;
    }
}

// DataInput class for creating sample data
import java.util.ArrayList;

public class DataInput {
    static ArrayList<YadnyeshObject> getDetails() {
        ArrayList<YadnyeshObject> dataList = new ArrayList<>();
        dataList.add(new YadnyeshObject(1, "kolte", (byte) 1, (short) 32));
        dataList.add(new YadnyeshObject(2, "kolte1", (byte) 3, (short) 12));
        dataList.add(new YadnyeshObject(3, "kolte2", (byte) 5, (short) 56));
        dataList.add(new YadnyeshObject(4, "kolte3", (byte) 1, (short) 89));
        dataList.add(new YadnyeshObject(5, "kolte4", (byte) 9, (short) 70));
        
        return dataList;
    }
}

// Writing objects to file
import java.io.*;
import java.util.ArrayList;

public class FileWriteExample {
    public static void main(String[] args) {
        ArrayList<YadnyeshObject> data = DataInput.getDetails();
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("data.dat"))) {
            oos.writeObject(data);
            System.out.println("Data written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// Reading objects from file
public class FileReadExample {
    public static void main(String[] args) {
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("data.dat"))) {
            @SuppressWarnings("unchecked")
            ArrayList<YadnyeshObject> data = (ArrayList<YadnyeshObject>) ois.readObject();
            
            for (YadnyeshObject obj : data) {
                System.out.println(obj);
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

### Working with Text Files (Character Streams)

#### Writing to Text File

```java
import java.io.*;

public class TextFileWriter {
    public static void main(String[] args) {
        // Method 1: FileWriter (basic)
        try (FileWriter writer = new FileWriter("output.txt")) {
            writer.write("Hello World\n");
            writer.write("This is line 2\n");
            System.out.println("File written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Method 2: BufferedWriter (efficient for large files)
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
            bw.write("First line");
            bw.newLine(); // Platform-independent line separator
            bw.write("Second line");
            bw.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Append to existing file
        try (FileWriter writer = new FileWriter("output.txt", true)) {
            writer.write("Appended line\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### Reading from Text File

```java
import java.io.*;

public class TextFileReader {
    public static void main(String[] args) {
        // Method 1: FileReader with BufferedReader (line by line)
        try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Method 2: Reading character by character
        try (FileReader fr = new FileReader("input.txt")) {
            int character;
            while ((character = fr.read()) != -1) {
                System.out.print((char) character);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---

### Working with Binary Files (Byte Streams)

#### Writing Binary Data

```java
import java.io.*;

public class BinaryFileWriter {
    public static void main(String[] args) {
        // Writing bytes
        try (FileOutputStream fos = new FileOutputStream("data.bin")) {
            byte[] data = {10, 20, 30, 40, 50};
            fos.write(data);
            System.out.println("Binary data written");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### Reading Binary Data

```java
import java.io.*;

public class BinaryFileReader {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("data.bin")) {
            int byteData;
            while ((byteData = fis.read()) != -1) {
                System.out.println(byteData);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---

### Working with Primitive Data Types (DataInputStream/DataOutputStream)

#### Writing Primitive Types

```java
import java.io.*;

public class PrimitiveDataWriter {
    public static void main(String[] args) {
        try (DataOutputStream dos = new DataOutputStream(
                new FileOutputStream("primitives.dat"))) {
            
            // Writing different primitive types
            dos.writeInt(100);
            dos.writeDouble(99.99);
            dos.writeBoolean(true);
            dos.writeChar('A');
            dos.writeFloat(3.14f);
            dos.writeLong(123456789L);
            dos.writeUTF("Hello World"); // Writing String
            
            System.out.println("Primitive data written");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### Reading Primitive Types

```java
import java.io.*;

public class PrimitiveDataReader {
    public static void main(String[] args) {
        try (DataInputStream dis = new DataInputStream(
                new FileInputStream("primitives.dat"))) {
            
            // IMPORTANT: Read in the same order as written
            int intValue = dis.readInt();
            double doubleValue = dis.readDouble();
            boolean boolValue = dis.readBoolean();
            char charValue = dis.readChar();
            float floatValue = dis.readFloat();
            long longValue = dis.readLong();
            String stringValue = dis.readUTF();
            
            System.out.println("Int: " + intValue);
            System.out.println("Double: " + doubleValue);
            System.out.println("Boolean: " + boolValue);
            System.out.println("Char: " + charValue);
            System.out.println("Float: " + floatValue);
            System.out.println("Long: " + longValue);
            System.out.println("String: " + stringValue);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Basic Programming Problems

#### Leap Year Check
```java
import java.util.Scanner;

public class LeapYear {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter year: ");
        int year = sc.nextInt();
        
        boolean isLeap = false;
        
        // Leap year conditions:
        // 1. Divisible by 4
        // 2. If divisible by 100, must also be divisible by 400
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    isLeap = true;
                }
            } else {
                isLeap = true;
            }
        }
        
        if (isLeap) {
            System.out.println(year + " is a Leap Year");
        } else {
            System.out.println(year + " is not a Leap Year");
        }
        
        sc.close();
    }
}
```

#### Character Type Check
```java
import java.util.Scanner;

public class CharacterType {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);
        
        if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z') {
            // Check if vowel or consonant
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||
                ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                System.out.println("Vowel");
            } else {
                System.out.println("Consonant");
            }
        } else if (ch >= '0' && ch <= '9') {
            System.out.println("Digit");
        } else {
            System.out.println("Special Character");
        }
        
        sc.close();
    }
}
```

#### Maximum Using Ternary Operator
```java
import java.util.Scanner;

public class MaxUsingTernary {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        int max = (a > b) ? a : b;
        
        System.out.println("Maximum: " + max);
        
        sc.close();
    }
}
```

---

## Real-World Application: Library Management System

```java
package assignment2;

// Book class with encapsulation
public class Book {
    private int bookId;
    private String title;
    private String author;
    private boolean isIssued;
    
    // Constructor
    public Book(int bookId, String title, String author, boolean isIssued) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.isIssued = isIssued;
    }
    
    // Display book status
    public void displayBookStatus() {
        System.out.println("Book ID: " + bookId);
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("Issued: " + (isIssued ? "Yes" : "No"));
        System.out.println("--------------------");
    }
    
    // Getters
    public boolean isIssued() {
        return isIssued;
    }
    
    public int getBookId() {
        return bookId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public String getAuthor() {
        return author;
    }
    
    // Setter
    public void setIsIssued(boolean issued) {
        this.isIssued = issued;
    }
}

// Library class to manage books
import java.util.ArrayList;
import java.util.Scanner;

public class Library {
    private ArrayList<Book> books;
    
    public Library() {
        books = new ArrayList<>();
    }
    
    // Add a book to library
    public void addBook(Book book) {
        books.add(book);
        System.out.println("Book added successfully!");
    }
    
    // Display all books
    public void displayAllBooks() {
        if (books.isEmpty()) {
            System.out.println("No books in library");
            return;
        }
        
        System.out.println("\n===== Library Books =====");
        for (Book book : books) {
            book.displayBookStatus();
        }
    }
    
    // Issue a book
    public void issueBook(int bookId) {
        for (Book book : books) {
            if (book.getBookId() == bookId) {
                if (!book.isIssued()) {
                    book.setIsIssued(true);
                    System.out.println("Book issued: " + book.getTitle());
                    return;
                } else {
                    System.out.println("Book already issued!");
                    return;
                }
            }
        }
        System.out.println("Book not found!");
    }
    
    // Return a book
    public void returnBook(int bookId) {
        for (Book book : books) {
            if (book.getBookId() == bookId) {
                if (book.isIssued()) {
                    book.setIsIssued(false);
                    System.out.println("Book returned: " + book.getTitle());
                    return;
                } else {
                    System.out.println("Book was not issued!");
                    return;
                }
            }
        }
        System.out.println("Book not found!");
    }
    
    // Search book by title
    public void searchByTitle(String title) {
        boolean found = false;
        for (Book book : books) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                book.displayBookStatus();
                found = true;
            }
        }
        if (!found) {
            System.out.println("No books found with title: " + title);
        }
    }
    
    public static void main(String[] args) {
        Library library = new Library();
        Scanner sc = new Scanner(System.in);
        
        // Add sample books
        library.addBook(new Book(1, "Java Programming", "James Gosling", false));
        library.addBook(new Book(2, "Python Basics", "Guido van Rossum", false));
        library.addBook(new Book(3, "Data Structures", "Robert Sedgewick", false));
        
        while (true) {
            System.out.println("\n===== Library Menu =====");
            System.out.println("1. Display All Books");
            System.out.println("2. Issue Book");
            System.out.println("3. Return Book");
            System.out.println("4. Search Book");
            System.out.println("5. Exit");
            System.out.print("Enter choice: ");
            
            int choice = sc.nextInt();
            
            switch (choice) {
                case 1:
                    library.displayAllBooks();
                    break;
                case 2:
                    System.out.print("Enter Book ID to issue: ");
                    int issueId = sc.nextInt();
                    library.issueBook(issueId);
                    break;
                case 3:
                    System.out.print("Enter Book ID to return: ");
                    int returnId = sc.nextInt();
                    library.returnBook(returnId);
                    break;
                case 4:
                    System.out.print("Enter book title: ");
                    sc.nextLine(); // Consume newline
                    String title = sc.nextLine();
                    library.searchByTitle(title);
                    break;
                case 5:
                    System.out.println("Exiting...");
                    sc.close();
                    return;
                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}
```

---

## Key Takeaways

### 1. **OOP Principles Mastered**
- ✅ Encapsulation: Hiding data and providing controlled access
- ✅ Inheritance: Code reusability through parent-child relationships
- ✅ Polymorphism: Same method, different behaviors
- ✅ Abstraction: Hiding implementation details

### 2. **Important Concepts**
- **Classes exist independently of objects** - they are blueprints
- **Constructors** have no return type and initialize objects
- **`this`** refers to current object; **`super`** refers to parent class
- **Static members** belong to class, not objects
- **Final** keyword prevents modification/inheritance/overriding
- **Access modifiers** control visibility: public > protected > default > private

### 3. **Best Practices Learned**
- Use meaningful variable and method names
- Encapsulate data (private variables + public methods)
- Override `toString()` method for better object representation
- Close resources (files, connections) in `finally` block or use try-with-resources
- Use `PreparedStatement` to prevent SQL injection
- Always initialize local variables before use

---

## MCQ Exam Key Learnings

### Important Points from Exams:
- **char** is always 16 bits in Java (Unicode)
- Type casting can cause overflow with smaller data types
- Local variables have **no default values** - must initialize
- **Unary operators** (`++`, `--`) have highest precedence
- **Static variables** are shared among all instances
- **Protected** members are accessible in subclass
- **Final methods** cannot be overridden
- **Final classes** cannot be inherited
- **Constructors cannot be static**
- **Private constructors** can be called within the same class (Singleton pattern)
- **Abstract methods** have no body - implementation in child class
- **Method overloading** is compile-time polymorphism
- **Method overriding** is runtime polymorphism

---
