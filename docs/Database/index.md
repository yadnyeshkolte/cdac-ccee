---
layout: default
title: Module 2 - Database
nav_order: 2
has_children: true
permalink: /docs/Database/
---

# Module 2: Database Technologies

Welcome to Module 2! This module covers database fundamentals, SQL commands, MongoDB, joins, constraints, and advanced database concepts.

## 📚 Quick Access to Notes

<div class="module-content-grid">
  <a href="{{ '/docs/Database/1-dbt-notes' | relative_url }}" class="content-link">
    <span class="link-icon">📖</span>
    <span class="link-text">DBT Notes</span>
  </a>
  
  <a href="{{ '/docs/Database/2-mongo-dbt-notes' | relative_url }}" class="content-link">
    <span class="link-icon">🍃</span>
    <span class="link-text">MongoDB Notes</span>
  </a>
  
  <a href="{{ '/docs/Database/3-sqlcommands-basics' | relative_url }}" class="content-link">
    <span class="link-icon">💾</span>
    <span class="link-text">SQL Commands - Basics</span>
  </a>
  
  <a href="{{ '/docs/Database/4-sqlcommands-intermediate' | relative_url }}" class="content-link">
    <span class="link-icon">💾</span>
    <span class="link-text">SQL Commands - Intermediate</span>
  </a>
  
  <a href="{{ '/docs/Database/5-sqlcommands-advanced' | relative_url }}" class="content-link">
    <span class="link-icon">💾</span>
    <span class="link-text">SQL Commands - Advanced</span>
  </a>
  
  <a href="{{ '/docs/Database/6-joins' | relative_url }}" class="content-link">
    <span class="link-icon">🔗</span>
    <span class="link-text">Joins</span>
  </a>
  
  <a href="{{ '/docs/Database/7-types-relations' | relative_url }}" class="content-link">
    <span class="link-icon">🔀</span>
    <span class="link-text">Types of Relations</span>
  </a>
  
  <a href="{{ '/docs/Database/8-set-operators' | relative_url }}" class="content-link">
    <span class="link-icon">⚙️</span>
    <span class="link-text">Set Operators</span>
  </a>
  
  <a href="{{ '/docs/Database/9-constraints' | relative_url }}" class="content-link">
    <span class="link-icon">🔒</span>
    <span class="link-text">Constraints</span>
  </a>
  
  <a href="{{ '/docs/Database/10-views' | relative_url }}" class="content-link">
    <span class="link-icon">👁️</span>
    <span class="link-text">Views</span>
  </a>
  
  <a href="{{ '/docs/Database/11-mysql-pl' | relative_url }}" class="content-link">
    <span class="link-icon">🔧</span>
    <span class="link-text">MySQL PL/SQL</span>
  </a>
</div>

## 🎯 Practice Tests

<div class="module-content-grid">
  <a href="{{ '/docs/Database/practice/mcq-test-1' | relative_url }}" class="content-link mcq">
    <span class="link-icon">✅</span>
    <span class="link-text">MCQ Test 1</span>
  </a>
  
  <a href="{{ '/docs/Database/practice/mcq-test-2' | relative_url }}" class="content-link mcq">
    <span class="link-icon">✅</span>
    <span class="link-text">MCQ Test 2</span>
  </a>
</div>

---

## 📋 Course Syllabus

### Course Overview
This module covers both relational and non-relational database technologies. You'll master SQL for data manipulation, learn database design principles, work with MongoDB for NoSQL solutions, and understand advanced concepts like stored procedures, triggers, and transaction management.

### Learning Objectives
- Understand database fundamentals and RDBMS concepts
- Master SQL for data definition, manipulation, and querying
- Design normalized database schemas
- Implement constraints, views, and indexes
- Work with MongoDB for NoSQL database solutions
- Write stored procedures, functions, and triggers
- Manage transactions and ensure data integrity
- Optimize database performance

### Topics Covered

#### 1. Introduction to Databases
- Database concepts and terminology
- Database vs File System
- Database Management System (DBMS) architecture
- Types of databases (Relational, NoSQL, Object-oriented)
- Database users and administrators
- Three-schema architecture
- Data independence

#### 2. Relational Database Management Systems (RDBMS)
- Relational model concepts
- Tables, rows, columns, and domains
- Keys (Primary, Foreign, Candidate, Composite, Alternate)
- Relational integrity constraints
- Entity-Relationship (ER) modeling
- ER diagrams and notation
- Converting ER diagrams to relational schemas

#### 3. SQL Fundamentals
- **Data Definition Language (DDL)**
  - CREATE, ALTER, DROP, TRUNCATE statements
  - Creating and modifying database objects
  - Data types and their usage
- **Data Manipulation Language (DML)**
  - INSERT, UPDATE, DELETE statements
  - SELECT queries and result sets
  - WHERE clause and filtering
  - ORDER BY and sorting
  - DISTINCT and duplicate handling
- **Data Query Language (DQL)**
  - Basic SELECT statements
  - Column aliases and expressions
  - Aggregate functions (COUNT, SUM, AVG, MIN, MAX)
  - GROUP BY and HAVING clauses
  - Subqueries and nested queries

#### 4. Advanced SQL Operations
- **Joins**
  - Inner Join
  - Left Outer Join, Right Outer Join, Full Outer Join
  - Cross Join
  - Self Join
  - Natural Join
- **Set Operations**
  - UNION and UNION ALL
  - INTERSECT
  - MINUS/EXCEPT
- **Advanced Queries**
  - Correlated subqueries
  - EXISTS and NOT EXISTS
  - IN and NOT IN operators
  - ANY, ALL operators
  - CASE expressions

#### 5. Database Constraints
- NOT NULL constraint
- UNIQUE constraint
- PRIMARY KEY constraint
- FOREIGN KEY constraint and referential integrity
- CHECK constraint
- DEFAULT constraint
- Constraint naming and management
- ON DELETE and ON UPDATE actions

#### 6. Normalization and Database Design
- Functional dependencies
- Normal forms (1NF, 2NF, 3NF, BCNF)
- Normalization process
- Denormalization and when to use it
- Database design best practices
- Schema refinement

#### 7. Views and Indexes
- Creating and managing views
- Updatable views
- Materialized views
- View advantages and limitations
- Index concepts and types
- Creating and dropping indexes
- Index performance considerations
- Clustered vs non-clustered indexes

#### 8. Transactions and Concurrency Control
- ACID properties (Atomicity, Consistency, Isolation, Durability)
- Transaction states and lifecycle
- COMMIT and ROLLBACK
- SAVEPOINT usage
- Concurrency problems (Lost update, Dirty read, etc.)
- Isolation levels
- Locking mechanisms
- Deadlock detection and prevention

#### 9. PL/SQL (Procedural Language/SQL)
- **PL/SQL Basics**
  - Block structure
  - Variables and data types
  - Control structures (IF, CASE, LOOP)
  - Cursors (Implicit and Explicit)
- **Stored Procedures**
  - Creating and executing procedures
  - Parameters (IN, OUT, INOUT)
  - Procedure advantages
- **Functions**
  - User-defined functions
  - Return values
  - Function vs Procedure
- **Triggers**
  - Trigger types (BEFORE, AFTER, INSTEAD OF)
  - Row-level and statement-level triggers
  - Trigger applications
  - Managing triggers

#### 10. MongoDB (NoSQL Database)
- **Introduction to NoSQL**
  - NoSQL vs SQL databases
  - Types of NoSQL databases
  - CAP theorem
  - When to use NoSQL
- **MongoDB Fundamentals**
  - Document-oriented database concepts
  - JSON and BSON formats
  - Collections and documents
  - MongoDB architecture
- **MongoDB Operations**
  - CRUD operations (Create, Read, Update, Delete)
  - Query operators and expressions
  - Projection and field selection
  - Sorting and limiting results
- **Advanced MongoDB**
  - Indexing in MongoDB
  - Aggregation framework
  - Data modeling in MongoDB
  - Replication and sharding basics

#### 11. Database Administration
- User management and privileges
- GRANT and REVOKE statements
- Backup and recovery strategies
- Database security
- Performance tuning basics
- Query optimization
- Execution plans

### Prerequisites
- Basic computer knowledge
- Understanding of data organization
- Logical thinking skills

### Learning Outcomes
Upon completion of this module, you will be able to:
- Design and implement normalized database schemas
- Write complex SQL queries for data retrieval and manipulation
- Create and manage database objects (tables, views, indexes)
- Implement stored procedures, functions, and triggers
- Work with both SQL and NoSQL databases
- Ensure data integrity through constraints and transactions
- Optimize database performance
- Apply database security best practices
