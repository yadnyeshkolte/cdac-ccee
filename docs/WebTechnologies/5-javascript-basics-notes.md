---
layout: default
title: JavaScript Basics
parent: Module 3 - Web Technologies
nav_order: 5
---

# Session 5: JavaScript Basics

## 📚 Introduction to JavaScript

**JavaScript** - High-level, interpreted programming language for web development.

### Where JavaScript Runs:
- **Browser** - Client-side scripting (DOM manipulation)
- **Node.js** - Server-side JavaScript runtime
- **Mobile** - React Native, Ionic
- **Desktop** - Electron

### Adding JavaScript to HTML:

```html
<!-- Internal JavaScript -->
<script>
    console.log('Hello, World!');
</script>

<!-- External JavaScript (recommended) -->
<script src="app.js"></script>

<!-- Async loading (non-blocking) -->
<script src="app.js" async></script>

<!-- Defer loading (after DOM parsed) -->
<script src="app.js" defer></script>
```

### Script Placement:
- **`<head>`** - Blocks page rendering
- **End of `<body>`** - Better for performance
- **`defer`** - Loads async, executes after DOM ready
- **`async`** - Loads async, executes immediately when ready

---

## 📦 Variables

### Declaration Keywords:


| Keyword | Scope | Reassignable | Hoisting |
|---------|-------|--------------|----------|
| `var` | Function | Yes | Hoisted (undefined) |
| `let` | Block | Yes | Hoisted (TDZ) |
| `const` | Block | No | Hoisted (TDZ) |

> **TDZ** = Temporal Dead Zone (cannot access before declaration)

### Examples:

```javascript
// var - function scoped, can be redeclared
var name = 'John';
var name = 'Jane';  // OK
name = 'Bob';       // OK

// let - block scoped, cannot be redeclared
let age = 25;
// let age = 30;    // Error!
age = 30;           // OK

// const - block scoped, cannot be reassigned
const PI = 3.14159;
// PI = 3.14;       // Error!

// const with objects (properties can change)
const person = { name: 'John' };
person.name = 'Jane';  // OK
// person = {};        // Error!
```

### Hoisting:

```javascript
console.log(x);  // undefined (hoisted)
var x = 5;

console.log(y);  // ReferenceError (TDZ)
let y = 10;

console.log(z);  // ReferenceError (TDZ)
const z = 15;
```

---

## 📊 Data Types

### Primitive Types (Immutable):


| Type | Example | typeof |
|------|---------|--------|
| String | `'Hello'`, `"World"` | `"string"` |
| Number | `42`, `3.14`, `NaN`, `Infinity` | `"number"` |
| BigInt | `9007199254740991n` | `"bigint"` |
| Boolean | `true`, `false` | `"boolean"` |
| Undefined | `undefined` | `"undefined"` |
| Null | `null` | `"object"` (bug) |
| Symbol | `Symbol('id')` | `"symbol"` |

### Non-Primitive (Reference Types):


| Type | Example | typeof |
|------|---------|--------|
| Object | `{ name: 'John' }` | `"object"` |
| Array | `[1, 2, 3]` | `"object"` |
| Function | `function() {}` | `"function"` |

### Type Checking:

```javascript
typeof 'hello'      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" (known bug)
typeof {}           // "object"
typeof []           // "object"
typeof function(){} // "function"

// Check for array
Array.isArray([1,2,3])  // true

// Check for null
value === null          // true if null

// Check for NaN
Number.isNaN(NaN)       // true
isNaN('hello')          // true (coerces)
Number.isNaN('hello')   // false (strict)
```

---

## ➕ Operators

### Arithmetic Operators:


| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `5 + 3 = 8` |
| `-` | Subtraction | `5 - 3 = 2` |
| `*` | Multiplication | `5 * 3 = 15` |
| `/` | Division | `15 / 3 = 5` |
| `%` | Modulus (remainder) | `17 % 5 = 2` |
| `**` | Exponentiation | `2 ** 3 = 8` |
| `++` | Increment | `x++` or `++x` |
| `--` | Decrement | `x--` or `--x` |

### Comparison Operators:


| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal (with coercion) | `5 == '5'` → `true` |
| `===` | Strict equal (no coercion) | `5 === '5'` → `false` |
| `!=` | Not equal | `5 != '6'` → `true` |
| `!==` | Strict not equal | `5 !== '5'` → `true` |
| `>` | Greater than | `5 > 3` → `true` |
| `<` | Less than | `5 < 3` → `false` |
| `>=` | Greater than or equal | `5 >= 5` → `true` |
| `<=` | Less than or equal | `5 <= 3` → `false` |

### Logical Operators:


| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | AND | `true && false` → `false` |
| `\|\|` | OR | `true \|\| false` → `true` |
| `!` | NOT | `!true` → `false` |
| `??` | Nullish coalescing | `null ?? 'default'` → `'default'` |

### Assignment Operators:


| Operator | Example | Equivalent |
|----------|---------|------------|
| `=` | `x = 5` | - |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 3` | `x = x - 3` |
| `*=` | `x *= 3` | `x = x * 3` |
| `/=` | `x /= 3` | `x = x / 3` |
| `%=` | `x %= 3` | `x = x % 3` |
| `**=` | `x **= 2` | `x = x ** 2` |

### Ternary Operator:

```javascript
// condition ? valueIfTrue : valueIfFalse
let result = age >= 18 ? 'Adult' : 'Minor';
```

---

## 🔀 Control Structures

### If-Else:

```javascript
if (condition1) {
    // code
} else if (condition2) {
    // code
} else {
    // code
}

// Short-circuit evaluation
let name = user && user.name;  // if user exists, get name
let value = input || 'default'; // if input falsy, use default
```

### Switch:

```javascript
switch (expression) {
    case value1:
        // code
        break;
    case value2:
    case value3:  // multiple cases
        // code
        break;
    default:
        // code
}
```

### Loops:

```javascript
// for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// while loop
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// do-while loop (runs at least once)
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 5);

// for...of (arrays, strings, iterables)
for (let item of [1, 2, 3]) {
    console.log(item);
}

// for...in (object properties)
for (let key in {a: 1, b: 2}) {
    console.log(key);
}

// break - exit loop
// continue - skip to next iteration
```

---

## 🔠 Strings

### String Creation:

```javascript
let str1 = 'Single quotes';
let str2 = "Double quotes";
let str3 = `Template literal ${variable}`;  // ES6
```

### String Properties & Methods:


| Property/Method | Description | Example |
|-----------------|-------------|---------|
| `length` | String length | `'hello'.length` → `5` |
| `charAt(i)` | Character at index | `'hello'.charAt(0)` → `'h'` |
| `charCodeAt(i)` | Unicode at index | `'A'.charCodeAt(0)` → `65` |
| `[i]` | Character at index | `'hello'[0]` → `'h'` |
| `toUpperCase()` | Convert to uppercase | `'hello'.toUpperCase()` → `'HELLO'` |
| `toLowerCase()` | Convert to lowercase | `'HELLO'.toLowerCase()` → `'hello'` |
| `trim()` | Remove whitespace | `'  hi  '.trim()` → `'hi'` |
| `trimStart()` | Trim left | `'  hi'.trimStart()` → `'hi'` |
| `trimEnd()` | Trim right | `'hi  '.trimEnd()` → `'hi'` |
| `indexOf(str)` | First occurrence | `'hello'.indexOf('l')` → `2` |
| `lastIndexOf(str)` | Last occurrence | `'hello'.lastIndexOf('l')` → `3` |
| `includes(str)` | Contains substring | `'hello'.includes('ell')` → `true` |
| `startsWith(str)` | Starts with | `'hello'.startsWith('he')` → `true` |
| `endsWith(str)` | Ends with | `'hello'.endsWith('lo')` → `true` |
| `slice(start, end)` | Extract substring | `'hello'.slice(1, 4)` → `'ell'` |
| `substring(start, end)` | Extract substring | `'hello'.substring(1, 4)` → `'ell'` |
| `substr(start, length)` | Extract by length | `'hello'.substr(1, 3)` → `'ell'` |
| `split(sep)` | Split to array | `'a,b,c'.split(',')` → `['a','b','c']` |
| `replace(old, new)` | Replace first | `'hello'.replace('l', 'L')` → `'heLlo'` |
| `replaceAll(old, new)` | Replace all | `'hello'.replaceAll('l', 'L')` → `'heLLo'` |
| `repeat(n)` | Repeat string | `'hi'.repeat(3)` → `'hihihi'` |
| `padStart(len, char)` | Pad start | `'5'.padStart(2, '0')` → `'05'` |
| `padEnd(len, char)` | Pad end | `'5'.padEnd(2, '0')` → `'50'` |
| `concat(str)` | Concatenate | `'Hello'.concat(' World')` |

### Template Literals (ES6):

```javascript
let name = 'John';
let age = 25;

// String interpolation
let message = `Hello, ${name}! You are ${age} years old.`;

// Multi-line strings
let html = `
    <div>
        <h1>Title</h1>
        <p>Content</p>
    </div>
`;

// Expression in template
let result = `Sum: ${5 + 3}`;  // "Sum: 8"
```

---

## 🔢 Numbers

### Number Types:

```javascript
let integer = 42;
let float = 3.14;
let negative = -10;
let scientific = 5e6;     // 5000000
let hex = 0xFF;           // 255
let binary = 0b1010;      // 10
let octal = 0o17;         // 15
let bigInt = 9007199254740991n;
```

### Special Number Values:


| Value | Description |
|-------|-------------|
| `Infinity` | Positive infinity |
| `-Infinity` | Negative infinity |
| `NaN` | Not a Number |
| `Number.MAX_VALUE` | Largest number |
| `Number.MIN_VALUE` | Smallest positive number |
| `Number.MAX_SAFE_INTEGER` | 2^53 - 1 |
| `Number.MIN_SAFE_INTEGER` | -(2^53 - 1) |

### Number Methods:


| Method | Description | Example |
|--------|-------------|---------|
| `toString()` | Convert to string | `(255).toString(16)` → `'ff'` |
| `toFixed(n)` | Fixed decimals | `(3.14159).toFixed(2)` → `'3.14'` |
| `toPrecision(n)` | Total digits | `(3.14159).toPrecision(3)` → `'3.14'` |
| `parseInt(str)` | Parse integer | `parseInt('42px')` → `42` |
| `parseFloat(str)` | Parse float | `parseFloat('3.14')` → `3.14` |
| `Number(val)` | Convert to number | `Number('42')` → `42` |
| `isNaN(val)` | Check NaN | `isNaN('hello')` → `true` |
| `isFinite(val)` | Check finite | `isFinite(Infinity)` → `false` |
| `isInteger(val)` | Check integer | `Number.isInteger(5)` → `true` |

### Math Object:


| Method | Description | Example |
|--------|-------------|---------|
| `Math.PI` | Pi constant | `3.141592653589793` |
| `Math.E` | Euler's number | `2.718281828459045` |
| `Math.abs(x)` | Absolute value | `Math.abs(-5)` → `5` |
| `Math.round(x)` | Round nearest | `Math.round(4.5)` → `5` |
| `Math.floor(x)` | Round down | `Math.floor(4.9)` → `4` |
| `Math.ceil(x)` | Round up | `Math.ceil(4.1)` → `5` |
| `Math.trunc(x)` | Remove decimals | `Math.trunc(4.9)` → `4` |
| `Math.pow(x, y)` | Power | `Math.pow(2, 3)` → `8` |
| `Math.sqrt(x)` | Square root | `Math.sqrt(16)` → `4` |
| `Math.cbrt(x)` | Cube root | `Math.cbrt(27)` → `3` |
| `Math.min(...args)` | Minimum | `Math.min(1, 2, 3)` → `1` |
| `Math.max(...args)` | Maximum | `Math.max(1, 2, 3)` → `3` |
| `Math.random()` | Random [0, 1) | `Math.random()` → `0.123...` |
| `Math.sign(x)` | Sign (-1, 0, 1) | `Math.sign(-5)` → `-1` |
| `Math.log(x)` | Natural log | `Math.log(Math.E)` → `1` |
| `Math.log10(x)` | Base 10 log | `Math.log10(100)` → `2` |

### Random Number in Range:

```javascript
// Random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

## 📅 Dates

### Creating Dates:

```javascript
// Current date/time
let now = new Date();

// From string
let date1 = new Date('2024-01-15');
let date2 = new Date('January 15, 2024');
let date3 = new Date('01/15/2024');

// From components (month is 0-indexed!)
let date4 = new Date(2024, 0, 15);  // Jan 15, 2024
let date5 = new Date(2024, 0, 15, 10, 30, 0);  // 10:30:00

// From milliseconds (since Jan 1, 1970)
let date6 = new Date(1705276800000);
```

### Date Methods:


| Method | Description |
|--------|-------------|
| `getFullYear()` | 4-digit year |
| `getMonth()` | Month (0-11) |
| `getDate()` | Day of month (1-31) |
| `getDay()` | Day of week (0-6, Sun=0) |
| `getHours()` | Hours (0-23) |
| `getMinutes()` | Minutes (0-59) |
| `getSeconds()` | Seconds (0-59) |
| `getMilliseconds()` | Milliseconds (0-999) |
| `getTime()` | Milliseconds since epoch |
| `setFullYear(y)` | Set year |
| `setMonth(m)` | Set month |
| `setDate(d)` | Set day |
| `setHours(h)` | Set hours |
| `toDateString()` | Readable date |
| `toTimeString()` | Readable time |
| `toISOString()` | ISO format |
| `toLocaleDateString()` | Locale date |
| `toLocaleTimeString()` | Locale time |

### Date Formatting:

```javascript
let date = new Date();

// ISO format
date.toISOString();  // "2024-01-15T10:30:00.000Z"

// Locale strings
date.toLocaleDateString('en-US');  // "1/15/2024"
date.toLocaleDateString('en-GB');  // "15/01/2024"
date.toLocaleDateString('en-IN');  // "15/1/2024"

// Custom formatting with options
date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});  // "Monday, January 15, 2024"
```

---

## 📋 Arrays

### Creating Arrays:

```javascript
let arr1 = [1, 2, 3];
let arr2 = new Array(1, 2, 3);
let arr3 = new Array(5);  // Array with 5 empty slots
let arr4 = Array.from('hello');  // ['h', 'e', 'l', 'l', 'o']
let arr5 = Array.of(1, 2, 3);  // [1, 2, 3]
```

### Accessing Elements:

```javascript
let arr = [10, 20, 30, 40, 50];

arr[0];      // 10 (first)
arr[4];      // 50 (last)
arr[arr.length - 1];  // 50 (last)
arr.at(-1);  // 50 (last, ES2022)
arr.at(-2);  // 40 (second last)
```

### Array Properties & Methods:


| Method | Description | Mutates | Returns |
|--------|-------------|---------|---------|
| `length` | Array length | - | Number |
| `push(item)` | Add to end | ✅ | New length |
| `pop()` | Remove from end | ✅ | Removed item |
| `unshift(item)` | Add to start | ✅ | New length |
| `shift()` | Remove from start | ✅ | Removed item |
| `splice(i, n, ...items)` | Remove/insert | ✅ | Removed items |
| `slice(start, end)` | Extract portion | ❌ | New array |
| `concat(arr)` | Merge arrays | ❌ | New array |
| `join(sep)` | Join to string | ❌ | String |
| `reverse()` | Reverse order | ✅ | Same array |
| `sort()` | Sort elements | ✅ | Same array |
| `indexOf(item)` | First index of | ❌ | Index or -1 |
| `lastIndexOf(item)` | Last index of | ❌ | Index or -1 |
| `includes(item)` | Contains item | ❌ | Boolean |
| `find(fn)` | Find first match | ❌ | Element or undefined |
| `findIndex(fn)` | Index of first match | ❌ | Index or -1 |
| `filter(fn)` | Filter elements | ❌ | New array |
| `map(fn)` | Transform elements | ❌ | New array |
| `reduce(fn, init)` | Reduce to value | ❌ | Single value |
| `forEach(fn)` | Loop each element | ❌ | undefined |
| `every(fn)` | All match condition | ❌ | Boolean |
| `some(fn)` | Any matches condition | ❌ | Boolean |
| `fill(val, start, end)` | Fill with value | ✅ | Same array |
| `flat(depth)` | Flatten nested | ❌ | New array |
| `flatMap(fn)` | Map then flatten | ❌ | New array |

### Array Method Examples:

```javascript
let arr = [1, 2, 3, 4, 5];

// map - transform each element
arr.map(x => x * 2);  // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
arr.filter(x => x > 2);  // [3, 4, 5]

// reduce - accumulate to single value
arr.reduce((sum, x) => sum + x, 0);  // 15

// find - first element passing test
arr.find(x => x > 3);  // 4

// some - any element passes test
arr.some(x => x > 4);  // true

// every - all elements pass test
arr.every(x => x > 0);  // true

// forEach - loop (cannot break)
arr.forEach((val, i) => console.log(i, val));

// sort (mutates!)
[3, 1, 2].sort();  // [1, 2, 3] (string comparison)
[3, 1, 10].sort((a, b) => a - b);  // [1, 3, 10] (numeric)

// splice - remove/insert at index
let arr2 = [1, 2, 3, 4, 5];
arr2.splice(2, 1);       // Removes 1 item at index 2
arr2.splice(2, 0, 'a');  // Insert 'a' at index 2
```

### Spread Operator:

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// Combine arrays
let combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// Copy array
let copy = [...arr1];

// Max of array
Math.max(...arr1);  // 3
```

### Destructuring:

```javascript
let arr = [1, 2, 3, 4, 5];

// Basic destructuring
let [a, b, c] = arr;  // a=1, b=2, c=3

// Skip elements
let [first, , third] = arr;  // first=1, third=3

// Rest pattern
let [head, ...rest] = arr;  // head=1, rest=[2,3,4,5]

// Default values
let [x = 10, y = 20] = [5];  // x=5, y=20

// Swap variables
[a, b] = [b, a];
```

---

## ⏱️ JavaScript Scope

### Scope Types:


| Scope | Description |
|-------|-------------|
| Global | Accessible everywhere |
| Function | Inside function only |
| Block | Inside `{}` (let/const) |
| Module | Inside module file |

### Examples:

```javascript
// Global scope
var globalVar = 'global';
let globalLet = 'global';

function example() {
    // Function scope
    var functionVar = 'function';
    let functionLet = 'function';
    
    if (true) {
        // Block scope
        var blockVar = 'block';    // Hoisted to function
        let blockLet = 'block';    // Block scoped
        const blockConst = 'block'; // Block scoped
    }
    
    console.log(blockVar);    // 'block' (var is function scoped)
    // console.log(blockLet); // Error! Block scoped
}
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **var** is function-scoped, **let/const** are block-scoped
2. **const** cannot be reassigned, but object properties can be modified
3. **===** strict equality (no type coercion), **==** loose equality
4. **typeof null** returns `"object"` (historical bug)
5. **NaN === NaN** is `false`, use **Number.isNaN()** to check
6. **Array.isArray([])** returns `true`, typeof returns `"object"`
7. **map()** returns new array, **forEach()** returns undefined
8. **filter()** returns elements matching condition
9. **reduce()** accumulates array to single value
10. **splice()** mutates array, **slice()** doesn't
11. **push/pop** work on end, **shift/unshift** work on start
12. **Template literals** use backticks and `${expression}`
13. **Spread operator** `...` expands arrays/objects
14. **Destructuring** extracts values from arrays/objects
15. **Hoisting** moves declarations to top (var: undefined, let/const: TDZ)
