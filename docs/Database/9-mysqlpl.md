-----

# MySQL - PL (MySQL Programming Language)

**Definition:**

  * MySQL-PL $\rightarrow$ MySQL Programming Language.
  * Used for DB (Database) programming.
      * *Example:* `HRA_CAL`, `TAX_CAL`, `Attendance_Calc`, etc.
  * Used for processing [Server-side data processing].
  * MySQL-PL program can be called through:
      * MySQL Command Line Client
      * MySQL Workbench
      * phpMyAdmin
      * Java, .Net, etc.
  * *Syntax:* `call hra_calc();`
      * It can be called through any front-end software.
  * **Few 4 GL Features** [GL $\rightarrow$ Generation Language].

**Comparison of RDBMS Native Languages:**
Every RDBMS has its own native programming language:

1.  **Oracle:** PL/SQL $\rightarrow$ Procedural Language SQL.
2.  **MS SQL Server:** T-SQL $\rightarrow$ Transact SQL.
3.  **MySQL:** MySQL-PL $\rightarrow$ MySQL Programming Language.

-----

### Program Structure (Blocks)

**Basic Block:**

```sql
Begin
   insert into dept values (1, 'A', 'B');
End;
```

  * MySQL-PL $\rightarrow$ MySQL-PL Block Program.

**Nesting:**

  * Execution is from **top to bottom**.
  * **Parent Block** can contain **Child Blocks**.
  * There is **no upper limit for nesting**.

-----

### Features of OOPS (in context of MySQL-PL)

**Block Level Language Benefits:**

1.  Modularity.
2.  Control the scope of variables (Form of data hiding).
3.  Efficient Error Management (with the help of Exceptions).

**Important Restrictions & Capabilities:**

  * **Screen input and screen out is not allowed** (`scanf`, `printf`, etc. are not used).
      * Used *only* for processing.
  * You can use `Select` statement inside the block (it’s not recommended generally, but allowed).
  * **SQL Commands Allowed inside MySQL-PL:**
      * DDL (Data Definition Language)
      * DML (Data Manipulation Language)
      * DCL (Data Control Language) -\> *Note: Notes indicate limitations usually, but listed here.*
      * DTL/TCL (Transaction Control Language)
  * `Select` statement in Subqueries is possible.
  * *Correction/Note:* DCL commands are **not** allowed inside MySQL-PL block.

**Storing the Output of MySQL-PL Program:**
To store output, you often create a table.

```sql
Create table tempp (
    fir int,
    sec char(15)
);
```

**Delimiters:**

  * `;` $\rightarrow$ Default delimiter/terminator [Denotes the end of command].
  * To write a block, you must change the delimiter so the `;` inside the block doesn't terminate the whole procedure early.

*Example:*

```sql
delimiter //      -- changed to //
select * from emp //
delimiter ;       -- changed back to ;
```

-----

### Stored Procedures / Stored Objects

**Definition:**

  * MySQL-PL programs are written in the form of **Stored Procedures**.
  * **Procedure is a routine** [set of commands] that has to be called explicitly.
      * *Example:* `call hra_calc();`
  * They are **Global Procedures** (stored in the DB).
  * Can be called in MySQL Command Line Client, MySQL Workbench, Java, MS.net, etc. (Can be called through any front-end software).

**Characteristics:**

  * Stored in the DB in **Compiled Format**.
      * Hence the execution is **very fast**.
  * **Hiding source code** from the end user.
  * Execution takes place in **Server RAM**.
      * Hence it is ideally suited for Server-side data processing.

**Capabilities:**

  * Within the stored procedure, all MySQL-PL statements are allowed.
      * *e.g.,* `Declare variables`, `IF statements`, `loops`, etc.
  * One procedure can call another procedure.
  * Procedure can call itself (**Recursion**).
  * To make it flexible, you can pass **parameters** to a procedure.
  * **Important:** **Overloading** of stored procedures is **not allowed** because it is a stored object.

-----

### Managing Stored Procedures

**1. To see which procedures are created:**

```sql
show procedure status;
-- shows all procedures in all schemas
```

**Filtering:**

```sql
show procedure status where db = 'pune';
-- shows all procedures in Pune db.

show procedure status where name like 'a%';
-- all procedures starting with a.
```

**2. To view the source code of stored procedure:**

```sql
show create procedure abc;
```

**3. To share procedure with other users:**

  * *Scenario:*

      * Username $\rightarrow$ `amit`, DB $\rightarrow$ `classwork`
      * Username $\rightarrow$ `yogesh`, DB $\rightarrow$ `pune`

  * **Amit (Owner) executes:**

<!-- end list -->

```sql
amit_mysql> create procedure abc()...
amit_mysql> grant execute on procedure classwork.abc to yogesh@localhost;
```

  * **Yogesh (User) executes:**

<!-- end list -->

```sql
yogesh_mysql> call classwork.abc();
```

  * **Revoking access:**

<!-- end list -->

```sql
amit_mysql> revoke execute on procedure classwork.abc from yogesh@localhost;
```

-----

### Procedure Constraints & "Select Into"

**Naming Constraint:**

  * You **cannot** create 2 or more stored procedures with the **same name** even if the Number of Parameters passed is different or the Datatype of the parameters is different. (No Overloading).

**Using `Select ... Into`:**

  * **Scenario:** Using `EMP` table (Ename, Sal, Job, Deptno).
  * **Goal:** Fetch data from a table into a variable.

*Example Code:*

```sql
delimiter //
create procedure abc(y char(15)) -- To make it flexible
begin
    declare x int;
    
    select sal into x from emp
    where ename = 'king';  -- or where ename = y;
    
    insert into tempp values (x, 'king'); -- or values (x, y);
end; //
delimiter ;
```

**Crucial Rules for `Select ... Into`:**

1.  `declare x int;` (It’s important that variable `x` should have the **same datatype and width** as the EMP table Sal column).
2.  `Ename = 'king'` should be present in the table.
3.  `Ename = 'king'` **only 1 row should be present** in the table. (The query cannot return multiple rows).

-----

### Boolean, Loops, and Logic

**Boolean Datatype:**

  * Boolean is a logical datatype.
  * Values: `True`, `False`, `1`, `0`.
  * If using Boolean variable, it can be directly used in the `IF` statement condition.
      * *e.g.,* `if true then...` / `if not false then...`

**Functions:**

  * Function is normally used for **validation purposes**.
  * Normally returns a boolean `True` or `False` value, accordingly triggering some future processing.

**Loop, Leave, and Iterate statements:**

1.  **Leave statement:** Allows you to **exit** the loop (similar to `break` command of 'C' programming).
2.  **Iterate statement:** Allows you to **skip** the entire code under it and start a new iteration (similar to `continue` statement of 'C' programming).
3.  **Loop statement:** Executes a block of code repeatedly with an additional flexibility of using a **loop label** (you can give a name to loop).

**Example Loop Setup:**

```sql
delimiter //
create procedure abc()
begin
    declare x int default 1;
    -- logic follows
```

-----

### Loop Logic & Global Variables

**Nested Loop logic example:**

```sql
pqr_loop: loop
    if x > 10 then
        leave pqr_loop;
    end if;
    
    set x = x + 1;
    
    if mod(x, 2) != 0 then
        iterate pqr_loop;
    else
        insert into tempp values (x, 'inside loop');
    end if;
end loop;
end; //
delimiter ;
```

  * **Note:** In deeply nested loops (going from innermost loop to a point outside the outermost loop), `leave loopname` is the fastest way of doing it.

**Global Variables (User Defined Variables):**

  * No need to declare.
  * **Syntax:** `@variable_name`
  * *Example:* `set @x = 10;`
  * Will create it and initialize it; and it remains in the **Server RAM** till you exit (end of session).
  * Can be used in SQL commands, MySQL-PL programs, and in front-end software also.

**Usage:**

```sql
mysql> select @x from dual;
mysql> delete from emp where deptno = @x;
mysql> set @x = @x + 1;
```

**Implicit Conversion:**

```sql
set @x = '10'; -- number to char implicit conversion
set @y = '2024-09-16';
```

-----

### Cursors (Most Imp)

**Concept:**

  * **Scenario:** Table `EMP` with multiple rows (1, A; 2, B; 3, C...).
  * **Problem:** Normal variables can only hold one value.
  * **Solution:** Cursor.
      * Cursor is a **variable**.
      * Cursor can store **multiple rows**.
      * Used for processing multiple rows (Row by Row handling).
      * Used for storing data temporarily.
      * Similar to a **2D array**.
      * It is based on `Select` statements.

**Cursor Declaration Syntax:**

```sql
declare pqr cursor for 
select * from emp where deptno = 1;
-- can use where clause
```

**Advanced Declaration:**

```sql
declare pqr cursor for
select upper(ename), sal * 12 -- single line Func & computed col also used
from emp where deptno = 1
order by 1; -- order by & group by can also be used
```

  * **Multiple cursors** can be created for the same table.
  * Cursor based on **Join**:
    ```sql
    declare pqr cursor for
    select dname, ename from emp, dept where ...;
    ```
  * `Select` statement of Cursor can contain: Select col1, col2..., Where clause, computed column, Order by, Group by, Join, Sub-query, Union, etc.

-----

### Cursor Lifecycle & Processing

**Typical Program Structure:**

```sql
delimiter //
create procedure abc()
begin
    declare a int;
    declare b varchar(15);
    declare c int;
    -- ... more declarations
```

**Cursor Declaration / Definition:**

  * **Important:** Cursor has to be declared **after** all the variables.

<!-- end list -->

```sql
declare c1 cursor for select * from emp;
```

**Processing Steps:**

1.  **Open:**

    ```sql
    open c1;
    ```

      * This will open cursor `c1`.
      * It will **execute** the select statement, and it will **populate** the cursor `c1`.
      * Copy of `emp` into `c1` will open in **RAM**.
      * [At this point cursor does not contain any data, this is only the declaration/execution phase].

2.  **Fetch (The Loop):**

    ```sql
    -- Standard logic
    open c1;
    -- [x < 10] Try in lab
    while x < 5 do -- [x < 3] Try in lab
        -- Fetch next row -> Fetch c1 into variables
        fetch c1 into a, b, c, d; 
        
        -- processing, e.g., set hra = c * 0.4
        insert into tempp values (a, b);
        set x = x + 1;
    end while;
    ```

      * **Visual Representation:**
          * Cursor `c1` holds rows (A, 5000; B, 6000; C, 7000...).
          * `Cursor ptr` (pointer) by default points to first element.
          * `Fetch` moves the pointer down one by one.
            
**Detailed Explanation**

1.  **Source Data:** You have a cursor `c1` populated from the `EMP` table.
2.  **Variables:** You have declared `a, b, c, d` to hold data temporarily.
3.  **Destination:** You are inserting data into table `tempp`.
4.  **Logic:**
    * `a` gets EmpNo
    * `b` gets Ename
    * `c` gets Sal
    * `d` gets DeptNo
    * **Crucial Note:** The `INSERT` statement only uses `a` and `b`.

---

### Step 1: Initialization (Before Loop)

When you run `OPEN c1;`, the result set is loaded into RAM. The **Pointer** is hovering just before the first row.

**1. Cursor `c1` in RAM:**

| Row# | Col 1 (EmpNo) | Col 2 (Ename) | Col 3 (Sal) | Col 4 (DeptNo) | Pointer Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | 1 | 'A' | 5000 | 10 | **<-- WAIT** |
| **2** | 2 | 'B' | 6000 | 10 | |
| **3** | 3 | 'C' | 7000 | 20 | |
| **4** | 4 | 'D' | 9000 | 20 | |

**2. Variables (Empty/Null):**
`a: NULL` | `b: NULL` | `c: NULL` | `d: NULL` | `x: 1`

**3. Table `tempp` (Empty):**
| fir | sec |
| :--- | :--- |
| (empty) | (empty) |

---

### Step 2: Iteration 1 (x = 1)

**Code Executed:**
1.  `fetch c1 into a, b, c, d;`
2.  `insert into tempp values (a, b);`
3.  `set x = x + 1;`

**Visual Action:**
The Pointer moves to **Row 1**. Data is copied into variables. Variables `a` and `b` are copied to `tempp`.

**Cursor `c1`:**
| Row# | Col 1 | Col 2 | Col 3 | Col 4 | Pointer |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **1** | **'A'** | **5000** | **10** | **<-- HERE** |
| **2** | 2 | 'B' | 6000 | 10 | |

**Variables Update:**
* `a` $\leftarrow$ 1
* `b` $\leftarrow$ 'A'
* `c` $\leftarrow$ 5000
* `d` $\leftarrow$ 10

**Table `tempp` Update:**
| fir | sec |
| :--- | :--- |
| **1** | **'A'** |

*(x becomes 2)*

---

### Step 3: Iteration 2 (x = 2)

**Visual Action:**
The Pointer moves to **Row 2**. Old variable data is overwritten by new data.

**Cursor `c1`:**
| Row# | Col 1 | Col 2 | Col 3 | Col 4 | Pointer |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | 1 | 'A' | 5000 | 10 | |
| **2** | **2** | **'B'** | **6000** | **10** | **<-- HERE** |
| **3** | 3 | 'C' | 7000 | 20 | |

**Variables Update:**
* `a` $\leftarrow$ 2
* `b` $\leftarrow$ 'B'
* `c` $\leftarrow$ 6000
* `d` $\leftarrow$ 10

**Table `tempp` Update:**
| fir | sec |
| :--- | :--- |
| 1 | 'A' |
| **2** | **'B'** |

*(x becomes 3)*

---

### Step 4: Iteration 3 (x = 3)

**Visual Action:**
The Pointer moves to **Row 3**.

**Cursor `c1`:**
| Row# | Col 1 | Col 2 | Col 3 | Col 4 | Pointer |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2** | 2 | 'B' | 6000 | 10 | |
| **3** | **3** | **'C'** | **7000** | **20** | **<-- HERE** |
| **4** | 4 | 'D' | 9000 | 20 | |

**Variables Update:**
* `a` $\leftarrow$ 3
* `b` $\leftarrow$ 'C'
* `c` $\leftarrow$ 7000
* `d` $\leftarrow$ 20

**Table `tempp` Update:**
| fir | sec |
| :--- | :--- |
| 1 | 'A' |
| 2 | 'B' |
| **3** | **'C'** |

*(x becomes 4)*

---

### Step 5: Final Result (After Loop Ends)

The loop continues until `x < 5` is false (so it runs for x=4 as well).

**Final State of Variables (holding the last row processed):**
`a: 4` | `b: 'D'` | `c: 9000` | `d: 20`

**Final State of Table `tempp`:**

| fir (int) | sec (char) |
| :--- | :--- |
| 1 | 'A' |
| 2 | 'B' |
| 3 | 'C' |
| 4 | 'D' |

### Key Takeaways from the Diagram
1.  **Bridge:** Variables (`a,b,c,d`) act as the bridge. SQL cannot move data directly from `Cursor c1` to `Table tempp` row-by-row without passing through these variables first.
2.  **Pointer:** The `FETCH` command is the engine. It literally physically moves the pointer down one step. If you forget `FETCH` inside a loop, you get an infinite loop processing the same row forever.
3.  **Selective Use:** Notice that `c` (Salary) and `d` (DeptNo) were fetched into variables, but **never inserted** into `tempp`. This is valid; you processed them but chose not to save them.

3.  **Close:**

    ```sql
    close c1;
    ```

      * Close cursor `c1`, and **free the Server RAM**.
      * Closing cursor is optional but **recommended** as Server RAM will be freed for other operations.

**Summary of Restrictions:**

  * Cursor has to be declared after all the variables.
  * You can only Fetch 1 row at a time.
