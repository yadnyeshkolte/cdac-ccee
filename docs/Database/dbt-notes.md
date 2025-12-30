### SQL Notes

| DATATYPE | DESCRIPTION | USAGE |
|----------|-------------|-------|
| CHAR | string(0-255), can store characters of fixed length | CHAR(50) |
| VARCHAR | string(0-255), can store characters up to given length | VARCHAR(50) |
| BLOB | string(0-65535), can store binary large object | BLOB(1000) |
| INT | integer(-2,147,483,648 to 2,147,483,647) | INT |
| TINYINT | integer(-128 to 127) | TINYINT |
| BIGINT | integer(-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807) | BIGINT |
| BIT | can store x-bit values. x can range from 1 to 64 | BIT(2) |
| FLOAT | Decimal number - with precision to 23 digits | FLOAT |
| DOUBLE | Decimal number - with 24 to 53 digits | DOUBLE |
| BOOLEAN | Boolean values 0 or 1 | BOOLEAN |
| DATE | date in format of YYYY-MM-DD ranging from 1000-01-01 to 9999-12-31 | DATE |
| YEAR | year in 4 digits format ranging from 1901 to 2155 | YEAR |
---
**Selecting Employee whose joindate is max (using all) where supcode is null**
```sql
 select * from emp e where e.joindate <= all(select joindate from emp where supcode is Null); -- 6
```
- `all()` - selecting max from all
- supcode `is` null - use if we have to check null value
- `-- 6` - Its the comment **Remember to give -- and comment**
---
```sql
select *, timestampdiff(year, e.birthdate, curdate()) as age from emp e 
where timestampdiff(year, e.birthdate, curdate()) between 55 and 60 -- 7
order by age asc;
```
- `timestampdiff(year, e.birthdate, curdate())` -  to get the date difference
- `year` - We want value in years
- `curdate()` - It will give reference to the current date
- `as age` -  Giving aliasing to the *timestampdiff(year, e.birthdate, curdate())* table
- `between` `and` - It will give values only between value1 and value2
- **We can't call aliasing column (like age) in the `where` clause**, but can write in order by
- `order by` *value* `asc` - order the table according to ascending order `asc` - ascending or `desc` - descending
---
```sql
where d.deptname in ('Accounts','Personal','IT');
where d.deptname = 'Accounts' or 'Personal' or 'IT'; -- not possible
```
- `in` is used to check two or more attributes to check in single column
- `or` its is used to check two columns not attributes or to check conditions

```sql
where h.changedate like '1991%';
where e.name like '%i';
```
- `like` '`%`i' - It will give the names like tiwari, himawari
- `like` '1991`%`' - It will give the date like 1991-08-12, 1991-08-

#### 📊 SQL Aggregate & Scalar Functions
Aggregate functions operate on multiple rows and return a single summary value.

| Function         | Description                                      |
|------------------|--------------------------------------------------|
| `COUNT()`        | Total number of rows or non-null values          |
| `SUM()`          | Total sum of numeric values                      |
| `AVG()`          | Average of numeric values                        |
| `MIN()`          | Minimum value                                    |
| `MAX()`          | Maximum value                                    |
| `GROUP_CONCAT()` / `STRING_AGG()` | Concatenate strings (DBMS-specific)         |
| `VARIANCE()` / `VAR_POP()` / `VAR_SAMP()` | Statistical variance               |
| `STDDEV()` / `STDDEV_POP()` / `STDDEV_SAMP()` | Standard deviation             |
| `MEDIAN()`        | Median value (supported in some DBMS)           |
| `PERCENTILE_CONT()` / `PERCENTILE_DISC()` | Percentile calculations         |
| `BIT_AND()` / `BIT_OR()` | Bitwise aggregation (PostgreSQL, SQLite) |
| `BOOL_AND()` / `BOOL_OR()` | Logical aggregation (PostgreSQL)       |

**Usage**
```sql
-- 1 SELECT COUNT(*) FROM employees;
-- 2 SELECT AVG(salary) FROM employees;
-- 3 SELECT department, AVG(salary) FROM employees GROUP BY department;
```
Scalar functions operate on individual rows and return a value per row.

| Function     | Description                                      |
|--------------|--------------------------------------------------|
| `MOD(x, y)`  | Remainder of `x ÷ y`                             |
| `POWER(x, y)`| `x` raised to the power of `y`                   |
| `ABS(x)`     | Absolute value                                   |
| `ROUND(x, d)`| Round to `d` decimal places                      |
| `CEIL(x)` / `CEILING(x)` | Round up to nearest integer         |
| `FLOOR(x)`   | Round down to nearest integer                    |
| `EXP(x)`     | Exponential (`e^x`)                              |
| `LOG(x)` / `LN(x)` | Natural logarithm                         |
| `LOG10(x)`   | Base-10 logarithm                                |
| `SQRT(x)`    | Square root                                      |
| `SIGN(x)`    | Returns -1, 0, or 1 based on sign of `x`         |
| `TRUNC(x, d)`| Truncate to `d` decimal places                   |
| `RADIANS(x)` / `DEGREES(x)` | Convert between degrees/radians |

**Usage** with Aggregate + Scalar
```sql
SELECT department,
       MAX(POWER(salary, 2)) AS max_salary_squared
FROM employees GROUP BY department;
```
Window Functions are **not aggregates**, but useful for ranking and row-wise analysis.

| Function         | Description                                  |
|------------------|----------------------------------------------|
| `ROW_NUMBER()`   | Unique row index per partition               |
| `RANK()`         | Rank with gaps                               |
| `DENSE_RANK()`   | Rank without gaps                            |
| `LEAD()` / `LAG()` | Access next/previous row value             |
| `NTILE(n)`       | Divide rows into `n` buckets                 |
| `FIRST_VALUE()` / `LAST_VALUE()` | First/last value in partition |

**ROW_NUMBER()**
```sql
WITH th5High AS(
    SELECT empcode, empname, deptcode, totalPay,
    ROW_NUMBER() OVER(ORDER BY totalPay DESC) AS indexedPay
    FROM maxSalaries
)
SELECT m.empcode, m.empname, m.deptcode, m.totalPay
FROM th5High m
WHERE indexedPay = 5; /*
+---------+---------+----------+----------+
| empcode | empname | deptcode | totalPay |
+---------+---------+----------+----------+
| 7499    | Roy     | SALE     |    14970 |
+---------+---------+----------+----------+ */
```
**Offset and Limit**
```sql
SELECT * FROM users LIMIT 5; -- Top 5 rows
SELECT * FROM users LIMIT 10 OFFSET 5; -- Skip first 5 rows, then get next 10
SELECT * FROM users LIMIT 5, 10; -- Get 10 rows starting from the 6th row (Same as
```
**RANK()**
```sql
WITH th5High AS(
    SELECT empcode, empname, deptcode, totalPay,
    RANK() OVER(ORDER BY totalPay DESC) AS indexedPay
    FROM maxSalaries
)
SELECT m.empcode, m.empname, m.deptcode, m.totalPay
FROM th5High m
WHERE indexedPay = 5; /*
+---------+---------+----------+----------+
| empcode | empname | deptcode | totalPay |
+---------+---------+----------+----------+
| 7499    | Roy     | SALE     |    14970 |
| 9902    | Ahmad   | SALE     |    14970 |
+---------+---------+----------+----------+ */
```
| Function | Behavior |
|----------|----------|
| `ROW_NUMBER()` | Assigns unique sequential numbers, even for tied values |
| `RANK()` | Assigns same rank to tied values, skips subsequent ranks |

- Aggregate functions **collapse rows** unless used with `GROUP BY`.
- Scalar functions **do not collapse rows** — they work per row.
- Window functions **preserve rows** and allow advanced analytics.
---
#### View
```sql
CREATE VIEW employeeAge AS (
select e.empcode, e.empname, timestampdiff(year, e.birthdate, curdate()) as age, e.supcode from emp e
);
DROP VIEW employeeAge
```
- A view is a virtual table that doesn't store data itself but displays data from one or more underlying tables based on a predefined SQL query.
- When you query a view, the database executes the underlying query and returns the results.
  
**Limitations**
1. Views can be slower than direct table queries.
2. No indexes can be created on most views (except materialized views)
3. Nested views can create performance bottlenecks
4. Not all views are updatable (INSERT/UPDATE/DELETE restrictions)
5. Query optimization can be harder to troubleshoot
6. Error messages may be less clear when they originate from view logic
7. Views add another layer that needs to be documented and maintained

At the time of learning sql, it helps making complex query easy. Instead we have to create to complex nested queries (It helps to simplify things)

---

### TCL Things (Transaction Control Language)

| Command | Description |
|---------|-------------|
| `SHOW DATABASES;` | List all databases |
| `CREATE DATABASE db_name;` | Create a new database |
| `USE database_name;` | Switch to a specific database |
| `DROP DATABASE db_name;` | Delete a database |
| `SHOW TABLES;` | List all tables in current database |
| `DROP TABLE table_name;` | Delete a table |
| `TRUNCATE TABLE table_name;` | Remove all rows from a table without logging individual row deletions |
| `DESCRIBE table_name;` | Show table structure (columns, types, etc.) |
| `DESC table_name;` | Short form of DESCRIBE |
| `SHOW CREATE TABLE table_name;` | Show the CREATE statement for a table |

**Create the Table**
```sql
CREATE TABLE course (
    course_id INTEGER PRIMARY KEY AUTO_INCREMENT,    -- for mysql it havs lowerdash in autoincrement
    course_name VARCHAR(20) NOT NULL UNIQUE,
    course_type ENUM('Core', 'Elective', 'Optional', 'Mandatory') DEFAULT 'Core',
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    course_fee DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES department(department_id),
    CHECK (credits > 0 AND credits <= 6),
    UNIQUE (course_code, academic_year, semester)
);
```
---
**Alter Table**
**(ALTER) Adding the new column**
```sql
ALTER TABLE course ADD COLUMN duration_weeks INTEGER;
```
**(ALTER) Altering table and attaching the foreign key**
```sql
ALTER TABLE course 
ADD FOREIGN KEY (category_id) REFERENCES category(id);
```
**(ALTER) Dropping the column**
```sql
ALTER TABLE course 
DROP COLUMN online_available,
DROP COLUMN difficulty_level;
```
**(ALTER) Altering the properties**
```sql
ALTER TABLE course 
MODIFY COLUMN course_name VARCHAR(200);
```
**(ALTER) Alter as drop column**
```sql
alter table users drop  age;
```
**(ALTER) for modifying**
```sql
ALTER TABLE course 
MODIFY COLUMN credits SMALLINT NOT NULL DEFAULT 3;
```
**(ALTER) Change column name**
```sql
ALTER TABLE course 
RENAME COLUMN course_name TO title;
```
---
- course is table
  
**Update into table**
```sql
UPDATE course SET credits = 3 WHERE course_name NOT LIKE '%Operating%';
```
```sql
UPDATE course 
SET instructor = (
    SELECT department 
    FROM instructor_details 
    WHERE instructor_details.instructor_name = course.instructor
) 
WHERE instructor IN (
    SELECT instructor_name 
    FROM instructor_details
);
```
**Insert into table**
```sql
INSERT INTO course (course_name, category_id) 
VALUES ('Math 101', 999);  -- 1
INSERT INTO course VALUES (5, 'Algorithms'); -- 2
```
**Delete from table**
```sql
DELETE FROM course WHERE course_name = 'DBT';
```
---
**UNION vs UNION ALL**
| Operation | Description | Duplicates | Performance | Use Case |
|-----------|-------------|------------|-------------|----------|
| **UNION** | Combines results from multiple SELECT statements | Removes duplicates | Slower (needs to check duplicates) | When you need unique results |
| **UNION ALL** | Combines results from multiple SELECT statements | Keeps duplicates | Faster | When duplicates are acceptable or impossible |
```sql
-- Basic UNION
SELECT column1, column2 FROM table1
UNION
SELECT column1, column2 FROM table2;
-- UNION ALL (keeps duplicates)
SELECT column1, column2 FROM table1
UNION ALL
SELECT column1, column2 FROM table2;
```
**Types of JOINs**
| JOIN Type | Returns | Use Case | Diagram Concept |
|-----------|---------|----------|-----------------|
| **INNER JOIN** | Only matching rows from both tables | Most common, when you need related data | Intersection |
| **LEFT OUTER JOIN** | All rows from left table + matching from right | Keep all left records, even without matches | Left circle + intersection |
| **RIGHT OUTER JOIN** | All rows from right table + matching from left | Keep all right records, even without matches | Right circle + intersection |
| **FULL OUTER JOIN** | All rows from both tables | When you need everything | Both circles |
| **CROSS JOIN** | Cartesian product (all combinations) | Every row with every other row | All possible pairs |
| **SELF JOIN** | Join table to itself | Hierarchical data, comparisons within table | Same table twice |

**Set Operations**
**INTERSECT**
```sql
-- Students who are enrolled in both Fall and Spring
SELECT student_id FROM fall_enrollment
INTERSECT
SELECT student_id FROM spring_enrollment;
-- MySQL workaround (no native INTERSECT):
SELECT DISTINCT f.student_id
FROM fall_enrollment f
INNER JOIN spring_enrollment s ON f.student_id = s.student_id;
```
**EXCEPT (MINUS in Oracle)**
```sql
-- Students enrolled in Fall but NOT in Spring
SELECT student_id FROM fall_enrollment
EXCEPT
SELECT student_id FROM spring_enrollment;

-- MySQL workaround:
SELECT f.student_id
FROM fall_enrollment f
LEFT JOIN spring_enrollment s ON f.student_id = s.student_id
WHERE s.student_id IS NULL;
```
---
**Triggers**
```sql
CREATE A TRIGGER TO CHECK EMPLOYEE SHOULD BE OLDER THAN 18

delimiter //
CREATE TRIGGER emp_trigger BEFORE INSERT
ON emp
FOR EACH ROW
if timestampdiff(year,NEW.birthdate,curdate()) <18 then 

SIGNAL SQLSTATE '50001' SET MESSAGE_TEXT = 'employee must be older than 18.';
END IF; //
delimiter ;
```
**Procedure**
```sql
delimiter //
create procedure maximumSal(in deptid varchar(20), out maxSal int, out grade varchar(20))
begin
select max(s.salary) into maxSal
from latestSalary s inner join dept d on s.deptcode = d.deptcode
group by d.deptcode
having d.deptcode = deptid;
if(maxSal>14000) then
set grade = 'A';
end if;
end //

set @deptid = 'STOR';
call maximumSal(@deptid,@maxSal,@grade);
select @maxSal, @grade;
drop procedure  maximumSal;
```
**Procedue while (factorail)**
```sql
delimiter //
create procedure factorial(in number int)
begin
declare fac int default 1;
while(number>0)
do
set fac = fac * number;
set number = number - 1;
select concat('Its facorial is ',fac) as Factorial;
end while;
end //
set @number = 4;
call factorial(@number);
drop procedure factorial;
```
**Functions**
```sql
delimiter //
create function getDeptName(empid int) returns varchar(20) deterministic
begin
declare deptname varchar(20) default '';
select d.deptname into deptname from emp e 
join dept d on e.deptcode = d.deptcode where e.empcode = empid;
return deptname;
end //
select getDeptName(7839 ) as DeptName;
drop function getDeptName;
```
**Cursor**
```sql
delimiter //
create procedure getGrade()
begin
declare sid int default 0;
declare grade varchar(5) default '';
declare done int default 0;
declare sname varchar(20);
declare smarks int;
declare sgrade varchar(5);

declare c4 cursor for select s.StudentID, s.Name, s.Marks from Students s;
declare continue handler for not found set done = 1;
create temporary table if not exists temp_grade(
	sid int,
    sname varchar(20),
    smarks int,
    sgrade varchar(5)
);
open c4;
runloop: loop
fetch c4 into  sid, sname, smarks;
if(done=1) then 
leave runloop;
end if;
if(smarks>=80) then
set sgrade = 'A';
elseif(smarks>=60) then
set sgrade = 'B';
elseif(smarks>=40) then
set sgrade = 'C';
else
set sgrade = 'Fail';
end if;
insert into temp_grade values (sid, sname, smarks, sgrade);
end loop;
close c4;
select * from temp_grade;
drop table if exists temp_grade; 
end //
call getGrade();
drop procedure getGrade;
```
```sql
-- data for cursor
create database school;
use school;
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    Marks INT
);
INSERT INTO Students VALUES
(101, 'Ravi', 85),
(102, 'Priya', 72),
(103, 'Karan', 55),
(104, 'Meera', 40),
(105, 'Anita', 30);
```
