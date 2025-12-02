
-----

## 📝 List Functions

  * **Independent of Data type**, which means they will work with all data types.

| ENAME | SAL | COMM |
| :---: | :-: | :--: |
| A | 5000 | 500 |
| B | 6000 | NULL |
| C | NULL | 700 |

```sql
select * from emp where comm = null;
```

  * Any comparison done with **NULL** returns **NULL**.
  * **Pessimistic querying**: searching for null values (searching for something which is not there).

<!-- end list -->

```sql
select * from emp where comm is null;
```

  * This will show the table.
  * `is not null` will also return the corresponding table.

<!-- end list -->

```sql
select sal + comm from emp;
```
Any operation done with **NULL**, returns **NULL**.
  * `5500`
  * `NULL`
  * `NULL`

### IFNULL

```sql
select (sal) + ifnull(comm, 0) from emp;
```
  * `5500`
  * `6000`
  * `700`
```sql
if comm is NULL then
  return 0;
else
  return comm;
end if
```

| SAL | IFNULL(COMM, 0) | SAL + IFNULL(COMM, 0) |
| :-: | :-------------: | :--------------------: |
| 5000 | 500 | 5500 |
| 6000 | 0 | 6000 |
| NULL | 700 | NULL |

  * **IFNULL** is **independent of datatypes**.

| Function Call | Description/Example |
| :--- | :--- |
| `ifnull(comm, 100)` | If COMM is NULL, return 100. |
| `ifnull(city, 'Pune')` | If CITY is NULL, return 'Pune'. |
| `ifnull(orderdate, '2024-04-01')` | If ORDERDATE is NULL, return a specific date. |

-----

## 📅 Date and Time Functions and Formats

| EMP | Hiredate |
| :---: | :------: |
| | 2023-10-15 |
| | 2023-12-31 |
| | 2024-01-15 |

1.  Date, Time, Datetime, Year
2.  `YYYY-MM-DD` or `YY-MM-DD`
3.  1970 starting
4.  $1^{st}$ Jan 1000 AD to $31^{st}$ Jan 9999 AD
5.  `date1 - date2`
6.  `time1 - time2`
7.  `datetime1 - datetime2`
8.  Internally date is stored as a fixed length number occupying **7 Bytes of storage**.
9.  Internally date is stored as **number of days since $1^{st}$ Jan 1000 AD**.
10. Time is stored as a **fraction of day**.
11. Default value of time is **00:00:00**.

### Core Functions

```sql
select sysdate() from dual;
```

  * Returns **current date and time of the DB Server**. (`sysdate()` at last column)

<!-- end list -->

```sql
select now() from dual;
```

  * Returns **current DB server date and time**.

  * **`sysdate()`** returns date and time when the statement **executed**.

  * **`now()`** returns date and time when the statement began to **execute**.

  * `sysdate()`: Used for **date and time display**.

  * `now()`: Used to keep the log of insertion and other operations.

### Date Arithmetic

```sql
select adddate(sysdate(), 1) from dual;
```

  * 11 Sept 2024 + 1 = 12 Sept 2024
  * `adddate(sysdate(), -1)`: Yesterday
  * `adddate(sysdate(), 7)`: Next week

<!-- end list -->

```sql
select datediff(sysdate(), hiredate) from emp;
```

  * Return **number of days between the 2 dates**.
  * Example: `324.7512` (decimal part is time as fraction of day)

<!-- end list -->

```sql
select trunc(datediff(sysdate(), hiredate) / 365, 0) "Years" from emp;
```

  * Experience of employee.

<!-- end list -->

```sql
select date_add(hiredate, interval 2 month) from emp;
```

  * Add 2 months to the hiredate
      * (2023-10-15) + 2 months $\Rightarrow$ 2023-12-15
      * (2023-12-31) + 2 months $\Rightarrow$ 2024-02-29

<!-- end list -->

```sql
select date_add(hiredate, interval -2 month) from emp;
```

  * **Subtract 2 months** from the date.

<!-- end list -->

```sql
select date_add(hire_date, interval 1 year) from emp;
```

  * Add or sub **1 year** to the hiredate.

<!-- end list -->

```sql
select last_day(hiredate) from emp;
```

  * Returns the **last day of month**.
  * Example: 2023-10-15 $\Rightarrow$ 2023-10-31

**Use Cases:**

1.  Attendance calculation
2.  Interest calculation

<!-- end list -->

  * Present only in **MySQL and Oracle**.

<!-- end list -->

```sql
select dayname(sysdate()) from dual;
```

  * Returns the **day of the week**.

<!-- end list -->

```sql
select addtime('2010-01-15 10:30:00', '1') from dual;
```

  * Adding 1 sec $\Rightarrow$ `2010-01-15 10:30:01`
  * `('2010-01-15 10:30:00', '01:30:20')` $\Rightarrow$ `2010-01-15 12:00:20`
  * Up to 6 digit decimal would be possible (micro second)

-----

## 🔢 Greatest and Least Functions

### GREATEST

```sql
select greatest(sal, 3000) from emp;
```

  * Returns the **greater of 2 values**.

| SAL | GREATEST(SAL, 3000) |
| :-: | :-----------------: |
| 1000 | 3000 |
| 2000 | 3000 |
| 3000 | 3000 |
| 4000 | 4000 |
| 5000 | 5000 |

  * Use to set **lower limit** on some values.
  * Example: Bonus = 10% Sal, **min bonus = 300**

<!-- end list -->

```sql
select greatest(sal * 0.1, 300) from emp;
```

  * `select greatest(sal, 3000, 4000, 5000) from emp;` can compare **multiple values**.
  * `greatest(val1, val2, val3, ... val255)` can compare **any values**.
  * `greatest(col1, col2, col3, ... col255)` can compare **multiple columns**.
  * `greatest('str1', 'str2', 'str255')`
  * `('date1', 'date2', 'date3', ... 'date255')`
  * `('time1', 'time2', 'time3', ... 'time255')`
  * Can compare string, dates and times too and every other data type.

<!-- end list -->

```sql
set x = greatest(a, b, c, d);
```

  * Assign the greatest value to x.

### LEAST

```sql
select least(sal, 3000) from emp;
```

  * Returns **smaller of the two values**.
  * To set an **upper limit** on some value.
  * Example: Cashback = 10% Amt, **max = 3000**

<!-- end list -->

```sql
select least(amt * 0.1, 3000) from orders;
```

  * `least(num1, num2, num3)`
  * `set x = least(a, b, c, d);`

-----

## ⚙️ Environment / Other Functions

```sql
select user() from dual;
```

  * It returns the **user name** whatever you have logged in as.
  * Will provide more info about my Environment.

### Audit Trails

  * To maintain logs of operations.

| EMPNO | EMPNAME | SAL | X1 | X2 | X3 |
| :-: | :---: | :-: | :-: | :-: | :-: |
| | 'Scott' | 5000 | now() | sysdate() | user() |

```sql
insert into emp values (101, 'Scott', 5000, now(), sysdate(), user());
```

  * Shows **character set** - shows what languages are present in current installation.

-----

## 👩‍💻 CASE Keyword

The `CASE` expression is a generic conditional expression.

### Basic CASE

```sql
select
    case
        when deptno = 10 then 'Ten'
        when deptno = 20 then 'Twenty'
        when deptno = 30 then 'Thirty'
        when deptno = 40 then 'Forty'
    end "DEPTNAME"
from emp;
```

  * If `else` is **not in the statement** and if you have some other value in the table, then it returns a **NULL** value.

<!-- end list -->

```sql
select
    case deptno
        when 10 then 'Training'
        when 20 then 'Exports'
        when 30 then 'Marketing'
        else 'Others'
    end "DEPTNAME"
from emp;
```

| Output |
| :---: |
| Training |
| Exports |
| Training |
| Marketing |
| Others |

### CASE for Calculations

```sql
select deptno, ename, sal, sal * 12,
    case
        when deptno = 10 then sal * 12 * 0.40
        when deptno = 20 then sal * 12 * 0.30
        when deptno = 30 then sal * 12 * 0.25
        else sal * 12 * 0.20
    end "HRA"
from emp;
```

### CASE for Conditionals

```sql
select
    case
        when sign(sal - 3000) = 1 then 'High Income'
        when sign(sal - 3000) = -1 then 'Low Income'
        when sign(sal - 3000) = 0 then 'Middle Income'
    end "Remarks"
from emp
order by 2; -- column no
```

  * **Case only work with `=` operator.**
  * Therefore, `!=`, `>`, `<`, `>=`, `<=`, will not be applicable in `deptno > 10` [not ok].

-----

## 📊 Group / Aggregate Functions

| EMPNO | ENAME | SAL | DEPTNO | JOB | MGR |
| :---: | :---: | :-: | :----: | :-: | :-: |
| 1 | Arun | 8000 | 1 | M | 4 |
| 2 | Ali | 7000 | 1 | C | 1 |
| 3 | Kiran | 3000 | 1 | C | 1 |
| 4 | Jack | 9000 | 2 | M | |
| 5 | Thomas | 8000 | 2 | C | 4 |

### Single-Row Functions

  * Will operate on **one row at a time**.
  * Example: Character, Number, Date, List, Env Functions.
  * `upper(ename)`, `round(sal)`, etc.

### Multi-Row Functions / Group Functions

  * Will operate on **multiple rows at a time**.
  * Example: `sum(sal)`.

### SUM()

```sql
select sum(sal) from emp;
```

  * Return the **summation of sal column**.

### AVG()

| SAL |
| :-: |
| 8000 |
| 7000 |
| 3000 |
| 9000 |
| 8000 |

  * Null values are **not counted** by group functions.
  * `ifnull` is inbuild in the group function.

<!-- end list -->

```sql
select avg(sal) from emp;
```

  * Normally: $35000 / 5$
  * Assuming $4^{th}$ row is NULL: $26000 / 4$

<!-- end list -->

```sql
select avg(ifnull(sal, 0)) from emp;
```

  * If you also want to count the null values.

### MIN() & MAX()

```sql
select min(sal) from emp;
```

  * Return the **minimum value**.

<!-- end list -->

```sql
select min(ifnull(sal, 0)); -- returns 0
```

```sql
select max(sal) from emp;
```

  * Return the **max value**.

### COUNT()

```sql
select count(sal) from emp;
```

  * Returns a **count of number of rows where sal is not having a NULL value**.
  * Assuming one value is null $\Rightarrow$ 4.

<!-- end list -->

```sql
select count(*) from emp;
```

  * Returns the **count of total number of rows in table**.
  * Example: 5
