---
layout: default
title: Express.js
parent: Module 3 - Web Technologies
nav_order: 14
---

# Session 18: Introduction to Express.js

## 📚 What is Express.js?

**Express.js** is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.

### Features:
- **Routing** - Define application routes
- **Middleware** - Request/response processing pipeline
- **Template Engines** - Render dynamic HTML
- **Static Files** - Serve static content
- **Error Handling** - Centralized error management

---

## 🚀 Getting Started

### Installation:

```bash
mkdir my-app
cd my-app
npm init -y
npm install express
```

### Basic Server:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 🛤️ Routing

### Basic Routes:

```javascript
// GET request
app.get('/', (req, res) => {
    res.send('GET request');
});

// POST request
app.post('/users', (req, res) => {
    res.send('POST request');
});

// PUT request
app.put('/users/:id', (req, res) => {
    res.send('PUT request');
});

// PATCH request
app.patch('/users/:id', (req, res) => {
    res.send('PATCH request');
});

// DELETE request
app.delete('/users/:id', (req, res) => {
    res.send('DELETE request');
});

// All HTTP methods
app.all('/all', (req, res) => {
    res.send(`${req.method} request`);
});
```

### Route Parameters:

```javascript
// Single parameter
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.send(`User: ${userId}, Post: ${postId}`);
});

// Optional parameter (using ?)
app.get('/books/:year?', (req, res) => {
    const year = req.params.year || 'all years';
    res.send(`Books from ${year}`);
});
```

### Query Parameters:

```javascript
// URL: /search?q=express&page=1
app.get('/search', (req, res) => {
    const { q, page = 1 } = req.query;
    res.send(`Search: ${q}, Page: ${page}`);
});
```

### Route Paths with Patterns:

```javascript
// String patterns
app.get('/ab?cd', (req, res) => {
    // Matches: /acd, /abcd
    res.send('Pattern matched');
});

app.get('/ab+cd', (req, res) => {
    // Matches: /abcd, /abbcd, /abbbcd, etc.
    res.send('Pattern matched');
});

app.get('/ab*cd', (req, res) => {
    // Matches: /abcd, /abXcd, /abANYTHINGcd
    res.send('Pattern matched');
});

// Regular expression
app.get(/.*fly$/, (req, res) => {
    // Matches: /butterfly, /dragonfly
    res.send('Pattern matched');
});
```

### Route Chaining:

```javascript
app.route('/book')
    .get((req, res) => {
        res.send('Get a book');
    })
    .post((req, res) => {
        res.send('Add a book');
    })
    .put((req, res) => {
        res.send('Update the book');
    });
```

### Router Module:

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All users');
});

router.get('/:id', (req, res) => {
    res.send(`User ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create user');
});

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
// Routes: GET /users, GET /users/:id, POST /users
```

---

## 📦 Request & Response Objects

### Request Object (req):


| Property | Description |
|----------|-------------|
| `req.params` | Route parameters |
| `req.query` | Query string parameters |
| `req.body` | Request body (needs middleware) |
| `req.headers` | Request headers |
| `req.method` | HTTP method |
| `req.url` | Request URL |
| `req.path` | URL path |
| `req.protocol` | http or https |
| `req.hostname` | Hostname |
| `req.ip` | Client IP address |
| `req.cookies` | Cookies (needs cookie-parser) |
| `req.get(header)` | Get header value |

### Response Object (res):


| Method | Description |
|--------|-------------|
| `res.send(data)` | Send response |
| `res.json(data)` | Send JSON response |
| `res.status(code)` | Set status code |
| `res.sendStatus(code)` | Send status code with message |
| `res.redirect(url)` | Redirect to URL |
| `res.render(view)` | Render template |
| `res.sendFile(path)` | Send file |
| `res.download(path)` | Prompt file download |
| `res.set(header, value)` | Set header |
| `res.cookie(name, value)` | Set cookie |
| `res.clearCookie(name)` | Clear cookie |
| `res.type(type)` | Set Content-Type |

### Examples:

```javascript
// Send different responses
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello' });
});

app.get('/error', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.get('/redirect', (req, res) => {
    res.redirect('/new-page');
    res.redirect(301, '/permanent-redirect');
});

app.get('/file', (req, res) => {
    res.sendFile('/path/to/file.pdf');
});

app.get('/download', (req, res) => {
    res.download('/path/to/file.pdf', 'renamed.pdf');
});
```

---

## 🔗 Middleware

Middleware functions have access to request, response, and next function.

### Middleware Flow:

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### Application-level Middleware:

```javascript
// Runs for every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();  // Pass to next middleware
});

// Runs for specific path
app.use('/api', (req, res, next) => {
    console.log('API request');
    next();
});
```

### Built-in Middleware:

```javascript
// Parse JSON body
app.use(express.json());

// Parse URL-encoded body
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
app.use('/static', express.static('assets'));
```

### Router-level Middleware:

```javascript
const router = express.Router();

// Apply to all routes in this router
router.use((req, res, next) => {
    console.log('Router middleware');
    next();
});

router.get('/', (req, res) => {
    res.send('Router home');
});
```

### Third-party Middleware:

```javascript
// Install: npm install morgan cors helmet
const morgan = require('morgan');  // Logging
const cors = require('cors');      // Cross-origin
const helmet = require('helmet');  // Security

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
```

### Custom Middleware:

```javascript
// Authentication middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Verify token logic here
    req.user = { id: 1, name: 'John' };
    next();
};

// Use for specific routes
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

// Use for route group
app.use('/api', authMiddleware);
```

### Multiple Middleware:

```javascript
const middleware1 = (req, res, next) => {
    console.log('Middleware 1');
    next();
};

const middleware2 = (req, res, next) => {
    console.log('Middleware 2');
    next();
};

// Array of middleware
app.get('/multi', [middleware1, middleware2], (req, res) => {
    res.send('Multiple middlewares');
});

// Comma-separated
app.get('/multi2', middleware1, middleware2, (req, res) => {
    res.send('Multiple middlewares');
});
```

---

## ❌ Error Handling

### Error-handling Middleware:

```javascript
// Must have 4 parameters
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
```

### Throwing Errors:

```javascript
app.get('/error', (req, res, next) => {
    try {
        // Some code that might throw
        throw new Error('Something went wrong');
    } catch (error) {
        next(error);  // Pass to error handler
    }
});

// Async errors (Express 5 handles automatically)
// For Express 4, use try-catch or async wrapper

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/async', asyncHandler(async (req, res) => {
    const data = await someAsyncOperation();
    res.json(data);
}));
```

### Custom Error Classes:

```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

app.get('/custom-error', (req, res, next) => {
    next(new AppError('Resource not found', 404));
});

// Error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
```

### 404 Handler:

```javascript
// Place after all routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
```

---

## 🎨 Template Engines

### Setting up EJS:

```bash
npm install ejs
```

```javascript
// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');  // Default

// Render view
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', user: 'John' });
});
```

### EJS Template (views/index.ejs):

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1>Hello, <%= user %>!</h1>
    
    <!-- Conditionals -->
    <% if (user) { %>
        <p>Welcome back!</p>
    <% } else { %>
        <p>Please log in</p>
    <% } %>
    
    <!-- Loops -->
    <ul>
        <% items.forEach(item => { %>
            <li><%= item.name %></li>
        <% }) %>
    </ul>
    
    <!-- Include partials -->
    <%- include('partials/header') %>
    
    <!-- Unescaped HTML -->
    <%- htmlContent %>
</body>
</html>
```

### Other Template Engines:

```javascript
// Pug (formerly Jade)
npm install pug
app.set('view engine', 'pug');

// Handlebars
npm install express-handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
```

---

## 📁 Static Files

```javascript
// Serve files from 'public' folder
app.use(express.static('public'));
// Access: http://localhost:3000/css/style.css
// File: public/css/style.css

// Virtual path prefix
app.use('/static', express.static('public'));
// Access: http://localhost:3000/static/css/style.css

// Multiple directories
app.use(express.static('public'));
app.use(express.static('files'));

// Absolute path
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// With options
app.use(express.static('public', {
    maxAge: '1d',           // Cache for 1 day
    etag: true,             // Enable ETag
    lastModified: true,     // Enable Last-Modified
    index: 'index.html',    // Default file
    fallthrough: true       // Pass to next middleware if not found
}));
```

---

## 📝 Complete CRUD Example

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory database
let users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
];
let nextId = 3;

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

// CREATE user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email required' });
    }
    
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    
    res.status(201).json(newUser);
});

// UPDATE user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users[index] = { id, name, email };
    res.json(users[index]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(index, 1);
    res.json({ message: 'User deleted' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **Express** is a minimal Node.js web framework
2. **app.get()**, **app.post()** define route handlers
3. **req.params** contains route parameters (/:id)
4. **req.query** contains query string (?key=value)
5. **req.body** contains POST data (needs middleware)
6. **res.send()** sends any response, **res.json()** sends JSON
7. **res.status(code)** sets HTTP status code
8. **Middleware** has access to req, res, and next()
9. **next()** passes control to next middleware
10. **express.json()** parses JSON request body
11. **express.static()** serves static files
12. **app.use()** applies middleware to all routes
13. **Error middleware** has 4 parameters (err, req, res, next)
14. **express.Router()** creates modular route handlers
15. **app.set('view engine', 'ejs')** sets template engine
