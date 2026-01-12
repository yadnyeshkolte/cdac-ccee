---
layout: default
title: React Hooks
parent: Module 3 - Web Technologies
nav_order: 17
---

# Sessions 23 & 24: React Hooks

## 📚 Introduction to Hooks

**Hooks** are functions that let you use React features in function components.

### Rules of Hooks:
1. Only call hooks at the **top level** (not in loops, conditions, or nested functions)
2. Only call hooks from **React function components** or **custom hooks**

---

## 🎣 useRef Hook

**useRef** creates a mutable reference that persists across renders.

### DOM Access:

```jsx
import { useRef } from 'react';

function TextInput() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}
```

### Storing Previous Values:

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();
    
    useEffect(() => {
        prevCountRef.current = count;
    });
    
    return (
        <div>
            <p>Current: {count}, Previous: {prevCountRef.current}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

### Persisting Values Without Re-render:

```jsx
function Timer() {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);
    
    const start = () => {
        intervalRef.current = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
    };
    
    const stop = () => {
        clearInterval(intervalRef.current);
    };
    
    return (
        <div>
            <p>Seconds: {seconds}</p>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
        </div>
    );
}
```

### useRef vs useState:


| useRef | useState |
|--------|----------|
| Does NOT trigger re-render | Triggers re-render |
| Mutable (.current) | Immutable (use setter) |
| For DOM refs, timers | For UI state |
| Persists across renders | Persists across renders |

---

## 🧠 useMemo Hook

**useMemo** memoizes expensive calculations.

```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ list, filter }) {
    // Only recalculates when list or filter changes
    const filteredList = useMemo(() => {
        console.log('Filtering...');
        return list.filter(item => item.includes(filter));
    }, [list, filter]);
    
    return (
        <ul>
            {filteredList.map(item => <li key={item}>{item}</li>)}
        </ul>
    );
}
```

### When to Use useMemo:
- Expensive calculations
- Preventing unnecessary re-renders of child components
- Creating objects/arrays used in dependency arrays

---

## 📞 useCallback Hook

**useCallback** memoizes functions to prevent unnecessary re-creation.

```jsx
import { useCallback, useState } from 'react';

function Parent() {
    const [count, setCount] = useState(0);
    
    // Without useCallback: new function every render
    // const handleClick = () => setCount(count + 1);
    
    // With useCallback: same function reference
    const handleClick = useCallback(() => {
        setCount(c => c + 1);
    }, []);
    
    return <Child onClick={handleClick} />;
}

// Child won't re-render unnecessarily
const Child = React.memo(({ onClick }) => {
    console.log('Child rendered');
    return <button onClick={onClick}>Click</button>;
});
```

### useMemo vs useCallback:

```jsx
// These are equivalent:
useCallback(fn, deps)
useMemo(() => fn, deps)

// useMemo returns a value
const memoizedValue = useMemo(() => computeValue(a, b), [a, b]);

// useCallback returns a function
const memoizedFn = useCallback(() => doSomething(a, b), [a, b]);
```

---

## 🔄 useReducer Hook

**useReducer** manages complex state logic with a reducer function.

### Basic Usage:

```jsx
import { useReducer } from 'react';

// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 };
        case 'SET':
            return { count: action.payload };
        default:
            throw new Error('Unknown action');
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
            <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>Set to 10</button>
        </div>
    );
}
```

### Complex State Example:

```jsx
const initialState = {
    todos: [],
    filter: 'all',
    loading: false,
    error: null
};

function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, done: !todo.done }
                        : todo
                )
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

function TodoApp() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    
    const addTodo = (text) => {
        dispatch({
            type: 'ADD_TODO',
            payload: { id: Date.now(), text, done: false }
        });
    };
    
    return (/* ... */);
}
```

### useState vs useReducer:


| useState | useReducer |
|----------|------------|
| Simple state | Complex state logic |
| Independent values | Related values |
| Few state updates | Many state updates |
| Local logic | Centralized logic |

---

## 🌐 useContext Hook

**useContext** consumes context values without wrapping.

### Creating Context:

{% raw %}
```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext();

// 2. Create provider component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Custom hook for consuming
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// 4. Use in components
function Header() {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <header className={theme}>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </header>
    );
}

// 5. Wrap app with provider
function App() {
    return (
        <ThemeProvider>
            <Header />
            <Main />
        </ThemeProvider>
    );
}
```
{% endraw %}

### Auth Context Example:

{% raw %}
```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const login = async (email, password) => {
        const user = await authService.login(email, password);
        setUser(user);
    };
    
    const logout = () => {
        authService.logout();
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

// Usage
function Dashboard() {
    const { user, logout } = useAuth();
    
    return (
        <div>
            <p>Welcome, {user.name}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
```
{% endraw %}

---

## 🔧 Custom Hooks

Custom hooks extract reusable logic.

### useLocalStorage:

```jsx
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// Usage
function App() {
    const [name, setName] = useLocalStorage('name', '');
    return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

### useFetch:

```jsx
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch');
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function UserList() {
    const { data, loading, error } = useFetch('/api/users');
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <ul>
            {data.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
}
```

### useToggle:

```jsx
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    
    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);
    
    return [value, toggle];
}

// Usage
function Modal() {
    const [isOpen, toggleOpen] = useToggle(false);
    
    return (
        <div>
            <button onClick={toggleOpen}>Toggle Modal</button>
            {isOpen && <div className="modal">Modal Content</div>}
        </div>
    );
}
```

### useDebounce:

```jsx
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(timer);
    }, [value, delay]);
    
    return debouncedValue;
}

// Usage - search input
function Search() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);
    
    useEffect(() => {
        if (debouncedQuery) {
            // Search API call
            searchApi(debouncedQuery);
        }
    }, [debouncedQuery]);
    
    return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### useWindowSize:

```jsx
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return size;
}

// Usage
function Component() {
    const { width, height } = useWindowSize();
    return <p>Window: {width} x {height}</p>;
}
```

---

## ⚠️ Error Boundaries

Error boundaries catch JavaScript errors in their child component tree.

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        // Log error to service
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="error-fallback">
                    <h2>Something went wrong!</h2>
                    <p>{this.state.error?.message}</p>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try Again
                    </button>
                </div>
            );
        }
        
        return this.props.children;
    }
}

// Usage
function App() {
    return (
        <ErrorBoundary>
            <MyComponent />
        </ErrorBoundary>
    );
}
```

### Error Boundary Hook (react-error-boundary):

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div>
            <p>Error: {error.message}</p>
            <button onClick={resetErrorBoundary}>Retry</button>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MyComponent />
        </ErrorBoundary>
    );
}
```

---

## 🧩 React.memo

**React.memo** prevents unnecessary re-renders for the same props.

```jsx
// Without memo - re-renders every time parent renders
function ExpensiveComponent({ data }) {
    // ...
}

// With memo - only re-renders when props change
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
    // ...
});

// Custom comparison
const Component = React.memo(
    function Component({ data }) { /* ... */ },
    (prevProps, nextProps) => {
        // Return true if props are equal (skip re-render)
        return prevProps.id === nextProps.id;
    }
);
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **useRef** doesn't cause re-render when `.current` changes
2. **useRef** is used for DOM access and mutable values
3. **useMemo** memoizes computed values
4. **useCallback** memoizes functions
5. **useReducer** manages complex state with actions
6. **useContext** consumes context without nesting
7. **Custom hooks** must start with "use" prefix
8. **React.memo** prevents re-render for same props
9. **Error boundaries** must be class components
10. **getDerivedStateFromError** updates state on error
11. **componentDidCatch** logs errors
12. **Context Provider** wraps components that need access
13. **Reducer function** takes (state, action) and returns new state
14. **dispatch** sends actions to reducer
15. **Dependencies array** in useMemo/useCallback controls when to recalculate
