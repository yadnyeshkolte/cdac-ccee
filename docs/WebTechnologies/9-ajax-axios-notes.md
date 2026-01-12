---
layout: default
title: AJAX & Axios
parent: Module 3 - Web Technologies
nav_order: 9
---

# Sessions 11 & 12: AJAX & Axios HTTP Client

## 📚 Introduction to AJAX

**AJAX (Asynchronous JavaScript and XML)** - Technique for creating dynamic web pages without reloading.

### How AJAX Works:

```
1. Event triggers (click, load, etc.)
        ↓
2. JavaScript creates XMLHttpRequest
        ↓
3. Request sent to server
        ↓
4. Server processes request
        ↓
5. Server sends response
        ↓
6. JavaScript processes response
        ↓
7. DOM updated dynamically
```

### Benefits of AJAX:
- **No page reload** - Better user experience
- **Asynchronous** - Non-blocking operations
- **Reduced bandwidth** - Only transfer needed data
- **Faster response** - Partial updates

---

## 🔧 XMLHttpRequest (XHR)

### Making GET Request:

```javascript
// Create XHR object
const xhr = new XMLHttpRequest();

// Configure request
xhr.open('GET', 'https://api.example.com/data', true);

// Set up callback
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {  // Request complete
        if (xhr.status === 200) {  // Success
            const data = JSON.parse(xhr.responseText);
            console.log(data);
        } else {
            console.error('Error:', xhr.status);
        }
    }
};

// Send request
xhr.send();
```

### Making POST Request:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.example.com/users', true);

// Set headers
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        console.log('Created:', response);
    }
};

// Send data
const data = JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
});
xhr.send(data);
```

### ReadyState Values:


| Value | State | Description |
|-------|-------|-------------|
| 0 | UNSENT | XHR created, open() not called |
| 1 | OPENED | open() called |
| 2 | HEADERS_RECEIVED | send() called, headers received |
| 3 | LOADING | Downloading response |
| 4 | DONE | Operation complete |

### XHR Properties:


| Property | Description |
|----------|-------------|
| `readyState` | Current state (0-4) |
| `status` | HTTP status code |
| `statusText` | HTTP status message |
| `responseText` | Response as text |
| `responseXML` | Response as XML Document |
| `response` | Response body |
| `responseType` | Type of response |
| `timeout` | Timeout in milliseconds |

### XHR Events:

```javascript
xhr.onload = function() {
    // Request completed successfully
};

xhr.onerror = function() {
    // Network error occurred
};

xhr.onprogress = function(event) {
    if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${percent}%`);
    }
};

xhr.ontimeout = function() {
    // Request timed out
};

xhr.onabort = function() {
    // Request aborted
};
```

### Modern XHR:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.responseType = 'json';  // Auto-parse JSON

xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.response);  // Already parsed
    }
};

xhr.send();
```

---

## 🌐 Fetch API (Modern AJAX)

### Basic GET Request:

```javascript
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### With async/await:

```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### POST Request:

```javascript
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Fetch Options:

```javascript
fetch(url, {
    method: 'GET',              // GET, POST, PUT, DELETE, PATCH
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify(data), // For POST/PUT/PATCH
    mode: 'cors',               // cors, no-cors, same-origin
    credentials: 'include',     // include, same-origin, omit
    cache: 'default',           // default, no-cache, reload, force-cache
    redirect: 'follow',         // follow, error, manual
    signal: abortController.signal  // For cancellation
});
```

### Response Object:

```javascript
fetch(url).then(response => {
    // Properties
    response.ok;          // true if status 200-299
    response.status;      // HTTP status code
    response.statusText;  // HTTP status message
    response.url;         // Response URL
    response.type;        // basic, cors, opaque
    response.headers;     // Headers object
    
    // Methods (return Promises)
    response.json();      // Parse as JSON
    response.text();      // Parse as text
    response.blob();      // Parse as Blob
    response.formData();  // Parse as FormData
    response.arrayBuffer(); // Parse as ArrayBuffer
    
    // Clone response (can only be consumed once)
    response.clone();
});
```

### Abort Controller:

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        }
    });

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);
```

### Error Handling:

```javascript
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        
        // Fetch only rejects on network errors
        // HTTP errors (4xx, 5xx) don't throw
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Resource not found');
            } else if (response.status === 401) {
                throw new Error('Unauthorized');
            } else if (response.status >= 500) {
                throw new Error('Server error');
            }
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Network error:', error);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}
```

---

## 💲 AJAX with jQuery

### $.ajax():

```javascript
$.ajax({
    url: 'https://api.example.com/data',
    method: 'GET',  // or type: 'GET'
    dataType: 'json',
    success: function(data) {
        console.log(data);
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    },
    complete: function(xhr, status) {
        console.log('Request complete');
    }
});
```

### $.ajax() POST:

```javascript
$.ajax({
    url: 'https://api.example.com/users',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    }),
    success: function(data) {
        console.log('Created:', data);
    }
});
```

### Shorthand Methods:

```javascript
// GET request
$.get('https://api.example.com/data', function(data) {
    console.log(data);
});

// POST request
$.post('https://api.example.com/users', { name: 'John' }, function(data) {
    console.log(data);
});

// Get JSON
$.getJSON('https://api.example.com/data', function(data) {
    console.log(data);
});

// Load HTML into element
$('#container').load('page.html');
$('#container').load('page.html #section');  // Load specific section
```

### jQuery Promise Methods:

```javascript
$.get('https://api.example.com/data')
    .done(function(data) {
        console.log('Success:', data);
    })
    .fail(function(xhr, status, error) {
        console.error('Error:', error);
    })
    .always(function() {
        console.log('Complete');
    });
```

### Global AJAX Handlers:

```javascript
// Before any AJAX request starts
$(document).ajaxStart(function() {
    $('#loading').show();
});

// After all AJAX requests complete
$(document).ajaxStop(function() {
    $('#loading').hide();
});

// Before each AJAX request
$(document).ajaxSend(function(event, xhr, settings) {
    console.log('Request to:', settings.url);
});

// On successful completion
$(document).ajaxSuccess(function(event, xhr, settings) {
    console.log('Success:', settings.url);
});

// On error
$(document).ajaxError(function(event, xhr, settings, error) {
    console.error('Error:', error);
});
```

---

## 📦 Axios HTTP Client

**Axios** is a popular promise-based HTTP client for the browser and Node.js.

### Adding Axios:

```html
<!-- CDN -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- npm -->
npm install axios
import axios from 'axios';
```

### Basic GET Request:

```javascript
axios.get('https://api.example.com/data')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### With async/await:

```javascript
async function fetchData() {
    try {
        const response = await axios.get('https://api.example.com/data');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}
```

### POST Request:

```javascript
axios.post('https://api.example.com/users', {
    name: 'John Doe',
    email: 'john@example.com'
})
.then(response => {
    console.log('Created:', response.data);
})
.catch(error => {
    console.error('Error:', error);
});
```

### Request Methods:

```javascript
axios.get(url, config)
axios.post(url, data, config)
axios.put(url, data, config)
axios.patch(url, data, config)
axios.delete(url, config)
axios.head(url, config)
axios.options(url, config)
axios.request(config)
```

### Request Config:

```javascript
axios({
    method: 'post',
    url: 'https://api.example.com/users',
    data: {
        name: 'John Doe'
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    params: {  // Query parameters
        page: 1,
        limit: 10
    },
    timeout: 5000,  // 5 seconds
    responseType: 'json',  // arraybuffer, blob, document, json, text, stream
    withCredentials: true,  // Include cookies
    validateStatus: (status) => status < 500  // Resolve for non-500 errors
});
```

### Response Object:

```javascript
axios.get(url).then(response => {
    response.data;       // Response body
    response.status;     // HTTP status code
    response.statusText; // HTTP status message
    response.headers;    // Response headers
    response.config;     // Request config
    response.request;    // XHR object
});
```

### Axios Instance:

```javascript
// Create instance with custom config
const api = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Use instance
api.get('/users')
    .then(response => console.log(response.data));

// Update instance defaults
api.defaults.headers.common['Authorization'] = 'Bearer token123';
```

### Interceptors:

```javascript
// Request interceptor
axios.interceptors.request.use(
    config => {
        // Add auth token to every request
        config.headers.Authorization = `Bearer ${getToken()}`;
        console.log('Request:', config.url);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
axios.interceptors.response.use(
    response => {
        console.log('Response:', response.status);
        return response;
    },
    error => {
        if (error.response.status === 401) {
            // Redirect to login
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

// Remove interceptor
const myInterceptor = axios.interceptors.request.use(() => {});
axios.interceptors.request.eject(myInterceptor);
```

### Error Handling:

```javascript
axios.get('/api/data')
    .catch(error => {
        if (error.response) {
            // Server responded with error status
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            console.log('Headers:', error.response.headers);
        } else if (error.request) {
            // Request made but no response
            console.log('No response:', error.request);
        } else {
            // Request setup error
            console.log('Error:', error.message);
        }
        console.log('Config:', error.config);
    });
```

### Concurrent Requests:

```javascript
// Execute multiple requests simultaneously
Promise.all([
    axios.get('/api/users'),
    axios.get('/api/posts')
])
.then(([usersRes, postsRes]) => {
    console.log('Users:', usersRes.data);
    console.log('Posts:', postsRes.data);
});

// Using axios.all (works same as Promise.all)
axios.all([
    axios.get('/api/users'),
    axios.get('/api/posts')
])
.then(axios.spread((usersRes, postsRes) => {
    console.log('Users:', usersRes.data);
    console.log('Posts:', postsRes.data);
}));
```

### Cancel Requests:

```javascript
// Using CancelToken (deprecated but still works)
const source = axios.CancelToken.source();

axios.get('/api/data', {
    cancelToken: source.token
})
.catch(error => {
    if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message);
    }
});

source.cancel('Operation cancelled by user');

// Using AbortController (recommended)
const controller = new AbortController();

axios.get('/api/data', {
    signal: controller.signal
})
.catch(error => {
    if (error.name === 'CanceledError') {
        console.log('Request cancelled');
    }
});

controller.abort();
```

---

## 📊 Comparison: XHR vs Fetch vs Axios


| Feature | XMLHttpRequest | Fetch API | Axios |
|---------|---------------|-----------|-------|
| Native | ✅ Yes | ✅ Yes | ❌ No (library) |
| Promise-based | ❌ No | ✅ Yes | ✅ Yes |
| Request cancellation | ✅ Yes | ✅ Yes (AbortController) | ✅ Yes |
| Interceptors | ❌ No | ❌ No | ✅ Yes |
| Request/Response transform | ❌ No | ❌ No | ✅ Yes |
| Timeout support | ✅ Yes | ❌ Manual | ✅ Yes |
| Auto JSON parsing | ❌ No | ❌ No | ✅ Yes |
| Progress events | ✅ Yes | ❌ Limited | ✅ Yes |
| Error handling | Manual | Manual | ✅ Built-in |
| Browser support | All | Modern | All (polyfill) |

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **AJAX** = Asynchronous JavaScript and XML (but commonly uses JSON)
2. **XMLHttpRequest readyState 4** means request complete
3. **XHR status 200** means success
4. **Fetch returns Promise**, doesn't reject on HTTP errors
5. **response.ok** is true for status 200-299
6. **response.json()** returns Promise, not data directly
7. **Axios auto-transforms** JSON requests/responses
8. **Interceptors** in Axios modify all requests/responses
9. **$.ajax()** is jQuery's AJAX method
10. **$.get()** and **$.post()** are shorthand methods
11. **AbortController** cancels Fetch/Axios requests
12. **axios.create()** creates instance with default config
13. **error.response** exists when server responds with error
14. **error.request** exists when no response received
15. **Promise.all()** executes multiple requests simultaneously
