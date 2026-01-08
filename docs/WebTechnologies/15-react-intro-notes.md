---
layout: default
title: React Introduction
parent: Module 3 - Web Technologies
nav_order: 15
---

# Session 19: Introduction to React

## 📚 What is React?

**React** is a JavaScript library for building user interfaces, developed by Facebook.

### Key Concepts:
- **Component-Based** - Build encapsulated components
- **Declarative** - Describe what UI should look like
- **Virtual DOM** - Efficient updates to real DOM
- **Unidirectional Data Flow** - Data flows one way (parent to child)
- **JSX** - JavaScript XML syntax extension

---

## 🚀 Getting Started

### Create React App:

```bash
# Create new project
npx create-react-app my-app
cd my-app
npm start

# With TypeScript
npx create-react-app my-app --template typescript
```

### Vite (Faster Alternative):

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### CDN (Quick Testing):

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const App = () => <h1>Hello React!</h1>;
        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    </script>
</body>
</html>
```

---

## 🧩 React Elements

React elements are the smallest building blocks of React apps.

### Creating Elements:

```javascript
// Without JSX
const element = React.createElement('h1', { className: 'title' }, 'Hello World');

// With JSX (preferred)
const element = <h1 className="title">Hello World</h1>;
```

### JSX Rules:

```jsx
// 1. Return single root element
return (
    <div>
        <h1>Title</h1>
        <p>Content</p>
    </div>
);

// Or use Fragment
return (
    <>
        <h1>Title</h1>
        <p>Content</p>
    </>
);

// 2. Close all tags
<img src="..." alt="..." />
<br />
<input type="text" />

// 3. camelCase for attributes
<div className="container">      // Not class
    <label htmlFor="name">       // Not for
    <input tabIndex="1" />       // Not tabindex
</div>

// 4. JavaScript expressions in {}
const name = 'John';
<h1>Hello, {name}!</h1>
<p>{1 + 2}</p>
<p>{new Date().toLocaleDateString()}</p>
```

### Rendering Elements:

```javascript
// React 18 syntax
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Old syntax (React 17)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
```

---

## 🧱 Components

Components are reusable pieces of UI.

### Function Components (Recommended):

```jsx
// Basic function component
function Welcome() {
    return <h1>Hello!</h1>;
}

// Arrow function
const Welcome = () => {
    return <h1>Hello!</h1>;
};

// Implicit return
const Welcome = () => <h1>Hello!</h1>;

// With props
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="John" />
```

### Class Components:

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}

// Usage
<Welcome name="John" />
```

### Component Naming:
- Must start with **uppercase** letter
- Use PascalCase (MyComponent)

---

## 📦 Props

Props are read-only data passed from parent to child.

### Passing Props:

```jsx
// Parent component
function App() {
    return (
        <div>
            <UserCard name="John" age={30} isAdmin={true} />
            <UserCard name="Jane" age={25} isAdmin={false} />
        </div>
    );
}

// Child component
function UserCard(props) {
    return (
        <div className="card">
            <h2>{props.name}</h2>
            <p>Age: {props.age}</p>
            {props.isAdmin && <span>Admin</span>}
        </div>
    );
}
```

### Destructuring Props:

```jsx
// In function parameters
function UserCard({ name, age, isAdmin }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
        </div>
    );
}

// In function body
function UserCard(props) {
    const { name, age, isAdmin } = props;
    // ...
}
```

### Default Props:

{% raw %}
```jsx
// Method 1: Default parameters
function Button({ text = 'Click Me', color = 'blue' }) {
    return <button style={{ backgroundColor: color }}>{text}</button>;
}

// Method 2: defaultProps
function Button({ text, color }) {
    return <button style={{ backgroundColor: color }}>{text}</button>;
}

Button.defaultProps = {
    text: 'Click Me',
    color: 'blue'
};
```
{% endraw %}

### Children Props:

```jsx
// Pass content between tags
function Card({ children, title }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

// Usage
<Card title="Welcome">
    <p>This is the card content.</p>
    <button>Click me</button>
</Card>
```

### Prop Types Validation:

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email, isAdmin, friends }) {
    return <div>{/* ... */}</div>;
}

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    friends: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    })
};
```

---

## 🔄 Composing Components

### Component Composition:

```jsx
function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header>
            <Logo />
            <Navigation />
        </header>
    );
}

function Main() {
    return (
        <main>
            <Sidebar />
            <Content />
        </main>
    );
}
```

### Extracting Components:

```jsx
// Before: Large component
function Comment({ author, text, date }) {
    return (
        <div className="comment">
            <div className="user-info">
                <img src={author.avatarUrl} alt={author.name} />
                <div className="user-name">{author.name}</div>
            </div>
            <div className="comment-text">{text}</div>
            <div className="comment-date">{date}</div>
        </div>
    );
}

// After: Extracted UserInfo component
function UserInfo({ user }) {
    return (
        <div className="user-info">
            <img src={user.avatarUrl} alt={user.name} />
            <div className="user-name">{user.name}</div>
        </div>
    );
}

function Comment({ author, text, date }) {
    return (
        <div className="comment">
            <UserInfo user={author} />
            <div className="comment-text">{text}</div>
            <div className="comment-date">{date}</div>
        </div>
    );
}
```

---

## 🎨 Styling Components

### Inline Styles:

{% raw %}
```jsx
function Button() {
    const style = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };
    
    return <button style={style}>Click Me</button>;
}

// Inline
<div style={{ marginTop: '20px', fontSize: '16px' }}>
```
{% endraw %}

### CSS Classes:

```jsx
// styles.css
.button {
    background-color: blue;
    color: white;
}

.button.primary {
    background-color: #007bff;
}

// Component
import './styles.css';

function Button({ primary }) {
    const className = primary ? 'button primary' : 'button';
    return <button className={className}>Click Me</button>;
}
```

### CSS Modules:

```jsx
// Button.module.css
.button {
    background-color: blue;
}

// Component
import styles from './Button.module.css';

function Button() {
    return <button className={styles.button}>Click Me</button>;
}
```

### Conditional Classes:

```jsx
// Template literal
<div className={`card ${isActive ? 'active' : ''}`}>

// Array join
<div className={['card', isActive && 'active'].filter(Boolean).join(' ')}>

// classnames library
import classNames from 'classnames';
<div className={classNames('card', { active: isActive, disabled: isDisabled })}>
```

---

## 📋 Lists & Conditional Rendering

### Rendering Lists:

```jsx
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}

// With index (avoid if list can reorder)
{items.map((item, index) => (
    <li key={index}>{item}</li>
))}
```

### Keys:
- Must be **unique** among siblings
- Should be **stable** (not change between renders)
- Helps React identify which items changed

### Conditional Rendering:

```jsx
// If statement
function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <UserDashboard />;
    }
    return <LoginForm />;
}

// Ternary operator
function Greeting({ isLoggedIn }) {
    return isLoggedIn ? <UserDashboard /> : <LoginForm />;
}

// Logical AND (render or nothing)
function Mailbox({ unreadMessages }) {
    return (
        <div>
            <h1>Inbox</h1>
            {unreadMessages.length > 0 && (
                <p>You have {unreadMessages.length} unread messages.</p>
            )}
        </div>
    );
}

// Logical OR (fallback)
function User({ name }) {
    return <h1>{name || 'Guest'}</h1>;
}

// Nullish coalescing
function User({ name }) {
    return <h1>{name ?? 'Guest'}</h1>;
}
```

---

## 🏗️ Project Structure

```
my-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   └── index.js
│   │   └── Button/
│   │       └── Button.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **React** is a library for building UIs (not a full framework)
2. **JSX** is JavaScript XML syntax, transpiled by Babel
3. **Components** must start with **uppercase** letter
4. **Function components** are simpler and recommended
5. **Props** are read-only, passed parent to child
6. **props.children** contains content between component tags
7. **className** is used instead of class in JSX
8. **htmlFor** is used instead of for in JSX
9. **Style** in JSX uses objects with camelCase properties
10. **key** prop is required when rendering lists
11. **Virtual DOM** improves performance by batching updates
12. **React.Fragment** or **<>** groups elements without extra DOM
13. **map()** is used to render arrays
14. **Conditional rendering** uses ternary or && operators
15. **create-react-app** sets up React project with build tools
