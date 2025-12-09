

## 1\. Introduction to Subqueries vs. Joins

  * **Max Limit:** Up to 255 levels for subqueries.
  * **Performance:** Join is generally faster than subqueries.

### Single Select vs. Multiple Select

**Query using Join:**

```sql
SELECT clientname, ename 
FROM project_emp, emp, projects
WHERE projects_emp.projno = projects.projno
AND projects_emp.empno = emp.empno
ORDER BY 1, 2;
```

### Sub-queries (Very Imp) / Nest Queries

  * Also known as: Query within Query / Select within Select.

**Structure:**

```sql
-- Main Query (Parent/Outer Query)
SELECT ename FROM emp 
WHERE sal = 
    -- Sub Query (Child/Inner Query)
    (SELECT min(sal) FROM emp);
```

  * **Logic:** `SAL = min(SAL)`
  * **Execution:** Brackets are given, so the sub-query is executed first.
  * **Flow:** Output of the Subquery is passed to the main query. The subquery itself is not displayed.

**Note:** The limit of subqueries can be exceeded with the help of **Views**.

### Finding the 2nd Largest Salary

```sql
SELECT max(sal) FROM emp
WHERE sal < 
    (SELECT max(sal) FROM emp);
```

-----

## 2\. Optimization: How to Make it Work Faster

1.  **Join is faster than Subquery.** First preference should always be to solve the problem using Join.
2.  **Reduce Levels:** Try to reduce the number of levels for sub-queries.
3.  **Reduce Rows:** Try to reduce the number of rows returned by the sub-query.

### Performance Comparison (Operators)

**Scenario:** Assumption 3rd row sal \< 13000.

**Method 1: Using `>=` (Slow)**

```sql
SELECT * FROM emp
WHERE sal >= 
    (SELECT min(sal) FROM emp
     WHERE job = 'M');
```

  * *Note:* Fastest way according to some contexts, but depends on data.

**Method 2: Using `ALL` (Very Slow)**

```sql
SELECT * FROM emp
WHERE sal > ALL
    (SELECT sal FROM emp
     WHERE job = 'M');
```

  * If multiple rows, the process will be very slow.
  * **ALL** is a special operator -\> works like logical **AND**.

**Method 3: Using `MAX` (Fastest Way)**

```sql
SELECT * FROM emp
WHERE sal > 
    (SELECT max(sal) FROM emp
     WHERE job = 'M');
```

-----

## 3\. Database Relationships

Types of relationships between tables:

1.  **1:1 (One to One)**
      * (Dept : DeptHead) or (DeptHead : Dept)
2.  **1:Many (One to Many)**
      * (Dept : Emp) and (DeptHead : Emp)
3.  **Many:1 (Many to One)**
      * (Emp : Dept)
4.  **Many:Many (Many to Many)**
      * (Emp : Projects) or (Projects : Emp)

### Example Data Structure

**Projects Table:**
| PROJNO | CLIENTNAME | DESCRIP |
| :--- | :--- | :--- |
| P1 | Deloitte | Cap Gains s/w |
| P2 | ICICI Bank | Pension proc s/w |
| P3 | AMFI | Website Development |
| P4 | BNP Paribas | Macro dev |
| P5 | Morgan Stanley | Asset Mgt Sys. |

**Projects\_Emp (Intersection Table):**

  * *Note:* Required for Many:Many relationships.

| PRJNO | EMPNO |
| :--- | :--- |
| P1 | 1 |
| P1 | 2 |
| P1 | 4 |
| P2 | 1 |
| P2 | 5 |
| P3 | 2 |
| P3 | 4 |
| P3 | 9 |

-----

## 4\. Subqueries with DML Commands

**Problem Scenario:**

  * Display all rows belonging to 'Thomas'.
  * OR: Display all rows *not* belonging to the same dept as 'Thomas'.

<!-- end list -->

```sql
SELECT * FROM emp
WHERE deptno = 
    (SELECT deptno FROM emp
     WHERE ename = 'Thomas');
```

### DML Operations (Delete/Update)

**Delete:** Delete all rows having the same Job as Kirun.

```sql
DELETE FROM emp WHERE job = 
    (SELECT job FROM emp WHERE ename = 'Kirun');
```

**Update:** Update all rows having the same Job as Kirun.

```sql
UPDATE emp SET ... WHERE job = 
    (SELECT job FROM emp WHERE ename = 'Kirun');
```

### The MySQL Limitation (Important)

  * **Rule:** In MySQL, you cannot Update or Delete from a table from which you are currently selecting.
  * **Result:** It creates a problem in Read and Write consistency. The above delete and update commands will not work directly.

**Solution for MySQL:**
Make an alias for the current operated table so that reading and writing can be done in 2 different logical entities.

```sql
-- Solution for Delete
DELETE FROM emp 
WHERE deptno = 
    (SELECT abcd.deptno FROM 
        (SELECT deptno FROM emp WHERE ename = 'Thomas') abcd);

-- Solution for Update
UPDATE emp SET sal = 10000
WHERE job = 
    (SELECT abcd.job FROM 
        (SELECT job FROM emp WHERE ename = 'Kirun') abcd);
```

-----

## 5\. Multi-Row Subqueries

Subquery returns multiple rows.

```sql
SELECT * FROM emp
WHERE sal = ANY / IN
    (SELECT sal FROM emp WHERE job = 'M');
```

  * **ANY** -\> Logical **OR** (can use logical operators)
  * **IN** -\> Logical **OR** (in / not in)

-----

## 6\. Subqueries in HAVING Clause

**Goal:** Display the Deptno and Sum(Sal) where the sum is the maximum among all departments.

**Step 1: Simple Group By**

```sql
SELECT deptno, sum(sal) FROM emp
GROUP BY deptno;
```

*Result:*
1 -\> 18000
2 -\> 17000

**Step 2: Finding the Max Sum (The Logic)**

```sql
SELECT deptno, sum(sal) FROM emp
GROUP BY deptno
HAVING sum(sal) = 
    (SELECT max(sum_sal) FROM
        (SELECT sum(sal) sum_sal FROM emp GROUP BY deptno) abcd);
```

**Step 3: Display DNAME having max(sum(sal))**

```sql
SELECT dname, sum(sal) FROM emp, dept
WHERE dept.deptno = emp.deptno
GROUP BY dname
HAVING sum(sal) = 
    (SELECT max(sum_sal) FROM
        (SELECT sum(sal) sum_sal FROM emp GROUP BY deptno) abcd);
```

*Result:*
TRN -\> 18000

-----

## 7\. Inline Views

Using a subquery in the `FROM` clause.

**Example:**

```sql
SELECT max(sum_sal) FROM
    (SELECT sum(sal) sum_sal FROM emp
     GROUP BY deptno) abcd;
```

  * **Sub query in from clause = Inline View.**

-----

## 8\. Correlated Sub-queries (Using EXISTS)

  * **Note:** This is the exception where **Sub-query is faster than Join**.

**Scenario:** Display the DNAMES that contain employees.

**Solution 1: Using IN (Slower)**

```sql
SELECT dname FROM dept
WHERE deptno IN 
    (SELECT distinct deptno FROM emp);
```

  * *Process:* Subquery executed first (retrieves distinct deptnos), then Main query runs.

**Solution 2: Join with DISTINCT (Better, but optimized via Correlated)**

```sql
SELECT distinct dname FROM emp, dept
WHERE dept.deptno = emp.deptno;
```

  * If you have a Join along with Distinct, to make it work faster, use **Correlated sub-queries**.

**Solution 3: Correlated Sub-query (Fastest for this scenario)**

```sql
SELECT dname FROM dept 
WHERE EXISTS
    (SELECT deptno FROM emp
     WHERE dept.deptno = emp.deptno);
```

### Execution Flow of Correlated Sub-query

1.  First, the **Main Query** is executed.
2.  For **every row** returned by the main query, it will run the subquery **once**.
3.  The subquery returns a Boolean **True** or **False** value back to the main query.
      * If sub-query returns **True**, then main query is executed for that row (row is displayed).
      * If sub-query returns **False**, then main query is not executed for that row.

### Why is it faster here?

1.  **No DISTINCT:** Unlike earlier methods, we do not use `DISTINCT` here, hence no sorting takes place in Server RAM; this speeds it up.
2.  **Reduced Scans:** Unlike a traditional join, the number of full table scans is reduced; this further speeds it up.

**Example: Display DNAME not present in EMP (NOT EXISTS)**

```sql
SELECT dname FROM dept 
WHERE NOT EXISTS
    (SELECT deptno FROM emp
     WHERE dept.deptno = emp.deptno);
```
