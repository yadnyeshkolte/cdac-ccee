---
layout: default
title: JavaScript DOM
parent: Module 3 - Web Technologies
nav_order: 7
---

# Sessions 8 & 9: JavaScript DOM & Forms

## 📚 Document Object Model (DOM)

The **DOM** is a programming interface that represents HTML documents as a tree of objects.

### DOM Tree Structure:

```
document
    └── html
        ├── head
        │   ├── title
        │   ├── meta
        │   └── link
        └── body
            ├── header
            │   └── nav
            ├── main
            │   ├── h1
            │   ├── p
            │   └── div
            └── footer
```

---

## 🔍 Selecting DOM Elements

### By ID:
```javascript
// Returns single element or null
const element = document.getElementById('myId');
```

### By Class Name:
```javascript
// Returns HTMLCollection (live)
const elements = document.getElementsByClassName('myClass');
```

### By Tag Name:
```javascript
// Returns HTMLCollection (live)
const paragraphs = document.getElementsByTagName('p');
```

### By Name Attribute:
```javascript
// Returns NodeList (live)
const radios = document.getElementsByName('gender');
```

### Query Selector (Modern - Recommended):
```javascript
// Returns first matching element or null
const first = document.querySelector('.myClass');
const byId = document.querySelector('#myId');
const byTag = document.querySelector('p');
const complex = document.querySelector('div.container > p:first-child');

// Returns NodeList (static - not live)
const all = document.querySelectorAll('.myClass');
const allParagraphs = document.querySelectorAll('p');
```

### HTMLCollection vs NodeList:


| Feature | HTMLCollection | NodeList |
|---------|----------------|----------|
| Live updates | ✅ Yes | ❌ No (usually) |
| Access by index | ✅ Yes | ✅ Yes |
| Access by name | ✅ Yes | ❌ No |
| forEach() | ❌ No | ✅ Yes |
| Iterable | ✅ Yes | ✅ Yes |

### Converting to Array:
```javascript
const elementsArray = Array.from(document.querySelectorAll('p'));
const elementsArray2 = [...document.querySelectorAll('p')];
```

---

## 🧭 DOM Traversal

### Parent/Child/Sibling Navigation:

```javascript
const element = document.getElementById('myElement');

// Parent
element.parentNode;        // Parent node (any type)
element.parentElement;     // Parent element only

// Children
element.childNodes;        // All child nodes (includes text, comments)
element.children;          // Child elements only
element.firstChild;        // First child node
element.firstElementChild; // First child element
element.lastChild;         // Last child node
element.lastElementChild;  // Last child element
element.childElementCount; // Number of child elements

// Siblings
element.nextSibling;            // Next sibling node
element.nextElementSibling;     // Next sibling element
element.previousSibling;        // Previous sibling node
element.previousElementSibling; // Previous sibling element
```

### Finding Elements:
```javascript
// Find closest ancestor matching selector
element.closest('.container');

// Check if element matches selector
element.matches('.active');

// Find within element
element.querySelector('.child');
element.querySelectorAll('.child');
```

---

## ✏️ DOM Manipulation

### Creating Elements:

```javascript
// Create element
const div = document.createElement('div');
const text = document.createTextNode('Hello World');

// Create from HTML string
const template = document.createElement('template');
template.innerHTML = '<div class="card"><h2>Title</h2></div>';
const element = template.content.firstChild;
```

### Modifying Content:

```javascript
const element = document.getElementById('myElement');

// Text content (no HTML parsing)
element.textContent = 'Plain text';

// Inner HTML (parses HTML)
element.innerHTML = '<strong>Bold text</strong>';

// Outer HTML (replaces element itself)
element.outerHTML = '<div id="new">New element</div>';

// Inner text (visible text only)
element.innerText = 'Visible text only';
```

### textContent vs innerHTML vs innerText:


| Property | HTML Parsed | Hidden Content | Performance |
|----------|-------------|----------------|-------------|
| `textContent` | ❌ No | ✅ Included | Fast |
| `innerHTML` | ✅ Yes | ✅ Included | Slower |
| `innerText` | ❌ No | ❌ Excluded | Slowest |

### Adding Elements:

```javascript
const parent = document.getElementById('parent');
const newElement = document.createElement('div');

// Append as last child
parent.appendChild(newElement);
parent.append(newElement, 'text', anotherElement);  // Multiple

// Prepend as first child
parent.prepend(newElement);

// Insert before specific element
parent.insertBefore(newElement, referenceElement);

// Insert relative to element
element.insertAdjacentHTML('beforebegin', '<p>Before</p>');
element.insertAdjacentHTML('afterbegin', '<p>First child</p>');
element.insertAdjacentHTML('beforeend', '<p>Last child</p>');
element.insertAdjacentHTML('afterend', '<p>After</p>');

// Insert element (similar)
element.insertAdjacentElement('beforebegin', newElement);
element.insertAdjacentText('afterend', 'Plain text');

// Before/After (modern)
element.before(newElement);
element.after(newElement);
```

### Removing Elements:

```javascript
// Remove element
element.remove();

// Remove child
parent.removeChild(child);

// Replace element
parent.replaceChild(newChild, oldChild);
element.replaceWith(newElement);
```

### Cloning Elements:

```javascript
// Shallow clone (without children)
const shallowClone = element.cloneNode(false);

// Deep clone (with children)
const deepClone = element.cloneNode(true);
```

---

## 🎨 Modifying Attributes & Classes

### Attributes:

```javascript
const element = document.getElementById('myElement');

// Get attribute
element.getAttribute('href');
element.getAttribute('data-id');

// Set attribute
element.setAttribute('href', 'https://example.com');
element.setAttribute('data-id', '123');

// Remove attribute
element.removeAttribute('disabled');

// Check if attribute exists
element.hasAttribute('disabled');  // true/false

// Direct property access (for standard attributes)
element.id;
element.className;
element.src;
element.href;
element.disabled;
element.checked;
```

### Data Attributes:

```html
<div id="user" data-id="123" data-user-name="john" data-active="true"></div>
```

```javascript
const element = document.getElementById('user');

// Access via dataset
element.dataset.id;       // "123"
element.dataset.userName; // "john" (camelCase for data-user-name)
element.dataset.active;   // "true"

// Set data attribute
element.dataset.role = 'admin';  // Creates data-role="admin"

// Delete data attribute
delete element.dataset.active;
```

### Classes:

```javascript
const element = document.getElementById('myElement');

// classList methods (recommended)
element.classList.add('active');
element.classList.add('primary', 'large');  // Multiple
element.classList.remove('inactive');
element.classList.toggle('visible');         // Add if absent, remove if present
element.classList.toggle('visible', true);   // Force add
element.classList.toggle('visible', false);  // Force remove
element.classList.replace('old', 'new');
element.classList.contains('active');        // true/false
element.classList.item(0);                   // First class name

// className (all classes as string)
element.className = 'class1 class2 class3';
element.className += ' newClass';
```

---

## 💅 Modifying Styles

### Inline Styles:

```javascript
const element = document.getElementById('myElement');

// Set individual style properties
element.style.color = 'red';
element.style.backgroundColor = 'blue';  // camelCase
element.style.fontSize = '16px';
element.style.display = 'none';

// Set multiple styles
element.style.cssText = 'color: red; background-color: blue;';

// Get computed style
const styles = window.getComputedStyle(element);
styles.color;           // "rgb(255, 0, 0)"
styles.backgroundColor; // "rgb(0, 0, 255)"
```

### CSS Custom Properties:

```javascript
// Set CSS variable
element.style.setProperty('--primary-color', 'blue');

// Get CSS variable
getComputedStyle(element).getPropertyValue('--primary-color');

// Remove CSS variable
element.style.removeProperty('--primary-color');
```

---

## 🎯 DOM Events

### Event Types:


| Category | Events |
|----------|--------|
| Mouse | `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `mouseenter`, `mouseleave`, `contextmenu` |
| Keyboard | `keydown`, `keyup`, `keypress` (deprecated) |
| Form | `submit`, `reset`, `focus`, `blur`, `change`, `input`, `select` |
| Document | `DOMContentLoaded`, `load`, `beforeunload`, `unload` |
| Window | `resize`, `scroll`, `hashchange`, `popstate` |
| Drag & Drop | `drag`, `dragstart`, `dragend`, `dragover`, `dragenter`, `dragleave`, `drop` |
| Clipboard | `cut`, `copy`, `paste` |
| Touch | `touchstart`, `touchmove`, `touchend`, `touchcancel` |

### Adding Event Listeners:

```javascript
const button = document.getElementById('myButton');

// Method 1: addEventListener (recommended)
button.addEventListener('click', function(event) {
    console.log('Clicked!');
});

// Method 2: Arrow function
button.addEventListener('click', (event) => {
    console.log('Clicked!');
});

// Method 3: Named function (for removal)
function handleClick(event) {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Method 4: Inline (not recommended)
// <button onclick="handleClick()">Click</button>

// Method 5: Property assignment
button.onclick = function(event) {
    console.log('Clicked!');
};
```

### Event Object Properties:

```javascript
element.addEventListener('click', function(event) {
    // Event type
    event.type;       // 'click'
    
    // Target element
    event.target;     // Element that triggered event
    event.currentTarget; // Element with listener attached
    
    // Mouse position
    event.clientX;    // X relative to viewport
    event.clientY;    // Y relative to viewport
    event.pageX;      // X relative to document
    event.pageY;      // Y relative to document
    event.screenX;    // X relative to screen
    event.screenY;    // Y relative to screen
    event.offsetX;    // X relative to element
    event.offsetY;    // Y relative to element
    
    // Modifier keys
    event.altKey;     // Alt/Option pressed
    event.ctrlKey;    // Ctrl pressed
    event.shiftKey;   // Shift pressed
    event.metaKey;    // Cmd/Windows key pressed
    
    // Mouse button
    event.button;     // 0=left, 1=middle, 2=right
    
    // Keyboard
    event.key;        // 'Enter', 'a', 'ArrowUp'
    event.code;       // 'Enter', 'KeyA', 'ArrowUp'
    event.keyCode;    // Deprecated, use key/code
    
    // Prevent default behavior
    event.preventDefault();
    
    // Stop propagation
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    // Check if default prevented
    event.defaultPrevented;
});
```

---

## 🌊 Event Bubbling & Capturing

```
                    Document
                       ↓ (Capturing) ↑ (Bubbling)
                      Body
                       ↓            ↑
                      Div
                       ↓            ↑
                     Button (Target)
```

### Event Phases:
1. **Capturing Phase** - Document → Target (top-down)
2. **Target Phase** - Event at target element
3. **Bubbling Phase** - Target → Document (bottom-up)

### Controlling Propagation:

```javascript
// Bubbling (default)
element.addEventListener('click', handler);
element.addEventListener('click', handler, false);

// Capturing
element.addEventListener('click', handler, true);
element.addEventListener('click', handler, { capture: true });

// Stop bubbling
element.addEventListener('click', (e) => {
    e.stopPropagation();  // Stops bubbling/capturing
});

// Stop immediate propagation (stops other handlers on same element)
element.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
});
```

### Event Delegation:

```javascript
// Instead of adding listener to each item
const list = document.getElementById('todoList');

list.addEventListener('click', function(event) {
    // Check if clicked element is a list item
    if (event.target.matches('li')) {
        event.target.classList.toggle('completed');
    }
    
    // Handle delete button inside list item
    if (event.target.matches('.delete-btn')) {
        event.target.closest('li').remove();
    }
});
```

### Benefits of Event Delegation:
1. **Memory efficient** - Single listener instead of many
2. **Works with dynamic elements** - No need to rebind
3. **Less code** - Centralized handling

---

## 📝 HTML Forms

### Accessing Form Elements:

```javascript
// By form name/id
const form = document.forms['myForm'];
const form2 = document.getElementById('myForm');

// Form elements
form.elements;                // All form controls
form.elements['email'];       // By name
form.elements[0];             // By index

// Form properties
form.action;   // URL
form.method;   // GET/POST
form.enctype;  // Encoding type
```

### Input Values:

```javascript
// Text inputs
const input = document.getElementById('email');
input.value;           // Get value
input.value = 'test@email.com';  // Set value

// Checkbox
const checkbox = document.getElementById('agree');
checkbox.checked;      // true/false
checkbox.checked = true;

// Radio buttons
const radios = document.getElementsByName('gender');
let selectedValue;
for (const radio of radios) {
    if (radio.checked) {
        selectedValue = radio.value;
        break;
    }
}

// Select dropdown
const select = document.getElementById('country');
select.value;              // Selected value
select.selectedIndex;      // Selected index
select.options;            // All options
select.options[select.selectedIndex].text;  // Selected text

// Multiple select
const multiSelect = document.getElementById('skills');
const selectedValues = [...multiSelect.selectedOptions].map(opt => opt.value);

// Textarea
const textarea = document.getElementById('message');
textarea.value;
```

### Form Events:

```javascript
const form = document.getElementById('myForm');

// Submit event
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default submission
    
    // Get form data
    const formData = new FormData(form);
    
    // Access fields
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Convert to object
    const data = Object.fromEntries(formData);
    
    // Submit via AJAX
    fetch('/submit', {
        method: 'POST',
        body: formData
    });
});

// Reset event
form.addEventListener('reset', function(event) {
    console.log('Form reset');
});

// Input event (fires on every change)
input.addEventListener('input', function(event) {
    console.log('Current value:', event.target.value);
});

// Change event (fires when focus leaves)
input.addEventListener('change', function(event) {
    console.log('Final value:', event.target.value);
});

// Focus/Blur
input.addEventListener('focus', (e) => console.log('Focused'));
input.addEventListener('blur', (e) => console.log('Blurred'));
```

---

## ✅ Form Validation

### HTML5 Built-in Validation:

```html
<form id="myForm">
    <input type="text" required minlength="3" maxlength="50">
    <input type="email" required>
    <input type="number" min="0" max="100">
    <input type="text" pattern="[A-Za-z]{3}">
    <input type="url" required>
    <button type="submit">Submit</button>
</form>
```

### Validation Attributes:


| Attribute | Description |
|-----------|-------------|
| `required` | Field must have value |
| `minlength` | Minimum characters |
| `maxlength` | Maximum characters |
| `min` | Minimum value (number/date) |
| `max` | Maximum value (number/date) |
| `step` | Valid increments |
| `pattern` | Regex pattern |
| `type` | Built-in validation (email, url, number) |

### Constraint Validation API:

```javascript
const input = document.getElementById('email');

// Check validity
input.checkValidity();  // true/false
input.reportValidity(); // Shows validation message

// Validity state
input.validity.valid;          // Overall validity
input.validity.valueMissing;   // Required but empty
input.validity.typeMismatch;   // Wrong type (email, url)
input.validity.patternMismatch; // Doesn't match pattern
input.validity.tooLong;        // Exceeds maxlength
input.validity.tooShort;       // Below minlength
input.validity.rangeOverflow;  // Exceeds max
input.validity.rangeUnderflow; // Below min
input.validity.stepMismatch;   // Doesn't match step
input.validity.badInput;       // Browser can't convert
input.validity.customError;    // Custom error set

// Validation message
input.validationMessage;  // Browser's default message

// Set custom message
input.setCustomValidity('Please enter a valid email');
input.setCustomValidity('');  // Clear error

// Form validation
const form = document.getElementById('myForm');
form.checkValidity();
form.reportValidity();
```

### JavaScript Validation:

```javascript
const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Password validation
    if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        clearError(password);
    }
    
    if (isValid) {
        form.submit();
    }
});

function showError(input, message) {
    input.classList.add('error');
    const errorSpan = input.nextElementSibling;
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function clearError(input) {
    input.classList.remove('error');
    const errorSpan = input.nextElementSibling;
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}
```

---

## 📐 Regular Expressions

### Creating RegExp:

```javascript
// Literal notation
const regex1 = /pattern/flags;

// Constructor
const regex2 = new RegExp('pattern', 'flags');
```

### Flags:


| Flag | Description |
|------|-------------|
| `g` | Global (find all matches) |
| `i` | Case-insensitive |
| `m` | Multiline |
| `s` | Dot matches newline |
| `u` | Unicode |
| `y` | Sticky (match at lastIndex) |

### Common Patterns:

```javascript
// Email
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone (Indian)
/^[6-9]\d{9}$/

// URL
/^https?:\/\/[\w.-]+(?:\/[\w.-]*)*\/?$/

// Password (min 8 chars, 1 upper, 1 lower, 1 digit)
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

// Only letters
/^[a-zA-Z]+$/

// Only digits
/^\d+$/

// Alphanumeric
/^[a-zA-Z0-9]+$/

// Date (YYYY-MM-DD)
/^\d{4}-\d{2}-\d{2}$/

// IP Address
/^(\d{1,3}\.){3}\d{1,3}$/
```

### RegExp Methods:

```javascript
const regex = /hello/gi;
const str = 'Hello World, hello universe';

// test() - returns boolean
regex.test(str);  // true

// exec() - returns match info
regex.exec(str);  // ['Hello', index: 0, ...]

// String methods with regex
str.match(regex);        // ['Hello', 'hello']
str.matchAll(regex);     // Iterator of matches
str.search(regex);       // First match index (0)
str.replace(regex, 'hi'); // 'hi World, hi universe'
str.split(/,\s*/);       // ['Hello World', 'hello universe']
```

---

## 🐛 Debugging & Dev Tools

### Console Methods:

```javascript
console.log('Basic message');
console.info('Info message');
console.warn('Warning message');
console.error('Error message');

// Formatted output
console.log('Name: %s, Age: %d', 'John', 30);

// Object inspection
console.dir(object);
console.table([{name: 'John'}, {name: 'Jane'}]);

// Grouping
console.group('Group Name');
console.log('Inside group');
console.groupEnd();

// Timing
console.time('Timer');
// ... code
console.timeEnd('Timer');  // Timer: 5.2ms

// Counting
console.count('Label');  // Label: 1
console.count('Label');  // Label: 2
console.countReset('Label');

// Assertion
console.assert(1 === 2, '1 is not equal to 2');

// Stack trace
console.trace('Trace message');

// Clear console
console.clear();
```

### Debugger Statement:

```javascript
function calculate(x, y) {
    debugger;  // Pauses execution here
    return x + y;
}
```

### Error Handling:

```javascript
try {
    // Code that might throw error
    const result = riskyOperation();
} catch (error) {
    // Handle error
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
} finally {
    // Always executes
    cleanup();
}

// Throwing errors
throw new Error('Something went wrong');
throw new TypeError('Expected a number');
throw new RangeError('Value out of range');

// Custom errors
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

throw new ValidationError('Invalid email format');
```

### Browser Developer Tools:

| Tab | Purpose |
|-----|---------|
| **Elements** | Inspect/modify DOM & CSS |
| **Console** | JavaScript console, logging |
| **Sources** | Debug JavaScript, set breakpoints |
| **Network** | Monitor HTTP requests |
| **Performance** | Profile runtime performance |
| **Application** | Storage, cookies, cache |
| **Security** | SSL/TLS, certificates |

---

## 🔧 JSLint/ESLint

**Linting** - Static code analysis to find problems.

### Common Lint Rules:

| Rule | Description |
|------|-------------|
| `no-unused-vars` | No unused variables |
| `no-undef` | No undefined variables |
| `eqeqeq` | Require === instead of == |
| `semi` | Require semicolons |
| `quotes` | Enforce quote style |
| `no-console` | No console.log |
| `indent` | Enforce indentation |

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **getElementById** returns single element, **querySelector** accepts CSS selectors
2. **querySelectorAll** returns static NodeList, **getElementsByClassName** returns live HTMLCollection
3. **textContent** is faster, **innerHTML** parses HTML
4. **appendChild** adds to end, **insertBefore** adds before reference
5. **classList** has add(), remove(), toggle(), contains()
6. **dataset** accesses data-* attributes (camelCase conversion)
7. **addEventListener** is preferred over onclick property
8. **e.preventDefault()** stops default behavior
9. **e.stopPropagation()** stops event bubbling
10. **Event delegation** uses bubbling to handle events on parent
11. **Capturing phase** (top-down), **Bubbling phase** (bottom-up)
12. **checkValidity()** returns boolean, **reportValidity()** shows message
13. **FormData** object collects form data for submission
14. **Regular expressions** use test() for boolean, exec() for match details
15. **debugger** statement pauses execution in dev tools
