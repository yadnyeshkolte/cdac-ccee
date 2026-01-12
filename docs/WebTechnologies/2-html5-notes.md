---
layout: default
title: HTML5 Fundamentals
parent: Module 3 - Web Technologies
nav_order: 2
---

# Session 2: HTML5 Fundamentals

## 📚 Introduction to HTML

**HTML (HyperText Markup Language)** - The standard markup language for creating web pages.

### HTML5 Declaration:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
```

### HTML Document Structure:
```
<!DOCTYPE html>     ← Document type declaration
<html>              ← Root element
  <head>            ← Metadata container
    <title>         ← Page title (shown in tab)
    <meta>          ← Metadata (charset, viewport)
    <link>          ← External resources (CSS)
    <script>        ← JavaScript
    <style>         ← Internal CSS
  </head>
  <body>            ← Visible content
  </body>
</html>
```

---

## 🏷️ Basic HTML Tags

### Text Formatting Tags:


| Tag | Purpose | Example |
|-----|---------|---------|
| `<h1>` to `<h6>` | Headings (h1 largest) | `<h1>Main Title</h1>` |
| `<p>` | Paragraph | `<p>Some text</p>` |
| `<br>` | Line break | `Line 1<br>Line 2` |
| `<hr>` | Horizontal rule | `<hr>` |
| `<b>` | Bold (no semantic) | `<b>Bold</b>` |
| `<strong>` | Bold (semantic - important) | `<strong>Important</strong>` |
| `<i>` | Italic (no semantic) | `<i>Italic</i>` |
| `<em>` | Italic (semantic - emphasis) | `<em>Emphasis</em>` |
| `<u>` | Underline | `<u>Underlined</u>` |
| `<s>` | Strikethrough | `<s>Deleted</s>` |
| `<mark>` | Highlighted text | `<mark>Highlighted</mark>` |
| `<sub>` | Subscript | `H<sub>2</sub>O` |
| `<sup>` | Superscript | `x<sup>2</sup>` |
| `<pre>` | Preformatted text | `<pre>  Spaces preserved  </pre>` |
| `<code>` | Code snippet | `<code>console.log()</code>` |
| `<blockquote>` | Block quotation | `<blockquote>Quote</blockquote>` |

### Anchor Tag (Links):
```html
<!-- External link -->
<a href="https://example.com">Visit Example</a>

<!-- Open in new tab -->
<a href="https://example.com" target="_blank">New Tab</a>

<!-- Internal link (same page) -->
<a href="#section-id">Jump to Section</a>

<!-- Email link -->
<a href="mailto:email@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+911234567890">Call Us</a>

<!-- Download link -->
<a href="file.pdf" download>Download PDF</a>
```

### Target Attribute Values:


| Value | Behavior |
|-------|----------|
| `_self` | Same window (default) |
| `_blank` | New tab/window |
| `_parent` | Parent frame |
| `_top` | Full body of window |

---

## 🖼️ Images

```html
<!-- Basic image -->
<img src="image.jpg" alt="Description">

<!-- With dimensions -->
<img src="image.jpg" alt="Description" width="300" height="200">

<!-- Responsive image -->
<img src="image.jpg" alt="Description" style="max-width:100%; height:auto;">

<!-- Figure with caption -->
<figure>
    <img src="image.jpg" alt="Description">
    <figcaption>Image Caption</figcaption>
</figure>
```

### Image Formats:


| Format | Best For | Transparency | Animation |
|--------|----------|--------------|-----------|
| JPEG | Photos | ❌ | ❌ |
| PNG | Graphics with transparency | ✅ | ❌ |
| GIF | Simple animations | ✅ (1-bit) | ✅ |
| SVG | Logos, icons (scalable) | ✅ | ✅ |
| WebP | Modern (smaller size) | ✅ | ✅ |

---

## 📋 Lists

### Unordered List:
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

### Ordered List:
```html
<ol>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ol>

<!-- Start from specific number -->
<ol start="5">
    <li>Fifth</li>
    <li>Sixth</li>
</ol>

<!-- Different types -->
<ol type="A">  <!-- A, B, C -->
<ol type="a">  <!-- a, b, c -->
<ol type="I">  <!-- I, II, III -->
<ol type="i">  <!-- i, ii, iii -->
<ol type="1">  <!-- 1, 2, 3 (default) -->
```

### Description List:
```html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>
```

---

## 📊 Tables

```html
<table border="1">
    <caption>Table Caption</caption>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
        </tr>
        <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Footer</td>
        </tr>
    </tfoot>
</table>
```

### Table Attributes:


| Attribute | Purpose | Example |
|-----------|---------|---------|
| `colspan` | Span multiple columns | `<td colspan="2">` |
| `rowspan` | Span multiple rows | `<td rowspan="3">` |
| `border` | Border width | `<table border="1">` |

---

## 🖼️ iFrames

```html
<!-- Basic iframe -->
<iframe src="https://example.com" width="600" height="400"></iframe>

<!-- YouTube embed -->
<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allowfullscreen>
</iframe>

<!-- Google Maps embed -->
<iframe 
    src="https://www.google.com/maps/embed?pb=..."
    width="600" height="450" 
    style="border:0;" 
    loading="lazy">
</iframe>
```

### iframe Attributes:


| Attribute | Purpose |
|-----------|---------|
| `src` | URL to embed |
| `srcdoc` | Inline HTML content |
| `sandbox` | Security restrictions |
| `loading` | lazy/eager loading |
| `allow` | Permissions (camera, microphone) |

---

## 🆕 HTML5 Semantic Elements

**Semantic HTML** uses meaningful tags that describe content structure.

### Semantic Layout:
```html
<header>
    <nav>Navigation</nav>
</header>

<main>
    <article>
        <section>
            <h2>Section Title</h2>
            <p>Content...</p>
        </section>
    </article>
    <aside>Sidebar content</aside>
</main>

<footer>Footer content</footer>
```

### Semantic Elements:


| Element | Purpose |
|---------|---------|
| `<header>` | Introductory content, navigation |
| `<nav>` | Navigation links |
| `<main>` | Main content (only one per page) |
| `<article>` | Self-contained, independent content |
| `<section>` | Thematic grouping of content |
| `<aside>` | Sidebar, tangentially related content |
| `<footer>` | Footer content |
| `<figure>` | Image with caption |
| `<figcaption>` | Caption for figure |
| `<details>` | Collapsible content |
| `<summary>` | Summary for details |
| `<time>` | Date/time |
| `<mark>` | Highlighted text |

### Benefits of Semantic HTML:
1. **Accessibility** - Screen readers understand structure
2. **SEO** - Search engines understand content
3. **Maintainability** - Easier to read and maintain
4. **Consistency** - Standard structure across pages

---

## 📝 HTML Forms

### Basic Form Structure:
```html
<form action="/submit" method="POST">
    <!-- Form elements -->
    <input type="submit" value="Submit">
</form>
```

### Form Attributes:


| Attribute | Purpose |
|-----------|---------|
| `action` | URL to submit form data |
| `method` | GET or POST |
| `enctype` | Encoding type for form data |
| `autocomplete` | on/off |
| `novalidate` | Disable validation |
| `target` | Where to display response |

### enctype Values:


| Value | Use Case |
|-------|----------|
| `application/x-www-form-urlencoded` | Default, text data |
| `multipart/form-data` | File uploads |
| `text/plain` | Plain text (rarely used) |

---

## 📥 Input Types

### Text Inputs:
```html
<input type="text" name="username" placeholder="Enter name">
<input type="password" name="pwd">
<input type="email" name="email">
<input type="tel" name="phone">
<input type="url" name="website">
<input type="search" name="query">
```

### HTML5 Input Types:
```html
<input type="number" min="0" max="100" step="5">
<input type="range" min="0" max="100">
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">
<input type="color">
```

### Other Input Types:
```html
<input type="checkbox" name="agree">
<input type="radio" name="gender" value="male">
<input type="file" accept="image/*">
<input type="hidden" name="token" value="abc123">
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Click Me">
```

### Input Attributes:


| Attribute | Purpose | Example |
|-----------|---------|---------|
| `required` | Field is required | `<input required>` |
| `readonly` | Cannot modify | `<input readonly>` |
| `disabled` | Cannot interact | `<input disabled>` |
| `placeholder` | Hint text | `<input placeholder="Name">` |
| `value` | Default value | `<input value="Default">` |
| `maxlength` | Max characters | `<input maxlength="50">` |
| `minlength` | Min characters | `<input minlength="3">` |
| `min/max` | Number range | `<input min="0" max="100">` |
| `pattern` | Regex validation | `<input pattern="[A-Z]{3}">` |
| `autofocus` | Focus on load | `<input autofocus>` |
| `autocomplete` | Suggestions | `<input autocomplete="off">` |

---

## 📋 Other Form Elements

### Textarea:
```html
<textarea name="message" rows="5" cols="30" 
    placeholder="Enter message"></textarea>
```

### Select Dropdown:
```html
<select name="country">
    <option value="">Select Country</option>
    <option value="in">India</option>
    <option value="us" selected>USA</option>
    <option value="uk">UK</option>
</select>

<!-- Multiple selection -->
<select name="skills" multiple>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
</select>

<!-- Option groups -->
<select name="car">
    <optgroup label="German">
        <option value="bmw">BMW</option>
        <option value="audi">Audi</option>
    </optgroup>
    <optgroup label="Japanese">
        <option value="toyota">Toyota</option>
        <option value="honda">Honda</option>
    </optgroup>
</select>
```

### Datalist (Autocomplete):
```html
<input list="browsers" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
</datalist>
```

### Label:
```html
<!-- Method 1: wrapping -->
<label>
    Username: <input type="text" name="username">
</label>

<!-- Method 2: for attribute -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

### Fieldset & Legend:
```html
<fieldset>
    <legend>Personal Information</legend>
    <label>Name: <input type="text"></label>
    <label>Age: <input type="number"></label>
</fieldset>
```

---

## 🎵 HTML5 Multimedia

### Audio:
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Your browser doesn't support audio.
</audio>

<!-- Autoplay (muted required for autoplay) -->
<audio controls autoplay muted loop>
    <source src="audio.mp3" type="audio/mpeg">
</audio>
```

### Video:
```html
<video width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    Your browser doesn't support video.
</video>

<!-- Video attributes -->
<video controls autoplay muted loop poster="thumbnail.jpg">
    <source src="video.mp4" type="video/mp4">
</video>
```

### Audio/Video Attributes:


| Attribute | Purpose |
|-----------|---------|
| `controls` | Show player controls |
| `autoplay` | Auto-play on load |
| `muted` | Start muted |
| `loop` | Loop playback |
| `poster` | Video thumbnail image |
| `preload` | auto/metadata/none |

---

## 🎨 HTML5 Canvas

Canvas provides a drawing surface for graphics via JavaScript.

```html
<canvas id="myCanvas" width="500" height="300"></canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 50);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(200, 100, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(300, 50);
    ctx.lineTo(400, 150);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw text
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Hello Canvas!', 10, 200);
</script>
```

---

## 📍 HTML5 Geolocation API

```javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        // Success callback
        function(position) {
            console.log('Latitude:', position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);
            console.log('Accuracy:', position.coords.accuracy);
        },
        // Error callback
        function(error) {
            console.log('Error:', error.message);
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

// Watch position (continuous tracking)
const watchId = navigator.geolocation.watchPosition(successFn, errorFn);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

---

## 💾 HTML5 Web Storage

### localStorage (Permanent):
```javascript
// Store data
localStorage.setItem('username', 'John');

// Retrieve data
const user = localStorage.getItem('username');

// Remove specific item
localStorage.removeItem('username');

// Clear all data
localStorage.clear();

// Get number of items
console.log(localStorage.length);

// Get key by index
console.log(localStorage.key(0));
```

### sessionStorage (Session only):
```javascript
// Same methods as localStorage
sessionStorage.setItem('token', 'abc123');
sessionStorage.getItem('token');
sessionStorage.removeItem('token');
sessionStorage.clear();
```

### LocalStorage vs SessionStorage:


| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| Lifetime | Permanent | Until tab closes |
| Scope | All tabs (same origin) | Single tab |
| Size | ~5-10 MB | ~5-10 MB |
| Server Access | ❌ | ❌ |

### Cookies vs Web Storage:


| Feature | Cookies | Web Storage |
|---------|---------|-------------|
| Size | 4 KB | 5-10 MB |
| Sent to Server | ✅ Yes (every request) | ❌ No |
| Expiry | Configurable | localStorage: never, sessionStorage: tab |
| Access | Server + Client | Client only |

---

## ♿ ARIA Accessibility

**ARIA (Accessible Rich Internet Applications)** - Attributes to improve accessibility.

### ARIA Roles:
```html
<nav role="navigation">
<main role="main">
<button role="button">
<div role="alert">
<div role="dialog">
<div role="progressbar">
```

### ARIA Attributes:
```html
<!-- Label for screen readers -->
<button aria-label="Close dialog">×</button>

<!-- Describe element -->
<input aria-describedby="hint">
<span id="hint">Enter your email</span>

<!-- Required field -->
<input aria-required="true">

<!-- Disabled state -->
<button aria-disabled="true">

<!-- Hidden from screen readers -->
<div aria-hidden="true">

<!-- Live regions (announce changes) -->
<div aria-live="polite">  <!-- Announces after current -->
<div aria-live="assertive">  <!-- Announces immediately -->
```

---

## 🌳 Document Object Model (DOM)

The **DOM** is a programming interface for HTML documents represented as a tree structure.

### DOM Tree:
```
document
    └── html
        ├── head
        │   ├── title
        │   └── meta
        └── body
            ├── header
            ├── main
            │   ├── h1
            │   └── p
            └── footer
```

### DOM Node Types:


| Type | Description | Example |
|------|-------------|---------|
| Element | HTML tags | `<div>`, `<p>` |
| Text | Text content | "Hello World" |
| Attribute | Tag attributes | `id="main"` |
| Comment | HTML comments | `<!-- comment -->` |
| Document | Root node | `document` |

### Accessing DOM Elements:
```javascript
// By ID
document.getElementById('myId');

// By class name
document.getElementsByClassName('myClass');

// By tag name
document.getElementsByTagName('p');

// Query selector (returns first match)
document.querySelector('.myClass');
document.querySelector('#myId');

// Query selector all (returns NodeList)
document.querySelectorAll('.myClass');
document.querySelectorAll('p');
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **DOCTYPE** declaration is required in HTML5: `<!DOCTYPE html>`
2. **`<strong>`** is semantic (important), **`<b>`** is just visual
3. **`<em>`** is semantic (emphasis), **`<i>`** is just visual
4. **`<main>`** element should appear only once per page
5. **localStorage** persists permanently, **sessionStorage** until tab closes
6. **Cookies** max 4KB, **Web Storage** 5-10MB
7. **`enctype="multipart/form-data"`** required for file uploads
8. **`<input type="email">`** provides built-in validation
9. **Canvas** uses JavaScript for drawing, **SVG** is XML-based
10. **`aria-label`** provides accessible name for screen readers
11. **`required`** attribute makes form field mandatory
12. **`placeholder`** shows hint text, disappears on focus
13. **`target="_blank"`** opens link in new tab
14. **`<article>`** is self-contained, **`<section>`** is thematic grouping
15. **Geolocation API** requires user permission
