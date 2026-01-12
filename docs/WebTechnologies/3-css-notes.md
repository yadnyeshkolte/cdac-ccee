---
layout: default
title: CSS3 Styling
parent: Module 3 - Web Technologies
nav_order: 3
---

# Session 3: Cascading Style Sheets (CSS)

## 📚 Introduction to CSS

**CSS (Cascading Style Sheets)** - Language for describing the presentation of HTML documents.

### CSS Syntax:
```css
selector {
    property: value;
    property: value;
}

/* Example */
h1 {
    color: blue;
    font-size: 24px;
}
```

---

## 🎨 Ways to Apply CSS

### 1. Inline CSS (Highest Priority):
```html
<p style="color: red; font-size: 16px;">Inline styled text</p>
```

### 2. Internal CSS (Style Tag):
```html
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>
```

### 3. External CSS (Recommended):
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

### Comparison:


| Method | Pros | Cons |
|--------|------|------|
| **Inline** | Quick changes, highest priority | No reusability, hard to maintain |
| **Internal** | Good for single page | Not reusable across pages |
| **External** | Reusable, caching, maintainable | Extra HTTP request |

---

## 🎯 CSS Selectors

### Basic Selectors:


| Selector | Syntax | Description | Example |
|----------|--------|-------------|---------|
| Universal | `*` | All elements | `* { margin: 0; }` |
| Element | `tag` | By tag name | `p { color: blue; }` |
| Class | `.class` | By class attribute | `.highlight { background: yellow; }` |
| ID | `#id` | By id attribute | `#header { height: 100px; }` |

### Attribute Selectors:


| Selector | Description | Example |
|----------|-------------|---------|
| `[attr]` | Has attribute | `[disabled]` |
| `[attr=value]` | Exact match | `[type="text"]` |
| `[attr~=value]` | Word in space-separated list | `[class~="active"]` |
| `[attr|=value]` | Value or value- prefix | `[lang|="en"]` |
| `[attr^=value]` | Starts with | `[href^="https"]` |
| `[attr$=value]` | Ends with | `[href$=".pdf"]` |
| `[attr*=value]` | Contains | `[class*="btn"]` |

### Combinator Selectors:


| Selector | Description | Example |
|----------|-------------|---------|
| `A B` | Descendant (any level) | `div p` |
| `A > B` | Direct child | `ul > li` |
| `A + B` | Adjacent sibling (next) | `h1 + p` |
| `A ~ B` | General sibling (all after) | `h1 ~ p` |

### Pseudo-class Selectors:

```css
/* Link states */
a:link { color: blue; }      /* Unvisited */
a:visited { color: purple; } /* Visited */
a:hover { color: red; }      /* Mouse over */
a:active { color: orange; }  /* Being clicked */
a:focus { outline: 2px solid blue; } /* Focused */

/* Position-based */
li:first-child { font-weight: bold; }
li:last-child { color: red; }
li:nth-child(2) { background: yellow; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(even) { background: #fff; }
li:nth-child(3n) { color: blue; }  /* Every 3rd */
li:nth-child(3n+1) { color: red; } /* 1st, 4th, 7th... */

/* Form states */
input:enabled { background: white; }
input:disabled { background: #ccc; }
input:checked { outline: 2px solid green; }
input:required { border: 2px solid red; }
input:optional { border: 2px solid blue; }
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:focus { box-shadow: 0 0 5px blue; }

/* Others */
p:empty { display: none; }
:not(.active) { opacity: 0.5; }
:root { --primary-color: blue; }
```

### Pseudo-element Selectors:

```css
/* First letter/line */
p::first-letter { font-size: 2em; }
p::first-line { font-weight: bold; }

/* Before/After content */
.quote::before { content: '"'; }
.quote::after { content: '"'; }

/* Selection highlight */
::selection { background: yellow; color: black; }

/* Placeholder text */
input::placeholder { color: gray; font-style: italic; }

/* Marker (list bullet) */
li::marker { color: red; }
```

---

## ⚖️ CSS Specificity

Specificity determines which CSS rule applies when conflicts occur.

### Specificity Hierarchy (Highest to Lowest):


| Level | Selector Type | Example |
|-------|---------------|---------|
| 1 | Inline styles | `style="..."` |
| 2 | ID selectors | `#header` |
| 3 | Class, pseudo-class, attribute | `.nav`, `:hover`, `[type]` |
| 4 | Element, pseudo-element | `div`, `::before` |
| 5 | Universal | `*` |

### Calculating Specificity (a, b, c, d):

```
a = Inline styles (1 or 0)
b = Number of ID selectors
c = Number of class/pseudo-class/attribute selectors
d = Number of element/pseudo-element selectors
```

### Examples:


| Selector | Specificity | Score |
|----------|-------------|-------|
| `*` | 0,0,0,0 | 0 |
| `p` | 0,0,0,1 | 1 |
| `p.intro` | 0,0,1,1 | 11 |
| `p#intro` | 0,1,0,1 | 101 |
| `div p span` | 0,0,0,3 | 3 |
| `#nav .item:hover` | 0,1,2,0 | 120 |
| `style="..."` | 1,0,0,0 | 1000 |

### !important Rule:
```css
p {
    color: red !important;  /* Overrides everything */
}
```

> **Note**: Avoid `!important` when possible. Use specificity correctly instead.

---

## 📦 CSS Box Model

Every HTML element is a rectangular box.

### Box Model Structure:
```
┌───────────────────────────────────────┐
│              MARGIN                   │
│  ┌─────────────────────────────────┐  │
│  │           BORDER                │  │
│  │  ┌───────────────────────────┐  │  │
│  │  │        PADDING            │  │  │
│  │  │  ┌─────────────────────┐  │  │  │
│  │  │  │     CONTENT         │  │  │  │
│  │  │  │   (width x height)  │  │  │  │
│  │  │  └─────────────────────┘  │  │  │
│  │  └───────────────────────────┘  │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

### Box Model Properties:

```css
div {
    /* Content dimensions */
    width: 300px;
    height: 200px;
    
    /* Padding (inner spacing) */
    padding: 20px;              /* All sides */
    padding: 10px 20px;         /* Top/Bottom, Left/Right */
    padding: 10px 20px 15px;    /* Top, Left/Right, Bottom */
    padding: 10px 20px 15px 25px; /* Top, Right, Bottom, Left */
    
    /* Border */
    border: 1px solid black;
    border-width: 2px;
    border-style: solid;        /* solid, dashed, dotted, double, groove */
    border-color: red;
    border-radius: 10px;        /* Rounded corners */
    
    /* Margin (outer spacing) */
    margin: 20px;
    margin: auto;               /* Center horizontally */
}
```

### box-sizing Property:

```css
/* Default: content-box */
/* Total width = width + padding + border */
div {
    box-sizing: content-box;
    width: 300px;
    padding: 20px;
    border: 10px solid black;
    /* Actual width = 300 + 40 + 20 = 360px */
}

/* Recommended: border-box */
/* Total width = width (includes padding + border) */
div {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 10px solid black;
    /* Actual width = 300px (content adjusts) */
}

/* Apply to all elements */
*, *::before, *::after {
    box-sizing: border-box;
}
```

---

## 📐 Display Property


| Value | Behavior |
|-------|----------|
| `block` | Full width, new line, accepts width/height |
| `inline` | Inline, no new line, ignores width/height |
| `inline-block` | Inline with width/height |
| `none` | Hidden (no space) |
| `flex` | Flexbox container |
| `grid` | Grid container |
| `table` | Behaves like `<table>` |

### Default Display Values:


| Block Elements | Inline Elements |
|----------------|-----------------|
| `<div>`, `<p>`, `<h1-6>` | `<span>`, `<a>`, `<strong>` |
| `<header>`, `<footer>` | `<em>`, `<img>`, `<input>` |
| `<section>`, `<article>` | `<code>`, `<label>` |
| `<ul>`, `<ol>`, `<li>` | `<br>`, `<i>`, `<b>` |

### visibility vs display:

```css
/* Hidden but occupies space */
.hidden {
    visibility: hidden;
}

/* Hidden and no space */
.removed {
    display: none;
}
```

---

## 📍 CSS Positioning

### Position Values:


| Value | Description |
|-------|-------------|
| `static` | Normal flow (default) |
| `relative` | Relative to normal position |
| `absolute` | Relative to positioned ancestor |
| `fixed` | Relative to viewport |
| `sticky` | Hybrid of relative and fixed |

### Examples:

```css
/* Relative - moves from normal position */
.relative {
    position: relative;
    top: 20px;
    left: 30px;
}

/* Absolute - removed from flow, positioned to ancestor */
.container {
    position: relative;  /* Creates positioning context */
}
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

/* Fixed - always visible, fixed to viewport */
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

/* Sticky - scrolls, then sticks */
.sticky-nav {
    position: sticky;
    top: 0;
}
```

### z-index (Stacking Order):
```css
.front {
    position: relative;
    z-index: 10;  /* Higher = on top */
}
.back {
    position: relative;
    z-index: 1;   /* Lower = behind */
}
```

---

## 🎨 CSS Colors

### Color Formats:

```css
/* Named colors */
color: red;
color: blue;
color: transparent;

/* Hexadecimal */
color: #ff0000;      /* Red */
color: #f00;         /* Red (shorthand) */
color: #ff000080;    /* Red with 50% opacity */

/* RGB */
color: rgb(255, 0, 0);           /* Red */
color: rgba(255, 0, 0, 0.5);     /* Red with 50% opacity */

/* HSL (Hue, Saturation, Lightness) */
color: hsl(0, 100%, 50%);        /* Red */
color: hsla(0, 100%, 50%, 0.5);  /* Red with 50% opacity */
```

### HSL Values:
- **Hue**: 0-360 (color wheel degree)
- **Saturation**: 0-100% (gray to full color)
- **Lightness**: 0-100% (black to white)

---

## 🔤 CSS Fonts & Typography

### Font Properties:

```css
p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: bold;      /* normal, bold, 100-900 */
    font-style: italic;     /* normal, italic, oblique */
    font-variant: small-caps;
    line-height: 1.5;
    letter-spacing: 2px;
    word-spacing: 5px;
    text-decoration: underline; /* none, underline, line-through */
    text-transform: uppercase;  /* none, uppercase, lowercase, capitalize */
    text-align: center;     /* left, right, center, justify */
    text-indent: 30px;      /* First line indent */
}
```

### Font Families:

| Type | Examples | Best For |
|------|----------|----------|
| **Serif** | Times New Roman, Georgia | Body text, print |
| **Sans-serif** | Arial, Helvetica, Verdana | Headings, screens |
| **Monospace** | Courier, Consolas | Code |
| **Cursive** | Comic Sans, Brush Script | Decorative |
| **Fantasy** | Impact, Papyrus | Titles, logos |

### Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

<style>
    body {
        font-family: 'Roboto', sans-serif;
    }
</style>
```

### Font Units:

| Unit | Description | Example |
|------|-------------|---------|
| `px` | Pixels (absolute) | `font-size: 16px;` |
| `em` | Relative to parent | `font-size: 1.5em;` |
| `rem` | Relative to root | `font-size: 1.5rem;` |
| `%` | Percentage of parent | `font-size: 120%;` |
| `vw` | Viewport width | `font-size: 5vw;` |
| `vh` | Viewport height | `font-size: 5vh;` |

---

## 🔲 CSS Backgrounds

```css
div {
    background-color: #f0f0f0;
    background-image: url('image.jpg');
    background-repeat: no-repeat;   /* repeat, repeat-x, repeat-y */
    background-position: center;    /* top, bottom, left, right, center */
    background-size: cover;         /* contain, cover, 100% 100% */
    background-attachment: fixed;   /* scroll, fixed, local */
    
    /* Shorthand */
    background: #f0f0f0 url('image.jpg') no-repeat center/cover;
    
    /* Multiple backgrounds */
    background: 
        url('top.png') no-repeat top,
        url('bottom.png') no-repeat bottom,
        linear-gradient(to bottom, #fff, #000);
}
```

### Gradients:
```css
/* Linear gradient */
background: linear-gradient(to right, red, blue);
background: linear-gradient(45deg, red, yellow, green);

/* Radial gradient */
background: radial-gradient(circle, red, blue);
background: radial-gradient(ellipse at center, red, blue);
```

---

## 📏 CSS Units

### Absolute Units:


| Unit | Description |
|------|-------------|
| `px` | Pixels |
| `pt` | Points (1/72 inch) |
| `cm`, `mm`, `in` | Physical units |

### Relative Units:


| Unit | Relative To |
|------|-------------|
| `%` | Parent element |
| `em` | Parent's font-size |
| `rem` | Root element's font-size |
| `vw` | 1% of viewport width |
| `vh` | 1% of viewport height |
| `vmin` | Smaller of vw or vh |
| `vmax` | Larger of vw or vh |
| `ch` | Width of "0" character |

---

## 🎭 CSS Shadows

### Box Shadow:
```css
/* offset-x | offset-y | blur | spread | color */
box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.3);

/* Multiple shadows */
box-shadow: 
    5px 5px 10px rgba(0,0,0,0.3),
    -5px -5px 10px rgba(255,255,255,0.5);

/* Inset shadow */
box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
```

### Text Shadow:
```css
/* offset-x | offset-y | blur | color */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

/* Multiple shadows (3D effect) */
text-shadow: 
    1px 1px 0 #000,
    2px 2px 0 #333,
    3px 3px 0 #666;
```

---

## 🔄 CSS Transitions

```css
.button {
    background: blue;
    color: white;
    padding: 10px 20px;
    
    /* transition: property duration timing-function delay */
    transition: background 0.3s ease;
    
    /* Multiple properties */
    transition: background 0.3s, transform 0.2s;
    
    /* All properties */
    transition: all 0.3s ease-in-out;
}

.button:hover {
    background: darkblue;
    transform: scale(1.1);
}
```

### Timing Functions:


| Function | Description |
|----------|-------------|
| `linear` | Constant speed |
| `ease` | Slow start, fast middle, slow end |
| `ease-in` | Slow start |
| `ease-out` | Slow end |
| `ease-in-out` | Slow start and end |
| `cubic-bezier()` | Custom curve |

---

## 🎬 CSS Animations

```css
/* Define animation */
@keyframes slideIn {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Alternative: from/to */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Apply animation */
.element {
    animation-name: slideIn;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0.5s;
    animation-iteration-count: infinite; /* or number */
    animation-direction: alternate;      /* normal, reverse, alternate */
    animation-fill-mode: forwards;       /* none, forwards, backwards, both */
    
    /* Shorthand */
    animation: slideIn 1s ease-out 0.5s infinite alternate forwards;
}
```

---

## 🎛️ CSS Variables (Custom Properties)

```css
/* Define variables in :root (global) */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size-base: 16px;
    --spacing: 20px;
}

/* Use variables */
.button {
    background: var(--primary-color);
    padding: var(--spacing);
    font-size: var(--font-size-base);
}

/* Fallback value */
color: var(--undefined-color, black);

/* Override in element */
.dark-theme {
    --primary-color: #2980b9;
}
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **Specificity order**: Inline > ID > Class > Element
2. **box-sizing: border-box** includes padding and border in width
3. **position: absolute** is relative to nearest positioned ancestor
4. **position: fixed** is relative to viewport
5. **em** is relative to parent, **rem** is relative to root
6. **:hover** is pseudo-class, **::before** is pseudo-element
7. **display: none** removes element, **visibility: hidden** hides but keeps space
8. **External CSS** is preferred for reusability and caching
9. **@keyframes** defines animation steps
10. **CSS variables** use `--name` syntax and `var(--name)`
11. **Margin collapse** occurs vertically between adjacent elements
12. **z-index** only works on positioned elements
13. **transition** animates between two states, **animation** can have multiple keyframes
14. **flex** and **grid** are modern layout systems
15. **calc()** allows mathematical expressions: `width: calc(100% - 20px)`
