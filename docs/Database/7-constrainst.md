# Database Constraints (Very IMP)

### Example Table: EMP

| EMPNO | ENAME | SAL | DEPTNO |
| :--- | :--- | :--- | :--- |
| 1 | A | 5000 | 1 |
| 2 | B | 6000 | 1 |
| 3 | C | 7000 | 1 |
| 4 | D | 9000 | 2 |
| 5 | E | 8000 | 2 |

**Definition:** Limitations/restrictions imposed on table.

## 1. Primary Key Constraints

  * **Primary Column:** Column or set of columns that uniquely identifies a row. (e.g., `EMPNO`)
  * Duplicate values are not allowed, it has to be unique.
  * Null values are not allowed (mandatory column).
  * **Purpose:** The purpose of the Primary Key is row uniqueness [With the help of P.K you can distinguish between 2 rows of a table].
  * P.K can be alpha-numeric.
  * Text and Blob cannot be a Primary Key [approx upto 4GB size].
  * Unique index is automatically created.

### Rules and Types

  * You can have **only 1** primary key per table.

**Composite Primary Key:**

  * You combine 2 or more columns together to form/to serve the purpose of Primary Key.
  * In MySQL, you can combine up to **32 columns** in a composite Primary Key.
  * If you declare a composite primary key, then a composite unique index is automatically created.

**Surrogate Key:**

  * If you cannot identify Primary Key, then add an extra column to the table to serve the purpose of Primary Key; and such a Primary Key which is not an original column of the table is known as a **Surrogate Key**.
  * *Note:* The P.K column is the best column for searching, and thus for the Surrogate Key, `CHAR` datatype is recommended (because with CHAR datatype the searching and retrieval will be very fast).

### Steps to implement Primary Key:

1.  Identify some key column and make it the Primary Key of your table.
2.  If you cannot identify a key column, then implement Composite Primary Key.
3.  If Composite Primary Key is also not possible, then implement Surrogate Key.

### Syntax and Implementation

**Creating Table with P.K:**

```sql
create table emp (
    empno char(4) primary key, 
    ename varchar(25),
    sal float,
    deptno int
);
```

  * When creating table just declare the Primary Key, rest all is handled by MySQL.
  * All constraints are at **server level**; you can perform DML operations using MySQL Cmd Line Client, or MySQL Workbench, or phpMyAdmin, or Java, MS .net, etc. or any front-end s/w, you **cannot** break the constraint.
  * Internally a constraint is a MySQL created Function, it performs the validation (check for duplicates, check for nulls, etc.).

**Queries to check constraints:**

```sql
select * from information_schema.table_constraints
-- gives all constraints all across the server
where table_schema = 'classwork'; 
-- show all constraints in Classwork DB.
```

```sql
select * from information_schema.key_column_usage
where table_name = 'emp';
-- show all the column information in emp table.
```

  * Unique index automatically created.
  * Command to show indexes:
    ```sql
    show indexes from emp;
    show all indexes from emp;
    ```

**Modifying Primary Key:**

  * **Drop P.K:**

    ```sql
    alter table emp drop primary key;
    -- drop the primary key constraint
    ```

  * **Add P.K:**

    ```sql
    alter table emp add primary key (empno);
    -- add a primary key constraint to empno.
    ```

      * *Note:* If duplicates present in empno it will throw out an ERROR. You can remove the duplicates and try again.

  * **To change the Primary Key column:**

    1.  Drop the existing Primary key constraint.
    2.  Add a new P.K constraint for the other column.

**Composite P.K Creation:**

```sql
create table emp (
    empno char(4),
    ename varchar(25),
    sal float,
    deptno int,
    primary key (deptno, empno) 
);
```

  * *Note:* To make a composite P.K it is specified at the **end of the structure**.

-----

## Types of Constraints

Constraints are of 2 types:

**a) Column level constraints**

  * Constraint specified on a single column.

**b) Table level constraints**

  * Constraint specified on combination of 2 or more columns.
  * **Composite** - has to be specified at the end of the structure.
  * Example:
    ```sql
    alter table emp add primary key (deptno, empno);
    -- added a composite P.K after table is formed.
    ```

-----

## 2. NOT NULL Constraints

  * Null values are not allowed (mandatory column).
  * Duplicates are allowed.
  * **Column level constraint only.**

**Syntax:**

```sql
create table emp (
    empno char(4),
    ename varchar(25) not null, -- Ename and sal constraint as not null
    sal float not null,
    deptno int
);
```

  * No null value can be added in these columns.
  * In MySQL, nullability is a part of datatype.

**Management:**

  * To see the null columns:
    ```sql
    desc emp;
    ```
  * **To drop the constraint:**
    ```sql
    alter table emp modify ename varchar(25) null;
    ```
  * **To add the constraint:**
    ```sql
    alter table emp modify ename varchar(25) not null;
    ```

-----

## 3. Unique Constraint

  * Duplicate values are not allowed.
  * Null values are allowed [can insert any no. of Null values, but no duplicate values].
  * Text and Blob cannot be unique.
  * Unique index is automatically created.
  * In MySQL you can combine up to **32 columns** in a Composite Unique.
  * You can have **any no.** of Unique constraints per table, unlike Primary Key.

**Syntax (Create Table):**

```sql
create table emp (
    empno char(4),
    ename varchar(25),
    sal float,
    deptno int,
    mob_no char(15) unique, -- Column level constraint
    unique (deptno, empno)  -- Table level (Composite)
);
```

**Management:**

  * Check constraints:
    ```sql
    select * from information_schema.table_constraints;
    -- show all the constraints for all tables

    select * from information_schema.key_column_usage
    where table_name = 'emp';
    ```
  * Check indexes:
    ```sql
    show indexes from emp;
    -- Shows MOB_NO, DEPTNO
    ```
  * **Dropping Unique Constraint:**
      * Unique constraint is also an index, so to drop it:
    <!-- end list -->
    ```sql
    drop index mob_no on emp;
    drop index deptno on emp;
    ```

**Naming Constraints (Optional):**

```sql
alter table emp add constraint u_emp_mob_no unique (mob_no);
```

  * To avoid default names, and have more control over the constraint.

-----

## Structural Notes (Column vs Table Level)

  * **Column level constraint:** Can be specified at table level [end of structure].
      * *Reason:* To make create table cmd more readable.
  * **Table level composite constraint:** Can **never** be specified at column level.
  * **Not Null Constraint Exception:** The Not Null constraint is **always** a column level constraint, and therefore the syntax will not support you for specifying at table level.

-----

## Key Concepts: Candidate Key vs Alternate Key

**Table Grid Example:**

| EMPNO (P.K) | ENAME | SAL | DEPTNO | PANNO | P.P NO |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | ... | ... | ... | (Unique) | (Unique) |
| 2 | ... | ... | ... | ... | ... |

  * **Candidate Key:** All keys that *can* identify a row unique (e.g., EMPNO, PANNO, P.P NO).
  * **Primary Key:** The candidate key selected to be the main identifier (e.g., EMPNO).
  * **Alternate Key:** The candidate keys *not* selected as Primary Key (e.g., PANNO, P.P NO).
      * In SQL, you add a **Unique Constraint** (+ Not Null) to these to make them Alternate Keys.

-----

Here is the complete Markdown (`.md`) transcription of your handwritten notes. I have organized them logically by topic as presented in the images, preserving all code snippets, diagrams (represented via text/ASCII), and emphasized points.

-----

## 1. Candidate Key

  * **Definition:** It is not a constraint; it is a definition.
  * **Explanation:** Besides the Primary Key (P.K.), any other column in the table that can also serve the purpose of a Primary Key is a good Candidate Key for P.K. This is known as a **Candidate Key**.
  * **Why it is good to have a few candidate key columns:**
      * a) Gives more choice in choosing Primary Key.
      * b) In the future, if you **Alter** the table and **drop** the P.K. constraint, then your table is left without a P.K. Then one of the Candidate Key columns can be made as the new Primary Key.

> **Note:** PANNO (Example column)

**Solution for Candidate Key column:**

  * `Not null constraint` + `unique index`
      * **OR**
  * `Not null constraint` + `unique constraint`

## 2. Alternate Key

  * **Definition:** It is not a constraint; it is a definition.
  * **Explanation:** For a Candidate Key, if you add (`a not null constraint` + `unique index`) **OR** you add (`Not null` + `unique constraint`), then it becomes an **Alternative** to P.K. Then such a Candidate Key column is known as an **Alternate Key**.

> **Note:** With the help of the above logic, you can have multiple P.K.s per table. One directly, the others indirectly.

## 3. Super Key

  * Is not a constraint.
  * Is a definition.
  * **Logic:** If you have 1 or more **Alternate Keys** in the table, then the P.K. is also known as **Super Key**.

-----

## 4. Foreign Key / Column

  * **Definition:** A column or set of columns that references a column or set of columns of some table.

**Example Representation:**
`EMP.DEPTNO` (Child Column) ———> `DEPT.DEPTNO` (Parent Column)

  * **Constraint:** F.K. constraint is specified on the **child column**, not the Parent column.
  * **Prerequisite:** Parent column has to be a **P.K.** or **Unique**. (This is a pre-requisite for Foreign Key).

**Self-Referencing Example:**
`EMP.MGR` (Child Column) ———> `EMP.EMPNO` (Parent Column)

  * **Note:** Foreign key may reference a column of the same table also (known as **self referencing**).
  * Foreign key will allow **duplicate values** (unless specified otherwise).
  * F.K. will allow **null values** also.

**Table Data Example:**

**Table: EMP**
| EMPNO | ENAME | SAL | DEPTNO | MGR |
| :--- | :--- | :--- | :--- | :--- |
| 1 | A | 5000 | 1 | 1 |
| 2 | B | 6000 | 1 | 1 |
| 3 | C | 7000 | 1 | 1 |
| 4 | D | 9000 | 2 | 2 |
| 5 | E | 8000 | 2 | 2 |
| 6 | F | 9000 | 2 | 2 |

**Table: DEPT**
| DEPTNO | DNAME | LOC |
| :--- | :--- | :--- |
| 1 | TRN | Bombay |
| 2 | EXP | Delhi |
| 3 | MKTG | Calcutta |
| | MKTG | |

### Creating Tables with Foreign Keys

**SQL Syntax (Parent Table):**

```sql
create table dept (
    deptno int primary key,
    dname varchar(15),
    loc varchar(10)
);
```

**SQL Syntax (Child Table):**

```sql
create table emp (
    empno char(4) primary key,
    ename varchar(25),
    sal float,
    deptno int,
    mgr char(4),
    constraint fk_emp_deptno foreign key (deptno) references dept(deptno),
    constraint fk_emp_mgr foreign key (mgr) references emp(empno)
);
```

  * `constraint fk_emp_deptno` -> This part is optional. MySQL will provide a column name if not specified.
  * **To view constraints:** All constraints on all databases on all schemas:
    ```sql
    select * from information_schema.table_constraints;
    ```
  * **Just for one DB:**
    ```sql
    where table_schema = 'classwork';
    ```
  * **All info about the table:**
    ```sql
    select * from information_schema.key_column_usage where table_name = 'emp';
    ```

**Altering Foreign Keys:**

  * **Drop:**
    ```sql
    alter table emp drop foreign key fk_emp_deptno; -- Drop the foreign key
    ```
  * **Add:**
    ```sql
    alter table emp add constraint fk_emp_deptno 
    foreign key (deptno) references dept(deptno) 
    on update cascade on delete cascade;
    ```

-----

## 5. Referential Integrity (Cascade)

**Deletion Rules:**

  * `delete from dept where deptno = 2;`
      * **Result:** You cannot delete the master row when matching details (child) rows exist.

**ON DELETE CASCADE**

  * If you delete the parent row, then MySQL will **automatically delete the child rows also**.

**To preserve the child rows:**

  * First: `update emp set deptno = null where deptno = 2;`
  * Then delete the parent.

**ON UPDATE CASCADE**

  * `update dept set deptno = 4 where deptno = 2;`
      * **Result:** You cannot update the parent column when child rows exist.
  * **With Cascade:** If you update the parent column, then MySQL will **automatically update the child rows also**.

> **Warning (Star):** Avoid `On delete Cascade` in the event of **self-referencing**. You may delete more than expected. `On Delete Cascade` is a safer option across 2 tables.

-----

## 6. Check Constraint

  * **Usage:** Used for validations (checking purposes).
  * **Examples:** `sal < 10000`, `age > 25`, etc.

**Operators allowed in Check Constraint:**

  * Relational Operators
  * Logical Operators
  * Arithmetic Operators
  * Special Operators (e.g., `In`, `Like`, `betn` (between), etc.)
  * Can call Single-row Functions (e.g., `upper`, `lower`, etc.)

**SQL Syntax Example:**

```sql
create table emp (
    empno int auto_increment primary key,
    ename varchar(25) check(ename = upper(ename)), -- column lvl
    sal float default 7000,
    check (sal betn 5001 and sal <= 999999), -- column lvl
    deptno int references dept(deptno),
    status char(1) default 'T',
    check (status in ('T', 'P', 'R')), -- column lvl
    comm float not null,
    mob_no char(15) unique,
    check (sal + comm < 2000000) -- table lvl
);
```

## 7. Default Clause

  * Default is **not a constraint**.
  * Default is a **clause** that can be used with `Create Table`.
  * **Logic:** If user enters some value, then it will take that value; if nothing is specified, then it will take the **default value**.
  * To make use of Default and Auto increment, use the specific syntax for the `Insert` statement.

-----

## 8. Auto Increment

  * By default, it starts with **1** and increments by **1**.
  * **Effect of Rollback:** Rollback and Commit have **no effect** on Auto Increment; it has been designed in this manner keeping in mind multiple users inserting into the same table simultaneously.

**Problem of Missing Numbers:**

  * **Scenario:**
    1.  User 1 attempts insert (gets #1, #2, #3, #4) -> Issues **Rollback**.
    2.  User 2 attempts insert (gets #5, #6, #7).
    3.  User 3 attempts insert (gets #8, #9, #10).
    <!-- end list -->
      * **Result:** Numbers 1-4 are lost/skipped in the sequence.

**Solution to avoid missing numbers:**

  * In the front-end software, when the user does data entry, **do not issue Insert statements** to the database immediately.
  * Store the data in a **front-end array**.
  * When the user issues a **Commit**, *then* you issue the Insert statements to the database Followed by Commit.

-----

## 9. Privileges (DCL - Data Control Language)

**Grant and Revoke**

**Concept Diagram:**

  * **User -> Yogesh** (DB Name -> `pune`) -> has table `EMP`.
  * **User -> Scott** (DB -> `usa`)
  * **User -> King** (DB -> `uk`)
  * **User -> Rahul** (DB -> `karad`)

**Basic Syntax:**

```sql
use usa; -- switch context
select * from pune.emp; -- accessing another db's table
update pune.emp ...
delete from pune.emp ...
```

**Granting Permissions:**

  * **User `yogesh-mysql` grants permission:**

    ```sql
    grant select on pune.emp to scott@localhost;
    ```

      * This grants **only select permission** (crosses out insert, update, delete).
      * Can specify: `insert permission`, `select permission`, `update permission`, `delete permission`.

  * **Granting Multiple:**

    ```sql
    grant select, insert on pune.emp to scott@localhost;
    ```

      * Can give multiple permissions at once.
      * Syntax: `db_name.table_name`.

  * **Grant All:**

    ```sql
    grant all privileges on pune.emp to scott@localhost;
    ```

  * **Grant to Multiple Users:**

    ```sql
    grant select on pune.emp to scott@localhost, king@localhost;
    ```

  * **Grant to Public:**

    ```sql
    grant select on pune.emp to public; -- accessible to all
    ```

**Revoking Permissions:**

  * ```sql
      revoke select on pune.emp from scott@localhost;
    ```
      * Revoke access to select.

**Viewing Permissions:**

  * To see the permissions received/granted:
    ```sql
    select * from information_schema.table_privileges;
    ```

-----

## 10. System Tables

  * **Definition:** Automatically created when you install MySQL DB server software.
  * **Quantity:** 78 system tables in MySQL v8.
  * **Also known as:** Data Dictionary / Database Catalog.
  * **Characteristics:**
      * All System Tables (S.T.) are **read-only**.
      * They store information about the DB.
      * System tables are stored in `information_schema`.
  * **Examples:** `statistics` (for indexes), `table_constraints`, `key_column_usage`, `table_privileges`, etc.

**Rules:**

  * You can only `Select` from system tables. You cannot `Insert`, `Update`, or `Delete`.
  * **"DDL for User is DML for System Tables"**.

**Data Types Classification:**

1.  **User Data:**
      * User created.
      * User tables and indexes.
2.  **System Data / Metadata:**
      * System created (MySQL created).
      * Data that is stored in System tables.
