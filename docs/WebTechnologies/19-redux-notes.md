---
layout: default
title: Redux
parent: Module 3 - Web Technologies
nav_order: 19
---

# Sessions 27 & 28: Redux State Management

## 📚 Introduction to Redux

**Redux** is a predictable state container for JavaScript applications.

### Core Principles:
1. **Single Source of Truth** - Entire app state in one store
2. **State is Read-Only** - Only way to change is by dispatching actions
3. **Changes via Pure Functions** - Reducers are pure functions

### Redux Flow:

```
┌─────────┐     dispatch     ┌─────────┐     reduce      ┌─────────┐
│  View   │ ──────────────→ │  Action  │ ──────────────→ │ Reducer │
└─────────┘                  └─────────┘                  └────┬────┘
     ↑                                                         │
     │                      ┌─────────┐                        │
     └───── subscribe ───── │  Store  │ ←──── new state ───────┘
                            └─────────┘
```

---

## 🏗️ Core Concepts

### Actions:

Actions are plain objects describing what happened.

```javascript
// Action object
const incrementAction = {
    type: 'INCREMENT'
};

const addTodoAction = {
    type: 'ADD_TODO',
    payload: {
        id: 1,
        text: 'Learn Redux',
        completed: false
    }
};

// Action creators (functions that return actions)
function increment() {
    return { type: 'INCREMENT' };
}

function addTodo(text) {
    return {
        type: 'ADD_TODO',
        payload: {
            id: Date.now(),
            text,
            completed: false
        }
    };
}

// Action types (constants)
const ActionTypes = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    ADD_TODO: 'ADD_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO',
    DELETE_TODO: 'DELETE_TODO'
};
```

### Reducers:

Reducers specify how state changes in response to actions.

```javascript
// Initial state
const initialState = {
    count: 0
};

// Reducer function
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'INCREMENT_BY':
            return { ...state, count: state.count + action.payload };
        case 'RESET':
            return { ...state, count: 0 };
        default:
            return state;
    }
}

// Todo reducer
const initialTodoState = {
    todos: [],
    filter: 'all'
};

function todoReducer(state = initialTodoState, action) {
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
                        ? { ...todo, completed: !todo.completed }
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
        default:
            return state;
    }
}
```

### Store:

Store holds the application state.

```javascript
import { createStore } from 'redux';

// Create store with reducer
const store = createStore(counterReducer);

// Get current state
console.log(store.getState());  // { count: 0 }

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
    console.log('State changed:', store.getState());
});

// Dispatch actions
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

console.log(store.getState());  // { count: 1 }

// Unsubscribe
unsubscribe();
```

### Combining Reducers:

```javascript
import { combineReducers, createStore } from 'redux';

// Root reducer
const rootReducer = combineReducers({
    counter: counterReducer,
    todos: todoReducer,
    user: userReducer
});

const store = createStore(rootReducer);

// State shape:
// {
//     counter: { count: 0 },
//     todos: { todos: [], filter: 'all' },
//     user: { ... }
// }
```

---

## ⚛️ React-Redux

### Installation:

```bash
npm install redux react-redux
```

### Provider:

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <Counter />
            <TodoList />
        </Provider>
    );
}
```

### useSelector Hook:

```jsx
import { useSelector } from 'react-redux';

function Counter() {
    // Select specific state
    const count = useSelector(state => state.counter.count);
    
    return <div>Count: {count}</div>;
}

function TodoList() {
    const todos = useSelector(state => state.todos.todos);
    const filter = useSelector(state => state.todos.filter);
    
    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'active') return !todo.completed;
        return true;
    });
    
    return (
        <ul>
            {filteredTodos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}
```

### useDispatch Hook:

```jsx
import { useDispatch } from 'react-redux';

function Counter() {
    const dispatch = useDispatch();
    
    return (
        <div>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        </div>
    );
}

// With action creators
import { increment, decrement } from './actions';

function Counter() {
    const dispatch = useDispatch();
    
    return (
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}
```

### Complete Example:

```jsx
// actions/counterActions.js
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });
export const incrementBy = (amount) => ({ type: 'INCREMENT_BY', payload: amount });

// reducers/counterReducer.js
const initialState = { count: 0 };

export default function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'INCREMENT_BY':
            return { ...state, count: state.count + action.payload };
        default:
            return state;
    }
}

// reducers/index.js
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

export default combineReducers({
    counter: counterReducer
});

// store/index.js
import { createStore } from 'redux';
import rootReducer from '../reducers';

export const store = createStore(rootReducer);

// components/Counter.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementBy } from '../actions/counterActions';

function Counter() {
    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();
    
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(increment())}>+1</button>
            <button onClick={() => dispatch(decrement())}>-1</button>
            <button onClick={() => dispatch(incrementBy(5))}>+5</button>
        </div>
    );
}

// App.jsx
import { Provider } from 'react-redux';
import { store } from './store';
import Counter from './components/Counter';

function App() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    );
}
```

---

## 🔧 Redux Toolkit (Modern Redux)

**Redux Toolkit** is the official, recommended way to write Redux logic.

### Installation:

```bash
npm install @reduxjs/toolkit react-redux
```

### createSlice:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { count: 0 },
    reducers: {
        increment: (state) => {
            // Can "mutate" state directly (uses Immer)
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementBy: (state, action) => {
            state.count += action.payload;
        },
        reset: (state) => {
            state.count = 0;
        }
    }
});

// Auto-generated action creators
export const { increment, decrement, incrementBy, reset } = counterSlice.actions;

// Reducer
export default counterSlice.reducer;
```

### configureStore:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './todosSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todosReducer
    }
});

export default store;
```

### Todo Slice Example:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        filter: 'all'
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({
                id: Date.now(),
                text: action.payload,
                completed: false
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
```

### Using with React:

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}
```

---

## 🔄 Async Operations with Redux

### Redux Thunk:

Thunk middleware allows action creators to return functions.

```javascript
// With Redux Toolkit (thunk is included by default)
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await fetch('/api/users');
        return response.json();
    }
);

// Slice with async reducers
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default usersSlice.reducer;

// Usage in component
function UserList() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.users);
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <ul>
            {data.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
}
```

### Manual Thunk (Classic Redux):

```javascript
// Manual thunk action creator
function fetchUsers() {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_USERS_PENDING' });
        
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            dispatch({ type: 'FETCH_USERS_FULFILLED', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_USERS_REJECTED', payload: error.message });
        }
    };
}

// Setup store with thunk middleware
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));
```

---

## 🗂️ Selectors

### Basic Selectors:

```javascript
// Simple selector
const selectCount = (state) => state.counter.count;

// Derived data selector
const selectCompletedTodos = (state) => 
    state.todos.items.filter(todo => todo.completed);

const selectTodoCount = (state) => state.todos.items.length;

// Usage
function Component() {
    const count = useSelector(selectCount);
    const completedTodos = useSelector(selectCompletedTodos);
}
```

### Memoized Selectors (Reselect):

```javascript
import { createSelector } from '@reduxjs/toolkit';
// or: import { createSelector } from 'reselect';

// Input selectors
const selectTodos = (state) => state.todos.items;
const selectFilter = (state) => state.todos.filter;

// Memoized selector
const selectFilteredTodos = createSelector(
    [selectTodos, selectFilter],
    (todos, filter) => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'active':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    }
);

// Usage
function TodoList() {
    const filteredTodos = useSelector(selectFilteredTodos);
    // Only recalculates when todos or filter changes
}
```

---

## 📁 Project Structure

```
src/
├── app/
│   └── store.js              # Configure store
├── features/
│   ├── counter/
│   │   ├── counterSlice.js   # Slice with reducers & actions
│   │   └── Counter.jsx       # Component
│   ├── todos/
│   │   ├── todosSlice.js
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   └── users/
│       ├── usersSlice.js
│       └── UserList.jsx
├── App.jsx
└── index.js

// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todosReducer,
        users: usersReducer
    }
});
```

---

## 🔄 Redux vs Context vs useState


| Feature | useState | Context | Redux |
|---------|----------|---------|-------|
| Scope | Component | Subtree | Global |
| Boilerplate | Low | Medium | High (less with Toolkit) |
| DevTools | ❌ No | ❌ No | ✅ Yes |
| Time Travel | ❌ No | ❌ No | ✅ Yes |
| Middleware | ❌ No | ❌ No | ✅ Yes |
| Best For | Local state | Theme, Auth | Complex app state |

### When to Use Redux:
- Large applications with complex state
- State shared across many components
- Need for time-travel debugging
- Frequent state updates
- Multiple developers on same codebase
- Middleware for async logic

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **Redux has 3 principles**: Single source of truth, state is read-only, changes via pure functions
2. **Action** is a plain object with `type` property
3. **Reducer** takes (state, action) and returns new state
4. **Store** holds the entire application state
5. **dispatch()** sends actions to the store
6. **subscribe()** listens for state changes
7. **combineReducers** combines multiple reducers
8. **Provider** makes store available to React components
9. **useSelector** reads state from store
10. **useDispatch** returns dispatch function
11. **Redux Toolkit** simplifies Redux code
12. **createSlice** auto-generates actions and reducer
13. **createAsyncThunk** handles async operations
14. **Thunk** allows action creators to return functions
15. **Selectors** extract and compute derived data from state
