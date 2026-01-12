---
layout: default
title: Node.js Modules & npm
parent: Module 3 - Web Technologies
nav_order: 12
---

# Session 16: Node.js Modules & npm

## 📚 Node.js Module System

A **module** is a reusable piece of code encapsulated in its own file.

### Module Types:
1. **Core Modules** - Built into Node.js (fs, http, path, etc.)
2. **Local Modules** - Created by you
3. **Third-party Modules** - Installed via npm

---

## 📦 CommonJS Modules

### Exporting:

```javascript
// math.js

// Method 1: module.exports object
module.exports = {
    PI: 3.14159,
    add: function(a, b) {
        return a + b;
    },
    subtract: (a, b) => a - b
};

// Method 2: exports shorthand
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;

// Method 3: Single export
module.exports = function(a, b) {
    return a + b;
};

// Method 4: Class export
module.exports = class Calculator {
    add(a, b) { return a + b; }
};
```

### Importing (require):

```javascript
// app.js

// Import entire module
const math = require('./math');
console.log(math.add(5, 3));
console.log(math.PI);

// Destructuring import
const { add, subtract, PI } = require('./math');
console.log(add(5, 3));

// Import from node_modules
const express = require('express');

// Import core modules
const fs = require('fs');
const path = require('path');
```

### Module Resolution:

```javascript
// 1. Core modules (built-in)
const fs = require('fs');

// 2. File modules (with path)
const local = require('./local');      // ./local.js
const parent = require('../parent');   // Parent directory

// 3. Folder as module
const utils = require('./utils');      // ./utils/index.js

// 4. node_modules
const express = require('express');    // node_modules/express
```

### module Object:

```javascript
console.log(module);
/*
Module {
    id: '.',
    path: '/path/to/file',
    exports: {},
    parent: null,
    filename: '/path/to/file/app.js',
    loaded: false,
    children: [],
    paths: [...]
}
*/

// Check if module is main entry point
if (require.main === module) {
    console.log('Run directly');
} else {
    console.log('Required by another module');
}
```

---

## 🔄 ES Modules (ESM)

### Enabling ES Modules:

```json
// package.json - add type field
{
    "type": "module"
}
```

Or use `.mjs` extension.

### Exporting:

```javascript
// math.mjs

// Named exports
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export const subtract = (a, b) => a - b;

// Default export (one per file)
export default class Calculator {
    add(a, b) { return a + b; }
}

// Export list
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
export { multiply, divide };

// Re-export from another module
export { func1, func2 } from './other.mjs';
export * from './all.mjs';
```

### Importing:

```javascript
// app.mjs

// Named imports
import { add, subtract, PI } from './math.mjs';

// Default import
import Calculator from './math.mjs';

// Both
import Calculator, { add, PI } from './math.mjs';

// Rename imports
import { add as addition } from './math.mjs';

// Import all as namespace
import * as math from './math.mjs';
console.log(math.add(5, 3));

// Dynamic import (returns Promise)
const module = await import('./math.mjs');
```

### CommonJS vs ES Modules:


| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| Syntax | `require()`, `module.exports` | `import`, `export` |
| Loading | Synchronous | Asynchronous |
| Static Analysis | ❌ No | ✅ Yes |
| File Extension | `.js`, `.cjs` | `.mjs` or `"type": "module"` |
| __dirname | ✅ Yes | ❌ Use `import.meta.url` |
| Dynamic Import | `require()` | `import()` |
| Browser Support | ❌ No | ✅ Yes |

---

## 📦 npm (Node Package Manager)

### npm Commands:


| Command | Description |
|---------|-------------|
| `npm init` | Create package.json |
| `npm init -y` | Create with defaults |
| `npm install` | Install all dependencies |
| `npm install <pkg>` | Install package |
| `npm install <pkg> --save-dev` | Install as dev dependency |
| `npm install <pkg> -g` | Install globally |
| `npm uninstall <pkg>` | Uninstall package |
| `npm update` | Update packages |
| `npm update <pkg>` | Update specific package |
| `npm outdated` | Check outdated packages |
| `npm list` | List installed packages |
| `npm list -g` | List global packages |
| `npm search <term>` | Search packages |
| `npm info <pkg>` | Package information |
| `npm run <script>` | Run npm script |
| `npm start` | Run start script |
| `npm test` | Run test script |
| `npm cache clean --force` | Clear npm cache |

---

## 📋 package.json

### Creating package.json:

```bash
npm init
# Answer prompts...

# Or with defaults
npm init -y
```

### package.json Structure:

```json
{
    "name": "my-app",
    "version": "1.0.0",
    "description": "My application",
    "main": "index.js",
    "type": "module",
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "jest",
        "build": "webpack --mode production"
    },
    "keywords": ["node", "express", "api"],
    "author": "John Doe",
    "license": "MIT",
    "dependencies": {
        "express": "^4.18.2",
        "mongoose": "^7.0.0"
    },
    "devDependencies": {
        "nodemon": "^2.0.22",
        "jest": "^29.5.0"
    },
    "engines": {
        "node": ">=18.0.0"
    }
}
```

### Version Semantics (SemVer):

```
MAJOR.MINOR.PATCH
  │     │     └── Bug fixes (backward compatible)
  │     └──────── New features (backward compatible)
  └────────────── Breaking changes
```

### Version Ranges:


| Syntax | Meaning |
|--------|---------|
| `1.2.3` | Exact version |
| `>1.2.3` | Greater than |
| `>=1.2.3` | Greater or equal |
| `<1.2.3` | Less than |
| `<=1.2.3` | Less or equal |
| `~1.2.3` | Patch updates (1.2.x) |
| `^1.2.3` | Minor updates (1.x.x) |
| `*` or `latest` | Any version |
| `1.2.x` | Any patch version |
| `1.x` | Any minor version |

---

## 🔒 package-lock.json

**Purpose**: Locks exact versions of all dependencies for reproducible builds.

```json
{
    "name": "my-app",
    "version": "1.0.0",
    "lockfileVersion": 3,
    "packages": {
        "": {
            "dependencies": {
                "express": "^4.18.2"
            }
        },
        "node_modules/express": {
            "version": "4.18.2",
            "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
            "integrity": "sha512-...",
            "dependencies": {
                "accepts": "~1.3.8",
                "body-parser": "1.20.1"
            }
        }
    }
}
```

### Rules:
- **Always commit** package-lock.json
- Use `npm ci` in production (clean install from lock)
- Delete lock file only when needed (e.g., conflicts)

---

## 📁 Local vs Global Packages

### Local Packages:

```bash
# Install locally (in node_modules)
npm install express

# Access in code
const express = require('express');

# Run local binaries
npx nodemon app.js
# or via script in package.json
```

### Global Packages:

```bash
# Install globally
npm install -g nodemon

# Access anywhere
nodemon app.js

# View global packages
npm list -g --depth=0

# Where global packages live
npm root -g
```

### When to Use Global:
- CLI tools (nodemon, create-react-app)
- Tools you use across projects
- Generally avoid for project dependencies

---

## 📦 Core Node.js Modules

### path Module:

```javascript
const path = require('path');

// Join path segments
path.join('/users', 'john', 'file.txt');
// '/users/john/file.txt'

// Resolve to absolute path
path.resolve('file.txt');
// '/current/working/directory/file.txt'

// Get directory name
path.dirname('/users/john/file.txt');
// '/users/john'

// Get file name
path.basename('/users/john/file.txt');
// 'file.txt'

path.basename('/users/john/file.txt', '.txt');
// 'file'

// Get extension
path.extname('file.txt');
// '.txt'

// Parse path
path.parse('/users/john/file.txt');
/*
{
    root: '/',
    dir: '/users/john',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
}
*/

// Path separator
path.sep;  // '/' on Linux/Mac, '\\' on Windows
```

### url Module:

```javascript
const { URL } = require('url');

const myUrl = new URL('https://example.com:8080/path?name=john#section');

myUrl.href;       // Full URL
myUrl.protocol;   // 'https:'
myUrl.host;       // 'example.com:8080'
myUrl.hostname;   // 'example.com'
myUrl.port;       // '8080'
myUrl.pathname;   // '/path'
myUrl.search;     // '?name=john'
myUrl.hash;       // '#section'
myUrl.searchParams.get('name');  // 'john'
myUrl.searchParams.append('age', '30');
myUrl.toString(); // Updated URL
```

### os Module:

```javascript
const os = require('os');

os.platform();      // 'win32', 'darwin', 'linux'
os.arch();          // 'x64', 'arm64'
os.cpus();          // CPU info
os.totalmem();      // Total memory (bytes)
os.freemem();       // Free memory (bytes)
os.homedir();       // Home directory
os.tmpdir();        // Temp directory
os.hostname();      // Computer name
os.userInfo();      // User info
os.uptime();        // System uptime (seconds)
os.networkInterfaces();  // Network interfaces
os.EOL;             // Line ending ('\n' or '\r\n')
```

### util Module:

```javascript
const util = require('util');

// Promisify callback function
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function read() {
    const data = await readFile('file.txt', 'utf8');
    console.log(data);
}

// Format string
util.format('Hello %s, you are %d years old', 'John', 30);
// 'Hello John, you are 30 years old'

// Inspect object
util.inspect(obj, { depth: null, colors: true });

// Type checking
util.types.isDate(new Date());  // true
util.types.isPromise(Promise.resolve());  // true
```

---

## 📝 Creating a Module

### Calculator Module Example:

```javascript
// calculator.js
class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
    
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }
}

module.exports = Calculator;
```

```javascript
// app.js
const Calculator = require('./calculator');

const calc = new Calculator();
console.log(calc.add(5, 3));       // 8
console.log(calc.multiply(4, 2));  // 8
```

### Logger Module Example:

```javascript
// logger.js
const fs = require('fs');
const path = require('path');

class Logger {
    constructor(filename) {
        this.logFile = path.join(__dirname, 'logs', filename);
    }
    
    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] INFO: ${message}\n`;
        console.log(logMessage.trim());
        fs.appendFileSync(this.logFile, logMessage);
    }
    
    error(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ERROR: ${message}\n`;
        console.error(logMessage.trim());
        fs.appendFileSync(this.logFile, logMessage);
    }
}

module.exports = Logger;
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **CommonJS** uses `require()` and `module.exports`
2. **ES Modules** use `import` and `export`
3. **Core modules** don't need installation (fs, path, http)
4. **require()** is synchronous, `import` is asynchronous
5. **exports** is shorthand for `module.exports`
6. **package.json** contains project metadata and dependencies
7. **package-lock.json** locks exact dependency versions
8. **npm install** reads package.json and installs dependencies
9. **npm install -g** installs packages globally
10. **npm install --save-dev** adds to devDependencies
11. **^1.2.3** allows minor updates (1.x.x)
12. **~1.2.3** allows patch updates (1.2.x)
13. **npm run script-name** executes npm scripts
14. **npx** runs local package binaries
15. **path.join()** safely joins path segments
