---
layout: default
title: React Router
parent: Module 3 - Web Technologies
nav_order: 18
---

# Sessions 25 & 26: React Router & Advanced Patterns

## 📚 Introduction to React Router

**React Router** enables client-side routing in React applications.

### Installation:

```bash
npm install react-router-dom
```

### Basic Setup (React Router v6):

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
```

---

## 🔗 Navigation

### Link Component:

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products?category=electronics">Electronics</Link>
        </nav>
    );
}
```

### NavLink (Active Styling):

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Home
            </NavLink>
            
            <NavLink 
                to="/about"
                style={({ isActive }) => ({
                    color: isActive ? 'red' : 'blue'
                })}
            >
                About
            </NavLink>
        </nav>
    );
}
```

### Programmatic Navigation:

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login();
        navigate('/dashboard');
        // navigate('/dashboard', { replace: true }); // No back button
        // navigate(-1); // Go back
        // navigate(1);  // Go forward
    };
    
    return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 📍 Route Parameters

### URL Parameters:

```jsx
// Route definition
<Route path="/users/:userId" element={<UserProfile />} />
<Route path="/posts/:postId/comments/:commentId" element={<Comment />} />

// Component
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { userId } = useParams();
    
    return <div>User ID: {userId}</div>;
}

function Comment() {
    const { postId, commentId } = useParams();
    
    return <div>Post {postId}, Comment {commentId}</div>;
}
```

### Query Parameters:

```jsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const category = searchParams.get('category');
    const page = searchParams.get('page') || '1';
    
    const updatePage = (newPage) => {
        setSearchParams({ category, page: newPage });
    };
    
    return (
        <div>
            <p>Category: {category}</p>
            <p>Page: {page}</p>
            <button onClick={() => updatePage(parseInt(page) + 1)}>
                Next Page
            </button>
        </div>
    );
}
```

---

## 📂 Nested Routes

```jsx
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="users" element={<Users />}>
                    <Route index element={<UserList />} />
                    <Route path=":userId" element={<UserProfile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

// Layout component with Outlet
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />  {/* Child routes render here */}
            </main>
            <Footer />
        </div>
    );
}

function Users() {
    return (
        <div>
            <h1>Users</h1>
            <Outlet />  {/* UserList or UserProfile renders here */}
        </div>
    );
}
```

---

## 🛡️ Protected Routes

```jsx
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, redirectPath = '/login' }) {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    
    return <Outlet />;
}

// Usage
function App() {
    const { isAuthenticated } = useAuth();
    
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}
```

---

## 🔄 useLocation Hook

{% raw %}
```jsx
import { useLocation } from 'react-router-dom';

function CurrentPath() {
    const location = useLocation();
    
    // location.pathname - /users/123
    // location.search - ?tab=profile
    // location.hash - #section1
    // location.state - passed state
    
    return <div>Current path: {location.pathname}</div>;
}

// Passing state
<Link to="/checkout" state={{ from: 'cart', items: cartItems }}>
    Checkout
</Link>

// Receiving state
function Checkout() {
    const location = useLocation();
    const { from, items } = location.state || {};
    
    return <div>From: {from}</div>;
}
```
{% endraw %}

---

## 🏗️ Composition Patterns

### Container/Presentational Pattern:

```jsx
// Container (handles logic)
function UserListContainer() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchUsers().then(data => {
            setUsers(data);
            setLoading(false);
        });
    }, []);
    
    return <UserList users={users} loading={loading} />;
}

// Presentational (handles UI)
function UserList({ users, loading }) {
    if (loading) return <Spinner />;
    
    return (
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
}
```

### Render Props Pattern:

```jsx
// Component that shares logic
function MouseTracker({ render }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    return render(position);
}

// Usage
function App() {
    return (
        <MouseTracker
            render={({ x, y }) => (
                <p>Mouse position: {x}, {y}</p>
            )}
        />
    );
}
```

### Higher-Order Components (HOC):

```jsx
// HOC that adds loading state
function withLoading(WrappedComponent) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <Spinner />;
        }
        
        return <WrappedComponent {...props} />;
    };
}

// Usage
const UserListWithLoading = withLoading(UserList);

function App() {
    return <UserListWithLoading isLoading={loading} users={users} />;
}
```

### Compound Components:

{% raw %}
```jsx
// Parent manages state, children consume via context
const TabContext = createContext();

function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabContext.Provider>
    );
}

function TabList({ children }) {
    return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
    const { activeTab, setActiveTab } = useContext(TabContext);
    
    return (
        <button
            className={activeTab === id ? 'active' : ''}
            onClick={() => setActiveTab(id)}
        >
            {children}
        </button>
    );
}

function TabPanels({ children }) {
    return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }) {
    const { activeTab } = useContext(TabContext);
    
    if (activeTab !== id) return null;
    
    return <div className="tab-panel">{children}</div>;
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
function App() {
    return (
        <Tabs defaultTab="tab1">
            <Tabs.List>
                <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
                <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panels>
                <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
                <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
            </Tabs.Panels>
        </Tabs>
    );
}
```
{% endraw %}

---

## 📦 Code Splitting

### React.lazy and Suspense:

```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Suspense>
    );
}

function Loading() {
    return <div>Loading...</div>;
}
```

### Route-based Code Splitting:

```jsx
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

---

## 🔄 Data Fetching with React Router

### Loader Functions (React Router v6.4+):

```jsx
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom';

// Define loader
async function userLoader({ params }) {
    const response = await fetch(`/api/users/${params.userId}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
}

// Use loader data
function UserProfile() {
    const user = useLoaderData();
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}

// Configure router
const router = createBrowserRouter([
    {
        path: '/users/:userId',
        element: <UserProfile />,
        loader: userLoader,
        errorElement: <ErrorPage />
    }
]);

function App() {
    return <RouterProvider router={router} />;
}
```

---

## 🧩 Composition vs Inheritance

React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

### Containment (Children Prop):
Some components don't know their children ahead of time (e.g., Sidebar, Dialog). Use `children` prop to pass elements directly.

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
```

### Specialization:
Sometimes we think about components as being "special cases" of other components. For example, `WelcomeDialog` is a special case of `Dialog`.

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
  );
}
```

**Note**: Facebook uses React in thousands of components, and they haven't found any use cases where inheritance would be recommended over composition.

---

## 🧠 Thinking in React

React is a new way of thinking about building web apps.

### Step 1: Break The UI Into A Component Hierarchy
Draw boxes around every component (and subcomponent) in the mock and give them all names.

### Step 2: Build A Static Version in React
Build components that reuse other components and pass data using props. Don't use state at all to build this static version.

### Step 3: Identify The Minimal (but complete) Representation Of UI State
Think of the minimal set of mutable state that your app needs. DRY (Don't Repeat Yourself).

### Step 4: Identify Where Your State Should Live
Identify every component that renders something based on that state. Find a common owner component (a single component above all the components that need the state in the hierarchy).

### Step 5: Add Inverse Data Flow
Pass callbacks down to child components so they can update the state in the parent.

---

## ⚡ Performance Optimization

### React.memo:

```jsx
const UserCard = React.memo(function UserCard({ user, onClick }) {
    console.log('Rendering UserCard');
    return (
        <div onClick={() => onClick(user.id)}>
            {user.name}
        </div>
    );
});
```

### Virtualization:

```jsx
// For long lists, use react-window or react-virtualized
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
    return (
        <FixedSizeList
            height={400}
            width={300}
            itemSize={50}
            itemCount={items.length}
        >
            {({ index, style }) => (
                <div style={style}>{items[index].name}</div>
            )}
        </FixedSizeList>
    );
}
```

### Avoiding Unnecessary Renders:

```jsx
// 1. Move state down
function Parent() {
    return (
        <div>
            <StaticContent />
            <DynamicContent />  {/* Only this needs state */}
        </div>
    );
}

// 2. Pass children as props
function Parent({ children }) {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            {children}  {/* Won't re-render when count changes */}
        </div>
    );
}
```

---

## 💡 Key MCQ Points

> **Remember these for CCEE:**

1. **BrowserRouter** enables client-side routing
2. **Routes** replaces Switch in React Router v6
3. **Route** defines path and element to render
4. **Link** prevents page reload, uses HTML5 history
5. **NavLink** adds active class/style for current route
6. **useNavigate** for programmatic navigation
7. **useParams** accesses URL parameters
8. **useSearchParams** accesses query parameters
9. **useLocation** provides current location object
10. **Outlet** renders child routes in nested routing
11. **Navigate** component redirects declaratively
12. **Protected routes** check auth before rendering
13. **React.lazy** enables code splitting
14. **Suspense** shows fallback while loading
15. **Higher-Order Components** wrap components with logic
