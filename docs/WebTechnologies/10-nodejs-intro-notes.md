---
layout: default
title: Node.js Introduction
parent: Module 3 - Web Technologies
nav_order: 10
---

# Session 13: Introduction to Node.js

## 📚 What is Node.js?

**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server-side.

### Key Features:
- **Asynchronous & Event-driven** - Non-blocking I/O operations
- **Single-threaded** - Uses event loop for concurrency
- **Cross-platform** - Runs on Windows, macOS, Linux
- **npm** - World's largest package ecosystem
- **Fast execution** - V8 engine compiles JS to machine code

---

## 🌐 Browser JS vs Node.js


| Feature | Browser JavaScript | Node.js |
|---------|-------------------|---------|
| Environment | Browser | Server |
| DOM Access | ✅ Yes | ❌ No |
| window/document | ✅ Yes | ❌ No |
| File System | ❌ No | ✅ Yes |
| Network Sockets | ❌ No | ✅ Yes |
| Global Object | `window` | `global` |
| Module System | ES Modules | CommonJS + ES Modules |
| Engine | V8 (Chrome), SpiderMonkey (Firefox) | V8 |

### Global Objects in Node.js:


| Object | Description |
|--------|-------------|
| `global` | Global namespace object |
| `process` | Current Node.js process |
| `console` | Standard output |
| `Buffer` | Binary data handling |
| `__dirname` | Current directory path |
| `__filename` | Current file path |
| `module` | Current module reference |
| `exports` | Module exports shorthand |
| `require()` | Import modules |
| `setTimeout`, `setInterval` | Timers |

---

## 🚀 ECMAScript 2015 (ES6) Features

### let and const:

```javascript
// let - block scoped, reassignable
let count = 0;
count = 1;  // OK

// const - block scoped, not reassignable
const PI = 3.14159;
// PI = 3;  // Error!

// const with objects (properties can change)
const user = { name: 'John' };
user.name = 'Jane';  // OK
```

### Arrow Functions:

```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With body
const greet = (name) => {
    const message = `Hello, ${name}!`;
    return message;
};

// Single parameter (no parentheses)
const square = x => x * x;
```

### Template Literals:

```javascript
const name = 'John';
const age = 30;

// String interpolation
const message = `Hello, ${name}! You are ${age} years old.`;

// Multi-line strings
const html = `
    <div>
        <h1>Title</h1>
        <p>Content</p>
    </div>
`;

// Expression evaluation
const sum = `Sum: ${5 + 3}`;  // "Sum: 8"
```

### Destructuring:

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Object destructuring
const { name, age } = { name: 'John', age: 30 };

// With renaming
const { name: userName } = { name: 'John' };

// Default values
const { city = 'Unknown' } = {};

// Nested destructuring
const { address: { city } } = { address: { city: 'Mumbai' } };
```

### Spread Operator:

```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // { a: 1, b: 2, c: 3 }

// Function arguments
const numbers = [1, 2, 3];
Math.max(...numbers);  // 3
```

### Rest Parameters:

```javascript
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4);  // 10
```

### Default Parameters:

```javascript
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

greet();        // "Hello, Guest!"
greet('John');  // "Hello, John!"
```

### Object Shorthand:

```javascript
const name = 'John';
const age = 30;

// Shorthand property
const user = { name, age };
// Same as: { name: name, age: age }

// Shorthand method
const obj = {
    greet() {
        return 'Hello!';
    }
};
// Same as: greet: function() { ... }
```

### Classes:

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    static species = 'Homo sapiens';
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
}
```

### Promises:

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
        // or: reject(new Error('Failed'));
    }, 1000);
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

### async/await:

```javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### Modules (ES6):

```javascript
// math.js - Named exports
export const PI = 3.14159;
export function add(a, b) {
    return a + b;
}

// Default export
export default class Calculator { }

// app.js - Import
import Calculator, { PI, add } from './math.js';
import * as math from './math.js';
```

---

## 💻 Node.js REPL

**REPL (Read-Eval-Print Loop)** - Interactive Node.js shell.

### Starting REPL:

```bash
$ node
>
```

### REPL Commands:


| Command | Description |
|---------|-------------|
| `.help` | Show help |
| `.break` | Exit current expression |
| `.clear` | Clear context |
| `.exit` | Exit REPL |
| `.save filename` | Save session to file |
| `.load filename` | Load file into session |
| `_` | Previous result |

### REPL Example:

```javascript
> 2 + 3
5
> const name = 'John'
undefined
> name
'John'
> _ // previous result
'John'
> .exit
```

---

## 📦 Installing Node.js

### Download:
- Visit [nodejs.org](https://nodejs.org)
- Download LTS (Long Term Support) version
- Install with default options

### Verify Installation:

```bash
# Check Node.js version
$ node --version
v18.16.0

# Check npm version
$ npm --version
9.5.1
```

### Running JavaScript Files:

```bash
# Create file
$ echo "console.log('Hello, Node.js!')" > app.js

# Run file
$ node app.js
Hello, Node.js!
```

---

## 🖥️ Process Object

The `process` object provides information about the current Node.js process.

### Properties:

```javascript
// Current working directory
process.cwd();

// Platform (win32, darwin, linux)
process.platform;

// Node.js version
process.version;

// Environment variables
process.env.PATH;
process.env.NODE_ENV;

// Process ID
process.pid;

// Memory usage
process.memoryUsage();

// Uptime in seconds
process.uptime();
```

### Command Line Arguments:

```javascript
// node app.js arg1 arg2
process.argv[0];  // Path to Node.js
process.argv[1];  // Path to script
process.argv[2];  // 'arg1'
process.argv[3];  // 'arg2'

// Slice to get only user arguments
const args = process.argv.slice(2);
```

### Standard I/O:

```javascript
// Output
process.stdout.write('Hello\n');

// Input
process.stdin.on('data', (data) => {
    console.log('You typed:', data.toString());
});

// Error output
process.stderr.write('Error occurred\n');
```

### Exit Process:

```javascript
// Exit with success code
process.exit(0);

// Exit with error code
process.exit(1);

// Exit event
process.on('exit', (code) => {
    console.log(`Exiting with code: ${code}`);
});

// Uncaught exception
process.on('uncaughtException', (error) => {
    console.error('Uncaught:', error);
    process.exit(1);
});
```

---

## 📝 Basic Node.js Programs

### Hello World:

```javascript
// app.js
console.log('Hello, World!');
```

### Command Line Arguments:

```javascript
// greet.js
const name = process.argv[2] || 'Guest';
console.log(`Hello, ${name}!`);

// Run: node greet.js John
// Output: Hello, John!
```

### Simple Calculator:

```javascript
// calc.js
const [, , num1, operator, num2] = process.argv;

const a = parseFloat(num1);
const b = parseFloat(num2);

let result;
switch (operator) {
    case '+':
        result = a + b;
        break;
    case '-':
        result = a - b;
        break;
    case '*':
        result = a * b;
        break;
    case '/':
        result = a / b;
        break;
    default:
        console.log('Invalid operator');
        process.exit(1);
}

console.log(`${a} ${operator} ${b} = ${result}`);

// Run: node calc.js 5 + 3
// Output: 5 + 3 = 8
```

### FizzBuzz:

```javascript
// fizzbuzz.js
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log('foobar');
    } else if (i % 3 === 0) {
        console.log('foo');
    } else if (i % 5 === 0) {
        console.log('bar');
    } else {
        console.log(i);
    }
}
```

### Factorial (Recursive):

```javascript
// factorial.js
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

const num = parseInt(process.argv[2]);

if (isNaN(num) || num < 0) {
    console.log('Please provide a non-negative integer');
} else {
    console.log(`Factorial of ${num} is ${factorial(num)}`);
}

// Run: node factorial.js 5
// Output: Factorial of 5 is 120
```

### Fibonacci:

```javascript
// fibonacci.js
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const count = parseInt(process.argv[2]) || 10;
const series = [];

for (let i = 0; i < count; i++) {
    series.push(fibonacci(i));
}

console.log(`Fibonacci series (${count} terms):`, series.join(', '));

// Run: node fibonacci.js 10
// Output: Fibonacci series (10 terms): 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

---

## 🔄 Event Loop

Node.js uses a single-threaded event loop for handling asynchronous operations.

### Event Loop Phases:

```
   ┌───────────────────────────┐
┌─>│           timers          │  ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  ← I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  ← Internal
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  ← Retrieve I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  ← setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  ← socket.on('close')
   └───────────────────────────┘
```

### Example:

```javascript
console.log('1. Start');

setTimeout(() => {
    console.log('4. Timeout');
}, 0);

setImmediate(() => {
    console.log('5. Immediate');
});

Promise.resolve().then(() => {
    console.log('3. Promise');
});

process.nextTick(() => {
    console.log('2. Next Tick');
});

console.log('1.5. End');

// Output:
// 1. Start
// 1.5. End
// 2. Next Tick
// 3. Promise
// 4. Timeout (or 5, order may vary)
// 5. Immediate (or 4)
```

### Priority Order:
1. Synchronous code
2. `process.nextTick()`
3. Microtasks (Promises)
4. Macrotasks (setTimeout, setImmediate)

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **Node.js** runs JavaScript on the server using V8 engine
2. **Node.js is single-threaded** but uses event loop for async
3. **global** is Node.js equivalent of browser's **window**
4. **__dirname** gives current directory path
5. **__filename** gives current file path
6. **process.argv** contains command line arguments
7. **process.env** contains environment variables
8. **process.exit(code)** terminates with exit code
9. **REPL** = Read-Eval-Print Loop
10. **ES6 features**: let/const, arrow functions, template literals, destructuring
11. **Spread operator** (...) expands arrays/objects
12. **Rest parameters** (...args) collects arguments
13. **async/await** simplifies Promise handling
14. **process.nextTick()** runs before other async callbacks
15. **Event loop** handles async operations in phases
