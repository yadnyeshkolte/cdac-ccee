# cdac-ads
Learning Algorithms and Data Structures

  
**Imp Archive** - https://github.com/yadnyeshkolte/store-room/blob/main/java-dsa/dsa-code-archive-document.pdf


# Data Structures & Algorithms - Comprehensive Reference Guide

A complete reference of DSA implementations in Java covering fundamental algorithms, data structures, and problem-solving techniques.

---

## Table of Contents

1. [Searching Algorithms](#searching-algorithms)
2. [Sorting Algorithms](#sorting-algorithms)
3. [Tree Data Structures](#tree-data-structures)
4. [Graph Data Structures](#graph-data-structures)
5. [Linear Data Structures](#linear-data-structures)
6. [Recursion & Dynamic Programming](#recursion--dynamic-programming)
7. [Backtracking Problems](#backtracking-problems)

---

## Searching Algorithms

### Binary Search (Iterative)

**File:** `BinarySearchUsingIteration.java`

```java
package in.blr.cdac.pgdac.day4;

public class BinarySearchUsingIteration {

    public static void main(String[] args) {
        int[] arr = {4, 9, 11, 16, 19, 21, 25, 28};
        System.out.println(new BinarySearchUsingIteration().binarySearch(20, arr));
    }

    int binarySearch(int temp, int c[]) {
        int low=0, high=c.length-1, mid=0;
        // the iteration ends when the low and high meet each or cross each other
        while(low<=high) {
            mid = (low+high)/2; // compute the mid of the array
            if(temp > c[mid]) {  // if true, implies that the element searched in the RIGHT half
                low = mid+1;
            } else if(temp < c[mid]) { // if true, implies that the element searched in the LEFT half
                high = mid-1;
            } else if(temp == c[mid]) { // if true, implies that the element searched in present at the MID index location
                return mid;
            } else {

            }
        }
        return -1; // implies that the element searched is NOT PRESENT in the array
    }
}
```

**Time Complexity:** O(log n)  
**Space Complexity:** O(1)

---

### Binary Search (Recursive)

**File:** `BinarySearchByRecursion.java`

```java
package in.blr.cdac.pgdac.day4;

public class BinarySearchByRecursion {
    
    public static void main(String[] args) {
        int[] arr = {4, 9, 11, 16, 19, 21, 25, 28};
        System.out.println(new BinarySearchByRecursion().binarySearch(arr, 0, arr.length-1, 25));
    }
    
    int binarySearch(int arr[], int low, int high, int temp) {
        // termination condition: when the low becomes equal to or more than high
        if(low>=high) {
            return -1;
        }
        int mid = (low+high)/2;
        if(temp == arr[mid]) { // if the element searched for is present at MID or not
            return mid;
        }
        if(temp < arr[mid]) {  // if true implies that the element searched for may be present in LEFT half
            return binarySearch(arr, low, mid-1, temp);
        }
        // if true implies that the element searched for may be present in RIGHT half
        return binarySearch(arr, mid+1, high, temp); 
    }
}
```

**Time Complexity:** O(log n)  
**Space Complexity:** O(log n) due to recursion stack

---

## Sorting Algorithms

### Selection Sort

**File:** `SelectionSort.java`

```java
package com.example.datastructure;

public class SelectionSort {
        
    public static void main(String[] args) {
        int a[] = {40,20,60,10,2,90};
        
        selectionSort(a);
        
        for(int itr : a) {
            System.out.println(itr+" ");
        }
    }

    private static void selectionSort(int[] a) {
        int temp=0;
        int size=a.length;
        
        for(int i=0;i<size-1;i++) {
            
            int min=i;
            
            for(int j= i+1; j<size-1; j++) {
                if(a[min]>a[j]) {
                    min=j;
                }
                
                temp = a[i];
                a[i] = a[min];
                a[min] = temp;
            }
        }
    }
}
```

**Time Complexity:** O(n²)  
**Space Complexity:** O(1)

---

### Insertion Sort

**File:** `InsertionSort.java`

```java
package com.example.datastructure;

public class InsertionSort {
    
    public static void main(String[] args) {
        int a[] = {24,56,2,70,10,5};
        
        insertionSort(a);
        
        for(int itr : a) {
            System.out.print(itr+" ");
        }
    }

    private static void insertionSort(int[] a) {
        int size=a.length;
        
        for(int i=0; i<size;i++) {
            int temp=a[i];
            int j=i-1;
            while(j>=0 && a[j] > temp) {
                a[j+1] = a[j];
                j--;
            }
            a[j+1] = temp;
        }
    }
}
```

**Time Complexity:** O(n²) worst case, O(n) best case  
**Space Complexity:** O(1)

---

### Merge Sort

**File:** `MergeSort.java`

```java
public class MergeSort {

    // Divide method of the Merge Sort
    void divide(int arr[], int left, int right) {
        // termination condition: the left and right come closer to each other with 
        // each recursive call and once they meet or cross each other then the recursion ends
        // intimating that the division has happened till the last (leaf) node
        if(left < right) {
            int middle = (left+right)/2;
            divide(arr, left, middle);  // left half of the array
            divide(arr, middle+1, right);  // right half of the array
            // conquer
            merge(arr, left, middle, right);
        }
    }
    
    void merge(int[] arr, int left, int middle, int right) {
        int lefthalfsize = middle-left+1;  // inclusive of the middle element
        int righthalfsize = right-middle;  // exclusive of the middle element
        int leftarray[] = new int[lefthalfsize];
        int rightarray[] = new int[righthalfsize];
        for(int i=0; i<lefthalfsize; i++) {
            // copying the left half of array 'arr' starting from 1st into array 'leftarray' till the middle element
            leftarray[i] = arr[left+i];
        }
        for(int j=0; j<righthalfsize; j++) {
            // copying the right half of the array 'arr' starting from 'middle+1' into array 'rightarray' till the last element
            rightarray[j] = arr[middle+1+j];
        }
        int i=0, j=0, k=left;
        // compare the elements of the leftarray and rightarray one-by-one and add it to the
        // resultant sorted array
        while(i < lefthalfsize && j < righthalfsize) {
            if(leftarray[i] <= rightarray[j]) {
                arr[k] = leftarray[i];
                i++;
            } else {
                arr[k] = rightarray[j];
                j++;
            }
            k++;
        } // at the end this loop, either leftarray or rightarray would have exhausted
        
        // if the leftarray has few elements left over
        while(i < lefthalfsize) {
            arr[k] = leftarray[i];  // appending to the end of arr by picking one element at one time from leftarray
            i++; k++;
        }
        // if the rightarray has few elements left over
        while(j < righthalfsize) {
            arr[k] = rightarray[j];
            j++; k++;
        }
    }
    
    void display(int[] arr) {
        for(int i: arr) {
            System.out.print(i+", ");
        }
    }
    
    public static void main(String[] args) {
        int arr[] = {19, 11, 7, 21, 15, 8};
        MergeSort ms = new MergeSort();
        ms.divide(arr, 0, arr.length-1);
        ms.display(arr);
    }
}
```

**Time Complexity:** O(n log n)  
**Space Complexity:** O(n)

---

### Heap Sort

**File:** `HeapSort.java`

```java
package in.blr.cdac.pgdac.day8;

public class HeapSort {
    
    // Heapification
    void heapify(int arr[], int n, int i) {
        int max = i; // assume the max element is at the ith location
        int leftchild = 2*i+1;
        int rightchild = 2*i+2;
        
        if(leftchild < n && arr[leftchild] > arr[max]) {
            max = leftchild;
        }
        if(rightchild < n && arr[rightchild] > arr[max]) {
            max = rightchild;
        }
        if(max != i) {
            int temp = arr[i];
            arr[i] = arr[max];
            arr[max] = temp;
            // breakpoint 6
            heapify(arr, n, max);
        }
    }
    
    public void constructHeap(int arr[]) {
        int n = arr.length;
        // breakpoint 1
        for(int i=n/2-1; i>=0; i--) {
            // breakpoint 2
            heapify(arr, n, i);
        }
        // breakpoint 3
        for(int i=n-1; i>0; i--) {
            
            // swapping of the root (max element) with the last element of the heap
            // where arr[0] is the root (max element) and ith location is the last element
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // the max is now considered as sorted and its location is fixed in the array
            // we now perform heapification of the remaining elements
            // breakpoint 4
            heapify(arr, i, 0);
        }
    }
    
    public static void main(String[] args) {
        int arr[] = {19, 11, 7, 21, 15, 8};
        new HeapSort().constructHeap(arr);
        for(int i : arr) {
            System.out.println(i);
        }
    }
}
```

**Time Complexity:** O(n log n)  
**Space Complexity:** O(1)

---

## Tree Data Structures

### Binary Search Tree

**File:** `BinarySearchTree.java`

```java
// Declaration of the Binary node with the left and right references and a data value
class BinaryNode {
    int data;          // the data to be stored in the node
    BinaryNode left;   // Reference to the left sub-tree
    BinaryNode right;  // Reference to the right sub-tree
    
    // The constructor constructs the node with the data and the null left and right references
    BinaryNode (int data) {
        this.data = data; 
        left=right=null; 
    }
    // returns the data of the node being referred to
    public int getData() {
        return data; 
    }
}

public class BinarySearchTree {
    
    // The ROOT node. Any operation on the tree starts from the root node.
    // Ensure that the root node reference remains unaltered unless the operation is on the root node itself
    BinaryNode root;
    
    /*
     * INSERTION into a Binary Tree
     * Case 1: Empty Tree - The new node created becomes the ROOT node
     * Case 2: Non-empty Tree - Insertion of new node can happen either to the left subtree or right subtree depending on the data
     */
    public void insert (BinaryNode temp, int data) {
        
        // Case 1: Empty Tree - The new node created becomes the ROOT node
        if (temp == null) {
            temp = new BinaryNode(data);
            root = temp;  
            System.out.println ("Data of the New Node inserted as the root: " + data);
            return; 
        }
        
        // Case 2: Non-empty Tree - Insertion of new node can happen either to the left subtree or right subtree depending on the data
        // Compare the data with the current node's data, if the data to be inserted is 
        // smaller then branch to the left subtree,
        // otherwise branch to the right subtree
        if (data < temp.getData()) {
            // if 'left' is null, it implies there is no left subtree, then insert the new node as left child of current node
            if (temp.left == null) {
                temp.left = new BinaryNode(data); 
                System.out.println("The new node inserted as the left child is:"+ data);
                return;
            } else
                insert(temp.left, data); // if a left subtree is present, then recursive call to move further down the tree
        } else {
            // if 'right' is null, it implies there is no right subtree, then insert the new node as right child of current node
            if (temp.right == null) {
                temp.right = new BinaryNode(data);
                System.out.println("The new node inserted as the right child is:"+ data);
                return;
            } else
                insert(temp.right, data); // if a right subtree is present, then recursive call to move further down the tree
        }
    }
    
    // PREORDER TRAVERSAL of Binary Tree
    // root => left => right
    public void preorder(BinaryNode p) {
        if (p!= null) {
            System.out.print(p.getData()+"  ");
            preorder(p.left);
            preorder(p.right);
        }
    }
    
    // POSTORDER TRAVERSAL of Binary Tree
    // left => right => root
    public void postorder(BinaryNode p) {
        if (p!= null) {
            postorder(p.left);
            postorder(p.right);
            System.out.print(p.getData()+"  ");
        }
    }
    
    // INORDER TRAVERSAL of Binary Tree
    // left => root => right
    public void inorder(BinaryNode p) {
        if (p!= null) {
            inorder(p.left);
            System.out.print(p.getData()+"  ");
            inorder(p.right);
        }
    }
    
    // Locate an element "theelement" in the tree
    public BinaryNode locateItem(BinaryNode p, int theelement) {
        boolean found = false;
        if (p!=null) {
            if (theelement == p.getData()) {  // TRUE, if found
                found = true;
                return p;
            } else if (theelement < p.getData())  // if not found, branch to the left subtree, if data is smaller than current node's data
                p = locateItem(p.left, theelement);
            else // if not found, branch to the right subtree, if data is larger than current node's data
                p = locateItem(p.right, theelement);
        }
        if(!found)
            p = null;
        return p;
    }
    
    // Find the parent node of the node-to-be-deleted
    public BinaryNode findParentNode(BinaryNode temproot, BinaryNode delnode) {
        
        BinaryNode parent = null;
        
        // start search for the ROOT, and branch to the left subtree or right subtree 
        // continuously till the 'delnode' is found or else you end-up at a leaf node
        // not equal to 'delnode' meaning the 'delnode' is not present in the tree
        while (temproot != delnode) { 
            parent = temproot; 
            if (delnode.getData() < temproot.getData())
                temproot = temproot.left; 
            else 
                temproot = temproot.right; 
        }
        return parent;
    }
    
    /*
     * DELETION from a Binary Tree
     * (a) locate the node to be deleted in the Binary Tree; (b) determine the parent node of the node-to-be-deleted
     * Case 1: Deletion of a leaf node - straight-away set the respective reference of its parent node to null
     * Case 2: Deleting a node which has either a left subtree or a right subtree
     * Case 3: Deleting a node having both left subtree and right subtree
     */
    public void delete(BinaryNode rootnode, int data) {

        // locate the node to be deleted in the Binary Tree
        BinaryNode delnode = locateItem(rootnode, data);
        if(delnode == null) {
            System.out.println("Empty BST or the data not present in the BST");
            return;
        }
        
        // determine the parent node of the node-to-be-deleted
        BinaryNode parent = findParentNode(rootnode, delnode);
        
        //Case 1: Deleting a leaf node - set the reference of its parent node to null; 
        if ((delnode.left == null) && (delnode.right == null)) {
            // the node-to-be-deleted can be either the left child or the right child
            if (parent != null) { // If parent is null, it implies only the ROOT exists and not children
                if (parent.getData() > delnode.getData())
                    parent.left = null;   // the node-to-be-deleted is the left child, hence left reference is made null
                else
                    parent.right = null;  // the node-to-be-deleted is the right child, hence right reference is made null
            } else
                root = null; // Meaning only the ROOT exists and not children, because parent is null, hence root node is deleted
        }
        
        //Case 2: Deleting a node which has either a left subtree or a right subtree 
        else if ((delnode.left == null) || (delnode.right == null)) {
            if (parent != null) {
                // If there is no left subtree to the node-to-be-deleted, 
                // then make its right subtree as 
                // the parent node's left subtree or right subtree depending on 
                // whether the data of the node-to-be-deleted
                // is smaller or larger than the parent node's data correspondingly
                if (delnode.left == null) { // Only right subtree present, no left subtree 
                    if (parent.getData() > delnode.getData())
                        parent.left = delnode.right;
                    else
                        parent.right = delnode.right; 
                } else { // Only left subtree present, no right subtree 
                    if (parent.getData() > delnode.getData())
                        parent.left = delnode.left; 
                    else
                        parent.right = delnode.left; 
                    
                }
            } else { // Meaning only the ROOT exists and only one of the left or right subtree is present, 
                     // because parent is null, hence root node is deleted, such that it gets shifted to either the right or left child
                if (delnode.left == null)
                    root = rootnode.right; 
                else
                    root = rootnode.left; 
            }
        }
    
        //Case 3: Deleting a node having both left subtree and right subtree
        else if ((delnode.left!= null) && (delnode.right!=null)) {
            BinaryNode x = delnode.left; 
            // Determine the right-most descendant of the left subtree of the node-to-be-deleted 
            while (x.right != null) {
                x = x.right; // hop to the right child repeatedly till the right-most descendant is found
            }
            
            x.right = delnode.right; 
            
            //Reset the parent of node-to-be-deleted to the left child of node-to-be-deleted; 
            //But for that you need to figure out if node-to-be-deleted was the right or left child of its parent 
            //And before that check if node-to-be-deleted is having a parent 
            
            if (parent != null) {
                if (parent.right == delnode)
                    parent.right = delnode.left; 
                else
                    parent.left = delnode.left; 
            } else
                root = rootnode.left; 
        }
    }
    
    public static void main (String[] args) {
        
        BinarySearchTree b = new BinarySearchTree();
        
        System.out.println("Insertion Operations");
        b.insert(b.root, 18);
        b.insert(b.root, 10);
        b.insert(b.root, 25);
        b.insert(b.root, 5);
        b.insert(b.root, 15);
        b.insert(b.root, 21);
        b.insert(b.root, 28);
        b.insert(b.root, 3);
        b.insert(b.root, 6);
        b.insert(b.root, 11);
        b.insert(b.root, 16);
        b.insert(b.root, 20);
        b.insert(b.root, 23);
        b.insert(b.root, 26);
        b.insert(b.root, 29);
        
        System.out.println("Preorder Traversal of the BST");
        b.preorder(b.root);
        
        System.out.println();
        System.out.println("Postorder Traversal of the BST");
        b.postorder(b.root);
        
        System.out.println();
        System.out.println("Inorder Traversal of the BST");
        b.inorder(b.root);

        System.out.println("Deletion Operations");
        b.delete(b.root, 13);
        b.delete(b.root, 15);
        b.delete(b.root, 6);
        System.out.println("Inorder Traversal of the Tree");
        b.inorder(b.root);
    }
}
```

**Operations:**
- Insert: O(log n) average, O(n) worst case
- Search: O(log n) average, O(n) worst case
- Delete: O(log n) average, O(n) worst case
- Traversals: O(n)

---

## Graph Data Structures

### Graph using Adjacency Matrix

**File:** `GraphAdjacencyMatrix.java`

```java
package in.blr.cdac.sorting;

public class GraphAdjacencyMatrix {
    
    int vertex;
    int matrix[][];

    public GraphAdjacencyMatrix(int vertex) {
        this.vertex = vertex;
        matrix = new int[vertex][vertex];
    }

    public void addEdge(int source, int destination) {
        // "1" represents an edge
        matrix[source][destination] = 1;

        // for undirected graph, a reverse edge also to be established
//      matrix[destination][source] = 1;
    }

    public void printGraph() {
        System.out.println("Adjacency Matrix");
        System.out.println("================");
        for (int i = 0; i < vertex; i++) {
            for (int j = 0; j <vertex ; j++) {
                System.out.print(matrix[i][j]+ " ");
            }
            System.out.println();
        }
        System.out.println();
        System.out.println("Vertices and their neighbours");
        System.out.println("=============================");
        for (int i = 0; i < vertex; i++) {
            System.out.print("Vertex " + i + " is connected to: ");
            for (int j = 0; j <vertex ; j++) {
                if(matrix[i][j]==1){
                    System.out.print(j + " ");
                }
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        
        GraphAdjacencyMatrix graph = new GraphAdjacencyMatrix(6);
        
        graph.addEdge(1, 0);
        graph.addEdge(1, 5);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(0, 2);
        graph.addEdge(0, 4);
        graph.addEdge(0, 3);
        graph.addEdge(2, 4);
        graph.addEdge(4, 3);
        graph.addEdge(3, 5);
        
        graph.printGraph();
    }
}
```

**Space Complexity:** O(V²)

---

### Graph using Adjacency List with Traversals

**File:** `GraphDS.java`

```java
package in.blr.cdac.pgdac.July11;

import java.util.*;

class Graph {
    private Map<Vertex, List<Vertex>> adjacentVertices;

    class Vertex {
        String label;

        Vertex(String label) {
            this.label = label;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Vertex vertex = (Vertex) obj;
            return Objects.equals(label, vertex.label);
        }

        @Override
        public int hashCode() {
            return Objects.hash(label);
        }

        @Override
        public String toString() {
            return label;
        }
    }

    public Graph() {
        this.adjacentVertices = new HashMap<>();
    }

    public void addVertex(String label) {
        adjacentVertices.putIfAbsent(new Vertex(label), new ArrayList<>());
    }

    public void addEdge(String label1, String label2) {
        Vertex v1 = new Vertex(label1);
        Vertex v2 = new Vertex(label2);
        List<Vertex> list = adjacentVertices.get(v1);
        if (list != null) {
            list.add(v2);
        } else {
            System.err.println("⚠️ Warning: Vertex " + label1 + " not found!");
        }
    }

    public List<Vertex> getAdjVertices(String label) {
        List<Vertex> list = adjacentVertices.get(new Vertex(label));
        if (list == null)
            return new ArrayList<>(); // prevent NullPointerException
        return list;
    }

    public String printGraph() {
        StringBuilder sb = new StringBuilder();
        for (Vertex v : adjacentVertices.keySet()) {
            sb.append(v.label).append(" -> ");
            List<Vertex> adj = adjacentVertices.get(v);
            for (Vertex a : adj) {
                sb.append(a.label).append(" ");
            }
            sb.append("\n");
        }
        return sb.toString();
    }
}

class GraphTraversal {

    static Set<String> depthFirstTraversal(Graph graph, String startAt) {
        Set<String> visited = new LinkedHashSet<>();
        Stack<String> stack = new Stack<>();
        stack.push(startAt);

        while (!stack.isEmpty()) {
            String vertex = stack.pop();
            if (!visited.contains(vertex)) {
                visited.add(vertex);
                for (Graph.Vertex v : graph.getAdjVertices(vertex)) {
                    stack.push(v.label);
                }
            }
        }
        return visited;
    }

    static Set<String> breadthFirstTraversal(Graph graph, String startAt) {
        Set<String> visited = new LinkedHashSet<>();
        Queue<String> queue = new LinkedList<>();
        queue.add(startAt);
        visited.add(startAt);

        while (!queue.isEmpty()) {
            String vertex = queue.poll();
            for (Graph.Vertex v : graph.getAdjVertices(vertex)) {
                if (!visited.contains(v.label)) {
                    visited.add(v.label);
                    queue.add(v.label);
                }
            }
        }
        return visited;
    }
}

public class GraphDS {

    public static void main(String[] args) {
        new GraphDS().createGraph();
    }

    Graph createGraph() {
        Graph graph = new Graph();

        graph.addVertex("Chennai");
        graph.addVertex("Bangalore");
        graph.addVertex("Tokyo");
        graph.addVertex("London");
        graph.addVertex("Hongkong");
        graph.addVertex("NewYork");

        graph.addEdge("Chennai", "Bangalore");
        graph.addEdge("Chennai", "Tokyo");
        graph.addEdge("Chennai", "London");
        graph.addEdge("Chennai", "NewYork");
        graph.addEdge("Bangalore", "Hongkong");
        graph.addEdge("Bangalore", "NewYork");
        graph.addEdge("Hongkong", "NewYork");
        graph.addEdge("NewYork", "London");
        graph.addEdge("London", "Tokyo");

        System.out.println("The Graph:");
        System.out.println(graph.printGraph());

        System.out.println("DFS Traversal from Chennai: " +
                GraphTraversal.depthFirstTraversal(graph, "Chennai"));

        System.out.println("BFS Traversal from Chennai: " +
                GraphTraversal.breadthFirstTraversal(graph, "Chennai"));

        return graph;
    }
}
```

**Traversal Time Complexity:** O(V + E)  
**Space Complexity:** O(V)

---

## Linear Data Structures

### Stack Using Array

**File:** `StackUsingArray.java`

```java
package in.blr.cdac.pgdac.day4;

public class StackUsingArray {

    int arr[], top=-1, capacity=0;
    
    public StackUsingArray(int size) {
        capacity = size;
        arr = new int[capacity];
        top = -1;
    }
    
    public static void main(String[] args) {
        StackUsingArray sua = new StackUsingArray(5);
        sua.push(10);
        sua.push(10);
        sua.push(10);
        sua.push(10);
        sua.push(12);
        sua.peek();
    }
    
    // push operation is to add element to the top of the stack
    // Check if the stack is full (overflow)
    public void push(int item) {
        if(isFull()) {
            System.out.println("Stack Overflow!!!");
            return;
        }
        arr[++top] = item;
    }
    
    // delete the top element from the stack
    // is the stack empty (prerequisite)
    public void pop() {
        if(isEmpty()) {
            System.out.println("Stack Underflow!!!");
            return;
        }
        top--;
    }
    
    // is to check the element present in the top of the stack
    // is the stack empty (prerequisite)
    public void peek() {
        if(isEmpty()) {
            System.out.println("Stack Underflow!!!");
            return;
        }
        System.out.println("the top element is: "+arr[top]);
    }

    // check if the stack in empty.
    // this is a prerequisite check for pop() and peek() operation 
    boolean isEmpty() {
        return top==-1;
    }
    
    // checks if the stack is full.
    // this is a prerequisite check for push() operation
    boolean isFull() {
        return top == capacity-1;
    }
}
```

**Operations:**
- Push: O(1)
- Pop: O(1)
- Peek: O(1)
- Space: O(n)

---

### Stack Using Java Utils

**File:** `StackInJavaUtils.java`

```java
package in.blr.cdac.pgdac.day7;

import java.util.Stack;

public class StackInJavaUtils {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<String>();
        stack.push("push1");
        stack.push("push2");
        System.out.println(stack.peek());
        stack.pop();
        System.out.println(stack.peek());
        stack.pop();
        System.out.println(stack.peek()); // EmptyStackException
        stack.pop();
    }
}
```

---

### Queue Using Array

**File:** `QueueUsingArray.java`

```java
package com.example.datastructure;

public class QueueUsingArray {
    
    static int arr[];
    static int size;
    static int rear=-1;
    
    public QueueUsingArray(int n) {
        arr=new int[n];
        this.size=n;
    }
    
    public static boolean isEmpty() {
        return rear ==-1;
    }
    
    //enqueue-->ADD data
    public static void add(int data) {
        
        if(rear == size-1) {
            System.out.println("Queue is full");
            return;
        }
        
        rear++;
        arr[rear] = data;
    }
    
    //dequeue--> Remove data
    public static int remove() {
        
        if(isEmpty()) {
            System.out.println("Queue is Full");
            return -1;
        }
        
        int front = arr[0];
        for(int i=0; i<rear; i++) {
            arr[i] = arr[i+1];
        }
        rear--;
        return front;
    }
    
    public static int peek() {
        
        if(isEmpty()) {
            System.out.println("Queue is full");
            return -1;
        }
        
        int front = arr[0];
        return front;
    }
    
    public static void main(String[] args) {
        QueueUsingArray q = new QueueUsingArray(5);
        
        q.add(10);
        q.add(20);
        q.add(30);
        q.add(40);
        
        while(!q.isEmpty()) {
            System.out.println("values for the Queue array---" + q.peek());
            q.remove();
        }
    }
}
```

**Operations:**
- Enqueue: O(1)
- Dequeue: O(n) - due to shifting elements
- Peek: O(1)

---

### Circular Queue

**File:** `CircularQueue.java`

```java
package com.example.datastructure;

public class CircularQueue {

    int arr[];
    int size;
    int rear;
    int front;

    public CircularQueue(int n) {
        arr = new int[n];
        size = n;
        rear = -1;
        front = -1;
    }

    public boolean isEmpty() {
        return rear == -1 && front == -1;
    }

    public boolean isFull() {
        return (rear + 1) % size == front;
    }

    public void enqueue(int data) {
        if (isFull()) {
            System.out.println("Queue is full");
            return;
        }

        if (isEmpty()) {
            front = 0;
        }

        rear = (rear + 1) % size;
        arr[rear] = data;
    }

    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }

        int result = arr[front];

        if (rear == front) {
            rear = front = -1;
        } else {
            front = (front + 1) % size;
        }

        return result;
    }

    public int peek() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        return arr[front];
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return;
        }

        int i = front;
        System.out.print("Queue: ");
        while (true) {
            System.out.print(arr[i] + " ");
            if (i == rear) break;
            i = (i + 1) % size;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        CircularQueue cq = new CircularQueue(5);
        cq.enqueue(10);
        cq.enqueue(20);
        cq.enqueue(30);
        cq.enqueue(40);
        cq.display();

        System.out.println("Peek: " + cq.peek());

        cq.dequeue();
        cq.dequeue();
        cq.display();

        cq.enqueue(50);
        cq.enqueue(60);
        cq.display();
    }
}
```

**Operations:**
- Enqueue: O(1)
- Dequeue: O(1)
- Peek: O(1)
- **Advantage:** No shifting needed, efficient use of space

---

### Priority Queue

**File:** `PriorityQueue.java`

```java
package com.example.datastructure;

public class PriorityQueue {
    private int[] Q;
    private int rear, front, maxSize;

    public PriorityQueue(int size) {
        rear = -1;
        front = 0;
        maxSize = size;
        Q = new int[maxSize];
    }

    public boolean isEmpty() {
        return rear < front;
    }

    public boolean isFull() {
        return rear == maxSize - 1;
    }

    // Insert and maintain ascending order
    public void Enqueue(int e) {
        if (isFull()) {
            System.out.println("Queue is Full");
            return;
        }

        // Insert element
        rear++;
        Q[rear] = e;

        // Sort to maintain priority order (lowest first) 10,20,30,40
        for (int i = front; i < rear; i++) {
            for (int j = front; j < rear - i + front; j++) {
                if (Q[j] > Q[j + 1]) {
                    int temp = Q[j];
                    Q[j] = Q[j + 1];
                    Q[j + 1] = temp;
                }
            }
        }
    }

    public int Dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is Empty");
            return -1;
        }

        int temp = Q[front];
        front++;
        return temp;
    }

    public void printQueue() {
        if (isEmpty()) {
            System.out.println("Queue is Empty");
            return;
        }

        System.out.println("Priority Queue Elements:");
        for (int i = front; i <= rear; i++) {
            System.out.print(Q[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        PriorityQueue pq = new PriorityQueue(5);
        pq.Enqueue(70);
        pq.Enqueue(20);
        pq.Enqueue(40);
        pq.Enqueue(30);
        pq.Enqueue(10);

        pq.printQueue();  // should show ascending order: 10 20 30 40 70

        pq.Dequeue();  // removes 10
        pq.Dequeue();  // removes 20

        pq.printQueue();  // remaining: 30 40 70
    }
}
```

**Operations:**
- Enqueue: O(n²) - due to sorting after insertion
- Dequeue: O(1)
- **Note:** Elements are maintained in ascending order (lowest priority first)

---

### Singly Linked List

**File:** `SinglyLinkedList.java`

```java
public class SinglyLinkedList {

    static SinglyLinkedListNode head;

    //INSERT Operation
    public void insertAtTheBeginning(int data) {
        SinglyLinkedListNode newnode = new SinglyLinkedListNode(data);   // creation of a new node
        newnode.next = head;
        head = newnode;

        // Traversing the list
        SinglyLinkedListNode temp = head;
        while(temp.next!=null) {
            System.out.print(temp.data+" , ");
            temp = temp.next;
        }
        System.out.println();
    }

    public void insertAttheEndoftheList(int data) {
        SinglyLinkedListNode newnode = new SinglyLinkedListNode(data);   // creation of a new node
        if(head==null) {
            System.out.println("Empty list!!!. So the new node will be the first node in the list");
            head = newnode;
            return;
        }
        SinglyLinkedListNode temp = head;
        while(temp.next!=null) { // this iterates till the last node in the list
            temp = temp.next;
        } // at the end of this loop we would have reached the last node of the list
        temp.next = newnode;
        return;
    }

    // the variable 'value' indicates the node data after which the new node is to be inserted
    public void insertAfteraGivenNode(int data, int value) {
        SinglyLinkedListNode newnode = new SinglyLinkedListNode(data);   // creation of a new node
        if(head == null) {
            head = newnode;
        }
        SinglyLinkedListNode temp = head;

        while(temp.next!=null && temp.data!=value) {
            temp = temp.next;
        }
        newnode.next = temp.next;  // new node connects itself to the list
        temp.next = newnode; // the list includes the new node into it
        return;
    }

    public void insertBeforeaGivenNode(int data, int value) {
        SinglyLinkedListNode newnode = new SinglyLinkedListNode(data);   // creation of a new node
        if(head == null) {
            head = newnode;
            return;
        }
        SinglyLinkedListNode temp = head;
        SinglyLinkedListNode prev = null;
        while(temp.next!=null && temp.data!=value) {
            prev = temp;    // this previous keeps track of the node just before the temp node
            temp = temp.next;
        } // at the end of iteration (a) we may be at the end of the list or (b) we would have located the element we are looking for
        newnode.next = temp;
        prev.next = newnode;

        /* To insert a node after the 7th node
         * int count = 0;
         * while(temp.next!=null) {
         *      count++;
         *      if(count==7) {
         *          break;
         *      }
         *      temp = temp.next;
         * }
         * newnode.next = temp.next;
         * temp.next = newnode;
         * 
         */
        return;
    }
    
    // DELETE operation on a list
    public void deleteTheFirstNode() {
        if(head==null) {
            System.out.println("empty list. nothing to delete");
            return;
        }
        SinglyLinkedListNode temp = head;
        head = head.next;
        temp = null;
        return;
    }

    public void deleteTheLastNode() {
        if(head==null) { // scenario: where there is no node in the list
            System.out.println("nothing to delete because list is empty");
            return;
        }
        if(head.next == null) {  // scenario: where only one node exists in the list
            head = null;
            return;
        }
        SinglyLinkedListNode temp = head;
        SinglyLinkedListNode prev = null;
        while(temp.next!=null) {
            prev = temp;
            temp = temp.next;
        } // end of this iteration the 'prev' will be at the last-but-one node
        prev.next = null;
        return;
    }
    
    public void deleteaNodeinbetween(int value) {
        if(head==null) { // scenario: where there is no node in the list
            System.out.println("nothing to delete because list is empty");
            return;
        }
        if(head.next == null) {  // scenario: where only one node exists in the list
            head = null;
            return;
        }
        SinglyLinkedListNode temp = head;
        SinglyLinkedListNode prev = null;
        while(temp.next!=null && temp.data!=value) {
            prev = temp;
            temp = temp.next;
        } // at the end of this loop, we either exhaust the list or locate the node to be deleted
        if(temp.data==value) {
            prev.next = temp.next; // effectively the node got removed the list at this line
            temp.next = null;
        } else {
            System.out.println("the value not present in the list");
        }
        return;
    }

    public static void main(String[] args) {
        SinglyLinkedList sll = new SinglyLinkedList();
        head = new SinglyLinkedListNode(10);

        sll.insertAtTheBeginning(5);
        sll.insertAtTheBeginning(6);
        sll.insertAtTheBeginning(7);
        sll.insertAtTheBeginning(8);
        sll.insertAtTheBeginning(9);
    }
}

class SinglyLinkedListNode {
    int data;
    SinglyLinkedListNode next;
    SinglyLinkedListNode(int data) {
        this.data = data;
        this.next = null;
    }
}
```

**Operations:**
- Insert at beginning: O(1)
- Insert at end: O(n)
- Delete: O(n)
- Search: O(n)

---

## Recursion & Dynamic Programming

### Understanding Recursion

**File:** `UnderstandingRecursion.java`

```java
public class UnderstandingRecursion {
    public static void main(String[] a) {
        UnderstandingRecursion usr = new UnderstandingRecursion();
        usr.m1();
    }
    void m1() {
        // Termination condition
        System.out.println("m1 called");
        m1();
    }
    void m2() {
        System.out.println("m2 called");
        m1();
    }
}
```

**Note:** This will cause StackOverflowError as there's no termination condition.

---

### Fibonacci - Recursion vs Memoization

**File:** `FibonacciByTwoApproaches.java`

```java
public class FibonacciByTwoApproaches {
    
    // Memoization using an array
    static  long[] arr = new long[45];

    public static void main(String[] a) {

        //System.out.println("number of milliseconds in a day: "+(24L*60*60*1000*1000));
        for(int i=0; i<FibonacciByTwoApproaches.arr.length; i++) {
            arr[i] = -1;
        }
        
        /*long timebeforecall = System.nanoTime();
        System.out.println(new FibonacciByTwoApproaches().fibonacciByRecursion(45));  // 1 1 2 3 5 8 13 21 34
        long timeaftercall = System.nanoTime();
        System.out.println("time taken: "+(timeaftercall-timebeforecall));*/

        long timebeforecall = System.nanoTime();
        System.out.println(new FibonacciByTwoApproaches().fibonacciByMemoization(45));  // 1 1 2 3 5 8 13 21 34
        long timeaftercall = System.nanoTime();
        System.out.println("time taken: "+(timeaftercall-timebeforecall));
    }
    
    long fibonacciByRecursion(long n) {
        if(n==0 || n==1) {
            return n;
        }
        return fibonacciByRecursion(n-1)+fibonacciByRecursion(n-2);
    }

    long fibonacciByMemoization(long n) {
        long fib = 0;
        if(n==0 || n==1) {
            return n;
        } else  if(arr[(int)n]!=-1) {
            return arr[(int)n];  // avoiding the execution of the complete 
// recursion tree under the nth fibonacci call
        } else {
            fib = fibonacciByMemoization(n-1) + fibonacciByMemoization(n-2);
            arr[(int)n] = fib;
            return fib;
        }
    }
}
```

**Time Complexity:**
- Pure Recursion: O(2ⁿ) - Exponential
- With Memoization: O(n) - Linear

**Space Complexity:**
- Pure Recursion: O(n) - recursion stack
- With Memoization: O(n) - array + recursion stack

---

## Backtracking Problems

### Four Queens Problem

**File:** `FourQueenProblem.java`

```java
public class FourQueenProblem {
    final int chessboardsize = 4;

    // check if the Queen can be places at the said ('row', 'col') location
    boolean placeTheQueenAtLocation(int arr[][], int row, int col) {
        int i, j;

        // horizontally left
        for (i = 0; i < col; i++)
            if (arr[row][i] == 1)
                return false;

        // diagonally upwards left
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (arr[i][j] == 1)
                return false;

        // diagonally downwards left
        for (i = row, j = col; j >= 0 && i < chessboardsize; i++, j--)
            if (arr[i][j] == 1)
                return false;

        return true;
    }

    // identify if the Queen can be placed at column 'col'
    boolean selectLocationforQueen(int arr[][], int col) {
        // termination condition: all 4 Queens placed successfully
        if (col >= chessboardsize)
            return true;

        // check if the Queen can be placed at the ith row of the given column
        for (int i = 0; i < chessboardsize; i++) {
            // check if the Queen can be placed at arr[i][col]
            if (placeTheQueenAtLocation(arr, i, col)) {
                
                arr[i][col] = 1;  // placed the Queen at ith row of col-th column

                if (selectLocationforQueen(arr, col + 1) == true) {
                    return true;
                }

                // backtrack if the Queen can't be placed at ith row of col-th column
                arr[i][col] = 0;
            }
        }
        return false;
    }

    // Initializing the board with all zeroes, indicating empty board with no Queens on it
    boolean initializingBoard() {
        int arr[][] = { { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 } };

        if (selectLocationforQueen(arr, 0) == false) {
            System.out.print("Failed to place the 4 Queens on the board!");
            return false;
        }

        displayTheQueensOnTheBoard(arr);
        return true;
    }

    // display the placement of the Queens on the 4X4 chess board
    void displayTheQueensOnTheBoard(int arr[][]) {
        for (int i = 0; i < chessboardsize; i++) {
            for (int j = 0; j < chessboardsize; j++)
                System.out.print(" " + arr[i][j] + " ");
            System.out.println();
        }
    }

    public static void main(String args[]) {
        FourQueenProblem Queen = new FourQueenProblem();
        Queen.initializingBoard();
    }
}
```

**Algorithm:** Backtracking  
**Time Complexity:** O(n!) worst case  
**Problem:** Place N queens on an N×N chessboard so that no two queens attack each other

---

### Traveling Salesman Problem (TSP)

**File:** `TSPDemo.java`

```java
package in.blr.cdac.pgdac.July11;

import java.util.*;

public class TSPDemo {

    // Number of cities
    static int N = 4;

    // Distance matrix (symmetric for simplicity)
    static int[][] distance = {
        { 0, 10, 15, 20 },
        { 10, 0, 35, 25 },
        { 15, 35, 0, 30 },
        { 20, 25, 30, 0 }
    };

    // Function to find the minimum path cost using built-in permutations
    static int travellingSalesman(int start) {
        // Store all cities except the starting city
        List<Integer> cities = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            if (i != start)
                cities.add(i);
        }

        int minPath = Integer.MAX_VALUE;

        // Generate all permutations manually using recursion
        List<List<Integer>> allPermutations = generatePermutations(cities);

        // Evaluate each possible route
        for (List<Integer> route : allPermutations) {
            int currentCost = 0;
            int currentCity = start;

            for (int nextCity : route) {
                currentCost += distance[currentCity][nextCity];
                currentCity = nextCity;
            }

            // Return to start
            currentCost += distance[currentCity][start];
            minPath = Math.min(minPath, currentCost);
        }

        return minPath;
    }

    // Recursive method to generate all permutations of a list
    static List<List<Integer>> generatePermutations(List<Integer> cities) {
        List<List<Integer>> result = new ArrayList<>();
        permuteHelper(cities, 0, result);
        return result;
    }

    static void permuteHelper(List<Integer> arr, int start, List<List<Integer>> result) {
        if (start == arr.size() - 1) {
            result.add(new ArrayList<>(arr));
            return;
        }
        for (int i = start; i < arr.size(); i++) {
            Collections.swap(arr, start, i);
            permuteHelper(arr, start + 1, result);
            Collections.swap(arr, start, i); // backtrack
        }
    }

    public static void main(String[] args) {
        int startCity = 0;
        int minCost = travellingSalesman(startCity);
        System.out.println("Minimum cost of the tour = " + minCost);
    }
}
```

**Algorithm:** Brute Force with Permutations  
**Time Complexity:** O(n!)  
**Problem:** Find the shortest possible route that visits each city exactly once and returns to the origin city

---

## Complexity Summary

| Algorithm/DS | Time Complexity (Avg) | Space Complexity |
|-------------|----------------------|------------------|
| Binary Search (Iterative) | O(log n) | O(1) |
| Binary Search (Recursive) | O(log n) | O(log n) |
| Selection Sort | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n) |
| Heap Sort | O(n log n) | O(1) |
| BST Insert/Delete/Search | O(log n) | O(log n) |
| Graph DFS/BFS | O(V + E) | O(V) |
| Stack Operations | O(1) | O(n) |
| Queue Operations | O(1) | O(n) |
| Linked List Insert | O(1) at head | O(1) |
| Fibonacci (Recursion) | O(2ⁿ) | O(n) |
| Fibonacci (Memoization) | O(n) | O(n) |
| N-Queens | O(n!) | O(n²) |
| TSP (Brute Force) | O(n!) | O(n) |

---

**End of Reference Guide**
