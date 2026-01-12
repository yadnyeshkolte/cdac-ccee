---
layout: default
title: React State & Events
parent: Module 3 - Web Technologies
nav_order: 16
---

# Sessions 20, 21 & 22: React State, Lifecycle & Events

## 📚 State in React

**State** is data that changes over time and affects what the component renders.

### Props vs State:


| Props | State |
|-------|-------|
| Passed from parent | Managed within component |
| Read-only | Can be changed |
| Cannot be modified | Use setter to update |
| For configuration | For interactive data |

---

## 🎣 useState Hook

### Basic Usage:

```jsx
import { useState } from 'react';

function Counter() {
    // Declare state variable 'count' with initial value 0
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
```

### Multiple State Variables:

```jsx
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    
    return (
        <form>
            <input value={name} onChange={e => setName(e.target.value)} />
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input type="number" value={age} onChange={e => setAge(+e.target.value)} />
        </form>
    );
}
```

### Object State:

```jsx
function Form() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Spread previous state and update specific field
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    return (
        <form>
            <input name="name" value={user.name} onChange={handleChange} />
            <input name="email" value={user.email} onChange={handleChange} />
            <input name="age" type="number" value={user.age} onChange={handleChange} />
        </form>
    );
}
```

### Array State:

```jsx
function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    
    // Add item
    const addTodo = () => {
        setTodos([...todos, { id: Date.now(), text: input }]);
        setInput('');
    };
    
    // Remove item
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    // Update item
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    };
    
    return (/* ... */);
}
```

### Functional Updates:

```jsx
// When new state depends on previous state
function Counter() {
    const [count, setCount] = useState(0);
    
    const incrementThreeTimes = () => {
        // Wrong - all use same 'count' value
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        
        // Correct - uses latest state
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    };
    
    return <button onClick={incrementThreeTimes}>+3</button>;
}
```

### Lazy Initial State:

```jsx
// For expensive computations
const [state, setState] = useState(() => {
    const initial = computeExpensiveValue();
    return initial;
});
```

---

## 🔃 useEffect Hook

**useEffect** handles side effects in function components.

### Basic Usage:

```jsx
import { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    
    // Runs after every render
    useEffect(() => {
        document.title = `Count: ${count}`;
    });
    
    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

### Dependency Array:

```jsx
// Runs only once (on mount)
useEffect(() => {
    console.log('Component mounted');
}, []);

// Runs when 'count' changes
useEffect(() => {
    console.log('Count changed:', count);
}, [count]);

// Runs when 'a' or 'b' changes
useEffect(() => {
    console.log('a or b changed');
}, [a, b]);

// Runs on every render (no dependency array)
useEffect(() => {
    console.log('Every render');
});
```

### Cleanup Function:

```jsx
useEffect(() => {
    // Setup
    const subscription = subscribeToData(id);
    
    // Cleanup (runs before next effect or unmount)
    return () => {
        subscription.unsubscribe();
    };
}, [id]);

// Timer example
useEffect(() => {
    const timer = setInterval(() => {
        setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(timer);
}, []);

// Event listener example
useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Data Fetching:

```jsx
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [userId]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return null;
    
    return <div>{user.name}</div>;
}
```

---

## 🎫 Event Handling

### Basic Events:

```jsx
function Button() {
    const handleClick = () => {
        console.log('Button clicked');
    };
    
    return <button onClick={handleClick}>Click Me</button>;
}

// Inline handler
<button onClick={() => console.log('Clicked')}>Click</button>
```

### Event Object:

```jsx
function Form() {
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent form submission
        console.log('Form submitted');
    };
    
    const handleChange = (event) => {
        console.log('Input value:', event.target.value);
        console.log('Input name:', event.target.name);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input name="email" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}
```

### Passing Arguments:

```jsx
function List() {
    const handleClick = (id, event) => {
        console.log('Clicked item:', id);
        console.log('Event:', event);
    };
    
    return (
        <ul>
            {items.map(item => (
                <li key={item.id} onClick={(e) => handleClick(item.id, e)}>
                    {item.name}
                </li>
            ))}
        </ul>
    );
}
```

### Common Events:


| Event | Handler |
|-------|---------|
| Click | `onClick` |
| Double Click | `onDoubleClick` |
| Change | `onChange` |
| Submit | `onSubmit` |
| Focus | `onFocus` |
| Blur | `onBlur` |
| Key Down | `onKeyDown` |
| Key Up | `onKeyUp` |
| Mouse Enter | `onMouseEnter` |
| Mouse Leave | `onMouseLeave` |
| Mouse Move | `onMouseMove` |
| Scroll | `onScroll` |

### Keyboard Events:

```jsx
function Input() {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed');
        }
        if (event.key === 'Escape') {
            console.log('Escape pressed');
        }
    };
    
    return <input onKeyDown={handleKeyDown} />;
}
```

---

## 📝 Controlled Components

Form elements whose values are controlled by React state.

### Text Input:

```jsx
function TextInput() {
    const [value, setValue] = useState('');
    
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
```

### Textarea:

```jsx
function TextArea() {
    const [text, setText] = useState('');
    
    return (
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
    );
}
```

### Select:

```jsx
function Select() {
    const [selected, setSelected] = useState('');
    
    return (
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            <option value="">Select...</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
        </select>
    );
}
```

### Checkbox:

```jsx
function Checkbox() {
    const [checked, setChecked] = useState(false);
    
    return (
        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
            I agree
        </label>
    );
}
```

### Radio Buttons:

```jsx
function RadioGroup() {
    const [selected, setSelected] = useState('');
    
    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="a"
                    checked={selected === 'a'}
                    onChange={(e) => setSelected(e.target.value)}
                />
                Option A
            </label>
            <label>
                <input
                    type="radio"
                    value="b"
                    checked={selected === 'b'}
                    onChange={(e) => setSelected(e.target.value)}
                />
                Option B
            </label>
        </div>
    );
}
```

### Complete Form:

```jsx
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subscribe: false
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />
            <label>
                <input
                    name="subscribe"
                    type="checkbox"
                    checked={formData.subscribe}
                    onChange={handleChange}
                />
                Subscribe to newsletter
            </label>
            <button type="submit">Send</button>
        </form>
    );
}
```

---

## 🏗️ Lifting State Up

When several components need to reflect the same changing data, we recommend lifting the shared state up to their closest common ancestor.

### The Problem:
Two sibling components need access to the same state, but state is local to each component.

### The Solution:
Move the state to the parent component and pass it down via props.

```jsx
// Parent Component - Holds the state
function Calculator() {
    const [temperature, setTemperature] = useState('');

    return (
        <div>
            <TemperatureInput 
                scale="c" 
                temperature={temperature} 
                onTemperatureChange={setTemperature} 
            />
            <TemperatureInput 
                scale="f" 
                temperature={temperature} 
                onTemperatureChange={setTemperature} 
            />
        </div>
    );
}

// Child Component - Receives state and updater via props
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
    const handleChange = (e) => {
        onTemperatureChange(e.target.value);
    };

    return (
        <fieldset>
            <legend>Enter temperature in {scale}:</legend>
            <input value={temperature} onChange={handleChange} />
        </fieldset>
    );
}
```

**Key Takeaway**: There should be a "single source of truth" for any data that changes in a React application.

---

## 🔁 Class Component Lifecycle

For understanding older code and concepts.

### Lifecycle Phases:

```
Mounting              Updating                Unmounting
─────────────────────────────────────────────────────────
constructor()         ┐
render()              │    render()
componentDidMount()   ┘    componentDidUpdate()    componentWillUnmount()
```

### Class Component with Lifecycle:

```jsx
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    
    componentDidMount() {
        // Called after component is added to DOM
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    
    componentDidUpdate(prevProps, prevState) {
        // Called after every update
        console.log('Updated');
    }
    
    componentWillUnmount() {
        // Called before component is removed
        clearInterval(this.timerID);
    }
    
    tick() {
        this.setState({
            date: new Date()
        });
    }
    
    render() {
        return <h1>{this.state.date.toLocaleTimeString()}</h1>;
    }
}
```

### Lifecycle to Hooks Mapping:


| Class Lifecycle | Hook Equivalent |
|-----------------|-----------------|
| `constructor` | `useState` initial value |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect` return function |

---

## 🔀 Conditional Rendering Patterns

### If-Else:

```jsx
function Message({ isLoggedIn }) {
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    }
    return <h1>Please sign in.</h1>;
}
```

### Ternary:

```jsx
function Message({ isLoggedIn }) {
    return isLoggedIn ? <Dashboard /> : <LoginPage />;
}
```

### Logical AND:

```jsx
function Inbox({ messages }) {
    return (
        <div>
            <h1>Inbox</h1>
            {messages.length > 0 && (
                <p>You have {messages.length} messages</p>
            )}
        </div>
    );
}
```

### Switch Statement:

```jsx
function Status({ status }) {
    const getStatusComponent = () => {
        switch (status) {
            case 'loading':
                return <LoadingSpinner />;
            case 'error':
                return <ErrorMessage />;
            case 'success':
                return <SuccessMessage />;
            default:
                return null;
        }
    };
    
    return <div>{getStatusComponent()}</div>;
}
```

### Early Return:

```jsx
function UserProfile({ user }) {
    if (!user) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}
```

---

## 📤 Lifting State Up

When multiple components need to share state, lift it to their common ancestor.

```jsx
// Parent holds shared state
function TemperatureCalculator() {
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState('c');
    
    const handleCelsiusChange = (temp) => {
        setScale('c');
        setTemperature(temp);
    };
    
    const handleFahrenheitChange = (temp) => {
        setScale('f');
        setTemperature(temp);
    };
    
    const celsius = scale === 'f' ? toCelsius(temperature) : temperature;
    const fahrenheit = scale === 'c' ? toFahrenheit(temperature) : temperature;
    
    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange}
            />
        </div>
    );
}

// Child receives state and handler as props
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
    return (
        <fieldset>
            <legend>Enter temperature in {scale === 'c' ? 'Celsius' : 'Fahrenheit'}:</legend>
            <input
                value={temperature}
                onChange={(e) => onTemperatureChange(e.target.value)}
            />
        </fieldset>
    );
}
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **useState** returns `[state, setState]` array
2. **setState** triggers re-render
3. **State updates may be async** - use functional updates for dependent state
4. **useEffect** runs after render
5. **useEffect with []** runs only on mount
6. **useEffect cleanup** function runs before next effect or unmount
7. **Controlled components** have value tied to state
8. **event.preventDefault()** stops default form submission
9. **event.target.value** gets input value
10. **Spread operator** (...prev) is used to update objects/arrays in state
11. **Lifting state up** shares state via common ancestor
12. **Parent passes callbacks** to children for state updates
13. **Never mutate state directly** - always use setState
14. **key prop** is not passed to child component
15. **Multiple useState** calls are independent
