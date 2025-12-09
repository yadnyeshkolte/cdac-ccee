-----

# Database Management Systems: SQL Concepts

## 1\. Set Operators

*Based on Set Theory.*

**Tables used for examples:**

**EMP1**
| EMPNO | ENAME |
| :--- | :--- |
| 1 | A |
| 2 | B |
| 3 | C |

**EMP2**
| EMPNO | ENAME |
| :--- | :--- |
| 1 | A |
| 2 | B |
| 4 | D |
| 5 | E |

### General Rules for Set Operators

1.  **Column Matching:** The number of columns in both `SELECT` statements must match.
2.  **Data Types:** The corresponding data types in both `SELECT` statements must match.
3.  **Column Names:** The name of the column in the output is taken as the **first column name** from the *first* `SELECT` statement.
      * *Note:* To change the name, use an alias on the first `SELECT` statement.
4.  **Order By:** The `ORDER BY` clause must be used on the **2nd (last)** `SELECT` statement only.
      * `ORDER BY` applies at the very end.
5.  **Limits:** You can do these operations for any number of select statements.
      * Max limit is up to **255** select statements.
      * This limit of SQL can be exceeded with the help of **Views**.

-----

### A. UNION

  * **Function:** Combines the output of both `SELECT` statements.
  * **Duplicates:** Suppresses duplicates (removes repeated rows).
  * **Use Case:** Can be used to simulate a **Full Outer Join**.

**Syntax:**

```sql
SELECT empno, ename FROM emp1
UNION
SELECT empno, ename FROM emp2;
```

**Output:**
| empno | ename |
| :--- | :--- |
| 1 | A |
| 2 | B |
| 3 | C |
| 4 | D |
| 5 | E |

### B. UNION ALL

  * **Function:** Combines the output of both `SELECT` statements.
  * **Duplicates:** No duplicates are suppressed (all rows are shown).

**Syntax:**

```sql
SELECT empno, ename FROM emp1
UNION ALL
SELECT empno, ename FROM emp2;
```

**Output:**
| empno | ename |
| :--- | :--- |
| 1 | A |
| 2 | B |
| 3 | C |
| 1 | A |
| 2 | B |
| 4 | D |
| 5 | E |

### C. INTERSECT

  * **Function:** Displays only the **common elements** in both `SELECT` statements.
  * **Duplicates:** Suppresses duplicates.

**Syntax:**

```sql
SELECT empno, ename FROM emp1
INTERSECT
SELECT empno, ename FROM emp2;
```

**Output:**
| empno | ename |
| :--- | :--- |
| 1 | A |
| 2 | B |

### D. EXCEPT (or MINUS)

  * **Function:** What is present in the **1st** `SELECT` but **not present** in the **2nd** `SELECT` will be displayed.
  * **Duplicates:** Suppresses duplicates.

**Syntax:**

```sql
SELECT empno, ename FROM emp1
EXCEPT
SELECT empno, ename FROM emp2;
```

**Output:**
| empno | ename |
| :--- | :--- |
| 3 | C |

-----

### Operator Precedence & Recursion

**Precedence:**

  * Brackets `( )` can be used to increase precedence.
  * Example:
    ```sql
    SELECT ...
    UNION
    (SELECT ...
     INTERSECT
     SELECT ...) -- This intersect will execute first
    EXCEPT
    SELECT ...
    ORDER BY ...; -- Order by at last select
    ```

**Recursion:**

  * Using set operators on the **same table** with different `SELECT` statements with different `WHERE` conditions.
  * *Example:*
    ```sql
    SELECT job FROM emp WHERE deptno = 10
    EXCEPT
    SELECT job FROM emp WHERE deptno = 20;
    ```

-----

## 2\. Pseudo Columns

*Fake columns (virtual columns). Not a column of the table, but you can use it in a `SELECT` statement.*

**Examples:**

1.  **Computed Column:** `[Annual = sal * 12]`
2.  **Expression:** `[NET = sal + comm]`
3.  **Function-based columns:** `[Avg_sal = avg(sal)]`

### ROWID (Row Identifier)

`Rowid` stands for Row Identifier. It is the row address.

**Key Characteristics:**

  * It is the actual **physical memory location** in the DB Server HD where that row is stored.
  * When you select from the table, the order of rows in the output will always be in ascending order of `Rowid`.
  * **Format:** `Rowid` is encrypted; it is a fixed-length string of **18 characters** (Hexadecimal).
  * **Uniqueness:** No 2 rows of any table in the DB Server HD can have the same `Rowid`. It works as a unique identifier for every row.
  * **Updates:** When you update the row, `Rowid` may change.
  * **System Use:** It is the system that the RDBMS uses to distinguish between 2 rows.
  * **Platform Availability:**
      * Available in other RDBMS (e.g., Oracle) and you can view it.
      * Available in MySQL internally, but you **cannot view it**.

**Usage of RowID:**

1.  Used internally by the RDBMS.
2.  To distinguish between 2 rows in the DB Server HD.
3.  To manage **Row Locking**.
4.  To manage **Indexes**.
5.  To manage **Cursors**.
6.  Row management.
7.  **User Tip:** You can use `Rowid` to Update and Delete duplicate rows.

**Example Query:**

```sql
SELECT ename, rowid, ename, sal FROM emp;
```

-----

## 3\. Indexes

*Indexes are present in all RDBMS, all DBMS, and some programming languages also.*

**Reason:** To speed up the search operations (for faster access).
**Concept:** Indexes need to be created according to the `SELECT` statement.

**Table Structure Example (Internal View):**

| ROWID | EMPNO | ENAME | SAL | DEPTNO |
| :--- | :--- | :--- | :--- | :--- |
| x001 | 5 | A | 5000 | 1 |
| x002 | 4 | A | 6000 | 1 |
| x003 | 1 | C | 7000 | 1 |
| x004 | 2 | D | 9000 | 2 |
| x005 | 3 | E | 8000 | 2 |

### When should an Index be created?

1.  To speed up `SELECT` statements with a `WHERE` clause.
2.  `ORDER BY` clause.
3.  `DISTINCT`.
4.  `GROUP BY`.
5.  `UNION` / `INTERSECT` / `EXCEPT`.
6.  **Joins:** Common columns in Join operations should always be indexed.
7.  **Selectivity:** If `SELECT` retrieves **\< 25%** of table data.
      * *Example:*
          * `SELECT * FROM emp WHERE empno = 1` (= 1 row, Index Recommended)
          * `SELECT * FROM emp WHERE empno > 1` (many rows, Index Not Recommended)
8.  **Primary Key:** Your Primary Key and Unique columns should always be indexed.

### Index Properties & Behavior

  * **Creation:**
    ```sql
    CREATE INDEX i_emp_empno ON emp(empno);
    ```
  * **Usage:** Once created, it is permanent. MySQL will automatically invoke indexes as and when required.
  * **Execution Plan:** A plan created by MySQL as to how it is going to execute your `SELECT` statement.
  * **DML Operations:**
      * Indexes in MySQL will get automatically updated for all DML operations (`INSERT`, `UPDATE`, `DELETE`).
      * *Note:* The larger the number of indexes, the **slower** would be the DML.
  * **Duplicate Values:** Duplicate values are stored in an Index (unless specified Unique).
  * **Count:** No upper limit on the number of Indexes per table.

### Index Limitations

  * **Null Values:** Null values are **not stored** in any index.
      * If you run `SELECT * FROM emp WHERE empno IS NULL`, MySQL will do a **Full Table Scan**.
  * **Text/Blob:** You cannot Index `Text` and `Blob` columns [size 4GB - 1 byte].

### Types of Indexes & Columns

**1. Independent Columns:**
If you have 2 or more independent columns in a `WHERE` clause, create separate indexes for each column. MySQL will use all the necessary indexes as and when required.

**2. Composite Index (Inter-dependent columns):**
Combine 2 or more inter-dependent columns in a single index.

  * **MySQL Limit:** Can combine up to **32 columns**.
  * **Oracle Limit:** 16 columns.

**Composite Index Structure Example:**
*Index Name: IND-Deptno-EmpNo*

| RowID | Deptno (Primary Index Key) | Empno (Secondary Index Key) |
| :--- | :--- | :--- |
| x001 | 1 | 1 |
| x002 | 1 | 2 |
| x003 | 1 | 3 |
| x004 | 2 | 1 |
| x005 | 2 | 2 |

### Administrative Commands

  * **Show Indexes:**
    ```sql
    SHOW INDEXES FROM emp;
    ```
  * **System Schema:** To see all indexes on all tables in the database, use `information_schema`.
    ```sql
    SELECT * FROM statistics; -- This table has got more detailed information
    ```
  * **Drop Index:**
    ```sql
    DROP INDEX i_emp_empno ON emp;
    ```
  * **Drop Table:** If you drop the table/column, then the associated indexes are dropped automatically.
  * **Reindex:** In other RDBMS, you may need to explicitly `Reindex`. MySQL is a self-managing RDBMS.

-----

### Index Key Sorting

  * `Indexname = max 30 chars`
  * By default, indexes are in **Ascending** order.
  * Postgres - indexes in descending order.

**Example Data Order:**
| ROWID | DEPTNO | DNAME | LOC |
| :--- | :--- | :--- | :--- |
| y011 | 1 | TRN | Bombay |
| y012 | 2 | EXP | Delhi |
| y013 | 3 | MKTG | Calcutta |

-----


> **Note:** You cannot alter an Index table.

### Creating Indexes

**1. Descending Order Index:**

```sql
CREATE INDEX i_emp_empno ON emp(empno DESC);
-- Index generated in descending order
```

**2. Composite Index:**

```sql
CREATE INDEX i_emp_empno_deptno ON emp(deptno, empno);
```

  * Returns Index for Composite Index.
  * **Important:** The order of columns is important. Typically, your **Parent column** should come first.
  * Can also make single column descending in composite:
    ```sql
    CREATE INDEX i_emp_deptno_empno ON emp(deptno DESC, empno);
    ```

**3. Unique Index:**

```sql
CREATE UNIQUE INDEX i_emp_empno ON emp(empno);
```

  * Performs one extra function: it won't allow the user to `INSERT` or `UPDATE` duplicate values in `empno`.
  * If duplicate values are already present in the column, the unique index **will not be created**.

> **MySQL Limitation:** MySQL will not allow you to create more than one index on the same column unless it is combined with other columns.

### Types of Indexes

1.  Normal Index
2.  Normal Composite Index
3.  Unique Index
4.  Unique Composite Index
5.  Bitmap Index
6.  Clustered Index
7.  Index Organized Table
8.  Partitioned Index
9.  Global and Local Indexes
10. Covering Index
11. Full-Text Index
12. Filtered Index
13. Spatial Index
14. XML Index


-----
## 1\. Space Management & Deallocation

**Scenario:** An `EMP` table occupies 1000 MB of Hard Disk (HD) space.

### Comparisons of Removal Commands

| Feature | DROP | TRUNCATE | DELETE |
| :--- | :--- | :--- | :--- |
| **Space** | Deallocates 1000MB space. | Deallocates 1000MB space. | Retains the 1000MB HD space. |
| **Availability** | Space becomes available for other tables/users. | Space becomes available for other tables/users. | Space is held by the table (not freed). |
| **Outcome** | Table structure is removed. | Table structure remains (starts from 0 MB). | Table structure remains. |
| **Command Type** | DDL (Data Definition Language). | DDL Command. | DML (Data Manipulation Language). |
| **Commit** | Auto-commit. | Auto-commit. | Requires explicit `COMMIT`. |
| **Rollback** | Not possible. | Not possible. | Rollback is possible. |
| **Triggers** | - | Delete triggers will **NOT** execute. | Delete triggers **WILL** execute. |
| **Filtering** | Deletes everything. | Deletes all rows. | `WHERE` clause supported (specific rows can be deleted). |
| **Standard** | - | ANSI and ISO Standard (MySQL & Oracle). | - |

### Space Impact Example

  * **EMP Table (1 Million rows):** $\approx$ 1000 MB.
  * `DELETE FROM EMP;` + `COMMIT;`: Logic indicates rows are gone, but space is still reserved.
  * `TRUNCATE TABLE EMP;`: Deletes all rows, commits, and deallocates the 1000MB HD space.

-----

## 2\. Copying Tables and Structures

### Copy Rows from One Table to Another

To copy data provided the structures are the same:

```sql
INSERT INTO emp 
SELECT * FROM emp2;
```

To copy specific rows:

```sql
-- Put the desired where condition
INSERT INTO emp 
SELECT * FROM emp2 WHERE condition...;
```

### Create Table As Select (CTAS)

**Copy a full table:**

```sql
CREATE TABLE emp2 
AS 
SELECT * FROM emp;
```

> **Note:** When you create a table using a sub-query, the **Indexes** on the original table are **not copied** into the new table. If you want indexes on the new table, you must create them manually.

**Copy specific columns/rows only:**

```sql
CREATE TABLE emp2 
AS 
SELECT empno, ename FROM emp 
WHERE ...;
```

### Methods to Copy Only Structure (No Data)

**Method 1 (Inefficient):**
Copy the table and then delete all rows.

```sql
CREATE TABLE emp2 AS SELECT * FROM emp;
DELETE FROM emp2;
COMMIT;
```

**Method 2 (Using Truncate):**

```sql
CREATE TABLE emp2 AS SELECT * FROM emp;
TRUNCATE TABLE emp2; 
-- Truncate will delete all rows and commit.
```

**Method 3 (Efficient - Recommended):**
Using a false condition.

```sql
CREATE TABLE emp2 
AS 
SELECT * FROM emp WHERE 1=2;
```
-----

## 4\. Alter Table (DDL Command)

**Context:** Used on table `EMP` (Columns: `EMPNO` (101, 102), `ENAME` (Scott, King), `SAL` (5000, 6000)).

### Direct Operations

  * Rename a table.
  * Add a column.
  * Drop a column.
  * Increase width of a column.

### Indirect Operations (Workarounds required)

  * Reduce width of a column.
  * Change datatype of a column.
  * Copy rows from one table into another table.
  * Copy table (for testing purposes).
  * Copy only the structure of a table.
  * Rename a column.
  * Change order of columns in table structure.

### Basic Examples

**Rename Table:**

```sql
RENAME TABLE emp TO employees;
-- Rename is a DDL command. Extra command in MySQL and Oracle.
```

**Add Column:**

```sql
ALTER TABLE emp ADD gst FLOAT;
-- New column 'gst' added. By default, it will be the last column.
```

**Drop Column:**

```sql
ALTER TABLE cmp DROP COLUMN gst;
-- Drop gst column. It is a DDL command (auto commit).
```

-----

## 5\. Advanced Alterations & Workarounds

### Extension Columns (Modifying Width)

*Used to extend the column.*

**Assumption:** `ename` is `varchar(25)`.

**Increase Width (Allowed):**

```sql
ALTER TABLE emp MODIFY ename VARCHAR(30);
-- All data will remain.
```

**Decrease Width (Risky):**

```sql
ALTER TABLE emp MODIFY ename VARCHAR(20);
```

  * **MySQL:** Data will be truncated.
  * **Oracle:** It won't allow this command. You can only reduce width provided the contents are `NULL`.

### Oracle Approach / Workaround (For decreasing width or changing datatype)

**Scenario:** Change `ename` from `varchar(25)` to `varchar(20)` safely or Change `empno` datatype.

**Steps:**

1.  Add a temporary column `x`.
    ```sql
    ALTER TABLE emp ADD x VARCHAR(25);
    ```
2.  Copy data to temporary column.
    ```sql
    UPDATE emp SET x = ename;
    ```
3.  Nullify original column.
    ```sql
    UPDATE emp SET ename = NULL;
    ```
4.  Modify original column (now empty).
    ```sql
    ALTER TABLE emp MODIFY ename VARCHAR(20);
    ```
5.  Test data check length (ensure data fits new width).
    ```sql
    -- Data testing with column x, check length(ename) <= 20
    ```
6.  Move data back.
    ```sql
    UPDATE emp SET ename = x;
    ```
7.  Drop temporary column.
    ```sql
    ALTER TABLE emp DROP COLUMN x;
    ```

> **Note:** The above method is recommended for MySQL.
> **Note:** Assuming `Empno` is `int(11)`, to make `char(11)`:
>
> ```sql
> ALTER TABLE emp MODIFY empno CHAR(11); -- Not recommended directly.
> ```
>
> Use the Oracle approach (temp column) to change datatype.

-----

### Workarounds for Structural Changes

#### A. Rename a Column

There is no direct command to rename a column in some older contexts, so use this process:

1.  **Make another copy** of the table structure/data.
    ```sql
    CREATE TABLE emp2 
    AS 
    SELECT empno, ename, sal salary FROM emp; 
    -- 'sal' is aliased to 'salary' here (changing col name)
    ```
2.  **Drop** initial table.
    ```sql
    DROP TABLE emp;
    ```
3.  **Rename** new table as the original one.
    ```sql
    RENAME TABLE emp2 TO emp;
    ```

#### B. Change Order of Columns in Table Structure

To shuffle column order (e.g., put `ename`, then `sal`, then `empno`):

1.  **Create new table** with desired order in the SELECT list.
    ```sql
    CREATE TABLE emp2 
    AS 
    SELECT ename, sal, empno FROM emp;
    ```
2.  **Drop** initial table.
    ```sql
    DROP TABLE emp;
    ```
3.  **Rename** new table.
    ```sql
    RENAME TABLE emp2 TO emp;
    ```
