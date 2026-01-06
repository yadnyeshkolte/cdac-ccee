---
layout: default
title: Node.js Async Programming
parent: Module 3 - Web Technologies
nav_order: 11
---

# Sessions 14 & 15: Node.js Asynchronous Programming

## 📚 Synchronous vs Asynchronous

### Synchronous (Blocking):
```javascript
// Each line waits for the previous to complete
console.log('Step 1');
const data = fs.readFileSync('file.txt');  // Blocks here
console.log('Step 2');  // Runs after file is read
console.log('Step 3');
// Output: Step 1 → Step 2 → Step 3
```

### Asynchronous (Non-blocking):
```javascript
// Doesn't wait, continues execution
console.log('Step 1');
fs.readFile('file.txt', (err, data) => {
    console.log('Step 3 (file read)');  // Runs when file is ready
});
console.log('Step 2');  // Runs immediately
// Output: Step 1 → Step 2 → Step 3
```

---

## 🔄 Callbacks

A **callback** is a function passed as an argument to another function, to be executed later.

### Basic Callback:

```javascript
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

greet('John', function() {
    console.log('Callback executed!');
});
```

### Node.js Error-First Callback Pattern:

```javascript
// Convention: callback(error, result)
function fetchData(callback) {
    setTimeout(() => {
        const error = null;
        const data = { name: 'John', age: 30 };
        callback(error, data);
    }, 1000);
}

fetchData((err, data) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Data:', data);
});
```

### Callback Hell (Pyramid of Doom):

```javascript
// Problem: Nested callbacks become unreadable
getUser(userId, (err, user) => {
    if (err) throw err;
    getOrders(user.id, (err, orders) => {
        if (err) throw err;
        getOrderDetails(orders[0].id, (err, details) => {
            if (err) throw err;
            getProductInfo(details.productId, (err, product) => {
                if (err) throw err;
                console.log(product);
            });
        });
    });
});
```

---

## ⏰ Timers

### setTimeout:

```javascript
// Execute once after delay
const timeoutId = setTimeout(() => {
    console.log('Executed after 2 seconds');
}, 2000);

// Cancel timeout
clearTimeout(timeoutId);

// setTimeout with parameters
setTimeout((name, age) => {
    console.log(`${name} is ${age}`);
}, 1000, 'John', 30);
```

### setInterval:

```javascript
// Execute repeatedly
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Count: ${count}`);
    if (count >= 5) {
        clearInterval(intervalId);
    }
}, 1000);

// Clear interval
clearInterval(intervalId);
```

### setImmediate:

```javascript
// Execute in the next iteration of event loop
setImmediate(() => {
    console.log('Immediate');
});

console.log('Before immediate');
// Output: Before immediate → Immediate
```

### process.nextTick:

```javascript
// Execute before other async callbacks
process.nextTick(() => {
    console.log('Next tick');
});

setImmediate(() => {
    console.log('Immediate');
});

console.log('Sync');
// Output: Sync → Next tick → Immediate
```

### Timer Order:

```javascript
setTimeout(() => console.log('Timeout'), 0);
setImmediate(() => console.log('Immediate'));
process.nextTick(() => console.log('Next Tick'));
Promise.resolve().then(() => console.log('Promise'));
console.log('Sync');

// Output:
// Sync
// Next Tick
// Promise
// Timeout (or Immediate - order may vary)
// Immediate (or Timeout)
```

---

## 🤝 Promises

A **Promise** represents a value that may be available now, later, or never.

### Promise States:
- **Pending** - Initial state
- **Fulfilled** - Completed successfully
- **Rejected** - Failed with error

### Creating Promises:

```javascript
const promise = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve({ data: 'Result' });
        } else {
            reject(new Error('Something went wrong'));
        }
    }, 1000);
});
```

### Consuming Promises:

```javascript
promise
    .then(result => {
        console.log('Success:', result);
        return result.data;  // Pass to next .then()
    })
    .then(data => {
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log('Cleanup (always runs)');
    });
```

### Promise Methods:

```javascript
// Create resolved promise
Promise.resolve('Value');
Promise.resolve({ data: 'Success' });

// Create rejected promise
Promise.reject(new Error('Failed'));

// Wait for all (all must resolve)
Promise.all([promise1, promise2, promise3])
    .then(results => {
        // results = [result1, result2, result3]
    })
    .catch(error => {
        // Any rejection
    });

// Wait for all (all settled, doesn't short-circuit)
Promise.allSettled([promise1, promise2])
    .then(results => {
        // results = [{ status: 'fulfilled', value: ... }, 
        //            { status: 'rejected', reason: ... }]
    });

// First to resolve (winner takes all)
Promise.race([promise1, promise2])
    .then(result => {
        // First resolved value
    });

// First to resolve successfully
Promise.any([promise1, promise2])
    .then(result => {
        // First successful result
    })
    .catch(error => {
        // All rejected (AggregateError)
    });
```

### Converting Callbacks to Promises:

```javascript
// Original callback-based function
function readFileCallback(path, callback) {
    fs.readFile(path, 'utf8', callback);
}

// Promisified version
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// Using util.promisify
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
```

### Promise Chaining:

```javascript
getUser(userId)
    .then(user => getOrders(user.id))
    .then(orders => getOrderDetails(orders[0].id))
    .then(details => getProductInfo(details.productId))
    .then(product => {
        console.log(product);
    })
    .catch(error => {
        console.error('Error in chain:', error);
    });
```

---

## ⚡ Async/Await

**async/await** is syntactic sugar for Promises, making async code look synchronous.

### Basic Syntax:

```javascript
// async function returns Promise
async function fetchData() {
    return 'Data';  // Automatically wrapped in Promise.resolve()
}

// await pauses execution until Promise resolves
async function processData() {
    const data = await fetchData();  // Waits here
    console.log(data);
}
```

### Error Handling:

```javascript
async function fetchUser() {
    try {
        const response = await fetch('/api/user');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;  // Re-throw if needed
    } finally {
        console.log('Cleanup');
    }
}
```

### Sequential vs Parallel:

```javascript
// Sequential (slower)
async function sequential() {
    const user = await getUser();      // Wait
    const orders = await getOrders();  // Then wait
    const products = await getProducts(); // Then wait
    return { user, orders, products };
}

// Parallel (faster)
async function parallel() {
    const [user, orders, products] = await Promise.all([
        getUser(),
        getOrders(),
        getProducts()
    ]);
    return { user, orders, products };
}
```

### Async Arrow Functions:

```javascript
const fetchData = async () => {
    const data = await fetch('/api/data');
    return data.json();
};

// In array methods
const urls = ['/api/1', '/api/2', '/api/3'];

// Sequential forEach (not ideal for async)
for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.json());
}

// Parallel map
const promises = urls.map(url => fetch(url));
const responses = await Promise.all(promises);
const data = await Promise.all(responses.map(r => r.json()));
```

### Async Iteration:

```javascript
// for-await-of for async iterables
async function processStream(stream) {
    for await (const chunk of stream) {
        console.log(chunk);
    }
}
```

### Top-Level Await (ES2022):

```javascript
// In ES Modules (.mjs or type: "module")
const data = await fetch('/api/data');
console.log(await data.json());
```

---

## 🎯 Event Emitters

Node.js built-in event system for handling custom events.

### Basic Usage:

```javascript
const EventEmitter = require('events');

// Create emitter instance
const emitter = new EventEmitter();

// Register event listener
emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emit event
emitter.emit('greet', 'John');  // Hello, John!

// One-time listener
emitter.once('connect', () => {
    console.log('Connected (only once)');
});

// Remove listener
const handler = () => console.log('Handler');
emitter.on('event', handler);
emitter.removeListener('event', handler);
// or: emitter.off('event', handler);

// Remove all listeners
emitter.removeAllListeners('event');
emitter.removeAllListeners();  // All events

// Get listener count
emitter.listenerCount('greet');

// Get listener functions
emitter.listeners('greet');
```

### Creating Custom Event Emitter:

```javascript
const EventEmitter = require('events');

class Database extends EventEmitter {
    constructor() {
        super();
        this.connection = null;
    }
    
    connect() {
        // Simulate connection
        setTimeout(() => {
            this.connection = true;
            this.emit('connected');
        }, 1000);
    }
    
    disconnect() {
        this.connection = false;
        this.emit('disconnected');
    }
    
    query(sql) {
        if (!this.connection) {
            this.emit('error', new Error('Not connected'));
            return;
        }
        // Simulate query
        setTimeout(() => {
            this.emit('data', { result: 'Query result' });
        }, 500);
    }
}

const db = new Database();

db.on('connected', () => console.log('Database connected'));
db.on('disconnected', () => console.log('Database disconnected'));
db.on('data', (result) => console.log('Data:', result));
db.on('error', (err) => console.error('Error:', err.message));

db.connect();
```

### EventEmitter in Streams:

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
    console.log('Finished reading');
});

readStream.on('error', (err) => {
    console.error('Error:', err);
});
```

---

## 🔄 Practical Examples

### Async File Operations:

```javascript
const fs = require('fs').promises;

async function processFiles() {
    try {
        // Read file
        const content = await fs.readFile('input.txt', 'utf8');
        
        // Process content
        const processed = content.toUpperCase();
        
        // Write file
        await fs.writeFile('output.txt', processed);
        
        console.log('File processed successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### Retry Logic:

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(`Attempt ${i + 1} failed`);
            if (i === retries - 1) throw error;
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
}
```

### Rate Limiting:

```javascript
async function fetchWithDelay(urls, delayMs = 1000) {
    const results = [];
    for (const url of urls) {
        const response = await fetch(url);
        results.push(await response.json());
        await new Promise(r => setTimeout(r, delayMs));
    }
    return results;
}
```

### Timeout Wrapper:

```javascript
function withTimeout(promise, timeoutMs) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), timeoutMs);
    });
    return Promise.race([promise, timeout]);
}

// Usage
try {
    const result = await withTimeout(fetch('/api/slow'), 5000);
} catch (error) {
    console.error(error.message);  // 'Timeout' or fetch error
}
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **Callbacks** are functions passed as arguments, executed later
2. **Error-first callback** convention: `callback(error, result)`
3. **Callback hell** = deeply nested callbacks
4. **Promise states**: pending, fulfilled, rejected
5. **Promise.all()** waits for all, rejects on any failure
6. **Promise.allSettled()** waits for all, never rejects
7. **Promise.race()** returns first settled (resolve or reject)
8. **Promise.any()** returns first successful
9. **async** function always returns a Promise
10. **await** pauses execution until Promise resolves
11. **try/catch** handles async errors with await
12. **setTimeout/setInterval** are timer functions
13. **process.nextTick()** runs before other async callbacks
14. **setImmediate()** runs in next event loop iteration
15. **EventEmitter** uses `.on()` to listen, `.emit()` to trigger
