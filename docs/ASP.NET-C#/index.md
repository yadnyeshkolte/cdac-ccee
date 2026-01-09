---
layout: default
title: Module 8 - ASP.NET C#
nav_order: 8
has_children: true
permalink: /docs/ASP.NET-C%23/
---

# Module 8: ASP.NET & C#

Welcome to Module 8! This module covers .NET Framework, ASP.NET MVC Core, Entity Framework, C# programming, and React integration.

## 📚 Quick Access to Notes

<div class="module-content-grid">
  <a href="{{ '/docs/ASP.NET-C%23/01-dotnet-fundamentals' | relative_url }}" class="content-link">
    <span class="link-icon">🔧</span>
    <span class="link-text">.NET Fundamentals</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/02-csharp-oop' | relative_url }}" class="content-link">
    <span class="link-icon">📦</span>
    <span class="link-text">C# OOP</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/03-interfaces-types' | relative_url }}" class="content-link">
    <span class="link-icon">🔀</span>
    <span class="link-text">Interfaces & Types</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/04-generics-collections' | relative_url }}" class="content-link">
    <span class="link-icon">📋</span>
    <span class="link-text">Generics & Collections</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/05-exceptions-events' | relative_url }}" class="content-link">
    <span class="link-icon">⚠️</span>
    <span class="link-text">Exceptions & Events</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/06-linq-advanced' | relative_url }}" class="content-link">
    <span class="link-icon">🔍</span>
    <span class="link-text">LINQ & Advanced C#</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/07-threading-tasks' | relative_url }}" class="content-link">
    <span class="link-icon">⚡</span>
    <span class="link-text">Threading & Tasks</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/08-aspnet-mvc-intro' | relative_url }}" class="content-link">
    <span class="link-icon">🌐</span>
    <span class="link-text">ASP.NET MVC Basics</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/09-mvc-state-routing' | relative_url }}" class="content-link">
    <span class="link-icon">🛣️</span>
    <span class="link-text">MVC State & Routing</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/10-mvc-layouts-security' | relative_url }}" class="content-link">
    <span class="link-icon">🔒</span>
    <span class="link-text">MVC Layouts & Security</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/11-entity-framework' | relative_url }}" class="content-link">
    <span class="link-icon">🗄️</span>
    <span class="link-text">Entity Framework</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/12-webapi-react' | relative_url }}" class="content-link">
    <span class="link-icon">⚛️</span>
    <span class="link-text">Web API & React</span>
  </a>
</div>

## 🎯 Practice Tests

<div class="module-content-grid">
  <a href="{{ '/docs/ASP.NET-C%23/practice/mcq-test-1' | relative_url }}" class="content-link mcq">
    <span class="link-icon">✅</span>
    <span class="link-text">MCQ Test 1 - .NET & C# Basics</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/practice/mcq-test-2' | relative_url }}" class="content-link mcq">
    <span class="link-icon">✅</span>
    <span class="link-text">MCQ Test 2 - LINQ & Threading</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/practice/mcq-test-3' | relative_url }}" class="content-link mcq">
    <span class="link-icon">✅</span>
    <span class="link-text">MCQ Test 3 - ASP.NET MVC</span>
  </a>
  
  <a href="{{ '/docs/ASP.NET-C%23/practice/mcq-test-4' | relative_url }}" class="content-link mcq">
    <span class="link-icon">✅</span>
    <span class="link-text">MCQ Test 4 - EF & Web API</span>
  </a>
</div>

---

## 📋 Course Syllabus

### Course Overview
Master C# programming and ASP.NET framework for building modern web applications. Learn .NET architecture, MVC pattern, Entity Framework, and develop scalable enterprise solutions with React integration.

### Learning Objectives
- Understand .NET Framework architecture and CLR
- Master C# programming with OOP concepts
- Build web applications with ASP.NET MVC Core
- Implement data access with Entity Framework Core
- Create and consume RESTful Web APIs
- Integrate React with ASP.NET backend

### Topics Covered

#### 1. .NET Framework & CLR
- .NET Framework introduction & architecture
- Intermediate Language (IL) and assemblies
- CLR functions: JIT, Memory Management, GC, AppDomain
- CTS, CLS, and Security
- .NET Framework vs .NET Core vs Mono vs Xamarin
- Managed vs Unmanaged Code
- Visual Studio & ILDASM

#### 2. C# Programming Fundamentals
- C# syntax and data types (CTS equivalents)
- Methods: Overloading, Optional/Named Parameters, params
- Properties: get, set, readonly
- Constructors, Object Initializers, Destructors
- Static members and classes
- Access specifiers

#### 3. Object-Oriented Programming
- Inheritance and polymorphism
- Method Hiding (new) and Overriding (virtual/override)
- Abstract Classes and Methods
- Sealed Classes and Methods
- Interfaces (implementing, explicit, inheritance, default methods)
- Operator overloading

#### 4. Types & Collections
- Value Types (struct, enum) vs Reference Types
- out, ref, nullable types, ?? and ??=
- Arrays (single, multi-dimensional, jagged)
- Indices, Ranges, Indexers
- Generic classes, methods, constraints
- Collections (List, Dictionary, HashSet, Stack, Queue)

#### 5. Delegates, Events & LINQ
- Delegates (Action, Func, Predicate)
- Multicast delegates, Anonymous methods, Lambdas
- Events (declaring, raising, handling)
- LINQ to Objects, Deferred execution
- Anonymous types, Extension methods
- Partial classes and methods, PLINQ
- Reflection and Custom Attributes
- File I/O and Streams

#### 6. Threading & Async Programming
- Threading (ThreadStart, ParameterizedThreadStart)
- ThreadPool, Synchronization (lock, Monitor, Interlocked)
- Tasks, async/await
- Task Parallel Library

#### 7. ASP.NET MVC Core
- MVC Architecture and Folder Structure
- Controllers, Actions, and ActionResults
- Views (Razor), Models, ViewModels
- HTML Helpers and Tag Helpers
- Validation (Data Annotations, Client/Server-side)
- State Management (ViewBag, TempData, Session, Cookies)
- Routing and Request Life Cycle
- Layouts, Bundling, Minification
- Filters and Custom Action Filters
- Security (Authorize, AntiForgeryToken, XSS Prevention)

#### 8. Data Access
- ADO.NET (SqlConnection, SqlCommand, DataReader, DataSet)
- Entity Framework Core introduction
- Code First Approach
- Data Annotations and Fluent API
- Database Migrations
- CRUD Operations with EF
- Razor Pages

#### 9. Web API & React Integration
- Creating RESTful Web APIs
- HTTP Verbs and Status Codes
- CORS Configuration
- JSON Serialization
- JWT Authentication
- React Integration and State Management
- Consuming APIs with axios
- React Router

### Prerequisites
- Basic programming knowledge
- Understanding of web concepts (HTML, CSS, JavaScript)
- Object-oriented programming concepts

### Learning Outcomes
Upon completion of this module, you will be able to:
- Build modern web applications with ASP.NET MVC Core
- Write efficient, type-safe C# code
- Implement data access with Entity Framework Core
- Create and consume RESTful APIs
- Integrate React frontend with ASP.NET backend
- Apply security best practices
