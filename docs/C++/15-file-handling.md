---
layout: default
title: "Session 15: File Handling"
parent: Module 7 - C++
nav_order: 13
---

# Session 15: File Handling in C++

## 🎯 Learning Objectives
- Open and close files
- Read and write text files
- Work with binary files
- Handle file errors

---

## 1. File Stream Classes

| Class | Purpose |
|-------|---------|
| `ifstream` | Input file stream (reading) |
| `ofstream` | Output file stream (writing) |
| `fstream` | Both input and output |

```cpp
#include <fstream>
using namespace std;

ifstream fin;   // For reading
ofstream fout;  // For writing
fstream file;   // For both
```

---

## 2. Opening and Closing Files

### Method 1: Using open()
```cpp
ofstream fout;
fout.open("data.txt");

if (fout.is_open()) {
    fout << "Hello, File!" << endl;
    fout.close();
}
```

### Method 2: Using Constructor
```cpp
ofstream fout("data.txt");  // Opens automatically

if (fout) {
    fout << "Hello, File!" << endl;
}  // Closes automatically when fout goes out of scope
```

---

## 3. File Opening Modes

```cpp
#include <fstream>
using namespace std;

// Single mode
ofstream fout("data.txt", ios::out);

// Combined modes
fstream file("data.txt", ios::in | ios::out | ios::app);
```

| Mode | Description |
|------|-------------|
| `ios::in` | Open for reading |
| `ios::out` | Open for writing |
| `ios::app` | Append to end |
| `ios::ate` | Open and seek to end |
| `ios::trunc` | Truncate (delete contents) |
| `ios::binary` | Binary mode |

### Default Modes
- `ifstream` → `ios::in`
- `ofstream` → `ios::out | ios::trunc`
- `fstream` → `ios::in | ios::out`

---

## 4. Writing to Text Files

```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main() {
    ofstream fout("students.txt");
    
    if (!fout) {
        cerr << "Error opening file!" << endl;
        return 1;
    }
    
    // Write data
    fout << "Alice" << " " << 85 << endl;
    fout << "Bob" << " " << 92 << endl;
    fout << "Charlie" << " " << 78 << endl;
    
    fout.close();
    cout << "Data written successfully!" << endl;
}
```

---

## 5. Reading from Text Files

### Using >> operator
```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main() {
    ifstream fin("students.txt");
    
    if (!fin) {
        cerr << "Error opening file!" << endl;
        return 1;
    }
    
    string name;
    int marks;
    
    while (fin >> name >> marks) {
        cout << "Name: " << name << ", Marks: " << marks << endl;
    }
    
    fin.close();
}
```

### Using getline()
```cpp
ifstream fin("notes.txt");
string line;

while (getline(fin, line)) {
    cout << line << endl;
}

fin.close();
```

### Reading Character by Character
```cpp
ifstream fin("data.txt");
char c;

while (fin.get(c)) {
    cout << c;
}

fin.close();
```

---

## 6. Appending to Files

```cpp
ofstream fout("log.txt", ios::app);

fout << "New log entry: " << time(0) << endl;

fout.close();
```

---

## 7. Binary File I/O

### Writing Binary Data
```cpp
#include <fstream>
using namespace std;

struct Student {
    char name[50];
    int rollNo;
    double marks;
};

int main() {
    Student s = {"Alice", 101, 85.5};
    
    ofstream fout("students.bin", ios::binary);
    fout.write(reinterpret_cast<char*>(&s), sizeof(s));
    fout.close();
}
```

### Reading Binary Data
```cpp
#include <fstream>
using namespace std;

struct Student {
    char name[50];
    int rollNo;
    double marks;
};

int main() {
    Student s;
    
    ifstream fin("students.bin", ios::binary);
    fin.read(reinterpret_cast<char*>(&s), sizeof(s));
    fin.close();
    
    cout << "Name: " << s.name << endl;
    cout << "Roll: " << s.rollNo << endl;
    cout << "Marks: " << s.marks << endl;
}
```

---

## 8. File Pointers

### Get Position
```cpp
ifstream fin("data.txt");
streampos pos = fin.tellg();  // Get position (input)

ofstream fout("data.txt");
streampos pos2 = fout.tellp();  // Get position (output)
```

### Seek Position
```cpp
// seekg() for input streams
fin.seekg(0);                    // Go to beginning
fin.seekg(10);                   // Go to position 10
fin.seekg(-5, ios::end);         // 5 bytes before end
fin.seekg(3, ios::cur);          // 3 bytes forward from current

// seekp() for output streams
fout.seekp(0, ios::end);         // Go to end
fout.seekp(0, ios::beg);         // Go to beginning
```

### Seek Directions
- `ios::beg` - From beginning
- `ios::cur` - From current position
- `ios::end` - From end

---

## 9. File Size

```cpp
ifstream fin("data.txt", ios::binary | ios::ate);

if (fin) {
    streampos size = fin.tellg();
    cout << "File size: " << size << " bytes" << endl;
    
    fin.seekg(0, ios::beg);  // Go back to beginning
}
```

---

## 10. Error Handling

```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main() {
    ifstream fin("nonexistent.txt");
    
    if (!fin) {
        cerr << "Failed to open file!" << endl;
        return 1;
    }
    
    // Check for errors during reading
    int num;
    while (fin >> num) {
        cout << num << endl;
    }
    
    if (fin.eof()) {
        cout << "End of file reached" << endl;
    } else if (fin.fail()) {
        cout << "Read operation failed" << endl;
    } else if (fin.bad()) {
        cout << "Stream is corrupted" << endl;
    }
    
    fin.close();
}
```

---

## 📝 Lab Exercise: Student Record System

```cpp
#include <fstream>
#include <iostream>
#include <iomanip>
using namespace std;

struct Student {
    int rollNo;
    char name[50];
    double marks;
};

void addStudent() {
    Student s;
    cout << "Enter Roll No: "; cin >> s.rollNo;
    cout << "Enter Name: "; cin.ignore(); cin.getline(s.name, 50);
    cout << "Enter Marks: "; cin >> s.marks;
    
    ofstream fout("students.dat", ios::binary | ios::app);
    fout.write(reinterpret_cast<char*>(&s), sizeof(s));
    fout.close();
    
    cout << "Student added successfully!" << endl;
}

void displayAll() {
    Student s;
    ifstream fin("students.dat", ios::binary);
    
    if (!fin) {
        cout << "No records found!" << endl;
        return;
    }
    
    cout << left << setw(10) << "Roll No"
         << setw(20) << "Name"
         << setw(10) << "Marks" << endl;
    cout << string(40, '-') << endl;
    
    while (fin.read(reinterpret_cast<char*>(&s), sizeof(s))) {
        cout << left << setw(10) << s.rollNo
             << setw(20) << s.name
             << setw(10) << fixed << setprecision(2) << s.marks << endl;
    }
    
    fin.close();
}

void searchStudent(int rollNo) {
    Student s;
    ifstream fin("students.dat", ios::binary);
    bool found = false;
    
    while (fin.read(reinterpret_cast<char*>(&s), sizeof(s))) {
        if (s.rollNo == rollNo) {
            cout << "Found: " << s.name << ", Marks: " << s.marks << endl;
            found = true;
            break;
        }
    }
    
    if (!found) {
        cout << "Student not found!" << endl;
    }
    
    fin.close();
}

int main() {
    int choice;
    
    do {
        cout << "\n1. Add Student\n2. Display All\n3. Search\n0. Exit\n";
        cout << "Choice: "; cin >> choice;
        
        switch (choice) {
            case 1: addStudent(); break;
            case 2: displayAll(); break;
            case 3: {
                int roll;
                cout << "Enter Roll No: "; cin >> roll;
                searchStudent(roll);
                break;
            }
        }
    } while (choice != 0);
}
```

---

## 🎯 Key Points for CCEE

> **Must Remember**:
> - `ifstream` for reading, `ofstream` for writing, `fstream` for both
> - Default: `ofstream` truncates file, use `ios::app` to append
> - `ios::binary` for binary files
> - `is_open()` or `!file` to check if file opened successfully
> - `write()` and `read()` for binary, `<<` and `>>` for text
> - `reinterpret_cast<char*>` for binary casting
> - `tellg()`/`tellp()` get position, `seekg()`/`seekp()` set position
> - `ios::beg`, `ios::cur`, `ios::end` for seek directions
> - `eof()` = end of file, `fail()` = operation failed, `bad()` = stream corrupted
> - Files auto-close when stream object goes out of scope
