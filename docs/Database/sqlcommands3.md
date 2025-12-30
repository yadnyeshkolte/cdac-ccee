-----

# SQL Group Functions & Group By Clause Notes

## 1\. Introduction to Aggregate Functions

*(Top Margin Notes: 1. Rational, 2. Fun, 3. Logical)*

**Count Function Variations:**

  * **Query:**

    ```sql
    SELECT COUNT(*) - COUNT(sal) FROM emp;
    ```

      * **Concept:** Gives the count of employees **not** receiving salary (`NULL` handling).
      * **Performance:** `COUNT(*)` is faster as the values are already present in the RAM (metadata/indexes).

  * **Query:**

    ```sql
    SELECT COUNT(*) FROM emp WHERE sal IS NOT NULL;
    ```

      * **Performance Note:** Due to the `WHERE` clause, searching will slow down the select statement compared to the direct subtraction method above.

**Arithmetic with Group Functions:**

  * **Query:**

    ```sql
    SELECT MAX(sal) / MIN(sal) FROM emp;
    ```

      * *Calculation:* $8000 / 3000 \rightarrow 2.67$

  * **Rule:** Multiple Group functions can be selected together separated by arithmetic operators.

**Averages and Null Handling:**

1.  **Method 1 (Two functions working simultaneously):**

    ```sql
    SELECT SUM(sal) / COUNT(*) FROM emp;
    ```

      * *Calculation:* $26000 / 5 \rightarrow 5200$

2.  **Method 2 (Using `NVL`/`IFNULL`):**

    ```sql
    SELECT AVG(IFNULL(sal, 0)) FROM emp;
    ```

      * *Result:* $5200$
      * **Performance Note:** 1 function executed at a time. This method requires double the time compared to the arithmetic split.

-----

## 2\. Group Function Capabilities

### Function Types & Data Types

  * **`SUM(col)`, `AVG(col)`, `STDDEV(col)`, `VARIANCE(col)`:** work with **Number** only.
  * **`MIN`, `MAX`, `COUNT(col)`:** work with **All Data Types** (Number, String/`ename`, Date/`hiredate`).

### Summary Reports

  * **Query:**
    ```sql
    SELECT COUNT(*), MIN(sal), MAX(sal), SUM(sal), AVG(sal) FROM emp;
    ```
      * **Result:** Will show me all the totals at a glance.
      * **Usage:** Summary Reports can give suitable aliases.

### Syntax Rules

1.  In a single select statement, multiple group functions can be selected together (comma separated).
    ```sql
    SELECT COUNT(ename), MIN(sal) FROM emp;
    -- Result: 5, 3000
    ```
2.  **Error Scenario:**
    ```sql
    SELECT ename, MIN(sal) FROM emp;
    ```
      * **Error:** `ename` is not a group function. You cannot select a raw column along with a group function unless it is in a `GROUP BY` clause.

-----

## 3\. The `WHERE` Clause Limitations (Assumption Logic)

**Assumption:** 4th row Salary is 9000.

  * **Query:**

    ```sql
    SELECT SUM(sal) FROM emp WHERE deptno = 1;
    ```

      * *Calculation:* $8 + 7 + 3 = 18000$
      * **Execution Location:** `WHERE deptno = 1` is used for searching in the **Hard Disk (HD)** only.
      * The `sal` column is brought into the **RAM** only.

  * **Query:**

    ```sql
    SELECT AVG(sal) FROM emp WHERE job = 'C';
    ```

      * *Result:* 6000

-----

## 4\. Restrictions on Group Functions

1.  You cannot select a standard column along with a Group Function (unless grouped).
2.  You cannot select single-row functions along with a Group Function (unless grouped).
      * *Example:* `SELECT UPPER(ename), MIN(sal)...` -\> **Error**.
3.  **WHERE Clause Restriction:**
      * **Query:**
        ```sql
        SELECT * FROM emp WHERE sal > AVG(7000); -- OR AVG(sal)
        ```
      * **Result:** **ERROR**.
      * **Reason:** The `WHERE` statement is searching in the **Server HD**. `AVG` will be generated when the column is operated on by the **RAM**. You cannot use Group Functions in the `WHERE` clause.

-----

## 5\. The `GROUP BY` Clause

**Purpose:** Used for grouping.
**Execution Order:**

1.  `WHERE` (Searching/Filtering)
2.  `GROUP BY` (Sorting)
3.  Update/Lock rows manually (if applicable)

**Process Flow:**

1.  Rows are retrieved from DB Server **HD** to Server **RAM**.
2.  Sorting is done `deptwise`.
3.  Grouping is done `deptwise`.

### Visualization (RAM Status)

*A temporary table is created in RAM:*

| DeptNo | Job | Sum(Sal) |
| :--- | :--- | :--- |
| 1 | C | 10000 |
| 1 | M | 8000 |
| 2 | C | 8000 |
| 2 | M | 8000 |

  * **Internal Logic:** Behaves like a **Nested For Loop**.
  * After the select statement is executed, the temp table is removed from RAM.

### Rules for `GROUP BY`

1.  **Selection Rule:** Whichever column is present in `SELECT` **must** be present in `GROUP BY` (besides the group functions).
    ```sql
    SELECT deptno, SUM(sal) FROM emp GROUP BY deptno;
    ```
2.  **Reverse Selection Rule:** Whichever column is present in `GROUP BY` may **not** be present in the `SELECT` statement.
    ```sql
    SELECT SUM(sal) FROM emp GROUP BY deptno; -- This is Valid
    ```
      * *Note:* The column is present in the group calculation but not displayed in the final output.

-----

## 6\. Multi-Dimensional Queries

**Multi-Column Grouping:**

```sql
SELECT deptno, job, SUM(sal) FROM emp GROUP BY deptno, job;
```

**Concepts:**

  * **2D Query:** 1 column in `GROUP BY` (Can plot X-Y graph, Bar graph).
  * **3D Query:** 2 columns in `GROUP BY`.
  * **4D Query:** 3 columns in `GROUP BY`.
  * Known as **Multi-Dimensional Queries** or **Spatial Queries**.

**Performance Warning:**

  * No upper limit on the number of columns in `GROUP BY` clause.
  * **However:** If you have a large number of rows in the table and a large number of columns in the `GROUP BY` clause, the Select statement will be **very slow**.
  * **Reason:** Excessive sorting must take place internally.

-----

## 7\. Column Ordering Implications

1.  **Order in `SELECT` clause:** Determines the position of the columns in the **Output** (User requirements).
2.  **Order in `GROUP BY` clause:** Determines the **Sorting order**, the **Grouping order**, the **Summation order**, and hence the **speed of processing**.
      * *Tip:* Write as per `COUNT(DISTINCT column_name)` from **Low to High**.

**Example (Optimization):**

  * Consider: `COUNT(DISTINCT deptno) -> 25`

  * Consider: `COUNT(DISTINCT job) -> 400`

  * **Option A:**

    ```sql
    GROUP BY deptno, job;
    -- Outer loop: Dept (25 iterations), Inner loop: Job. (FASTER)
    ```

  * **Option B:**

    ```sql
    GROUP BY job, deptno;
    -- Outer loop: Job (400 iterations). (SLOWER)
    ```

-----

## 8\. The `HAVING` Clause

**Definition:** `HAVING` clause works **after** the summation is done.

**Process Comparison:**

1.  **Using `WHERE` (Efficient):**

    ```sql
    SELECT deptno, SUM(sal) FROM emp WHERE sal > 7000 GROUP BY deptno;
    ```

      * `WHERE` clause is used to retrieve rows from **DB Server HD** to **Server RAM**.

2.  **Using `HAVING` (Specific Usage):**

    ```sql
    SELECT deptno, SUM(sal) FROM emp GROUP BY deptno HAVING SUM(sal) > 17000;
    ```

      * **ERROR Scenario:** `HAVING sal > 7000`.
      * **Reason:** After summation is done, individual `SAL` does not exist in Server RAM. Only `DeptNo` and `SUM(sal)` exist in RAM.

**Rules for `HAVING`:**

1.  Whichever column is present in the `SELECT` clause can be used in the `HAVING` clause.
      * *Example:* `HAVING deptno = 1`.
      * *Note:* This will work but is **Inefficient**. (Should have used `WHERE deptno = 1` to filter earlier at the HD level).
2.  **Recommendation:** Only **Group Functions** should be used in the `HAVING` clause.

-----

## 9\. Order of Clauses (Syntax)

The mandatory order of execution and syntax:

1.  `SELECT ...` (Projection)
2.  `FROM ...` (Table selection)
3.  `WHERE ...` (Row filtering - HD level)
4.  `GROUP BY ...` (Sorting & Grouping - RAM level)
5.  `HAVING ...` (Group filtering - RAM level)
6.  `ORDER BY ...` (Final Sorting)

<!-- end list -->

  * **Matrix Report:**
    ```sql
    SELECT deptno, COUNT(*), MIN(sal), MAX(sal), SUM(sal)
    FROM emp
    GROUP BY deptno
    ORDER BY 1; -- Sort by first column (deptno)
    ```

-----

## 10\. Nesting of Group Functions

**Oracle RDBMS Feature:**

  * Nesting of Group functions is supported **only** in Oracle RDBMS. It is not supported in other RDBMS.
  * **Query:**
    ```sql
    SELECT MAX(SUM(sal)) FROM emp GROUP BY deptno;
    -- Result: 18000
    ```

**Workaround for MySQL / Other RDBMS:**
Since direct nesting isn't supported, use a **Subquery (Derived Table)**.

  * **Logic:**

    1.  `abcd` is a temporary table created after the execution of the inner `SELECT`.
    2.  After execution, it is destroyed.

  * **Query:**

    ```sql
    SELECT MAX(sum_sal)
    FROM (
        SELECT SUM(sal) AS sum_sal
        FROM emp
        GROUP BY deptno
    ) AS abcd;
    ```

      * *Result:* 18000

-----

## Summary of Execution Flow

1.  **WHERE:** Retrieves rows from DB Server HD to Server RAM.
2.  **GROUP BY:** Sorts and Groups data in RAM.
3.  **HAVING:** Filters the summarized data in RAM.
4.  **SELECT:** Projects the specific columns/calculations requested.
