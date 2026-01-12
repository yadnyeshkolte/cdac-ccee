---
layout: default
title: Node.js fs & http Modules
parent: Module 3 - Web Technologies
nav_order: 13
---

# Session 17: Node.js fs & http Modules

## 📚 File System (fs) Module

The **fs** module provides various methods for working with files and directories.

### Importing fs:

```javascript
// CommonJS
const fs = require('fs');

// Promise-based API (recommended)
const fs = require('fs').promises;
// or
const { readFile, writeFile } = require('fs').promises;

// ES Modules
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
```

---

## 📖 Reading Files

### Synchronous (Blocking):

```javascript
const fs = require('fs');

try {
    // Read as string
    const data = fs.readFileSync('file.txt', 'utf8');
    console.log(data);
    
    // Read as buffer
    const buffer = fs.readFileSync('file.txt');
    console.log(buffer.toString());
} catch (error) {
    console.error('Error:', error);
}
```

### Asynchronous (Callback):

```javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log(data);
});

console.log('This runs before file is read');
```

### Asynchronous (Promise):

```javascript
const fs = require('fs').promises;

async function readMyFile() {
    try {
        const data = await fs.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

readMyFile();
```

---

## ✏️ Writing Files

### Synchronous:

```javascript
const fs = require('fs');

try {
    // Write (creates or overwrites)
    fs.writeFileSync('file.txt', 'Hello World');
    
    // Write with options
    fs.writeFileSync('file.txt', 'Hello World', {
        encoding: 'utf8',
        mode: 0o644,
        flag: 'w'  // 'a' for append
    });
} catch (error) {
    console.error('Error:', error);
}
```

### Asynchronous (Callback):

```javascript
const fs = require('fs');

fs.writeFile('file.txt', 'Hello World', 'utf8', (err) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('File written successfully');
});
```

### Asynchronous (Promise):

```javascript
const fs = require('fs').promises;

async function writeMyFile() {
    try {
        await fs.writeFile('file.txt', 'Hello World', 'utf8');
        console.log('File written successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### Appending to Files:

```javascript
// Sync
fs.appendFileSync('log.txt', '\nNew line');

// Async callback
fs.appendFile('log.txt', '\nNew line', (err) => {
    if (err) console.error(err);
});

// Async promise
await fs.appendFile('log.txt', '\nNew line');
```

---

## 📁 Directory Operations

```javascript
const fs = require('fs').promises;
const path = require('path');

// Create directory
await fs.mkdir('newFolder');
await fs.mkdir('path/to/nested', { recursive: true });

// Remove directory
await fs.rmdir('emptyFolder');
await fs.rm('folder', { recursive: true, force: true });

// Read directory contents
const files = await fs.readdir('.');
console.log(files);  // ['file1.txt', 'file2.txt', 'folder']

// With file types
const entries = await fs.readdir('.', { withFileTypes: true });
entries.forEach(entry => {
    console.log(entry.name, entry.isDirectory() ? 'DIR' : 'FILE');
});
```

---

## 📊 File Information

```javascript
const fs = require('fs').promises;

// Get file stats
const stats = await fs.stat('file.txt');

stats.isFile();       // true if file
stats.isDirectory();  // true if directory
stats.isSymbolicLink(); // true if symlink
stats.size;           // Size in bytes
stats.birthtime;      // Creation time
stats.mtime;          // Modified time
stats.atime;          // Access time
stats.mode;           // Permissions

// Check if file exists
try {
    await fs.access('file.txt');
    console.log('File exists');
} catch {
    console.log('File does not exist');
}

// Sync version
if (fs.existsSync('file.txt')) {
    console.log('File exists');
}
```

---

## 🔄 Other File Operations

```javascript
const fs = require('fs').promises;

// Rename/Move file
await fs.rename('old.txt', 'new.txt');
await fs.rename('file.txt', 'folder/file.txt');

// Copy file
await fs.copyFile('source.txt', 'dest.txt');

// Delete file
await fs.unlink('file.txt');

// Create symbolic link
await fs.symlink('target.txt', 'link.txt');

// Change permissions
await fs.chmod('file.txt', 0o755);

// Watch for changes
const watcher = fs.watch('file.txt', (eventType, filename) => {
    console.log(`File ${filename} ${eventType}`);
});

// Stop watching
watcher.close();
```

---

## 📡 Streams

Streams are efficient for handling large files - process data in chunks.

### Types of Streams:
- **Readable** - Read from source
- **Writable** - Write to destination
- **Duplex** - Both read and write
- **Transform** - Modify data while passing through

### Reading with Streams:

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('largefile.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024  // 64KB chunks
});

readStream.on('data', (chunk) => {
    console.log('Received', chunk.length, 'characters');
});

readStream.on('end', () => {
    console.log('Finished reading');
});

readStream.on('error', (err) => {
    console.error('Error:', err);
});
```

### Writing with Streams:

```javascript
const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello ');
writeStream.write('World');
writeStream.end('\n');  // Final write and close

writeStream.on('finish', () => {
    console.log('Finished writing');
});

writeStream.on('error', (err) => {
    console.error('Error:', err);
});
```

### Piping Streams:

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('dest.txt');

// Pipe read to write (copy file)
readStream.pipe(writeStream);

// Chain transforms
const zlib = require('zlib');
const gzip = zlib.createGzip();

fs.createReadStream('file.txt')
    .pipe(gzip)
    .pipe(fs.createWriteStream('file.txt.gz'));
```

---

## 🌐 HTTP Module

The **http** module creates HTTP servers and makes HTTP requests.

### Creating HTTP Server:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Request properties
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    
    // Set response headers
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    
    // Send response
    res.write('<h1>Hello World</h1>');
    res.end();
    
    // Or in one call
    res.end('<h1>Hello World</h1>');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
```

### Request Object Properties:


| Property | Description |
|----------|-------------|
| `req.method` | HTTP method (GET, POST, etc.) |
| `req.url` | Request URL |
| `req.headers` | Request headers object |
| `req.httpVersion` | HTTP version |
| `req.socket` | Socket object |

### Response Object Methods:


| Method | Description |
|--------|-------------|
| `res.setHeader(name, value)` | Set header |
| `res.getHeader(name)` | Get header |
| `res.removeHeader(name)` | Remove header |
| `res.writeHead(status, headers)` | Write status and headers |
| `res.write(data)` | Write response body |
| `res.end(data?)` | End response |
| `res.statusCode = 200` | Set status code |

### Handling Routes:

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'GET') {
        if (pathname === '/') {
            res.end(JSON.stringify({ message: 'Welcome!' }));
        } else if (pathname === '/api/users') {
            res.end(JSON.stringify([
                { id: 1, name: 'John' },
                { id: 2, name: 'Jane' }
            ]));
        } else if (pathname === '/api/user') {
            const id = query.id;
            res.end(JSON.stringify({ id, name: 'User ' + id }));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } else if (req.method === 'POST' && pathname === '/api/users') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const user = JSON.parse(body);
            res.statusCode = 201;
            res.end(JSON.stringify({ message: 'Created', user }));
        });
    } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
});

server.listen(3000);
```

### Serving Static Files:

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', 
        req.url === '/' ? 'index.html' : req.url);
    
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(3000);
```

### Handling POST Data:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            console.log('Body:', body);
            
            // Parse JSON
            const data = JSON.parse(body);
            
            // Parse form data
            // const params = new URLSearchParams(body);
            // const name = params.get('name');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ received: data }));
        });
    } else {
        res.end('Send POST request');
    }
});

server.listen(3000);
```

### Making HTTP Requests:

```javascript
const http = require('http');
const https = require('https');

// GET request
https.get('https://api.example.com/data', (res) => {
    let data = '';
    
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
}).on('error', (err) => {
    console.error('Error:', err);
});

// POST request
const postData = JSON.stringify({ name: 'John' });

const options = {
    hostname: 'api.example.com',
    port: 443,
    path: '/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});

req.on('error', (err) => console.error('Error:', err));
req.write(postData);
req.end();
```

---

## 🔄 Practical Example: Complete Web Application

```javascript
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, '[]');
    }
}

// Read data
async function readData() {
    const content = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(content);
}

// Write data
async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Parse request body
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                resolve({});
            }
        });
        req.on('error', reject);
    });
}

// Create server
const server = http.createServer(async (req, res) => {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname;
    
    res.setHeader('Content-Type', 'application/json');
    
    try {
        // GET all users
        if (req.method === 'GET' && pathname === '/api/users') {
            const users = await readData();
            res.end(JSON.stringify(users));
        }
        // GET single user
        else if (req.method === 'GET' && pathname.startsWith('/api/users/')) {
            const id = parseInt(pathname.split('/')[3]);
            const users = await readData();
            const user = users.find(u => u.id === id);
            
            if (user) {
                res.end(JSON.stringify(user));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'User not found' }));
            }
        }
        // POST new user
        else if (req.method === 'POST' && pathname === '/api/users') {
            const users = await readData();
            const body = await parseBody(req);
            
            const newUser = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                ...body
            };
            
            users.push(newUser);
            await writeData(users);
            
            res.statusCode = 201;
            res.end(JSON.stringify(newUser));
        }
        // DELETE user
        else if (req.method === 'DELETE' && pathname.startsWith('/api/users/')) {
            const id = parseInt(pathname.split('/')[3]);
            let users = await readData();
            const index = users.findIndex(u => u.id === id);
            
            if (index !== -1) {
                users.splice(index, 1);
                await writeData(users);
                res.end(JSON.stringify({ message: 'Deleted' }));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'User not found' }));
            }
        }
        // Not found
        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error.message }));
    }
});

// Start server
initDataFile().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
});
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **fs.readFileSync** is synchronous/blocking
2. **fs.readFile** with callback is asynchronous
3. **fs.promises** provides Promise-based API
4. **Streams** handle large files efficiently in chunks
5. **pipe()** connects readable and writable streams
6. **http.createServer()** creates an HTTP server
7. **req** object contains request info (method, url, headers)
8. **res** object is used to send response
9. **res.end()** must be called to complete response
10. **res.writeHead()** sets status and headers together
11. **req.on('data')** receives POST body in chunks
12. **fs.existsSync()** checks if file exists synchronously
13. **fs.mkdir({ recursive: true })** creates nested directories
14. **createReadStream** is for reading large files
15. **server.listen(port)** starts the server
