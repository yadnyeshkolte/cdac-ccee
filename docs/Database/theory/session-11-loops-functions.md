---
layout: default
title: "Session 11: Loops & Functions"
parent: Theoretical Notes
grand_parent: Module 2 - Database
nav_order: 10
permalink: /docs/Database/theory/session-11-loops-functions/
---

# Session 11: Loop Constructs and Functions

## Loop Constructs: ITERATE and LEAVE

### LEAVE Statement

Exits the current loop immediately (equivalent to `break`).

```sql
DELIMITER //

CREATE PROCEDURE leave_demo()
BEGIN
    DECLARE i INT DEFAULT 0;
    
    print_loop: LOOP
        SET i = i + 1;
        
        IF i > 5 THEN
            LEAVE print_loop;  -- Exit when i > 5
        END IF;
        
        SELECT CONCAT('Iteration: ', i);
    END LOOP print_loop;
END //

DELIMITER ;
```

### ITERATE Statement

Skips remaining statements and starts next iteration (equivalent to `continue`).

```sql
DELIMITER //

CREATE PROCEDURE iterate_demo()
BEGIN
    DECLARE i INT DEFAULT 0;
    
    print_loop: LOOP
        SET i = i + 1;
        
        IF i > 10 THEN
            LEAVE print_loop;
        END IF;
        
        IF i MOD 2 = 0 THEN
            ITERATE print_loop;  -- Skip even numbers
        END IF;
        
        SELECT i AS odd_number;  -- Only prints 1,3,5,7,9
    END LOOP print_loop;
END //

DELIMITER ;
```

---

## Functions

Functions are stored routines that **return a single value**.

### Procedure vs Function

| Feature | Procedure | Function |
|---------|-----------|----------|
| **Return value** | Optional (via OUT params) | Required (single value) |
| **RETURN statement** | Not used | Required |
| **Call syntax** | CALL procedure() | SELECT function() |
| **Use in SQL** | Cannot use in SELECT | Can use in SELECT |
| **Transaction control** | Allowed | Not allowed |

### Creating Functions

```sql
DELIMITER //

CREATE FUNCTION calculate_tax(amount DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN amount * 0.18;  -- 18% tax
END //

DELIMITER ;

-- Using the function
SELECT calculate_tax(1000);  -- Returns 180.00
SELECT name, salary, calculate_tax(salary) AS tax FROM employees;
```

### Function Characteristics

| Characteristic | Meaning |
|----------------|---------|
| **DETERMINISTIC** | Same input always gives same output |
| **NOT DETERMINISTIC** | Output may vary (default) |
| **READS SQL DATA** | Function reads from database |
| **MODIFIES SQL DATA** | Function writes to database |
| **NO SQL** | No SQL statements |
| **CONTAINS SQL** | Contains SQL but no data access |

---

## MySQL Built-in Functions

### String Functions

| Function | Description | Example |
|----------|-------------|---------|
| **CONCAT()** | Join strings | CONCAT('Hello', ' World') |
| **LENGTH()** | String length in bytes | LENGTH('MySQL') → 5 |
| **CHAR_LENGTH()** | String length in characters | CHAR_LENGTH('MySQL') → 5 |
| **UPPER()** | Uppercase | UPPER('hello') → 'HELLO' |
| **LOWER()** | Lowercase | LOWER('HELLO') → 'hello' |
| **SUBSTRING()** | Extract substring | SUBSTRING('Hello', 2, 3) → 'ell' |
| **LEFT()** | Left characters | LEFT('Hello', 3) → 'Hel' |
| **RIGHT()** | Right characters | RIGHT('Hello', 2) → 'lo' |
| **TRIM()** | Remove spaces | TRIM('  Hello  ') → 'Hello' |
| **REPLACE()** | Replace substring | REPLACE('Hello', 'l', 'x') → 'Hexxo' |
| **LPAD()** | Left pad | LPAD('5', 3, '0') → '005' |
| **RPAD()** | Right pad | RPAD('5', 3, '0') → '500' |
| **REVERSE()** | Reverse string | REVERSE('Hello') → 'olleH' |
| **INSTR()** | Position of substring | INSTR('Hello', 'l') → 3 |

### Numeric Functions

| Function | Description | Example |
|----------|-------------|---------|
| **ABS()** | Absolute value | ABS(-5) → 5 |
| **CEIL() / CEILING()** | Round up | CEIL(4.1) → 5 |
| **FLOOR()** | Round down | FLOOR(4.9) → 4 |
| **ROUND()** | Round to decimals | ROUND(3.567, 2) → 3.57 |
| **TRUNCATE()** | Truncate decimals | TRUNCATE(3.567, 2) → 3.56 |
| **MOD()** | Modulus (remainder) | MOD(10, 3) → 1 |
| **POWER() / POW()** | Exponent | POWER(2, 3) → 8 |
| **SQRT()** | Square root | SQRT(16) → 4 |
| **RAND()** | Random 0-1 | RAND() → 0.123456 |
| **SIGN()** | Sign (-1, 0, 1) | SIGN(-5) → -1 |

### Date/Time Functions

| Function | Description | Example |
|----------|-------------|---------|
| **NOW()** | Current datetime | 2024-01-15 10:30:45 |
| **CURDATE()** | Current date | 2024-01-15 |
| **CURTIME()** | Current time | 10:30:45 |
| **DATE()** | Extract date | DATE('2024-01-15 10:30:45') |
| **YEAR()** | Extract year | YEAR('2024-01-15') → 2024 |
| **MONTH()** | Extract month | MONTH('2024-01-15') → 1 |
| **DAY()** | Extract day | DAY('2024-01-15') → 15 |
| **HOUR()** | Extract hour | HOUR('10:30:45') → 10 |
| **DATEDIFF()** | Days between dates | DATEDIFF('2024-01-15', '2024-01-10') → 5 |
| **DATE_ADD()** | Add interval | DATE_ADD('2024-01-15', INTERVAL 1 MONTH) |
| **DATE_SUB()** | Subtract interval | DATE_SUB('2024-01-15', INTERVAL 1 WEEK) |
| **DATE_FORMAT()** | Format date | DATE_FORMAT(NOW(), '%Y-%m-%d') |
| **TIMESTAMPDIFF()** | Difference in units | TIMESTAMPDIFF(YEAR, '2000-01-01', NOW()) |
| **LAST_DAY()** | Last day of month | LAST_DAY('2024-01-15') → 2024-01-31 |

### Conditional Functions

| Function | Description | Example |
|----------|-------------|---------|
| **IF()** | Simple condition | IF(10 > 5, 'Yes', 'No') → 'Yes' |
| **IFNULL()** | Replace NULL | IFNULL(NULL, 0) → 0 |
| **NULLIF()** | Return NULL if equal | NULLIF(5, 5) → NULL |
| **COALESCE()** | First non-NULL | COALESCE(NULL, NULL, 5) → 5 |
| **CASE** | Multi-condition | CASE WHEN...THEN... |

---

## Key MCQ Points to Remember

1. **LEAVE** exits loop (like break)
2. **ITERATE** skips to next iteration (like continue)
3. **Functions** MUST return a value
4. **Procedures** MAY return via OUT parameters
5. **Functions** can be used in SELECT statements
6. **DETERMINISTIC** = same input, same output
7. **CONCAT()** joins strings
8. **LENGTH()** = bytes; **CHAR_LENGTH()** = characters
9. **CEIL()** rounds up; **FLOOR()** rounds down
10. **ROUND()** rounds to decimals; **TRUNCATE()** cuts off
11. **NOW()** = datetime; **CURDATE()** = date only
12. **DATEDIFF()** returns days between dates
13. **IFNULL()** replaces NULL with value
14. **COALESCE()** returns first non-NULL
15. **MOD(a, b)** = a % b (remainder)
