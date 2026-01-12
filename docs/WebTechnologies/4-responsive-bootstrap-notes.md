---
layout: default
title: Responsive Design & Bootstrap
parent: Module 3 - Web Technologies
nav_order: 4
---

# Session 4: Responsive Web Design & Bootstrap

## 📚 Introduction to Responsive Design

**Responsive Web Design (RWD)** - Design approach that makes web pages render well on all devices.

### Key Principles:
1. **Fluid Grids** - Use percentages instead of fixed pixels
2. **Flexible Images** - Scale within containing elements
3. **Media Queries** - Apply styles based on device characteristics

---

## 📱 Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Viewport Properties:


| Property | Description |
|----------|-------------|
| `width=device-width` | Set viewport to device width |
| `initial-scale=1.0` | Initial zoom level |
| `maximum-scale=1.0` | Max zoom level |
| `minimum-scale=1.0` | Min zoom level |
| `user-scalable=no` | Disable pinch zoom |

---

## 📐 CSS Media Queries

```css
/* Syntax */
@media media-type and (condition) {
    /* CSS rules */
}

/* Common breakpoints */
/* Mobile first approach */
/* Default styles for mobile */

@media (min-width: 576px) {
    /* Small devices (landscape phones) */
}

@media (min-width: 768px) {
    /* Medium devices (tablets) */
}

@media (min-width: 992px) {
    /* Large devices (desktops) */
}

@media (min-width: 1200px) {
    /* Extra large devices */
}

@media (min-width: 1400px) {
    /* XXL devices */
}
```

### Media Types:


| Type | Description |
|------|-------------|
| `all` | All devices (default) |
| `screen` | Computer screens, tablets, phones |
| `print` | Print preview/output |
| `speech` | Screen readers |

### Media Features:

```css
/* Width-based */
@media (min-width: 768px) { }
@media (max-width: 768px) { }
@media (width: 768px) { }

/* Orientation */
@media (orientation: portrait) { }
@media (orientation: landscape) { }

/* Resolution */
@media (min-resolution: 2dppx) { } /* Retina */
@media (-webkit-min-device-pixel-ratio: 2) { }

/* Hover capability */
@media (hover: hover) { }  /* Can hover (desktop) */
@media (hover: none) { }   /* Cannot hover (touch) */

/* Light/Dark mode preference */
@media (prefers-color-scheme: dark) { }
@media (prefers-color-scheme: light) { }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { }
```

### Combining Conditions:

```css
/* AND */
@media screen and (min-width: 768px) and (max-width: 1024px) { }

/* OR (comma) */
@media (max-width: 600px), (orientation: portrait) { }

/* NOT */
@media not print { }
```

---

## 🖼️ Responsive Images

```css
/* Basic responsive image */
img {
    max-width: 100%;
    height: auto;
}

/* Background image */
.hero {
    background-image: url('large.jpg');
    background-size: cover;
    background-position: center;
}

@media (max-width: 768px) {
    .hero {
        background-image: url('small.jpg');
    }
}
```

### HTML Picture Element:
```html
<picture>
    <source media="(min-width: 1200px)" srcset="large.jpg">
    <source media="(min-width: 768px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Description">
</picture>
```

### srcset Attribute:
```html
<img src="small.jpg"
     srcset="small.jpg 500w,
             medium.jpg 1000w,
             large.jpg 1500w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1000px) 50vw,
            33vw"
     alt="Description">
```

---

## 🅱️ Introduction to Bootstrap

**Bootstrap** - Popular CSS framework for building responsive, mobile-first websites.

### Adding Bootstrap:

```html
<!-- Bootstrap CSS (CDN) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Why Bootstrap?
1. **Pre-built Components** - Buttons, forms, modals, etc.
2. **Responsive Grid System** - 12-column layout
3. **Mobile-First** - Design for mobile, enhance for larger
4. **Cross-browser** - Works on all modern browsers
5. **Customizable** - Sass variables for theming
6. **Documentation** - Extensive and beginner-friendly

---

## 📊 Bootstrap Grid System

Bootstrap uses a **12-column grid system** that's responsive across breakpoints.

### Grid Breakpoints:


| Breakpoint | Class Prefix | Width |
|------------|--------------|-------|
| Extra Small | (none) | < 576px |
| Small | `sm` | ≥ 576px |
| Medium | `md` | ≥ 768px |
| Large | `lg` | ≥ 992px |
| Extra Large | `xl` | ≥ 1200px |
| XXL | `xxl` | ≥ 1400px |

### Basic Grid Structure:

```html
<div class="container">
    <div class="row">
        <div class="col">Column 1</div>
        <div class="col">Column 2</div>
        <div class="col">Column 3</div>
    </div>
</div>
```

### Container Types:


| Class | Behavior |
|-------|----------|
| `.container` | Fixed-width, responsive |
| `.container-fluid` | Full width (100%) |
| `.container-{breakpoint}` | 100% until breakpoint |

### Column Classes:

```html
<!-- Equal width columns -->
<div class="row">
    <div class="col">1 of 3</div>
    <div class="col">2 of 3</div>
    <div class="col">3 of 3</div>
</div>

<!-- Specific column widths (must equal 12) -->
<div class="row">
    <div class="col-4">4 columns</div>
    <div class="col-8">8 columns</div>
</div>

<!-- Responsive columns -->
<div class="row">
    <div class="col-12 col-md-6 col-lg-4">
        Full on mobile, half on tablet, third on desktop
    </div>
</div>

<!-- Auto-width columns -->
<div class="row">
    <div class="col-auto">Width of content</div>
    <div class="col">Takes remaining space</div>
</div>
```

### Grid Utilities:

```html
<!-- Offsets -->
<div class="col-md-6 offset-md-3">Centered</div>

<!-- Order -->
<div class="col order-3">Third visually</div>
<div class="col order-1">First visually</div>
<div class="col order-2">Second visually</div>

<!-- Gutters (spacing) -->
<div class="row g-3">  <!-- gutter on both x and y -->
<div class="row gx-3">  <!-- horizontal gutter -->
<div class="row gy-3">  <!-- vertical gutter -->
<div class="row g-0">   <!-- no gutters -->
```

---

## 🎨 Bootstrap Typography

```html
<!-- Headings -->
<h1>h1. Bootstrap heading</h1>
<p class="h1">Paragraph styled as h1</p>

<!-- Display headings (larger) -->
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>

<!-- Lead paragraph -->
<p class="lead">This is a lead paragraph.</p>

<!-- Text utilities -->
<p class="text-start">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-end">Right aligned</p>
<p class="text-justify">Justified text</p>

<!-- Text transform -->
<p class="text-lowercase">LOWERCASED</p>
<p class="text-uppercase">uppercased</p>
<p class="text-capitalize">capitalized text</p>

<!-- Text colors -->
<p class="text-primary">Primary</p>
<p class="text-secondary">Secondary</p>
<p class="text-success">Success</p>
<p class="text-danger">Danger</p>
<p class="text-warning">Warning</p>
<p class="text-info">Info</p>
<p class="text-muted">Muted</p>

<!-- Background colors -->
<div class="bg-primary text-white">Primary bg</div>
<div class="bg-success text-white">Success bg</div>
<div class="bg-danger text-white">Danger bg</div>
```

---

## 🔘 Bootstrap Buttons

```html
<!-- Button styles -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>
<button class="btn btn-link">Link</button>

<!-- Outline buttons -->
<button class="btn btn-outline-primary">Outline Primary</button>

<!-- Button sizes -->
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-sm">Small</button>

<!-- Block button (full width) -->
<div class="d-grid">
    <button class="btn btn-primary">Block Button</button>
</div>

<!-- Button states -->
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary active">Active</button>

<!-- Button groups -->
<div class="btn-group">
    <button class="btn btn-primary">Left</button>
    <button class="btn btn-primary">Middle</button>
    <button class="btn btn-primary">Right</button>
</div>
```

---

## 📋 Bootstrap Tables

```html
<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John</td>
            <td>25</td>
        </tr>
    </tbody>
</table>

<!-- Table variants -->
<table class="table table-striped">     <!-- Zebra stripes -->
<table class="table table-bordered">     <!-- All borders -->
<table class="table table-borderless">   <!-- No borders -->
<table class="table table-hover">        <!-- Hover effect -->
<table class="table table-sm">           <!-- Compact -->
<table class="table table-dark">         <!-- Dark theme -->

<!-- Responsive table -->
<div class="table-responsive">
    <table class="table">...</table>
</div>

<!-- Row colors -->
<tr class="table-primary">...</tr>
<tr class="table-success">...</tr>
<tr class="table-danger">...</tr>
```

---

## 🖼️ Bootstrap Images

```html
<!-- Responsive image -->
<img src="..." class="img-fluid" alt="...">

<!-- Image shapes -->
<img src="..." class="rounded" alt="...">
<img src="..." class="rounded-circle" alt="...">
<img src="..." class="img-thumbnail" alt="...">

<!-- Figure -->
<figure class="figure">
    <img src="..." class="figure-img img-fluid rounded" alt="...">
    <figcaption class="figure-caption">Caption text.</figcaption>
</figure>
```

---

## 🚨 Bootstrap Alerts

```html
<div class="alert alert-primary" role="alert">Primary alert</div>
<div class="alert alert-success" role="alert">Success alert</div>
<div class="alert alert-danger" role="alert">Danger alert</div>
<div class="alert alert-warning" role="alert">Warning alert</div>
<div class="alert alert-info" role="alert">Info alert</div>

<!-- Dismissible alert -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Warning!</strong> Something needs attention.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Alert with link -->
<div class="alert alert-primary" role="alert">
    Check out <a href="#" class="alert-link">this link</a>
</div>
```

---

## 🏷️ Bootstrap Badges

```html
<span class="badge bg-primary">Primary</span>
<span class="badge bg-secondary">Secondary</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-danger">Danger</span>

<!-- Pill badges -->
<span class="badge rounded-pill bg-primary">Pill</span>

<!-- Button with badge -->
<button class="btn btn-primary">
    Notifications <span class="badge bg-secondary">4</span>
</button>
```

---

## 📊 Bootstrap Progress Bars

```html
<!-- Basic progress -->
<div class="progress">
    <div class="progress-bar" style="width: 50%">50%</div>
</div>

<!-- Colored progress -->
<div class="progress">
    <div class="progress-bar bg-success" style="width: 70%"></div>
</div>

<!-- Striped -->
<div class="progress">
    <div class="progress-bar progress-bar-striped" style="width: 60%"></div>
</div>

<!-- Animated striped -->
<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
</div>

<!-- Multiple bars -->
<div class="progress">
    <div class="progress-bar bg-success" style="width: 15%"></div>
    <div class="progress-bar bg-warning" style="width: 30%"></div>
    <div class="progress-bar bg-danger" style="width: 20%"></div>
</div>
```

---

## 📃 Bootstrap Cards

```html
<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some text content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

<!-- Card with header/footer -->
<div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">Content</div>
    <div class="card-footer">Footer</div>
</div>

<!-- Card groups -->
<div class="card-group">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
</div>
```

---

## 📝 Bootstrap Forms

```html
<form>
    <!-- Text input -->
    <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
    </div>
    
    <!-- Select -->
    <div class="mb-3">
        <label for="country" class="form-label">Country</label>
        <select class="form-select" id="country">
            <option selected>Choose...</option>
            <option value="1">India</option>
            <option value="2">USA</option>
        </select>
    </div>
    
    <!-- Checkbox -->
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="agree">
        <label class="form-check-label" for="agree">I agree</label>
    </div>
    
    <!-- Radio -->
    <div class="form-check">
        <input class="form-check-input" type="radio" name="gender" id="male" checked>
        <label class="form-check-label" for="male">Male</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="gender" id="female">
        <label class="form-check-label" for="female">Female</label>
    </div>
    
    <!-- Textarea -->
    <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-control" id="message" rows="3"></textarea>
    </div>
    
    <!-- File input -->
    <div class="mb-3">
        <label for="file" class="form-label">Upload file</label>
        <input class="form-control" type="file" id="file">
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Form Sizing:
```html
<input class="form-control form-control-lg" type="text" placeholder="Large">
<input class="form-control" type="text" placeholder="Default">
<input class="form-control form-control-sm" type="text" placeholder="Small">
```

### Form Validation:
```html
<input type="text" class="form-control is-valid" value="Valid">
<input type="text" class="form-control is-invalid" value="Invalid">
<div class="valid-feedback">Looks good!</div>
<div class="invalid-feedback">Please provide a valid input.</div>
```

---

## 🧭 Bootstrap Navbar

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Logo</a>
        
        <!-- Toggler for mobile -->
        <button class="navbar-toggler" type="button" 
                data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" 
                       data-bs-toggle="dropdown">Services</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Service 1</a></li>
                        <li><a class="dropdown-item" href="#">Service 2</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

### Navbar Variants:
```html
<!-- Dark navbar -->
<nav class="navbar navbar-dark bg-dark">

<!-- Fixed top -->
<nav class="navbar fixed-top">

<!-- Sticky top -->
<nav class="navbar sticky-top">
```

---

## 📦 Bootstrap Spacing Utilities

### Margin and Padding:
```
{property}{sides}-{size}

Property:
  m = margin
  p = padding

Sides:
  t = top
  b = bottom
  s = start (left)
  e = end (right)
  x = horizontal (left + right)
  y = vertical (top + bottom)
  (blank) = all sides

Size: 0, 1, 2, 3, 4, 5, auto
```

### Examples:
```html
<div class="mt-3">margin-top: 1rem</div>
<div class="mb-5">margin-bottom: 3rem</div>
<div class="mx-auto">margin-left/right: auto (center)</div>
<div class="p-4">padding: 1.5rem</div>
<div class="py-2">padding-top/bottom: 0.5rem</div>
```

---

## 📐 Bootstrap Display Utilities

```html
<!-- Display property -->
<div class="d-none">Hidden</div>
<div class="d-block">Block</div>
<div class="d-inline">Inline</div>
<div class="d-inline-block">Inline-block</div>
<div class="d-flex">Flexbox</div>
<div class="d-grid">Grid</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>
<div class="d-block d-md-none">Visible on mobile, hidden on tablet+</div>
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **Bootstrap uses 12-column grid** system
2. **`.container`** is fixed-width, **`.container-fluid`** is full-width
3. **col-12 col-md-6** = full width on mobile, half on tablet+
4. **Mobile-first approach**: Default styles for mobile, use `min-width` for larger
5. **Breakpoint prefixes**: sm (576px), md (768px), lg (992px), xl (1200px)
6. **Bootstrap 5** dropped jQuery dependency
7. **`.img-fluid`** makes images responsive (max-width: 100%)
8. **Media queries** use `@media` rule
9. **Viewport meta tag** is essential for responsive design
10. **`.d-none`** hides element, **`.d-block`** shows as block
11. **`.btn-outline-*`** creates outline buttons
12. **`.alert-dismissible`** makes alerts closable
13. **`.form-control`** styles form inputs
14. **`.navbar-expand-lg`** collapses navbar on smaller screens
15. **Spacing utilities**: m = margin, p = padding, numbers 0-5
