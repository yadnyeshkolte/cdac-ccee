-----

# JOINS (V. IMP)

### Example Data Structure

**DEPT Table**
| DEPTNO | DNAME | LOC |
| :--- | :--- | :--- |
| 1 | TRN | Bombay |
| 2 | EXP | Delhi |
| 3 | MKTG | Calcutta |

  * All the data is **not** stored in one table: data is stored in multiple tables.
  * If you want to view/combine the columns of 2 or more tables, then you will have to write a join.
  * **No upper limit for Joins.**

### Basic Syntax

```sql
select dname, ename from emp, dept
where dept.deptno = emp.deptno;
```

### Concept of Driving vs. Driven Table

  * `dept.deptno` = `tablename.columnname`
  * `dept` -> **Driving table** (Outer Loop)
  * `emp` -> **Driven table** (Inner Loop)

**Execution Logic:**

```text
Dept (Outer Loop)
   |
   +-- Emp (Inner Loop)
```

The position of columns in the select clause will determine the position of columns in the output; this will write as per User Requirements.

-----

### Join Execution Order & Performance

```sql
select dname, ename from emp, dept
where dept.deptno = emp.deptno;
-- OR
where emp.deptno = dept.deptno;
```

  * The order of columns in the `where` clause is **not significant**; either way, the output will be the same.

**Scenario A:**

  * `dept` -> Driving table
  * `emp` -> Driven table
  * **Result:** Faster. (Lesser I/O between HD and RAM, faster it will be).

**Scenario B:**

  * `emp` -> Driving table
  * `dept` -> Driven table
  * **Result:** Slower. (More I/O between HD and RAM, the slower it will be).

**Optimization Rule:**

> **In order for the join to work Faster, preferably the Driving Table should be the Table with Lesser number of Rows.**

### Ordering Output

To make the output more presentable, use `Order by` clause:

```sql
select dname, ename from emp, dept
where dept.deptno = emp.deptno
order by 1;
```

-----

### Ambiguity and Column Selection

#### 1. Selecting All Columns

To sell (select) ALL columns of both the tables (the common columns will be displayed twice):

```sql
select * from emp, dept
where dept.deptno = emp.deptno
order by 1;
```

#### 2. The Ambiguity Error

```sql
-- ERROR -> column has been ambiguously defined
select deptno, dname, loc, ename, job, sal
from emp, dept
where dept.deptno = emp.deptno
order by 1;
```

  * If the column name was different in both the tables then this problem would not have arisen.

#### 3. Fixing Ambiguity

You must specify the table name for common columns:

```sql
-- Correct usage
select dept.deptno, dname, loc, ename, job, sal...
```

#### 4. Best Practice

It's a good **programming practice** to use `tablename.columnname` for **ALL** the columns. It makes the select statement more Readable.

```sql
select dept.deptno, dept.dname, dept.loc,
       emp.ename, emp.job, emp.sal
from emp, dept
where dept.deptno = emp.deptno
order by 1;
```

-----

### Join Logic & Common Columns

  * **Common column in both the tables:** The column name need not be the same in both the tables, because the column may have a different meaning in the other table.
      * *e.g., EXP and IMP, PURCH and SALE, EXPENSE and INCOME, etc.*

**Unrelated Logic Example:**

```sql
select dname, ename from emp, dept
where dept.x = dept.y -- OR x = y, as 2 are unrelated
order by 1;
```

**Pragmatic Logic:**
In order for us to write the join, common column in both the tables should have the **same datatype**, and there should be some **pragmatic reason** on whose basis we are writing the join.

  * *e.g., The below select statement will work but the output is meaningless:*
    ```sql
    select dname, ename from emp, dept
    where dept.deptno = emp.empno -- Meaningless logic
    order by 1;
    ```

**Output Quality:**
It's good to see lots of columns in the output, the output becomes meaningful.

-----

### Aggregation with Joins

```sql
select dname, sum(sal) from emp, dept
where dept.deptno = emp.deptno
group by dname;
```

**Output Example:**
| DNAME | sum(sal) |
| :--- | :--- |
| TRN | 18000 |
| EXP | 17000 |

**Using Having Clause:**

```sql
select upper(dname), sum(sal) from emp, dept
where dept.deptno = emp.deptno
group by upper(dname)
having sum(sal) > 10000
order by 1;
```

-----

# Types of Joins

### 1. Equi-join / Natural Join (> 90%)

  * Join based on **equality condition**.
  * **Definition:** Shows me the matching rows of both the tables.
      * *e.g., DNAME, ENAME, CNAME, SNAME, etc.*
  * Most frequently used join. Also known as **Natural Join**, used more than 90% of cases.

### 2. Inequi-join / Non-equi join

  * Join based on **inequality condition**.

<!-- end list -->

```sql
select dname, ename from emp, dept
where dept.deptno != emp.deptno; -- this shows for all rows
```

**Data Example:**
| DNAME | ENAME |
| :--- | :--- |
| TRN | JACK |
| TRN | Thomas |
| EXP | Arun |
| EXP | Ali |
| ... | ... |

  * **Definition:** It shows me the **non-matching** rows of both the tables.
  * **Uses:**
      * a) Exception Reports

**Specific Logic Example:**

```sql
where dept.deptno != emp.deptno and dname = 'TRN';
```

  * **Output:** Employees not in TRN Dept.

-----

### 3. Outer Join

```sql
select dname, ename from emp, dept
where dept.deptno = emp.deptno (+);
```

  * **Definition:** It shows me the matching rows of both tables and also the **non-matching rows of outer table**.
  * **Rule:** Table which is on "Outer" / "Opposite" side of `(+)` sign.
  * The `(+)` sign can be on LHS or RHS but **not on both sides**.

**Terminology:**

  * Dept Table = Parent Table / Master
  * Emp Table = Child Table / Details

**Use Case:**

  * a) Parent - Child Report (Master - Detail Report)
  * All the rows of **Master** must be present even if the rows of **Details** are not there.

**Loop Logic Visualization:**

  * If `(+)` is on `emp` side:
      * Dept (Do-while loop)
      * Emp (For loop)

**Syntax Variants:**
**a) Half Outer Join:**

  * `(+)` sign on any 1 side (LHS or RHS).
    1.  Right Outer Join: `(+)` on RHS
    2.  Left Outer Join: `(+)` on LHS

**b) Full Outer Join:**

  * Shows matching rows of both tables + non-matching rows of both the tables.
  * Logic: Nested do-while loop.
  * **Note:** You cannot put `(+)` on both sides. You must use **UNION**.

**Full Outer Join Logic (Oracle Style):**

```sql
select dname, ename from emp, dept
where dept.deptno = emp.deptno (+)
UNION
select dname, ename from emp, dept
where dept.deptno (+) = emp.deptno;
```

-----

### ANSI Syntax (Standard SQL)

**Full Outer Join:**

```sql
select dname, ename from emp full outer join dept
on (dept.deptno = emp.deptno);
```

**Right Outer Join:**

```sql
select dname, ename from emp right outer join dept
on (dept.deptno = emp.deptno);
```

**Left Outer Join:**

```sql
select dname, ename from emp left outer join dept
on (dept.deptno = emp.deptno);
```

**Database Compatibility Notes:**

1.  `(+)` sign for Outer Join works **Only in Oracle RDBMS**; not supported by any other RDBMS.
2.  ANSI syntax for Right and Left Outer Join is supported by all RDBMS including MySQL.
3.  ANSI syntax for Full Outer Join is supported by all RDBMS **except for MySQL**.
4.  **MySQL Workaround:** To achieve Full Outer Join in MySQL, you will have to take **UNION** of ANSI syntax for Right Outer Join and ANSI syntax for Left Outer Join.

**MySQL Full Join Syntax:**

```sql
select dname, ename from emp right outer join dept
on (dept.deptno = emp.deptno)
UNION
select dname, ename from emp left outer join dept
on (dept.deptno = emp.deptno);
```

-----

### Other Joins

#### Inner Join

  * By default every join is Inner Join. Putting a `(+)` sign on Oracle, or using the keyword "Outer" is what makes it an Outer Join.
  * **Warning:** Do not mention this join in interviews, unless explicitly asked by Interviewer.

#### 4. Cartesian Join / Cross Join

  * Join **without a WHERE clause**.
  * Also known as Nested For loop.

<!-- end list -->

```sql
select ename, dname from emp, dept;
-- (no where clause)
```

**Logic:**

  * Every row of driving table is combined with each and every row of driven table.
  * Shows me all the **combinations** (takes Cross product of both the tables and therefore also known as Cross Join).
Here is the complete transcription of your notes into a Markdown file. I have preserved all tables, SQL queries, annotations, and diagrams as described in the images.
                                  
-----

## 5\) Self Join

  * Joining a table to itself.
  * Used when parent column and child column [are] both present in the same table.

**SQL Query:**

```sql
select a.ename, b.ename 
from emp b, emp a 
where a.mgr = b.empno;
```

*Annotations in query:*

  * `emp b`: driven
  * `emp a`: driving
  * `from`: *[Note: arrows indicate the flow from 'from' to the tables]*

**Internal Processing (Present in Server RAM):**

| A Table (Driving) | | B Table (Driven) |
| :--- | :--- | :--- |
| **ENAME** | **MGR** | **ENAME** | **EMPNO** |
| Arun | 4 | Arun | 1 |
| Ali | 1 | Ali | 2 |
| Kirun | 1 | Kirun | 3 |
| Jack | | Jack | 4 |
| Thomas | 4 | Thomas | 5 |

**Result Set:**

| a.ename | b.ename |
| :--- | :--- |
| Arun | Jack |
| Ali | Arun |
| Kirun | Arun |
| Thomas | Jack |

  * **Note:** This Join is very rarely used.
  * Slowest join, because driving and driven tables are just the duplicates of same table.
  * **Use:** e.g. - here, to see Empname and their manager name.

-----

## Joining 3 or more Tables

**Table: DeptHead**

| DeptNo | DeptHead |
| :--- | :--- |
| 1 | Arun |
| 2 | Jack |

**Join Logic Diagram:**

```text
       depthhead
          |
          [ dept
              |
              [ emp      <-- nested loop upto 3 lvls
```

**SQL Query:**

```sql
select dname, ename, dhead 
from emp, dept, depthead
where depthead.deptno = dept.deptno
and dept.deptno = emp.deptno;
```

**Result Table:**

| DNAME | ENAME | DHEAD |
| :--- | :--- | :--- |
| TRN | Arun | Arun |
| TRN | Ali | Arun |
| TRN | Kirun | Arun |
| EXP | Jack | Jack |
| EXP | Thomas | Jack |
**Uses:**

  * a) Used for print purposes.
      * *e.g., Students table got Student Name, Subject table got Subject Name.*
      * *While printing every Student Name is combined with each and every Subject Name.*
