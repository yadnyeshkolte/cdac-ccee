---
layout: default
title: JSON & jQuery
parent: Module 3 - Web Technologies
nav_order: 8
---

# Session 10: JSON & jQuery

## 📚 JSON (JavaScript Object Notation)

**JSON** is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.

### JSON vs JavaScript Object:


| Feature | JSON | JavaScript Object |
|---------|------|-------------------|
| Keys | Must be quoted strings | Can be unquoted |
| Values | String, Number, Boolean, null, Array, Object | Any JS value |
| Functions | ❌ Not allowed | ✅ Allowed |
| Comments | ❌ Not allowed | ✅ Allowed |
| Trailing commas | ❌ Not allowed | ✅ Allowed |
| Single quotes | ❌ Not allowed | ✅ Allowed |

---

## 📝 JSON Syntax Rules

### Valid JSON Data Types:

```json
{
    "string": "Hello World",
    "number": 42,
    "decimal": 3.14,
    "boolean": true,
    "null": null,
    "array": [1, 2, 3],
    "object": {
        "nested": "value"
    }
}
```

### JSON Syntax:

```json
{
    "name": "John Doe",
    "age": 30,
    "isStudent": false,
    "address": {
        "city": "Mumbai",
        "country": "India"
    },
    "courses": ["JavaScript", "React", "Node.js"],
    "spouse": null
}
```

### Common JSON Mistakes:

```javascript
// ❌ Wrong
{
    name: "John",           // Keys must be quoted
    'age': 30,              // Must use double quotes
    "active": true,         // Trailing comma not allowed
}

// ✅ Correct
{
    "name": "John",
    "age": 30,
    "active": true
}
```

---

## 🔄 JSON Methods

### JSON.parse() - String to Object:

```javascript
// Basic parsing
const jsonString = '{"name":"John","age":30}';
const obj = JSON.parse(jsonString);
console.log(obj.name);  // "John"

// With reviver function (transform values)
const data = '{"date":"2024-01-15"}';
const parsed = JSON.parse(data, (key, value) => {
    if (key === 'date') {
        return new Date(value);
    }
    return value;
});
console.log(parsed.date instanceof Date);  // true

// Error handling
try {
    const invalid = JSON.parse('{"broken": }');
} catch (error) {
    console.error('Invalid JSON:', error.message);
}
```

### JSON.stringify() - Object to String:

```javascript
// Basic stringify
const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj);
console.log(json);  // '{"name":"John","age":30}'

// Pretty print with indentation
const pretty = JSON.stringify(obj, null, 2);
/*
{
  "name": "John",
  "age": 30
}
*/

// With replacer array (select properties)
const filtered = JSON.stringify(obj, ['name']);
console.log(filtered);  // '{"name":"John"}'

// With replacer function
const masked = JSON.stringify(obj, (key, value) => {
    if (key === 'password') return '***';
    return value;
});

// Handling special values
const special = {
    date: new Date(),      // Converted to ISO string
    regex: /abc/,          // Converted to {}
    func: function() {},   // Omitted
    undefined: undefined,  // Omitted
    infinity: Infinity,    // Converted to null
    nan: NaN              // Converted to null
};
```

### toJSON() Method:

```javascript
const user = {
    name: 'John',
    password: 'secret123',
    
    // Custom JSON representation
    toJSON() {
        return {
            name: this.name
            // password excluded
        };
    }
};

JSON.stringify(user);  // '{"name":"John"}'
```

---

## 📋 JSON Arrays & Files

### JSON Arrays:

```json
[
    {
        "id": 1,
        "name": "John"
    },
    {
        "id": 2,
        "name": "Jane"
    }
]
```

### Working with JSON Arrays:

```javascript
const jsonArray = '[{"id":1,"name":"John"},{"id":2,"name":"Jane"}]';
const users = JSON.parse(jsonArray);

// Iterate
users.forEach(user => console.log(user.name));

// Find
const john = users.find(u => u.name === 'John');

// Filter
const filtered = users.filter(u => u.id > 1);

// Map
const names = users.map(u => u.name);
```

### Fetching JSON Files:

```javascript
// Modern approach with fetch
fetch('data.json')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// With async/await
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 💲 Introduction to jQuery

**jQuery** is a fast, small, and feature-rich JavaScript library that simplifies HTML document traversal, event handling, animation, and AJAX.

### Adding jQuery:

```html
<!-- CDN -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Local file -->
<script src="js/jquery.min.js"></script>
```

### jQuery Syntax:

```javascript
// Basic syntax
$(selector).action();

// Document ready (wait for DOM)
$(document).ready(function() {
    // Code here
});

// Shorthand
$(function() {
    // Code here
});

// Arrow function
$(() => {
    // Code here
});
```

### jQuery vs Vanilla JS:


| Task | jQuery | Vanilla JS |
|------|--------|------------|
| Select by ID | `$('#id')` | `document.getElementById('id')` |
| Select by class | `$('.class')` | `document.querySelectorAll('.class')` |
| Add class | `$el.addClass('active')` | `el.classList.add('active')` |
| Set text | `$el.text('Hello')` | `el.textContent = 'Hello'` |
| AJAX | `$.ajax()` | `fetch()` |

---

## 🎯 jQuery Selectors

### Basic Selectors:

```javascript
// By ID
$('#myId')

// By class
$('.myClass')

// By tag
$('div')
$('p')

// Universal
$('*')

// Multiple
$('div, p, span')
$('#id, .class, tag')
```

### Hierarchy Selectors:

```javascript
// Descendant (all levels)
$('div p')

// Direct child
$('ul > li')

// Adjacent sibling (next)
$('h1 + p')

// General sibling (all after)
$('h1 ~ p')
```

### Attribute Selectors:

```javascript
// Has attribute
$('[href]')

// Exact value
$('[type="text"]')

// Contains word
$('[class~="active"]')

// Starts with
$('[href^="https"]')

// Ends with
$('[href$=".pdf"]')

// Contains
$('[class*="btn"]')
```

### Filter Selectors:

```javascript
// Position
$('li:first')
$('li:last')
$('li:eq(2)')       // Index 2
$('li:lt(3)')       // Index < 3
$('li:gt(3)')       // Index > 3
$('li:even')
$('li:odd')

// Content
$(':contains("text")')
$(':empty')
$(':has(p)')        // Contains <p>
$(':parent')        // Has children

// Visibility
$(':visible')
$(':hidden')

// Form
$(':input')
$(':text')
$(':password')
$(':checkbox')
$(':radio')
$(':submit')
$(':button')
$(':selected')
$(':checked')
$(':disabled')
$(':enabled')
$(':focus')
```

---

## 🔍 jQuery DOM Traversal

### Ancestors:

```javascript
$el.parent()          // Direct parent
$el.parents()         // All ancestors
$el.parents('.class') // Specific ancestors
$el.parentsUntil('#id') // Ancestors until
$el.closest('.class') // Nearest ancestor
```

### Descendants:

```javascript
$el.children()        // Direct children
$el.children('.class') // Filtered children
$el.find('span')      // All descendants matching
$el.contents()        // All children including text nodes
```

### Siblings:

```javascript
$el.siblings()        // All siblings
$el.siblings('.class') // Filtered siblings
$el.next()            // Next sibling
$el.nextAll()         // All next siblings
$el.nextUntil('.class') // Next siblings until
$el.prev()            // Previous sibling
$el.prevAll()         // All previous siblings
$el.prevUntil('.class') // Previous siblings until
```

### Filtering:

```javascript
$('li').first()       // First element
$('li').last()        // Last element
$('li').eq(2)         // Element at index
$('li').filter('.active') // Filter by selector/function
$('li').not('.active') // Exclude matching
$('li').has('span')   // Has descendant
$('li').is('.active') // Check if matches (boolean)
$el.slice(0, 3)       // Subset
```

---

## ✏️ jQuery DOM Manipulation

### Content:

```javascript
// Get/Set text
$el.text()            // Get text
$el.text('New text')  // Set text

// Get/Set HTML
$el.html()            // Get HTML
$el.html('<b>Bold</b>') // Set HTML

// Get/Set value
$('input').val()      // Get value
$('input').val('New') // Set value
```

### Attributes:

```javascript
// Get/Set attribute
$el.attr('href')
$el.attr('href', 'https://example.com')
$el.attr({
    href: 'https://example.com',
    target: '_blank'
})

// Remove attribute
$el.removeAttr('disabled')

// Properties (boolean attributes)
$el.prop('checked')
$el.prop('checked', true)

// Data attributes
$el.data('id')        // Get data-id
$el.data('id', 123)   // Set data-id
```

### Classes:

```javascript
$el.addClass('active')
$el.addClass('active highlight')
$el.removeClass('active')
$el.toggleClass('active')
$el.hasClass('active')  // Boolean
```

### CSS:

```javascript
// Get/Set single property
$el.css('color')
$el.css('color', 'red')

// Set multiple properties
$el.css({
    color: 'red',
    fontSize: '16px',
    'background-color': 'blue'
})

// Dimensions
$el.width()           // Content width
$el.height()          // Content height
$el.innerWidth()      // Width + padding
$el.innerHeight()     // Height + padding
$el.outerWidth()      // Width + padding + border
$el.outerHeight()     // Height + padding + border
$el.outerWidth(true)  // + margin
$el.outerHeight(true) // + margin

// Position
$el.offset()          // { top, left } relative to document
$el.position()        // { top, left } relative to parent
$el.scrollTop()       // Scroll position
$el.scrollLeft()
```

### Insertion:

```javascript
// Inside
$el.append('<p>End</p>')      // At end
$el.prepend('<p>Start</p>')   // At start
$el.appendTo('#target')       // Move to target
$el.prependTo('#target')

// Outside
$el.after('<p>After</p>')     // After element
$el.before('<p>Before</p>')   // Before element
$el.insertAfter('#target')    // Move after target
$el.insertBefore('#target')

// Wrap
$el.wrap('<div></div>')       // Wrap individually
$el.wrapAll('<div></div>')    // Wrap all together
$el.wrapInner('<span></span>') // Wrap contents
$el.unwrap()                  // Remove wrapper
```

### Removal:

```javascript
$el.remove()          // Remove element
$el.empty()           // Remove children
$el.detach()          // Remove but keep data
$el.replaceWith('<new>') // Replace element
```

---

## 🎯 jQuery Events

### Event Binding:

```javascript
// on() - preferred method
$el.on('click', function() {
    console.log('Clicked!');
});

// Multiple events
$el.on('click mouseenter', function(e) {
    console.log(e.type);
});

// Event with data
$el.on('click', { name: 'John' }, function(e) {
    console.log(e.data.name);
});

// Delegated event (for dynamic elements)
$('#parent').on('click', '.child', function() {
    console.log('Child clicked');
});

// Shorthand methods
$el.click(fn)
$el.dblclick(fn)
$el.mouseenter(fn)
$el.mouseleave(fn)
$el.mousedown(fn)
$el.mouseup(fn)
$el.hover(enterFn, leaveFn)
$el.focus(fn)
$el.blur(fn)
$el.change(fn)
$el.submit(fn)
$el.keydown(fn)
$el.keyup(fn)
$el.keypress(fn)
$el.scroll(fn)
$el.resize(fn)
```

### Event Unbinding:

```javascript
// Remove specific handler
$el.off('click', handler)

// Remove all click handlers
$el.off('click')

// Remove all handlers
$el.off()

// Remove delegated
$('#parent').off('click', '.child')
```

### Event Object:

```javascript
$el.on('click', function(e) {
    e.type              // Event type
    e.target            // Element that triggered
    e.currentTarget     // Element with handler
    e.pageX, e.pageY    // Mouse position
    e.which             // Key/button code
    e.data              // Data passed to handler
    
    e.preventDefault()  // Prevent default
    e.stopPropagation() // Stop bubbling
    return false        // Both above
});
```

### Trigger Events:

```javascript
$el.trigger('click')
$el.triggerHandler('click')  // No bubbling
$el.click()                  // Shorthand
```

### One-time Events:

```javascript
$el.one('click', function() {
    console.log('Only runs once');
});
```

---

## 🎬 jQuery Animation Effects

### Show/Hide:

```javascript
$el.show()            // Display element
$el.hide()            // Hide element
$el.toggle()          // Toggle visibility

// With duration
$el.show(400)         // 400ms
$el.hide('slow')      // slow/fast
$el.toggle(1000, callback)
```

### Fade:

```javascript
$el.fadeIn()          // Fade in
$el.fadeOut()         // Fade out
$el.fadeToggle()      // Toggle fade
$el.fadeTo(400, 0.5)  // Fade to opacity
```

### Slide:

```javascript
$el.slideDown()       // Slide down (show)
$el.slideUp()         // Slide up (hide)
$el.slideToggle()     // Toggle slide
```

### Custom Animation:

```javascript
$el.animate({
    opacity: 0.5,
    left: '+=100px',
    height: 'toggle'
}, 1000, 'swing', function() {
    console.log('Animation complete');
});

// Queue animations
$el.animate({ left: '100px' })
   .animate({ top: '100px' })
   .animate({ opacity: 0.5 });

// Stop animation
$el.stop()            // Stop current
$el.stop(true)        // Clear queue
$el.stop(true, true)  // Jump to end
$el.finish()          // Complete all
```

### Delay:

```javascript
$el.fadeIn().delay(1000).fadeOut();
```

---

## 🔧 jQuery Utility Functions

```javascript
// Each iteration
$.each(array, function(index, value) {
    console.log(index, value);
});

$.each(object, function(key, value) {
    console.log(key, value);
});

// Map
$.map(array, function(value, index) {
    return value * 2;
});

// Grep (filter)
$.grep(array, function(value, index) {
    return value > 5;
});

// Merge arrays
$.merge([1, 2], [3, 4]);  // [1, 2, 3, 4]

// Extend objects
$.extend({}, obj1, obj2);       // Shallow
$.extend(true, {}, obj1, obj2); // Deep

// Type checking
$.type(value)         // 'array', 'object', etc.
$.isArray(value)
$.isFunction(value)
$.isPlainObject(value)
$.isNumeric(value)
$.isEmptyObject(value)

// Trim
$.trim('  hello  ')   // 'hello'

// Parse JSON
$.parseJSON(string)

// Parse HTML
$.parseHTML(htmlString)
```

---

## 🔌 jQuery Plugins

### Using Plugins:

```html
<!-- Include jQuery first -->
<script src="jquery.min.js"></script>
<!-- Then plugin -->
<script src="plugin.min.js"></script>
```

### Creating Simple Plugin:

```javascript
// Plugin definition
$.fn.highlight = function(color) {
    return this.css('background-color', color || 'yellow');
};

// Usage
$('p').highlight();
$('p').highlight('lightblue');
```

### Plugin with Options:

```javascript
$.fn.tooltip = function(options) {
    const defaults = {
        position: 'top',
        delay: 200
    };
    
    const settings = $.extend({}, defaults, options);
    
    return this.each(function() {
        // Plugin logic
    });
};

// Usage
$('.tip').tooltip({ position: 'bottom' });
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **JSON keys** must be double-quoted strings
2. **JSON.parse()** converts string to object
3. **JSON.stringify()** converts object to string
4. **JSON doesn't support** functions, undefined, comments
5. **$(document).ready()** waits for DOM to load
6. **$(selector)** returns jQuery object, not DOM element
7. **$el.text()** gets/sets text, **$el.html()** gets/sets HTML
8. **$el.on()** is preferred for event binding
9. **Event delegation** uses `$('#parent').on('click', '.child', fn)`
10. **$el.attr()** for attributes, **$el.prop()** for properties (checked, disabled)
11. **$el.append()** adds inside at end, **$el.after()** adds outside after
12. **animate()** accepts CSS properties in camelCase
13. **$.each()** iterates arrays/objects
14. **$.extend()** merges objects
15. **$this** refers to DOM element, **$(this)** is jQuery object
