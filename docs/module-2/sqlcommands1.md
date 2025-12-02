## ACID Properties of RDBMS

**A = Atomicity**

  * The entire transaction takes place at once or doesn't happen at all.

**C = Consistency**

  * The DB must be consistent before and after the Transaction.

**I = Isolation**

  * Multiple transactions occur independently without interference.

**D = Durability**

  * The changes of a successful transaction occur even if the system failure occurs.

-----

## Character Functions

**Example Data (EMP Table):**

| FNAME | LNAME |
| :--- | :--- |
| Arun | Purun |
| Tarun | Arun |
| Sirun | Kirun |
| Nutan | Purun |

**Data Types:**

  * `varchar(20)` for names.

### 1\. Concat

  * Concatenate (to join).

<!-- end list -->

```sql
select concat(fname, lname) from emp;
```

  * **Output:** `ArunPurun`, `TarunArun`, etc.
  * **Note:** No actual changes to the table (computed column).

**Nested Concat:**

> *Note from margin: max 255 lvl for fun^n within fun^n*

```sql
select concat(concat(fname, ' '), lname) from emp;
```

  * This will insert a blank space between the 2 names.
  * This limit can be exceeded with the help of **Views**.

### 2\. Upper

  * **Uses:** For Presentation purposes (Reporting purposes).

<!-- end list -->

```sql
select upper(fname) from emp;
```

  * Convert the name to upper-case only for display.

**Updating to Upper:**

```sql
update emp set fname = upper(fname);
```

  * Update a column to uppercase.

### 3\. Lower

```sql
select lower(fname) from emp;
```

  * Convert the name to lowercase only for display.

### 4\. Padding Functions (Lpad / Rpad)

**Lpad (Left Pad)**

```sql
select lpad(ename, 25, '*') from emp;
```

  * **Definition:** Left pad.
  * **Uses:**
      * Right justified char data column.
      * Cheque printing.
  * **Visual:** `***************Arun Purun` (Total length becomes 25).

**Rpad (Right Pad)**

```sql
select rpad(ename, 25, '*') from emp;
```

  * **Definition:** Right pad.
  * **Uses:**
      * Left Justification of numeric data.
      * Convert `varchar` to `char` (Convert variable length to fixed length).
      * Cheque printing.
      * Centre Justification (Combination of `lpad` & `rpad`)

### 5\. Trimming Functions

**Ltrim (Left Trim)**

```sql
select ltrim(ename) from emp;
```

  * Remove data from left side [blank spaces].
  * **Left Justification:** `(ltrim + rpad)`

**Rtrim (Right Trim)**

```sql
select rtrim(ename) from emp;
```

  * Remove blank spaces from RHS.
  * **Right Justification:** `(rtrim + lpad)`
  * *Note: Convert char to varchar (convert fixed length to variable length).*

**Trim**

```sql
select trim(ename) from emp;
```

  * Remove blank spaces from both sides in MySQL.

-----

## String Manipulation Functions

### 1\. Substr (Substring)

To extract a part of the string.

**Syntax 1: Start Position**

```sql
select substr(ename, 3) from emp;
-- starting position
```

  * `Arun Purun` -\> `un Purun`
  * `Purun Arun` -\> `run Arun`

**Syntax 2: Start Position + Number of Characters**

```sql
select substr(ename, 3, 2) from emp;
-- Start at 3, take 2 characters
```

  * `Arun Purun` -\> `un`
  * `Purun Arun` -\> `ru`

**Syntax 3: Negative Index**

```sql
select substr(ename, -3) from emp;
```

  * `Arun Purun` -\> `run`
  * `Purun Arun` -\> `run`

### 2\. Replace

```sql
select replace(ename, 'un', 'xy') from emp;
```

  * `Arun Purun` -\> `Arxy Purxy`
  * **Note:** Only for display.

**Uneven Replacement:**

```sql
select replace(ename, 'un', 'xyz') from emp;
```

  * The replaced character can be more than the initial parameter or less than the initial parameter.

### 3\. Instr (In-string)

Returns the starting position.

```sql
select instr(ename, 'un') from emp;
```

  * `Arun Purun` -\> `3`
  * `Purun Arun` -\> `4`

**Key Rules:**

  * If the string is not found, return `0`.
  * To check if one string exists in another string.

### 4\. Length

```sql
select length(ename) from emp;
```

  * Returns the length of ename.

### 5\. ASCII

Returns the ASCII value of the first letter.

```sql
select ascii(ename) from emp;
```

  * `Arun` -\> `65`
  * `Bannerjee` -\> `66`
  * `Charlie` -\> `67`

**Specific Character:**

```sql
select ascii('z') from emp;
```

  * Result: `122` (one for each row—computed column).

**Distinct ASCII:**

```sql
select distinct ascii('z') from emp;
```

  * Result: `122` (suppress all duplicates).

-----

## The DUAL Table

```sql
select ascii('z') from dual;
```

  * `Dual` is a system table.
  * It contains only **1 row**.
  * `Dual` is a dummy table.
  * **Dual is present in all Databases.**

**Examples using Dual:**

```sql
select substr('Sunbeam', 1, 3) from dual; -- Result: Sun
select 3 * 12 from dual;                  -- Result: 36
select 'Welcome to Pune' as "MESSAGE" from dual;
```

-----

## Multibyte Characters

Storage requirements:

| Language | **Actual Size (UTF-8)** |
| :--- | :--- |
| **English** | **1 Byte** |
| **Arabic** | **2 Bytes** (usually) |
| **Hindi** | **3 Bytes** |
| **Chinese** | **3 Bytes** (sometimes 4) |
| **Japanese** | **3 Bytes** (sometimes 4) |

**UTF8 Usage:**

```sql
select char(65 using utf8) from dual;
-> A
```

  * Where `utf8` is the given character set for U.S English, else default is Binary character set.

-----

## Soundex

Compares the vowels `[a, e, i, o, u, y]`.

```sql
select * from emp where ename = 'Aroon';
-- will give me an error (if name is stored as Arun)

select * from emp
where soundex(ename) = soundex('Aroon');
```

  * This will successfully match `Arun` because they sound the same.

-----

## Number Functions

**Base Data (Example):**
| SAL (Float) |
| :--- |
| 1234.567 |
| 1852.019 |
| 1375.618 |
| 1748.156 |

### 1\. Round

Round off the number.

**Standard Rounding:**

```sql
select round(sal) from emp;
```

  * `1234.567` -\> `1235`
  * `1852.019` -\> `1852`

**Round with Precision:**

```sql
select round(sal, 1) from emp;
```

  * `1234.567` -\> `1234.6`
  * `1375.618` -\> `1375.6`

**Negative Rounding (Left of Decimal):**

```sql
select round(sal, -2) from emp;
```

  * `1234` -\> `1200`
  * `1375` -\> `1400`
  * `1852` -\> `1900`

### 2\. Truncate

Cutoff salary, remove decimal. Won't check rounding off.

**Remove Decimal:**

```sql
select truncate(sal, 0) from emp;
```

  * `1234.567` -\> `1234`
  * `1375.618` -\> `1375`
  * **Uses:**
      * Age Calc
      * Date Calc
      * Time Calc

**Truncate with Precision:**

```sql
select truncate(sal, 1) from emp;
-- remove after the 1st decimal
```

  * `1234.567` -\> `1234.5`
  * `1375.618` -\> `1375.6`

**Truncate with Negative:**

```sql
truncate(sal, -2);
```

  * `1234` -\> `1200`
  * `1375` -\> `1300`

#### Summary Table

| Input | Command | Result | Logic |
| :--- | :--- | :--- | :--- |
| **10.9** | `ROUND` | **11** | 9 is high, so 10 becomes 11. |
| **10.9** | `TRUNCATE` | **10** | Delete the .9. |

### 3\. Ceil (Ceiling)

```sql
select ceil(sal) from emp;
```

  * If there is any value at all in decimals, it will add 1 to the whole no.
  * `1235.8` -\> `1236`
  * `1853.01` -\> `1854`
  * **Uses:**
      * Bill Payment
      * Interest Calc
      * EMI
  * *Note: Unlike rounding off, even if 0.1 is present, it will add 1 to the whole number.*

### 4\. Floor

```sql
select floor(sal) from emp;
```

  * Removes decimal and returns lower no.
  * `1234.9` -\> `1234`

### Truncate vs Floor on Negative Numbers

```sql
select truncate(3.6, 0), floor(3.6), truncate(-3.6, 0), floor(-3.6) from dual;
```

  * `truncate(3.6, 0)` -\> `3`
  * `floor(3.6)` -\> `3`
  * `truncate(-3.6, 0)` -\> `-3`
  * `floor(-3.6)` -\> `-4` (Goes to the lower integer)

### 5\. Sign

```sql
select sign(-15) from dual;
```

  * For -ve no, return `-1`
  * For +ve no, return `1`
  * For 0, return `0`

**Uses:**
a) Check if no. is +ve or -ve.
b) To find greater of the two numbers.

-----

## Lateral Thinking & Math Functions


### 1\. Mod (Modulus)

```sql
select mod(9, 5) from dual;      -- Result: 4
mod(8.22, 2.2);                  -- Result: 1.62
```

  * Get mod of the given nos.

### 2\. Sqrt (Square Root)

```sql
select sqrt(81) from dual;       -- Result: 9
```

  * Only possible for +ve no. (check with sign).

### 3\. Power

```sql
select power(10, 3) from dual;   -- Result: 1000 (10^3)
power(10, 1/3);                  -- For cube roots
```

### 4\. Abs (Absolute)

```sql
select abs(-10) from dual;       -- Result: 10
```

  * Returns absolute value.
  * Always positive.

### 5\. Trigonometric Functions

  * `sin(x)` -\> x in radians
  * `cos(x)`
  * `tan(x)`

### 6\. Logarithms

  * `ln(y)` -\> Natural log base `e`
  * `log(n, m)` -\> `log_n (m)`
