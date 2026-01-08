---
layout: default
title: "Session 14: Console I/O"
parent: Module 7 - C++
nav_order: 12
---

# Session 14: Managing Console I/O Operations

## 🎯 Learning Objectives
- Master C++ stream classes
- Work with formatted and unformatted I/O
- Use manipulators for output formatting

---

## 1. C++ Stream Classes

```
                    ios
                     ↑
            ┌────────┴────────┐
         istream           ostream
            ↑                  ↑
   ┌────────┴────────┐   ┌────┴────┐
ifstream  iostream  istringstream   ofstream  ostringstream
              ↑
           fstream
```

| Class | Purpose | Header |
|-------|---------|--------|
| `istream` | Input stream | `<iostream>` |
| `ostream` | Output stream | `<iostream>` |
| `iostream` | Both input/output | `<iostream>` |
| `ifstream` | File input | `<fstream>` |
| `ofstream` | File output | `<fstream>` |
| `fstream` | File input/output | `<fstream>` |
| `istringstream` | String input | `<sstream>` |
| `ostringstream` | String output | `<sstream>` |

---

## 2. Standard Stream Objects

```cpp
#include <iostream>
using namespace std;

int main() {
    // cout - Standard output (console)
    cout << "Hello, World!" << endl;
    
    // cin - Standard input (keyboard)
    int x;
    cin >> x;
    
    // cerr - Standard error (unbuffered)
    cerr << "Error message!" << endl;
    
    // clog - Standard log (buffered)
    clog << "Log message" << endl;
}
```

---

## 3. Unformatted I/O Operations

### Input Functions

```cpp
char c;
char str[100];

// get() - Read single character
c = cin.get();
cin.get(c);

// getline() - Read line with delimiter
cin.getline(str, 100);           // Read up to 99 chars or newline
cin.getline(str, 100, '#');      // Read up to '#' delimiter

// read() - Read block of characters
cin.read(str, 10);               // Read exactly 10 chars

// gcount() - Get count of last read
int count = cin.gcount();

// peek() - Look at next character without extracting
char next = cin.peek();

// ignore() - Skip characters
cin.ignore(100, '\n');           // Skip up to 100 chars or until newline
```

### Output Functions

```cpp
char c = 'A';
char str[] = "Hello";

// put() - Write single character
cout.put(c);
cout.put('B');

// write() - Write block of characters
cout.write(str, 3);  // Outputs "Hel"

// flush() - Flush output buffer
cout.flush();
```

---

## 4. Formatted I/O Operations

### Width and Fill

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int num = 42;
    
    // setw() - Set field width (temporary)
    cout << setw(10) << num << endl;  // "        42"
    
    // setfill() - Set fill character (persistent)
    cout << setfill('*') << setw(10) << num << endl;  // "********42"
    cout << setw(10) << num << endl;  // Still uses '*'
    
    // Reset fill
    cout << setfill(' ');
}
```

### Alignment

```cpp
// Left alignment
cout << left << setw(10) << 42 << "|" << endl;  // "42        |"

// Right alignment (default)
cout << right << setw(10) << 42 << "|" << endl;  // "        42|"

// Internal alignment (for numbers with sign)
cout << internal << setw(10) << -42 << endl;  // "-       42"
```

### Number Formatting

```cpp
double num = 3.14159265;

// Precision
cout << setprecision(3) << num << endl;  // "3.14" (3 sig digits)

// Fixed notation
cout << fixed << setprecision(2) << num << endl;  // "3.14"

// Scientific notation
cout << scientific << setprecision(3) << num << endl;  // "3.142e+00"

// Default notation
cout << defaultfloat << num << endl;

// Hexadecimal
cout << hex << 255 << endl;  // "ff"
cout << uppercase << hex << 255 << endl;  // "FF"

// Octal
cout << oct << 64 << endl;  // "100"

// Decimal (back to normal)
cout << dec << 255 << endl;  // "255"

// Show base
cout << showbase << hex << 255 << endl;  // "0xff"
cout << showbase << oct << 64 << endl;   // "0100"
```

---

## 5. Manipulators

### Manipulators Without Arguments

```cpp
cout << "Hello" << endl;     // Newline + flush
cout << "Hello" << ends;     // Null character
cout << "Hello" << flush;    // Flush buffer

cout << boolalpha << true << endl;   // "true"
cout << noboolalpha << true << endl; // "1"

cout << showpoint << 10.0 << endl;   // "10.0000"
cout << showpos << 10 << endl;       // "+10"
```

### Manipulators With Arguments (require `<iomanip>`)

```cpp
#include <iomanip>

cout << setw(10) << 42;              // Width 10
cout << setfill('*') << setw(5) << 7;  // "****7"
cout << setprecision(3) << 3.14159;  // "3.14"
cout << setbase(16) << 255;          // "ff"
```

---

## 6. Stream State Flags

```cpp
// Check stream state
if (cin.good()) cout << "No errors" << endl;
if (cin.eof()) cout << "End of file reached" << endl;
if (cin.fail()) cout << "Operation failed" << endl;
if (cin.bad()) cout << "Stream corrupted" << endl;

// Clear error state
cin.clear();

// Combined check
if (!cin) {
    cout << "Stream is in error state" << endl;
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}
```

---

## 7. Input Validation

```cpp
#include <iostream>
#include <limits>
using namespace std;

int getValidInt(const string& prompt) {
    int value;
    while (true) {
        cout << prompt;
        if (cin >> value) {
            return value;
        }
        cout << "Invalid input. Try again." << endl;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
    }
}

int main() {
    int age = getValidInt("Enter your age: ");
    cout << "You entered: " << age << endl;
}
```

---

## 8. String Streams

```cpp
#include <sstream>
#include <string>
using namespace std;

int main() {
    // Output string stream
    ostringstream oss;
    oss << "Name: " << "Alice" << ", Age: " << 25;
    string result = oss.str();
    cout << result << endl;  // "Name: Alice, Age: 25"
    
    // Input string stream
    string data = "100 200 300";
    istringstream iss(data);
    int a, b, c;
    iss >> a >> b >> c;
    cout << a + b + c << endl;  // 600
    
    // String to number conversion
    string numStr = "3.14159";
    istringstream iss2(numStr);
    double pi;
    iss2 >> pi;
    cout << pi * 2 << endl;  // 6.28318
}
```

---

## 📝 Lab Exercise: Formatted Table

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << fixed << setprecision(2);
    
    // Header
    cout << left << setfill('-') << setw(50) << "" << endl;
    cout << setfill(' ');
    cout << "| " << left << setw(15) << "Product"
         << "| " << right << setw(8) << "Qty"
         << " | " << setw(10) << "Price"
         << " | " << setw(10) << "Total" << " |" << endl;
    cout << left << setfill('-') << setw(50) << "" << endl;
    cout << setfill(' ');
    
    // Data rows
    string products[] = {"Apple", "Banana", "Orange"};
    int quantities[] = {10, 25, 15};
    double prices[] = {1.50, 0.75, 1.20};
    
    double grandTotal = 0;
    for (int i = 0; i < 3; i++) {
        double total = quantities[i] * prices[i];
        grandTotal += total;
        
        cout << "| " << left << setw(15) << products[i]
             << "| " << right << setw(8) << quantities[i]
             << " | $" << setw(9) << prices[i]
             << " | $" << setw(9) << total << " |" << endl;
    }
    
    // Footer
    cout << left << setfill('-') << setw(50) << "" << endl;
    cout << setfill(' ');
    cout << "| " << left << setw(37) << "Grand Total"
         << "| $" << right << setw(9) << grandTotal << " |" << endl;
    cout << left << setfill('-') << setw(50) << "" << endl;
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - `cin` = input, `cout` = output, `cerr` = error, `clog` = log
> - `endl` = newline + flush, `\n` = just newline
> - `get()` reads including whitespace, `>>` skips whitespace
> - `getline()` reads entire line including spaces
> - `setw()` is temporary (one output only)
> - `setfill()`, `setprecision()` are persistent
> - `fixed` for fixed-point, `scientific` for scientific notation
> - `hex`, `oct`, `dec` for number bases
> - `showbase` displays "0x" or "0" prefix
> - `boolalpha` displays "true"/"false" instead of 1/0
> - `cin.fail()` returns true if last operation failed
> - `cin.clear()` clears error flags
> - `cin.ignore()` discards characters from buffer
