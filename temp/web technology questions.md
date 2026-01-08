Full Question Bank (Printable)
1.
Given a flex container of width 1000px containing three items with `flex-basis: 200px`. Item 1 has `flex-grow: 1`, Item 2 has `flex-grow: 1`, and Item 3 has `flex-grow: 2`. What is the computed width of Item 3?

200px
300px
400px
350px
Correct Answer: Option C
Step-by-step calculation:1. Total Basis = 200 + 200 + 200 = 600px.2. Positive Free Space = 1000 - 600 = 400px.3. Total Grow Factors = 1 + 1 + 2 = 4.4. Item 3 share = (2/4) * 400 = 200px.5. Final Width = Basis (200) + Share (200) = 400px.Rookies often forget to add the share back to the basis.
2.
Which CSS pseudo-class selector allows you to group selectors WITHOUT increasing specificity?

:is()
:where()
:not()
:has()
Correct Answer: Option B
The :where() pseudo-class always has a specificity of 0, regardless of the selectors inside it. :is() and :not() take the specificity of the most specific selector in their arguments.
3.
In the HTML5 Constraint Validation API, what is the side effect of calling `input.setCustomValidity('Error')`?

It shows a popup immediately.
It prevents the form from submitting but registers the input as valid in CSS.
It marks the input as invalid and prevents form submission until setCustomValidity('') is called.
It automatically focuses the input field.
Correct Answer: Option C
Setting a non-empty string via setCustomValidity flags the element as invalid. Crucially, the user cannot submit the form, and the element will match the :invalid CSS pseudo-class. You MUST programmatically call setCustomValidity('') (empty string) to clear the error state; user input alone does not clear it.
4.
With `box-sizing: border-box`, if you have a `div` with `width: 200px`, `padding: 20px`, and `border: 5px solid`, what is the width of the *content area*?

200px
175px
150px
250px
Correct Answer: Option C
With border-box, the specified width includes padding and border.Content Width = Total Width - (Left+Right Padding) - (Left+Right Border)200 - (20+20) - (5+5) = 150px.
5.
What is the difference between CSS Grid `repeat(auto-fill, minmax(100px, 1fr))` and `repeat(auto-fit, minmax(100px, 1fr))` when there are few items?

auto-fit leaves empty tracks at the end; auto-fill stretches items to fill the row.
auto-fill creates as many tracks as fit into the container, even if empty; auto-fit collapses empty tracks to 0.
They behave exactly the same.
auto-fill works only on columns; auto-fit works on rows.
Correct Answer: Option B
If your container is wide but has few items:auto-fill preserves the potential column slots (you see empty space at the end).auto-fit collapses those empty slots and allows the existing items to expand (if using 1fr) to fill the entire container width.
6.
What is the output of the following code snippet?

const shape = { radius: 10, diameter() { return this.radius * 2; }, perimeter: () => 2 * Math.PI * this.radius };
console.log(shape.diameter());
console.log(shape.perimeter());
20 and 62.83...
20 and NaN
NaN and 62.83...
20 and undefined
Correct Answer: Option B
The method diameter() is a standard function, so this refers to the shape object (Radius 10 -> 20).The property perimeter is an Arrow Function. Arrow functions do not have their own this; they inherit it from the enclosing lexical scope (likely window or undefined in strict mode). Thus, this.radius is undefined, resulting in NaN.
7.
Consider the 'Temporal Dead Zone' (TDZ). Which statement is true regarding `let` and `const` variables?

They are not hoisted at all.
They are hoisted but not initialized, causing a ReferenceError if accessed before declaration.
They are initialized with 'undefined' like var.
They are only accessible inside the block if declared at the top.
Correct Answer: Option B
Technically, let and const ARE hoisted to the top of the block, but they remain in the TDZ (Temporal Dead Zone) until the execution reaches the declaration. Accessing them before that line throws a ReferenceError. var is hoisted and initialized to undefined immediately.
8.
What happens when you use Destructuring assignment with a default value on a variable that is `null`?

const { a = 10 } = { a: null };
console.log(a);
10
null
undefined
Throw Error
Correct Answer: Option B
Default values in destructuring only activate when the value is strictly undefined. Since null is a valid value, the default value is ignored, and a becomes null.
9.
In the Promise API, what does `Promise.all()` do if one of the passed promises rejects?

It waits for all others to finish, then throws an AggregateError.
It returns an array with the success values and the error object.
It immediately rejects with the error of the failed promise (fail-fast).
It ignores the rejection and returns the resolved values only.
Correct Answer: Option C
Promise.all() exhibits fail-fast behavior. The moment any input promise rejects, the entire returned promise rejects immediately with that error, discarding the results of the others (though the operations themselves may still complete in the background).
10.
What is the output sequence of this Event Loop puzzle?

console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
A, B, C, D
A, D, B, C
A, D, C, B
A, C, D, B
Correct Answer: Option C
1. A (Synchronous) prints.2. setTimeout (Macrotask) schedules B.3. Promise.then (Microtask) schedules C.4. D (Synchronous) prints.5. Stack clears -> Microtask Queue runs (C).6. Macrotask Queue runs (B).
11.
Regarding ES Modules: What is the key difference between a default export and a named export regarding 'live bindings'?

Only default exports support live bindings.
Only named exports support live bindings; default exports import the value at the time of import.
Both behave exactly the same.
Named exports are read-only, default exports are mutable.
Correct Answer: Option B
ES Modules use live bindings for named exports (if the exporting module updates the variable, the importer sees the new value). However, export default value usually exports the value expression at that moment (unless exporting a class/function declaration directly), effectively behaving more like a value copy for primitives or a reference for objects.
12.
When using `Array.prototype.reduce()` on an empty array without an initial value, what happens?

It returns undefined.
It returns null.
It throws a TypeError.
It returns an empty array.
Correct Answer: Option C
If reduce is called on an empty array without an initial value, it cannot determine the accumulator's starting state and throws a TypeError: Reduce of empty array with no initial value.
13.
What makes `WeakMap` keys different from `Map` keys?

WeakMap keys can be primitives or objects.
WeakMap keys are not enumerable and must be objects (or registered symbols).
WeakMap keys prevent garbage collection of the object.
WeakMap has a .size property.
Correct Answer: Option B
WeakMap keys must be objects (or non-registered Symbols). Crucially, they hold a weak reference to the key, meaning if the key object is not referenced anywhere else, it can be garbage collected even if it's in the WeakMap. WeakMaps are not enumerable.
14.
What is the result of `Symbol('key') === Symbol('key')`?

true
false
undefined
TypeError
Correct Answer: Option B
Every Symbol() call creates a unique symbol, even if the description string is identical. To share symbols, you must use the global registry via Symbol.for('key').
15.
In a Generator function, what does the `yield` keyword actually do?

It terminates the function permanently.
It pauses the function execution and returns a value to the caller, saving the stack frame.
It runs a separate thread.
It creates a Promise automatically.
Correct Answer: Option B
yield pauses the generator's execution, saving its entire context (variable scopes, stack). It returns an object { value: X, done: false } to the caller. The function only resumes when .next() is called on the generator object.
16.
Inside an I/O callback (like fs.readFile), which timer is guaranteed to execute first?

fs.readFile(file, () => {
  setTimeout(() => console.log('Timeout'), 0);
  setImmediate(() => console.log('Immediate'));
});
setTimeout always.
setImmediate always.
It is non-deterministic.
They run in parallel.
Correct Answer: Option B
When inside an I/O phase (Poll phase), the event loop proceeds to the Check phase next. setImmediate callbacks run in the Check phase. setTimeout logic is processed in the Timer phase (which is the start of the next loop). Therefore, setImmediate always runs first in this context.
17.
What happens if you recursively call `process.nextTick()`?

It causes a stack overflow immediately.
It starves the Event Loop, preventing I/O operations from running.
Node.js automatically throttles it.
It behaves exactly like a recursive setImmediate.
Correct Answer: Option B
The process.nextTick queue is fully drained after the current operation and before the event loop continues to the next phase. Recursive nextTick calls will keep adding to this queue, preventing the loop from ever reaching the I/O or Timer phases, effectively freezing the I/O of the server (I/O starvation).
18.
When piping streams `readStream.pipe(writeStream)`, what happens if an error occurs in the `readStream`?

The error automatically propagates to the writeStream.
The Node process crashes unless a global handler is set.
The stream closes, but the error does NOT propagate to writeStream; you must attach error listeners to both.
The writeStream destroys the readStream.
Correct Answer: Option C
By default, .pipe() does not forward errors. If readStream fails, writeStream won't know and might hang open. You must explicitly listen for 'error' on both streams or use stream.pipeline() (introduced in Node 10+) which handles cleanup and error propagation correctly.
19.
In Express, what is the specific signature required for an Error Handling Middleware?

(req, res, next)
(err, req, res)
(err, req, res, next)
(req, res, err, next)
Correct Answer: Option C
Express recognizes error handlers by their argument count (arity). You MUST provide exactly 4 arguments: (err, req, res, next). If you omit next, Express interprets it as a regular middleware and won't invoke it for errors.
20.
What is the difference between `res.send({a:1})` and `res.json({a:1})` in Express?

No difference.
res.json enforces JSON content-type and handles formatting options; res.send inspects the argument type.
res.send cannot send objects.
res.json is deprecated.
Correct Answer: Option B
res.send(object) automatically converts the object to JSON and sets the header. However, res.json(object) is explicit and also respects settings like json replacer and json spaces (for pretty printing) defined in the app settings.
21.
In Express middleware, what does calling `next('route')` do?

It behaves exactly like next().
It skips all remaining middleware in the current stack and jumps to the next route handler.
It restarts the request from the beginning.
It triggers a 404 error.
Correct Answer: Option B
next('route') is a special command used in app.METHOD() or router.METHOD(). It skips all remaining middleware functions in the current callback array and passes control to the next route definition that matches the path.
22.
Regarding Node.js Modules: If Module A requires B, and B requires A (Circular Dependency), what does A get when it requires B?

Infinite Loop / Stack Overflow.
A gets a copy of B that is partially loaded (only exports defined up to that line).
Node throws a CircularDependencyError.
A gets an empty object.
Correct Answer: Option B
Node.js allows circular dependencies. When B requires A, it gets the incomplete exports object of A (whatever has been exported so far). Then B finishes executing. When A's require of B returns, it gets the full B. This often leads to `undefined` imports if not careful with ordering.
23.
Which Node.js method is safest for creating a Buffer from untrusted data to avoid leaking sensitive memory?

Buffer.allocUnsafe()
new Buffer()
Buffer.alloc()
Buffer.from()
Correct Answer: Option C
Buffer.alloc(size) initializes the memory with zeros. Buffer.allocUnsafe(size) is faster but uses uninitialized memory, which might contain sensitive data from previous allocations (like passwords/keys). new Buffer() is deprecated.
24.
How does the Node.js `cluster` module share memory between worker processes?

They share the global object.
They do NOT share memory; they are separate processes.
They share a specific SharedArrayBuffer automatically.
They share the Heap but not the Stack.
Correct Answer: Option B
Node.js workers are separate processes (forks) with their own V8 instance, event loop, and memory space. They cannot share variables. They must communicate via IPC (Inter-Process Communication) messages or an external store (Redis/DB).
25.
Why is `fs.watch` often discouraged for production file watching on generic platforms?

It is synchronous and blocks the event loop.
It has inconsistent behavior across platforms (e.g., duplicate events, missing filenames).
It cannot watch directories.
It requires root privileges.
Correct Answer: Option B
fs.watch relies on the underlying OS API (inotify, FSEvents, etc.). It is notoriously inconsistent: on some OSs it doesn't return the filename, on others it fires twice, or misses events. Libraries like `chokidar` are used to wrap and fix these issues.
26.
In React 18, automatic batching applies to which of the following that it did NOT apply to in React 17?

Native Event Handlers and React Event Handlers.
Promises, setTimeout, and Native Event Handlers.
Only React Event Handlers.
Only useEffect.
Correct Answer: Option B
In React 17, batching only worked inside React's synthetic event handlers. Updates inside setTimeout, fetch callbacks (Promises), or native DOM listeners triggered one re-render per update. React 18 automatically batches ALL of these.
27.
When does the cleanup function of a `useEffect` run?

Only when the component unmounts.
Before the effect runs (on updates) and on unmount.
After the new effect runs.
Immediately after the state changes.
Correct Answer: Option B
The cleanup function runs 1) Before the component unmounts, and 2) Before re-running the effect due to a dependency change. This ensures the previous side-effect is cleaned up before the new one starts.
28.
Why might `const value = { data: 'test' }` passed to a Context Provider cause performance issues?

Context cannot hold objects.
It creates a new object reference on every render, forcing all Consumers to re-render.
It violates the immutability rule.
It causes an infinite loop.
Correct Answer: Option B
If you define the object inline value={{...}}, a new reference is created every time the Provider component renders. Even if the data didn't change, the referential equality check fails, forcing every consumer component to re-render. Solution: Wrap it in useMemo.
29.
In Redux Toolkit (RTK), why does `state.push(payload)` work in a reducer, despite Redux requiring immutability?

RTK disables immutability checks.
RTK uses the 'Immer' library internally to draft a proxy state.
JavaScript arrays are immutable by default.
It is actually a bug.
Correct Answer: Option B
Redux Toolkit uses Immer. When you write mutating logic (state.push), you are actually modifying a 'Draft' proxy. Immer tracks these changes and produces a strictly immutable new state object based on your mutations.
30.
What is the primary difference between `useEffect` and `useLayoutEffect`?

useLayoutEffect runs asynchronously.
useLayoutEffect runs synchronously after DOM mutation but before the browser paints.
useEffect runs before the DOM is updated.
There is no difference.
Correct Answer: Option B
useLayoutEffect fires synchronously immediately after DOM mutations. It blocks the visual paint. Use it if you need to measure DOM elements (width/height) and update state before the user sees the screen to avoid flickering. useEffect runs after the paint.
31.
Which of the following describes the 'Stale Closure' problem in React Hooks?

Memory leaks caused by unclosed sockets.
A useEffect or useCallback capturing an old version of a state variable because it was missing from the dependency array.
A component that refuses to unmount.
Using var instead of let.
Correct Answer: Option B
If a function (like an effect or callback) relies on a variable from the component scope but doesn't list it in the dependency array, the closure captures the variable from the render where it was created. Subsequent renders update the variable, but the function still sees the old ('stale') value.
32.
What does `React.memo` do by default?

Deeply compares all props.
Shallow compares props to skip re-rendering if they haven't changed.
Memoizes the state of the component.
Caches the component in LocalStorage.
Correct Answer: Option B
React.memo is a Higher Order Component that performs a shallow comparison of the new props vs old props. If they are shallowly equal, it skips the re-render. It does not do deep comparison.
33.
In React portals (`ReactDOM.createPortal`), how does event bubbling behave?

Events bubble up the DOM tree (to the portal destination).
Events bubble up the React component tree (to the component that rendered the Portal).
Events do not bubble at all.
Events are captured but not bubbled.
Correct Answer: Option B
Even though the portal renders HTML in a different place in the DOM (e.g., document.body), React events behave as if the component is still in the standard React tree. An event fired inside a portal will bubble up to its React ancestor.
34.
When using `useReducer`, is the `initialState` argument re-calculated on every render?

Yes, always.
No, only if you pass a function as the third argument (lazy init).
No, React automatically memoizes it.
Yes, but it is cheap so it doesn't matter.
Correct Answer: Option B
If you pass a value like useReducer(reducer, calculateHugeData()), the function runs every render, though React ignores the result after the first. To avoid this, use Lazy Initialization: pass the function as the third argument: useReducer(reducer, arg, initFunction).
35.
What is the purpose of the `key` prop in React lists?

It provides a unique CSS ID.
It helps React identify which items have changed, added, or removed during reconciliation.
It allows direct DOM access.
It sorts the list automatically.
Correct Answer: Option B
Keys give elements a stable identity. When the list changes, React uses keys to match existing DOM nodes to new Virtual DOM elements. Without keys (or using index as key during reordering), React destroys and recreates DOM nodes inefficiently or introduces bugs with component state.
36.
Why is `index` generally a bad `key` for lists?

It is not a string.
If the list is reordered or filtered, the index changes, causing React to mix up component state (like input values) between items.
It causes syntax errors.
It is too slow to calculate.
Correct Answer: Option B
If Item A is at index 0, and you unshift Item New to index 0, Item A becomes index 1. React sees 'Key 0' and assumes it's the same component. It will reuse the DOM and state of the old Item A for the new Item, leading to incorrect UI state.
37.
Can Error Boundaries catch errors inside Event Handlers?

Yes, they catch all errors.
No, they only catch errors during rendering, lifecycle methods, and constructors.
Yes, but only in production.
No, you must use try/catch inside event handlers.
Correct Answer: Option D
Error Boundaries do NOT catch errors inside event handlers, asynchronous code (setTimeout), or server-side rendering. For event handlers, standard JS try/catch blocks are required.
38.
What is 'Prop Drilling' and how does Context API solve it?

Passing data from parent to direct child.
Passing data through multiple layers of components that don't need it, just to reach a deep child.
Using incorrect prop types.
Drilling holes in the Virtual DOM.
Correct Answer: Option B
Prop Drilling is the tedious process of passing data down 5-6 layers of components. Context API allows you to 'teleport' data from a Provider at the top directly to a Consumer at the bottom, bypassing the intermediate components.
39.
In React, what is the argument passed to the `setState` function if you use the functional update form `setCount(c => c + 1)`?

The initial state.
The state at the time the function was created.
The most current state value pending in the update queue.
The value 0.
Correct Answer: Option C
The functional update receives the most up-to-date state. This is crucial during batched updates or closures. If you call `setCount(c => c+1)` three times, it increments by 3. If you call `setCount(count+1)` three times, it increments only by 1.
40.
What is the return value of `useRef`?

The current value directly.
A mutable object with a .current property.
An immutable object.
A DOM node.
Correct Answer: Option B
useRef returns a plain JavaScript object: { current: initialValue }. This object persists for the full lifetime of the component. Changing .current does not trigger a re-render.