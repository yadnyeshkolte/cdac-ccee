---
layout: default
title: Session 3 - Shell Programming Advanced
parent: Module 5 - OS & SDM
nav_order: 3
---

# Session 3: Shell Programming - Advanced

## Decision Making and Loops

### if-else Statement

#### Basic if Statement

```bash
#!/bin/bash

if [ condition ]; then
    # commands
fi
```

**Example:**
```bash
#!/bin/bash

AGE=20

if [ $AGE -ge 18 ]; then
    echo "You are an adult"
fi
```

#### if-else Statement

```bash
#!/bin/bash

if [ condition ]; then
    # commands if true
else
    # commands if false
fi
```

**Example:**
```bash
#!/bin/bash

read -p "Enter a number: " NUM

if [ $NUM -gt 0 ]; then
    echo "Positive number"
else
    echo "Non-positive number"
fi
```

#### if-elif-else Statement

```bash
#!/bin/bash

if [ condition1 ]; then
    # commands
elif [ condition2 ]; then
    # commands
elif [ condition3 ]; then
    # commands
else
    # commands
fi
```

**Example:**
```bash
#!/bin/bash

read -p "Enter your marks: " MARKS

if [ $MARKS -ge 90 ]; then
    echo "Grade: A+"
elif [ $MARKS -ge 80 ]; then
    echo "Grade: A"
elif [ $MARKS -ge 70 ]; then
    echo "Grade: B"
elif [ $MARKS -ge 60 ]; then
    echo "Grade: C"
elif [ $MARKS -ge 50 ]; then
    echo "Grade: D"
else
    echo "Grade: F (Fail)"
fi
```

### Nested if-else

```bash
#!/bin/bash

read -p "Enter a number: " NUM

if [ $NUM -gt 0 ]; then
    if [ $((NUM % 2)) -eq 0 ]; then
        echo "Positive even number"
    else
        echo "Positive odd number"
    fi
else
    if [ $NUM -lt 0 ]; then
        echo "Negative number"
    else
        echo "Zero"
    fi
fi
```

---

## Test Command

The `test` command evaluates conditional expressions.

### Syntax

```bash
test condition
[ condition ]           # Same as test
[[ condition ]]         # Enhanced test (bash)
```

### File Test Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `-e file` | File exists | `[ -e file.txt ]` |
| `-f file` | Regular file exists | `[ -f file.txt ]` |
| `-d dir` | Directory exists | `[ -d /home ]` |
| `-s file` | File exists and not empty | `[ -s file.txt ]` |
| `-r file` | File is readable | `[ -r file.txt ]` |
| `-w file` | File is writable | `[ -w file.txt ]` |
| `-x file` | File is executable | `[ -x script.sh ]` |
| `-L file` | File is symbolic link | `[ -L link ]` |
| `file1 -nt file2` | file1 newer than file2 | `[ file1 -nt file2 ]` |
| `file1 -ot file2` | file1 older than file2 | `[ file1 -ot file2 ]` |

**Examples:**
```bash
#!/bin/bash

# Check if file exists
if [ -e "file.txt" ]; then
    echo "File exists"
fi

# Check if directory exists
if [ -d "/home/user" ]; then
    echo "Directory exists"
fi

# Check if file is readable
if [ -r "file.txt" ]; then
    echo "File is readable"
fi

# Check if file is executable
if [ -x "script.sh" ]; then
    echo "Script is executable"
else
    echo "Making script executable..."
    chmod +x script.sh
fi
```

### String Test Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `-z string` | String is empty | `[ -z "$VAR" ]` |
| `-n string` | String is not empty | `[ -n "$VAR" ]` |
| `str1 = str2` | Strings are equal | `[ "$A" = "$B" ]` |
| `str1 != str2` | Strings are not equal | `[ "$A" != "$B" ]` |
| `str1 < str2` | str1 less than str2 (lexicographically) | `[[ "$A" < "$B" ]]` |
| `str1 > str2` | str1 greater than str2 | `[[ "$A" > "$B" ]]` |

**Examples:**
```bash
#!/bin/bash

NAME="John"

# Check if string is empty
if [ -z "$NAME" ]; then
    echo "Name is empty"
else
    echo "Name is: $NAME"
fi

# String comparison
if [ "$NAME" = "John" ]; then
    echo "Hello John!"
fi

# Check if variable is set
read -p "Enter your name: " INPUT
if [ -n "$INPUT" ]; then
    echo "Hello, $INPUT"
else
    echo "You didn't enter a name"
fi
```

### Numeric Test Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `n1 -eq n2` | Equal to | `[ $A -eq $B ]` |
| `n1 -ne n2` | Not equal to | `[ $A -ne $B ]` |
| `n1 -gt n2` | Greater than | `[ $A -gt $B ]` |
| `n1 -ge n2` | Greater than or equal | `[ $A -ge $B ]` |
| `n1 -lt n2` | Less than | `[ $A -lt $B ]` |
| `n1 -le n2` | Less than or equal | `[ $A -le $B ]` |

**Examples:**
```bash
#!/bin/bash

A=10
B=20

if [ $A -eq $B ]; then
    echo "A equals B"
fi

if [ $A -lt $B ]; then
    echo "A is less than B"
fi

if [ $A -ne $B ]; then
    echo "A is not equal to B"
fi
```

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `!` | NOT | `[ ! -e file ]` |
| `-a` | AND | `[ cond1 -a cond2 ]` |
| `-o` | OR | `[ cond1 -o cond2 ]` |
| `&&` | AND (for [[...]]) | `[[ cond1 && cond2 ]]` |
| `||` | OR (for [[...]]) | `[[ cond1 || cond2 ]]` |

**Examples:**
```bash
#!/bin/bash

AGE=25
CITIZEN="yes"

# AND operator
if [ $AGE -ge 18 ] && [ "$CITIZEN" = "yes" ]; then
    echo "Eligible to vote"
fi

# OR operator
if [ $AGE -lt 18 ] || [ "$CITIZEN" != "yes" ]; then
    echo "Not eligible to vote"
fi

# NOT operator
if [ ! -e "file.txt" ]; then
    echo "File does not exist"
    touch file.txt
fi

# Multiple conditions
if [[ $AGE -ge 18 && "$CITIZEN" = "yes" ]]; then
    echo "Can vote"
fi
```

---

## case Statement

The `case` statement is used for multi-way branching.

### Syntax

```bash
case expression in
    pattern1)
        # commands
        ;;
    pattern2)
        # commands
        ;;
    pattern3 | pattern4)
        # commands for pattern3 OR pattern4
        ;;
    *)
        # default case
        ;;
esac
```

### Examples

#### Simple Menu

```bash
#!/bin/bash

echo "Select an option:"
echo "1. List files"
echo "2. Show date"
echo "3. Show calendar"
echo "4. Exit"

read -p "Enter choice [1-4]: " CHOICE

case $CHOICE in
    1)
        echo "Listing files..."
        ls -l
        ;;
    2)
        echo "Current date and time:"
        date
        ;;
    3)
        echo "Calendar:"
        cal
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice!"
        ;;
esac
```

#### File Type Checker

```bash
#!/bin/bash

read -p "Enter filename: " FILE

case $FILE in
    *.txt)
        echo "Text file"
        ;;
    *.jpg | *.png | *.gif)
        echo "Image file"
        ;;
    *.sh)
        echo "Shell script"
        ;;
    *.pdf)
        echo "PDF document"
        ;;
    *)
        echo "Unknown file type"
        ;;
esac
```

#### Day of Week

```bash
#!/bin/bash

DAY=$(date +%A)

case $DAY in
    Monday)
        echo "Start of work week"
        ;;
    Tuesday | Wednesday | Thursday)
        echo "Mid-week"
        ;;
    Friday)
        echo "End of work week"
        ;;
    Saturday | Sunday)
        echo "Weekend!"
        ;;
esac
```

---

## Loops

### while Loop

Executes commands while condition is true.

```bash
while [ condition ]; do
    # commands
done
```

**Examples:**

```bash
#!/bin/bash

# Count from 1 to 5
COUNT=1
while [ $COUNT -le 5 ]; do
    echo "Count: $COUNT"
    COUNT=$((COUNT + 1))
done

# Read file line by line
while read LINE; do
    echo "Line: $LINE"
done < file.txt

# Infinite loop
while true; do
    echo "Press Ctrl+C to stop"
    sleep 1
done

# Menu with while loop
while true; do
    echo "1. Option 1"
    echo "2. Option 2"
    echo "3. Exit"
    read -p "Choice: " CHOICE
    
    case $CHOICE in
        1) echo "Option 1 selected" ;;
        2) echo "Option 2 selected" ;;
        3) echo "Exiting..."; break ;;
        *) echo "Invalid choice" ;;
    esac
done
```

### until Loop

Executes commands until condition becomes true (opposite of while).

```bash
until [ condition ]; do
    # commands
done
```

**Examples:**

```bash
#!/bin/bash

# Count from 1 to 5
COUNT=1
until [ $COUNT -gt 5 ]; do
    echo "Count: $COUNT"
    COUNT=$((COUNT + 1))
done

# Wait for file to exist
until [ -e "file.txt" ]; do
    echo "Waiting for file.txt..."
    sleep 2
done
echo "File found!"

# Wait for user input
until [ "$ANSWER" = "yes" ]; do
    read -p "Are you ready? (yes/no): " ANSWER
done
echo "Let's proceed!"
```

### for Loop

Iterates over a list of items.

#### Syntax 1: List of Items

```bash
for variable in list; do
    # commands
done
```

**Examples:**

```bash
#!/bin/bash

# Iterate over list
for NAME in John Jane Bob Alice; do
    echo "Hello, $NAME"
done

# Iterate over files
for FILE in *.txt; do
    echo "Processing: $FILE"
    wc -l $FILE
done

# Iterate over command output
for USER in $(cat /etc/passwd | cut -d: -f1); do
    echo "User: $USER"
done

# Iterate over numbers
for NUM in 1 2 3 4 5; do
    echo "Number: $NUM"
done

# Iterate over range
for NUM in {1..10}; do
    echo "Number: $NUM"
done

# Iterate with step
for NUM in {0..100..10}; do
    echo "Number: $NUM"
done
```

#### Syntax 2: C-style for Loop

```bash
for ((initialization; condition; increment)); do
    # commands
done
```

**Examples:**

```bash
#!/bin/bash

# Count from 1 to 10
for ((i=1; i<=10; i++)); do
    echo "Number: $i"
done

# Count backwards
for ((i=10; i>=1; i--)); do
    echo "Countdown: $i"
done

# Multiplication table
read -p "Enter a number: " NUM
for ((i=1; i<=10; i++)); do
    echo "$NUM x $i = $((NUM * i))"
done

# Nested loops
for ((i=1; i<=5; i++)); do
    for ((j=1; j<=i; j++)); do
        echo -n "* "
    done
    echo
done
```

### Loop Control Statements

#### break

Exit from loop.

```bash
#!/bin/bash

# Break on condition
for NUM in {1..10}; do
    if [ $NUM -eq 5 ]; then
        echo "Breaking at 5"
        break
    fi
    echo "Number: $NUM"
done

# Break from nested loop
for ((i=1; i<=3; i++)); do
    for ((j=1; j<=3; j++)); do
        if [ $j -eq 2 ]; then
            break
        fi
        echo "i=$i, j=$j"
    done
done
```

#### continue

Skip current iteration.

```bash
#!/bin/bash

# Skip even numbers
for NUM in {1..10}; do
    if [ $((NUM % 2)) -eq 0 ]; then
        continue
    fi
    echo "Odd number: $NUM"
done

# Skip specific value
for NAME in John Jane Bob Alice; do
    if [ "$NAME" = "Bob" ]; then
        continue
    fi
    echo "Hello, $NAME"
done
```

---

## Regular Expressions

Regular expressions (regex) are patterns used to match text.

### Basic Regex Syntax

| Pattern | Meaning | Example |
|---------|---------|---------|
| `.` | Any single character | `a.c` matches abc, adc |
| `*` | Zero or more of previous | `ab*c` matches ac, abc, abbc |
| `+` | One or more of previous | `ab+c` matches abc, abbc |
| `?` | Zero or one of previous | `ab?c` matches ac, abc |
| `^` | Start of line | `^Hello` matches Hello at start |
| `$` | End of line | `bye$` matches bye at end |
| `[...]` | Character class | `[abc]` matches a, b, or c |
| `[^...]` | Negated character class | `[^abc]` matches any except a,b,c |
| `[a-z]` | Range | `[a-z]` matches lowercase letters |
| `\` | Escape special character | `\.` matches literal dot |
| `|` | OR | `cat|dog` matches cat or dog |
| `(...)` | Grouping | `(ab)+` matches ab, abab |

### Character Classes

| Class | Meaning |
|-------|---------|
| `[0-9]` | Any digit |
| `[a-z]` | Lowercase letter |
| `[A-Z]` | Uppercase letter |
| `[a-zA-Z]` | Any letter |
| `[a-zA-Z0-9]` | Alphanumeric |
| `\d` | Digit (in some tools) |
| `\w` | Word character (alphanumeric + _) |
| `\s` | Whitespace |

### grep with Regular Expressions

```bash
# Basic pattern matching
grep "pattern" file.txt

# Case-insensitive
grep -i "pattern" file.txt

# Lines starting with pattern
grep "^pattern" file.txt

# Lines ending with pattern
grep "pattern$" file.txt

# Lines containing digits
grep "[0-9]" file.txt

# Lines containing email addresses
grep "[a-zA-Z0-9]*@[a-zA-Z]*\.[a-z]*" file.txt

# Extended regex (-E)
grep -E "pattern1|pattern2" file.txt

# Perl-compatible regex (-P)
grep -P "\d{3}-\d{3}-\d{4}" file.txt  # Phone number
```

### sed with Regular Expressions

```bash
# Substitute first occurrence
sed 's/old/new/' file.txt

# Substitute all occurrences
sed 's/old/new/g' file.txt

# Delete lines matching pattern
sed '/pattern/d' file.txt

# Print lines matching pattern
sed -n '/pattern/p' file.txt

# Replace using regex
sed 's/[0-9]*/NUMBER/g' file.txt

# Multiple commands
sed -e 's/old1/new1/g' -e 's/old2/new2/g' file.txt
```

### awk with Regular Expressions

```bash
# Print lines matching pattern
awk '/pattern/' file.txt

# Print specific field
awk '/pattern/ {print $1}' file.txt

# Field matching pattern
awk '$1 ~ /pattern/' file.txt

# Field not matching pattern
awk '$1 !~ /pattern/' file.txt
```

---

## Arithmetic Expressions

### Using $((...))

```bash
#!/bin/bash

# Basic arithmetic
A=10
B=5

SUM=$((A + B))
DIFF=$((A - B))
PROD=$((A * B))
DIV=$((A / B))
MOD=$((A % B))

echo "Sum: $SUM"
echo "Difference: $DIFF"
echo "Product: $PROD"
echo "Division: $DIV"
echo "Modulus: $MOD"

# Increment/Decrement
COUNT=0
COUNT=$((COUNT + 1))        # Increment
COUNT=$((COUNT++))          # Post-increment
COUNT=$((++COUNT))          # Pre-increment
COUNT=$((COUNT - 1))        # Decrement

# Complex expressions
RESULT=$(( (A + B) * 2 ))
echo "Result: $RESULT"

# Power (bash 4.0+)
POWER=$((2 ** 3))           # 2^3 = 8
echo "Power: $POWER"
```

### Using expr

```bash
#!/bin/bash

A=10
B=5

# Basic operations
SUM=$(expr $A + $B)
DIFF=$(expr $A - $B)
PROD=$(expr $A \* $B)       # Note: * must be escaped
DIV=$(expr $A / $B)
MOD=$(expr $A % $B)

echo "Sum: $SUM"
echo "Product: $PROD"

# String operations
LENGTH=$(expr length "Hello")
echo "Length: $LENGTH"

SUBSTR=$(expr substr "Hello World" 1 5)
echo "Substring: $SUBSTR"
```

### Using bc for Floating Point

```bash
#!/bin/bash

# Floating point arithmetic
RESULT=$(echo "scale=2; 10 / 3" | bc)
echo "Result: $RESULT"          # 3.33

# Complex calculations
PI=$(echo "scale=10; 4*a(1)" | bc -l)
echo "Pi: $PI"

# Square root
SQRT=$(echo "scale=2; sqrt(16)" | bc)
echo "Square root: $SQRT"
```

### Using let

```bash
#!/bin/bash

A=10
B=5

let SUM=A+B
let DIFF=A-B
let PROD=A*B

echo "Sum: $SUM"
echo "Difference: $DIFF"
echo "Product: $PROD"

# Increment
let COUNT=0
let COUNT++
let COUNT+=5
```

---

## Complete Shell Script Examples

### Example 1: Calculator

```bash
#!/bin/bash

echo "Simple Calculator"
echo "================="

read -p "Enter first number: " NUM1
read -p "Enter second number: " NUM2

echo "Select operation:"
echo "1. Addition"
echo "2. Subtraction"
echo "3. Multiplication"
echo "4. Division"

read -p "Enter choice [1-4]: " CHOICE

case $CHOICE in
    1)
        RESULT=$((NUM1 + NUM2))
        echo "$NUM1 + $NUM2 = $RESULT"
        ;;
    2)
        RESULT=$((NUM1 - NUM2))
        echo "$NUM1 - $NUM2 = $RESULT"
        ;;
    3)
        RESULT=$((NUM1 * NUM2))
        echo "$NUM1 * $NUM2 = $RESULT"
        ;;
    4)
        if [ $NUM2 -eq 0 ]; then
            echo "Error: Division by zero"
        else
            RESULT=$(echo "scale=2; $NUM1 / $NUM2" | bc)
            echo "$NUM1 / $NUM2 = $RESULT"
        fi
        ;;
    *)
        echo "Invalid choice"
        ;;
esac
```

### Example 2: Prime Number Checker

```bash
#!/bin/bash

read -p "Enter a number: " NUM

if [ $NUM -lt 2 ]; then
    echo "$NUM is not prime"
    exit 0
fi

IS_PRIME=1

for ((i=2; i*i<=NUM; i++)); do
    if [ $((NUM % i)) -eq 0 ]; then
        IS_PRIME=0
        break
    fi
done

if [ $IS_PRIME -eq 1 ]; then
    echo "$NUM is prime"
else
    echo "$NUM is not prime"
fi
```

### Example 3: Fibonacci Series

```bash
#!/bin/bash

read -p "Enter number of terms: " N

A=0
B=1

echo "Fibonacci Series:"
echo -n "$A $B "

for ((i=2; i<N; i++)); do
    C=$((A + B))
    echo -n "$C "
    A=$B
    B=$C
done

echo
```

### Example 4: File Backup Script

```bash
#!/bin/bash

SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/home/user/backup"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$DATE.tar.gz"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory does not exist"
    exit 1
fi

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
fi

# Create backup
echo "Creating backup..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" "$SOURCE_DIR"

if [ $? -eq 0 ]; then
    echo "Backup created successfully: $BACKUP_FILE"
else
    echo "Error creating backup"
    exit 1
fi

# Delete backups older than 7 days
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
echo "Old backups deleted"
```

### Example 5: User Management

```bash
#!/bin/bash

# Must run as root
if [ $EUID -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi

while true; do
    echo "User Management"
    echo "==============="
    echo "1. Add user"
    echo "2. Delete user"
    echo "3. List users"
    echo "4. Exit"
    
    read -p "Enter choice: " CHOICE
    
    case $CHOICE in
        1)
            read -p "Enter username: " USERNAME
            useradd $USERNAME
            passwd $USERNAME
            echo "User $USERNAME added"
            ;;
        2)
            read -p "Enter username to delete: " USERNAME
            userdel -r $USERNAME
            echo "User $USERNAME deleted"
            ;;
        3)
            echo "System users:"
            cat /etc/passwd | cut -d: -f1
            ;;
        4)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid choice"
            ;;
    esac
    
    echo
done
```

---

## Practice Questions

### Multiple Choice Questions

1. **Which operator is used for numeric equality in shell?**
   - A) =
   - B) ==
   - C) -eq
   - D) eq
   
   **Answer: C**

2. **What does the -d operator test for?**
   - A) File exists
   - B) Directory exists
   - C) Device file
   - D) Disk space
   
   **Answer: B**

3. **Which loop executes until condition becomes true?**
   - A) while
   - B) for
   - C) until
   - D) do-while
   
   **Answer: C**

4. **What does $? represent?**
   - A) Process ID
   - B) Number of arguments
   - C) Exit status of last command
   - D) Current directory
   
   **Answer: C**

5. **Which command is used for floating-point arithmetic?**
   - A) expr
   - B) let
   - C) bc
   - D) calc
   
   **Answer: C**

### Lab Practice Exercises

1. **Even/Odd Checker:**
   ```bash
   #!/bin/bash
   read -p "Enter a number: " NUM
   if [ $((NUM % 2)) -eq 0 ]; then
       echo "Even"
   else
       echo "Odd"
   fi
   ```

2. **Factorial Calculator:**
   ```bash
   #!/bin/bash
   read -p "Enter a number: " N
   FACT=1
   for ((i=1; i<=N; i++)); do
       FACT=$((FACT * i))
   done
   echo "Factorial of $N is $FACT"
   ```

3. **File Counter:**
   ```bash
   #!/bin/bash
   COUNT=0
   for FILE in *; do
       if [ -f "$FILE" ]; then
           COUNT=$((COUNT + 1))
       fi
   done
   echo "Number of files: $COUNT"
   ```

---

## Important Points to Remember

> [!IMPORTANT]
> **For CCEE Exam:**
> - Know all test operators (-eq, -ne, -gt, -lt, -ge, -le)
> - Understand difference between [ ] and [[ ]]
> - Remember loop syntax (while, until, for)
> - Know how to use case statement
> - Understand arithmetic operations

> [!TIP]
> **Study Strategy:**
> - Practice writing loops with different conditions
> - Create scripts combining if-else and loops
> - Understand when to use while vs until vs for
> - Practice regex patterns with grep
> - Write scripts for common tasks

---

*End of Session 3 Notes*
