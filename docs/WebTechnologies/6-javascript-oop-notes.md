---
layout: default
title: JavaScript OOP
parent: Module 3 - Web Technologies
nav_order: 6
---

# Sessions 6 & 7: JavaScript Object-Oriented Programming

## 📚 Objects in JavaScript

**Objects** are collections of key-value pairs (properties and methods).

### Creating Objects:

```javascript
// Object literal (most common)
const person = {
    name: 'John',
    age: 30,
    greet: function() {
        return `Hello, I'm ${this.name}`;
    }
};

// Using new Object()
const obj = new Object();
obj.name = 'John';

// Object.create()
const proto = { greet: function() { return 'Hello'; } };
const obj2 = Object.create(proto);

// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}
const john = new Person('John', 30);

// ES6 Class
class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const jane = new PersonClass('Jane', 25);
```

---

## 🔑 Object Properties

### Accessing Properties:

```javascript
const person = { name: 'John', age: 30 };

// Dot notation
person.name;  // 'John'

// Bracket notation (for dynamic keys)
person['name'];  // 'John'
let key = 'age';
person[key];  // 30

// Adding properties
person.city = 'Mumbai';
person['country'] = 'India';

// Deleting properties
delete person.city;

// Checking property existence
'name' in person;  // true
person.hasOwnProperty('name');  // true (own property only)
```

### Property Descriptors:

```javascript
const obj = {};

Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: true,      // Can modify?
    enumerable: true,    // Shows in for...in?
    configurable: true   // Can delete/redefine?
});

// Get descriptor
Object.getOwnPropertyDescriptor(obj, 'name');

// Define multiple properties
Object.defineProperties(obj, {
    age: { value: 30, writable: true },
    city: { value: 'Mumbai', writable: false }
});
```

### Getters and Setters:

```javascript
const person = {
    firstName: 'John',
    lastName: 'Doe',
    
    // Getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    // Setter
    set fullName(value) {
        const parts = value.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

console.log(person.fullName);  // 'John Doe'
person.fullName = 'Jane Smith';
console.log(person.firstName);  // 'Jane'
```

---

## 📋 Object Methods


| Method | Description |
|--------|-------------|
| `Object.keys(obj)` | Array of property names |
| `Object.values(obj)` | Array of property values |
| `Object.entries(obj)` | Array of [key, value] pairs |
| `Object.assign(target, ...sources)` | Copy properties |
| `Object.freeze(obj)` | Prevent all modifications |
| `Object.seal(obj)` | Prevent add/delete (can modify) |
| `Object.isFrozen(obj)` | Check if frozen |
| `Object.isSealed(obj)` | Check if sealed |
| `Object.fromEntries(arr)` | Create object from entries |

### Examples:

```javascript
const person = { name: 'John', age: 30 };

Object.keys(person);    // ['name', 'age']
Object.values(person);  // ['John', 30]
Object.entries(person); // [['name', 'John'], ['age', 30]]

// Copy objects
const copy = Object.assign({}, person);
const copy2 = { ...person };  // Spread operator

// Freeze
Object.freeze(person);
person.name = 'Jane';  // Silently fails (strict mode: error)

// Check property
Object.hasOwn(person, 'name');  // true (ES2022)
```

---

## 🔧 Functions

### Function Declaration:

```javascript
// Function declaration (hoisted)
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression (not hoisted)
const greet2 = function(name) {
    return `Hello, ${name}!`;
};

// Named function expression
const greet3 = function sayHello(name) {
    return `Hello, ${name}!`;
};

// Arrow function (ES6)
const greet4 = (name) => `Hello, ${name}!`;

// Arrow function with body
const greet5 = (name) => {
    const message = `Hello, ${name}!`;
    return message;
};
```

### Function Parameters:

```javascript
// Default parameters
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10

// Destructuring in parameters
function printUser({ name, age }) {
    console.log(`${name} is ${age} years old`);
}
printUser({ name: 'John', age: 30 });
```

### Function Invocation:

```javascript
// Regular call
greet('John');

// Method call
const obj = { greet: function() { return this; } };
obj.greet();  // obj

// call() - specify 'this', arguments as list
greet.call(null, 'John');

// apply() - specify 'this', arguments as array
greet.apply(null, ['John']);

// bind() - create new function with fixed 'this'
const boundGreet = greet.bind(null, 'John');
boundGreet();  // 'Hello, John!'
```

---

## 🎯 Arrow Functions

```javascript
// Concise syntax
const add = (a, b) => a + b;

// Single parameter (no parentheses needed)
const square = x => x * x;

// No parameters
const random = () => Math.random();

// Returning object (wrap in parentheses)
const createUser = (name) => ({ name: name, id: Date.now() });

// Multi-line body
const process = (data) => {
    const result = data.map(x => x * 2);
    return result.filter(x => x > 10);
};
```

### Arrow Function Differences:


| Feature | Regular Function | Arrow Function |
|---------|------------------|----------------|
| `this` binding | Dynamic (caller) | Lexical (surrounding scope) |
| `arguments` object | ✅ Yes | ❌ No (use rest) |
| Constructor (`new`) | ✅ Yes | ❌ No |
| `prototype` property | ✅ Yes | ❌ No |
| Can be generator | ✅ Yes | ❌ No |

### `this` in Arrow Functions:

```javascript
const obj = {
    name: 'Object',
    regularFn: function() {
        console.log(this.name);  // 'Object'
    },
    arrowFn: () => {
        console.log(this.name);  // undefined (window/global)
    },
    delayed: function() {
        setTimeout(() => {
            console.log(this.name);  // 'Object' (lexical this)
        }, 100);
    }
};
```

---

## 🔒 Closures

A **closure** is a function that remembers its lexical scope even when executed outside that scope.

```javascript
// Basic closure
function outer() {
    const message = 'Hello';  // Outer variable
    
    function inner() {
        console.log(message);  // Accesses outer variable
    }
    
    return inner;
}

const fn = outer();
fn();  // 'Hello' - closure remembers 'message'

// Counter with closure
function createCounter() {
    let count = 0;  // Private variable
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.getCount();   // 2

// Closure in loops (common pitfall)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // 3, 3, 3 (var)
}

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // 0, 1, 2 (let)
}

// Fix with IIFE
for (var i = 0; i < 3; i++) {
    ((j) => {
        setTimeout(() => console.log(j), 100);
    })(i);  // 0, 1, 2
}
```

### Use Cases for Closures:
1. **Data Privacy** - Encapsulate private variables
2. **Factory Functions** - Create specialized functions
3. **Memoization** - Cache expensive calculations
4. **Event Handlers** - Maintain state between events
5. **Module Pattern** - Create self-contained modules

---

## 🏗️ Constructor Functions

```javascript
// Constructor function (capitalize first letter by convention)
function Person(name, age) {
    // 'this' refers to new object being created
    this.name = name;
    this.age = age;
    
    // Method (defined on each instance - inefficient)
    this.greet = function() {
        return `Hello, I'm ${this.name}`;
    };
}

// Create instance with 'new'
const john = new Person('John', 30);
const jane = new Person('Jane', 25);

console.log(john.name);    // 'John'
console.log(john.greet()); // "Hello, I'm John"

// Check instance
john instanceof Person;  // true
```

### What `new` Does:
1. Creates new empty object `{}`
2. Sets prototype to constructor's `prototype`
3. Binds `this` to the new object
4. Returns the new object (unless function returns object)

---

## 🔗 Prototypes

Every JavaScript object has a hidden `[[Prototype]]` property linking to another object.

```javascript
// Constructor function
function Animal(name) {
    this.name = name;
}

// Add method to prototype (shared by all instances)
Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

const dog = new Animal('Dog');
const cat = new Animal('Cat');

dog.speak();  // 'Dog makes a sound'
cat.speak();  // 'Cat makes a sound'

// Both share the same method
dog.speak === cat.speak;  // true

// Prototype chain
dog.__proto__ === Animal.prototype;  // true
Animal.prototype.__proto__ === Object.prototype;  // true
Object.prototype.__proto__ === null;  // true (end of chain)
```

### Prototype Methods:

```javascript
// Get prototype
Object.getPrototypeOf(dog);  // Animal.prototype

// Set prototype
Object.setPrototypeOf(dog, newProto);

// Check prototype
Animal.prototype.isPrototypeOf(dog);  // true

// Check own property
dog.hasOwnProperty('name');  // true
dog.hasOwnProperty('speak');  // false (on prototype)
```

---

## 🏛️ ES6 Classes

Classes are syntactic sugar over prototype-based inheritance.

```javascript
class Person {
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Instance method
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    // Getter
    get info() {
        return `${this.name} (${this.age})`;
    }
    
    // Setter
    set info(value) {
        [this.name, this.age] = value.split(',');
    }
    
    // Static method (called on class, not instance)
    static create(name, age) {
        return new Person(name, age);
    }
    
    // Static property
    static species = 'Homo sapiens';
}

const john = new Person('John', 30);
john.greet();           // "Hello, I'm John"
john.info;              // "John (30)"
Person.species;         // "Homo sapiens"
Person.create('Jane', 25);  // New Person instance
```

---

## 🔄 Inheritance

### Prototype-based Inheritance:

```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

function Dog(name, breed) {
    Animal.call(this, name);  // Call parent constructor
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific method
Dog.prototype.bark = function() {
    return `${this.name} barks!`;
};

const dog = new Dog('Rex', 'German Shepherd');
dog.speak();  // 'Rex makes a sound' (inherited)
dog.bark();   // 'Rex barks!' (own method)
```

### Class-based Inheritance (ES6):

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    speak() {
        return `${this.name} barks`;
    }
    
    // Call parent method
    parentSpeak() {
        return super.speak();
    }
    
    // Own method
    fetch() {
        return `${this.name} fetches the ball`;
    }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak();       // 'Rex barks' (overridden)
dog.parentSpeak(); // 'Rex makes a sound' (parent)
dog.fetch();       // 'Rex fetches the ball'
dog instanceof Dog;     // true
dog instanceof Animal;  // true
```

---

## 🔐 Encapsulation

Hiding internal details and exposing only necessary interface.

### Private Properties (ES2022):

```javascript
class BankAccount {
    #balance = 0;  // Private field
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return amount;
        }
        return 0;
    }
    
    get balance() {
        return this.#balance;
    }
    
    // Private method
    #validateAmount(amount) {
        return amount > 0;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.balance);  // 1500
// account.#balance = 0;       // SyntaxError: private field
```

### Closure-based Encapsulation:

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // Private via closure
    
    return {
        deposit(amount) {
            if (amount > 0) balance += amount;
        },
        withdraw(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return amount;
            }
            return 0;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
account.deposit(500);
account.getBalance();  // 1500
// account.balance is undefined (private)
```

---

## 🎭 Abstraction

Hiding complexity and showing only essential features.

```javascript
class Vehicle {
    constructor(type) {
        if (this.constructor === Vehicle) {
            throw new Error('Vehicle is abstract');
        }
        this.type = type;
    }
    
    // Abstract method (must be overridden)
    start() {
        throw new Error('start() must be implemented');
    }
    
    // Concrete method
    getType() {
        return this.type;
    }
}

class Car extends Vehicle {
    constructor() {
        super('Car');
    }
    
    start() {
        return 'Car engine starts';
    }
}

// const v = new Vehicle('Test');  // Error: Vehicle is abstract
const car = new Car();
car.start();    // 'Car engine starts'
car.getType();  // 'Car'
```

---

## 🔄 Polymorphism

Same interface, different implementations.

```javascript
class Shape {
    area() {
        return 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
}

// Polymorphism in action
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Circle(3)
];

shapes.forEach(shape => printArea(shape));
// Area: 78.53981633974483
// Area: 24
// Area: 28.274333882308138
```

---

## 🏭 Object Prototypes & Prototype Chain

```
                    null
                      ↑
              Object.prototype
                      ↑
              Animal.prototype
                      ↑
               Dog.prototype
                      ↑
                 dog instance
```

### Prototype Chain Lookup:
1. Check object's own properties
2. Check object's `[[Prototype]]`
3. Continue up the chain
4. If not found, return `undefined`

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **Objects** are key-value pairs (properties + methods)
2. **Dot notation** for known keys, **bracket notation** for dynamic keys
3. **`this`** in regular function depends on how it's called
4. **Arrow functions** inherit `this` from surrounding scope
5. **Closures** remember variables from outer scope
6. **Constructor functions** create objects with `new` keyword
7. **Prototype** allows shared methods across instances
8. **`class`** is syntactic sugar over prototypes
9. **`extends`** for inheritance, **`super()`** calls parent constructor
10. **Private fields** use `#` prefix (ES2022)
11. **`Object.freeze()`** prevents all changes
12. **`Object.seal()`** prevents add/delete but allows modification
13. **Static methods** belong to class, not instances
14. **`instanceof`** checks prototype chain
15. **Getters/Setters** use `get`/`set` keywords
