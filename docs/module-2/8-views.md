

# Database Management Systems: Views & Stored Objects

## 1. System Architecture & Partitioning

*(From Diagram)*

  * **OS:** Win 2008 Server
  * **File System:** NTFS (New Technology File System) / OFS
  * **Partitioning:**
      * **C Drive:** Files & Folders
      * **D Drive:** MySQL Database Software
          * Tables, Indexes
          * 78 System Tables
  * **Machine Name:** `sunbeaminfo.com`
  * **IP Address:** `1...`

## 2. Database Stored Objects

**Definition:** Objects that are stored in the Database.

  * **Examples:** Tables, Indexes `[Create...]`.
  * Anything that you do with a `Create` command is a stored object.

### Views `[Stored Obj]` (V. Imp)

  * Present in all RDBMS (Relational Database Management Systems), and some of the DBMS also.

### Example Table: EMP

| EMPNO | ENAME | SAL | DEPTNO |
| :--- | :--- | :--- | :--- |
| 1 | A | 5000 | 1 |
| 2 | B | 6000 | 1 |
| 3 | C | 7000 | 1 |
| 4 | D | 9000 | 2 |
| 5 | E | 8000 | 2 |

**Context:**

  * **User:** amit
  * **DB Name:** classwork

-----

## 3. Introduction to Views

**Context:**

  * **User:** yogesh -> rahul
  * **DB Name:** pune -> karad

### Definition

  * A **View** is a handle to a table.
  * It is a Hard Disk Pointer `[Stores the address of table]`.
  * Also known as a **Locator**.
  * Used for **indirect access** to the table.
  * Used for **Security Purposes**.

### Syntax

```sql
Create view <viewname> as <select statement>;
```

### Creating a View

```sql
amit_mysql> create view v1 as
            select empno, ename from emp;
> View Created
```

  * **V1** = `select empno, ename from emp;`
  * This definition is stored in the **System Table**.

### Key Characteristics

  * Once a view is created, it is **permanent**.
  * View is a **DDL command** (Data Definition Language), no need to commit.
  * **Viewname:** Max 30 chars.

### Security Example (Granting Access)

```sql
amit_mysql> grant select on classwork.v1 to rahul@localhost;
            -- Amit grants rahul access to view V1
```

**Scenario:**

1.  Rahul tries to access the main table:
    ```sql
    rahul_mysql> select * from classwork.emp;
    --> ERROR (Access Denied)
    ```
2.  Rahul accesses the view:
    ```sql
    rahul_mysql> select * from classwork.v1;
    --> Select statement in V1 is executed.
    --> Only empno and ename are displayed to rahul.
    ```

-----

## 4. System Tables & Internal Storage

  * **78 System Tables** (real system tables is the source code of MySQL).
  * Used to restrict column access.

### How Views Work Internally

  * **View does not contain Data.**
  * Only the definition (`def^n`) is stored; data is *not* stored.
  * **View is a Stored Query.**
  * The select statement on which the view is based is stored in the DB in **System Tables** in **Compiled Format**.
  * View is an **executable format (.exe)** of the Select statement.
      * Hence, the execution will be very **fast**.
      * Hides the source code from the end user.
  * Internally, System Tables are **VIEWS**.

-----

## 5. DML Operations on Views

### Granting Insert Permissions

```sql
amit_mysql> grant insert on classwork.v1 to yogesh@localhost;
            -- Grant insert on V1 to yogesh
```

### Performing Insert

```sql
yogesh_mysql> insert into classwork.v1 values (6, 'F');
```

### Important Rules for DML on Views

  * DML (Data Manipulation Language) operations **can** be done on a view.
  * Performed on a view will affect the **Base Table**.
  * **Constraints** that are specified on the table will **always be enforced**, even if you Insert via the view.

### Dropping a View

```sql
amit_mysql> drop view v1;
```

  * **Note:** If you drop the table, the view remains (becomes invalid).
  * **Note:** If you drop the view, the table remains.
  * *Entire application is built on views.*

### Changing the Select Statement of a View

To change the definition, you can:

1.  `drop view v1` then `create view v1...`
2.  Use `create or replace view v1 as select...`

-----

## 6. Views with Check Option (Row Level Security)

### Creating a View with Restrictions

```sql
amit_mysql> create view v2 as
            select * from emp where deptno = 1 WITH CHECK OPTION;
> View Created
```

### Granting Access

```sql
> grant select on classwork.v2 to yogesh@localhost;
```

### Usage

```sql
yogesh_mysql> select * from classwork.v2;
```

  * Can only view rows of `deptno = 1`.
  * Used to **restrict row access**.

### Inserting Data with Check Option

```sql
amit_mysql> grant insert on classwork.v2 to yogesh@localhost;

yogesh_mysql> insert into classwork.v2 values (6, 'F', 6000, 1); -- Success (Matches Check)
yogesh_mysql> insert into classwork.v2 values (7, 'G', 6000, 2); -- Error (Violates Check)
```

  * **View with Check Option** is similar to a Check Constraint.
  * Used to enforce different checks for different users.

-----

## 7. Modifying and Identifying Views

### Create or Replace

```sql
create or replace view v1 as
select ename, sal from emp;
```

  * **Create new:** If it does not exist.
  * **Replace:** Overrides if it already exists.

### Show Tables

```sql
show tables;
```

  * Will show **all** tables and views.
  * Won't tell you which is a table and which is a view.

### Show Full Tables

```sql
show full tables;
```

  * To find out which is a **Table** and which is a **View**.

-----

## 8. Complex Views (Computed Columns & Joins)

### A. Computed Columns

```sql
create or replace view v1 as
select ename, sal * 12 from emp;
```

  * View based on **Computed Columns** is allowed.
  * You can even specify an **alias** for the virtual column.
  * **Rule:** You can only `SELECT` from this view. **DML operations are NOT allowed.**
  * Common for all RDBMS.

### B. Joins in Views

```sql
create or replace view v1 as
select dname, ename from emp, dept
where emp.deptno = dept.deptno;

select * from v1;
```

  * **Using views with Join:**
      * View based on **Join** is allowed.
      * You can only `SELECT` from this view.
      * **DML operations are NOT allowed.**
      * Common for all RDBMS.

### Show Create View

```sql
show create view v1;
```

  * To see the select statement on which the view is based.
  * View based on view is allowed.

-----

## 9. Uses of Views

### 1. To Exceed the Limit of SQL

Examples of Limits:

1.  **Union of:** > 255 select statements.
2.  **Sub query:** > 255 levels.
3.  **Function within function:** > 255 levels.

### 2. To Simplify Writing Complex Select Statements

Examples:

1.  **Join of 10 tables.**
2.  **Sub query upto 20 levels.**

<!-- end list -->

  * It can be called through any Front End s/w.

### 3. Storing Complex Queries

  * Complex queries can be stored in **View Definition**.

-----

## 10. Read-Only Views (DML Not Allowed)

There are specific cases where DML operations are **not** allowed on views.

### Case 1: Distinct

```sql
create or replace view v1 as
select distinct empno from emp;

select * from v1;
```

  * **DML operations are not allowed.**

### Case 2: Group By (Aggregate Functions)

```sql
create or replace view v1 as
select deptno, sum(sal) from emp
group by deptno;

select * from v1;
```

  * **DML operations are not allowed.**

### Summary of Read-Only Views

Both of the above can only `SELECT` from these views.

  * **DML operations are not allowed.**

### Final Example (Join)

```sql
create or replace view v1 as
select dname, ename from emp, dept
where dept.deptno = emp.deptno;

select * from v1 where dname = 'TRN';
```

-----
