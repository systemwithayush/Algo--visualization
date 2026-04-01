export type FlashcardType = 'mcq' | 'concept' | 'output';

export interface Flashcard {
  id: string;
  topicId: string;
  type: FlashcardType;
  question: string;
  options?: string[]; // For MCQs
  codeSnippet?: string; // For Output-based
  answer: string;
  explanation: string;
}

export const flashcardsData: Flashcard[] = [
  // ARRAYS (10)
  {
    id: "arr-1", topicId: "arrays", type: "concept",
    question: "What is the primary characteristic of an array's memory allocation?",
    answer: "Contiguous",
    explanation: "Elements in an array are stored in a single, continuous block of memory, which allows for O(1) index-based access."
  },
  {
    id: "arr-2", topicId: "arrays", type: "mcq",
    question: "What is the time complexity to access an element at index i in an array?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
    answer: "O(1)",
    explanation: "Because elements are stored contiguously, the address can be calculated directly using: Address = Base + (index * size)."
  },
  {
    id: "arr-3", topicId: "arrays", type: "output",
    question: "Input: [10, 20, 30]. Operation: arr.pop(); arr.push(40). What is the array now?",
    answer: "[10, 20, 40]",
    explanation: "pop() removes 30, push(40) adds 40 back to the end."
  },
  {
    id: "arr-4", topicId: "arrays", type: "concept",
    question: "What is a 'Dynamic Array' (e.g., ArrayList)?",
    answer: "An array that resizes itself",
    explanation: "When a dynamic array reaches capacity, it creates a larger array (usually 2x size) and copies existing elements over."
  },
  {
    id: "arr-5", topicId: "arrays", type: "mcq",
    question: "Which of these takes O(n) time in a standard array?",
    options: ["Accessing by index", "Updating an element", "Inserting at the beginning", "Getting the length"],
    answer: "Inserting at the beginning",
    explanation: "Every single existing element must be shifted one position to the right."
  },
  {
    id: "arr-6", topicId: "arrays", type: "concept",
    question: "What is 2D Array addressing?",
    answer: "Row-major or Column-major",
    explanation: "Linear mapping of 2D indices to 1D memory based on storing rows first or columns first."
  },
  {
    id: "arr-7", topicId: "arrays", type: "output",
    question: "arr = [1, 2, 3]; arr[5] = 10; What is arr.length?",
    answer: "6",
    explanation: "JS arrays are sparse. Setting index 5 creates slots for indices 3 and 4 (empty), so length becomes 6."
  },
  {
    id: "arr-8", topicId: "arrays", type: "mcq",
    question: "What is the space complexity of an array of size n?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: "O(n)",
    explanation: "It stores n elements, therefore it takes linear space."
  },
  {
    id: "arr-9", topicId: "arrays", type: "concept",
    question: "What is Kadane's Algorithm used for?",
    answer: "Maximum Subarray Sum",
    explanation: "It iterates through the array once (O(n)) to find the contiguous subarray with the largest sum."
  },
  {
    id: "arr-10", topicId: "arrays", type: "mcq",
    question: "If an array is sorted, which search algorithm is most efficient?",
    options: ["Linear Search", "Binary Search", "Jump Search", "Depth First Search"],
    answer: "Binary Search",
    explanation: "Binary search takes O(log n) compared to linear search's O(n)."
  },

  // SORTING (10)
  {
    id: "sort-1", topicId: "sorting", type: "concept",
    question: "What is 'In-place' sorting?",
    answer: "Sorting without extra space",
    explanation: "An algorithm is in-place if it requires O(1) or O(log n) extra space beyond the input array."
  },
  {
    id: "sort-2", topicId: "sorting", type: "mcq",
    question: "Which sorting algorithm has O(n^2) average and worst-case complexity?",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
    answer: "Bubble Sort",
    explanation: "Bubble sort nested loops result in n*(n-1)/2 comparisons."
  },
  {
    id: "sort-3", topicId: "sorting", type: "output",
    question: "Array: [5, 1, 4, 2]. Result after one pass of Bubble Sort?",
    answer: "[1, 4, 2, 5]",
    explanation: "The largest element (5) bubbles up to the last position."
  },
  {
    id: "sort-4", topicId: "sorting", type: "concept",
    question: "What is 'Stable' sorting?",
    answer: "Preserves relative order of equal elements",
    explanation: "If two elements have the same key, a stable sort keeps them in the same relative order as they were before sorting."
  },
  {
    id: "sort-5", topicId: "sorting", type: "mcq",
    question: "Which sorting algorithm is 'Divide and Conquer'?",
    options: ["Insertion Sort", "Selection Sort", "Merge Sort", "Bubble Sort"],
    answer: "Merge Sort",
    explanation: "It recursively splits the array into halves, sorts them, and merges them back."
  },
  {
    id: "sort-6", topicId: "sorting", type: "concept",
    question: "How does Selection Sort work?",
    answer: "Repeatedly finding the minimum element",
    explanation: "It finds the smallest element in the unsorted portion and swaps it with the first element of that portion."
  },
  {
    id: "sort-7", topicId: "sorting", type: "mcq",
    question: "What is the worst-case time complexity of Merge Sort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    answer: "O(n log n)",
    explanation: "Merge sort split/merge logic consistently takes O(n log n) regardless of the initial order."
  },
  {
    id: "sort-8", topicId: "sorting", type: "concept",
    question: "What is a 'Pivot' in Quick Sort?",
    answer: "An element used for partitioning",
    explanation: "Quick sort picks a pivot and partitions the array such that elements smaller than the pivot are on the left and larger on the right."
  },
  {
    id: "sort-9", topicId: "sorting", type: "output",
    question: "Array: [3, 8, 2, 5, 1]. Result of Selection Sort after first swap?",
    answer: "[1, 8, 2, 5, 3]",
    explanation: "Smallest element (1) is found and swapped with the first element (3)."
  },
  {
    id: "sort-10", topicId: "sorting", type: "mcq",
    question: "Which algorithm is generally preferred for sorting large datasets in memory?",
    options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
    answer: "Quick Sort",
    explanation: "Despite its O(n^2) worst case, Quick Sort has a very small constant factor and is usually faster in practice."
  },

  // SEARCHING (10)
  {
    id: "search-1", topicId: "searching", type: "concept",
    question: "What is the prerequisite for Binary Search?",
    answer: "Sorted Data",
    explanation: "Binary search depends on the data being sorted to eliminate half of the remaining elements in each step."
  },
  {
    id: "search-2", topicId: "searching", type: "mcq",
    question: "What is the time complexity of Linear Search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(n)",
    explanation: "In the worst case, you might have to check every element in the list."
  },
  {
    id: "search-3", topicId: "searching", type: "output",
    question: "[1, 3, 5, 7, 9]. Target: 7. Indices checked in Binary Search?",
    answer: "Index 2 (value 5) then Index 3 (value 7)",
    explanation: "Middle is 5. Since 7 > 5, search right. Middle of [7, 9] is 7. Found!"
  },
  {
    id: "search-4", topicId: "searching", type: "concept",
    question: "What is Hashing?",
    answer: "Mapping data to a fixed-size index",
    explanation: "A Hash Function takes an input (key) and produces an integer index within the bounds of a hash table."
  },
  {
    id: "search-5", topicId: "searching", type: "mcq",
    question: "What is a 'Collision' in Hashing?",
    options: ["Array overflow", "Search fail", "Two keys mapping to same index", "Data corruption"],
    answer: "Two keys mapping to same index",
    explanation: "Hash functions may map different inputs to the same output index."
  },
  {
    id: "search-6", topicId: "searching", type: "concept",
    question: "What is 'Chaining' in Hashing?",
    answer: "Using Linked Lists to handle collisions",
    explanation: "Each bucket in the hash table points to a linked list of all items that hashed to that index."
  },
  {
    id: "search-7", topicId: "searching", type: "mcq",
    question: "Average time complexity for Search in a well-distributed Hash Table?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(1)",
    explanation: "With a good hash function and proper sizing, entries can be located nearly instantly."
  },
  {
    id: "search-8", topicId: "searching", type: "concept",
    question: "What is Interpolation Search?",
    answer: "Search based on estimated position",
    explanation: "It's an improvement over binary search for uniformly distributed sorted data."
  },
  {
    id: "search-9", topicId: "searching", type: "output",
    question: "Linear search for 4 in [1, 2, 3, 4, 5]. Comparisons made?",
    answer: "4",
    explanation: "Checks index 0, 1, 2, and then finds it at index 3."
  },
  {
    id: "search-10", topicId: "searching", type: "mcq",
    question: "Worst case search time in a Hash Table (all keys collide)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(n)",
    explanation: "If all elements go into one bucket, search becomes a linear search through that bucket's list."
  },

  // LINKED LIST (10)
  {
    id: "ll-1", topicId: "linked-list", type: "concept",
    question: "What is a Node in a Linked List?",
    answer: "Data + Pointer",
    explanation: "Each element is stored in a node that contains its value and a reference to the next node."
  },
  {
    id: "ll-2", topicId: "linked-list", type: "mcq",
    question: "What is the complexity of inserting a node at the Head?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)",
    explanation: "You just point the new node's next to the current head and update the head reference."
  },
  {
    id: "ll-3", topicId: "linked-list", type: "output",
    question: "Head -> [10] -> [20] -> Null. Operation: Add [5] at head. New list order?",
    answer: "Head -> [5] -> [10] -> [20]",
    explanation: "New node [5] becomes the first element."
  },
  {
    id: "ll-4", topicId: "linked-list", type: "concept",
    question: "What is a Doubly Linked List?",
    answer: "Nodes have Next and Previous pointers",
    explanation: "Allows traversal in both directions (forward and backward)."
  },
  {
    id: "ll-5", topicId: "linked-list", type: "mcq",
    question: "What is the time complexity to find the nth element in a Linked List?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(n)",
    explanation: "Unlike arrays, you must traverse node-by-node from the head to reach the nth element."
  },
  {
    id: "ll-6", topicId: "linked-list", type: "concept",
    question: "What is a Circular Linked List?",
    answer: "Last node points back to the Head",
    explanation: "The list has no Null terminator; it forms a circle."
  },
  {
    id: "ll-7", topicId: "linked-list", type: "mcq",
    question: "Primary disadvantage of Linked Lists vs Arrays?",
    options: ["Difficult insertion", "Wasted space for pointers", "Linear expansion", "Dynamic size"],
    answer: "Wasted space for pointers",
    explanation: "Each node must store an extra reference (pointer), increasing overall memory overhead."
  },
  {
    id: "ll-8", topicId: "linked-list", type: "concept",
    question: "What is 'Floyd’s Cycle Finding Algorithm'?",
    answer: "Fast and Slow pointer approach",
    explanation: "Used to detect if a linked list contains a loop (cycle)."
  },
  {
    id: "ll-9", topicId: "linked-list", type: "output",
    question: "List: A->B->C. Operation: Delete B. What is After A?",
    answer: "C",
    explanation: "A.next is updated to point directly to C."
  },
  {
    id: "ll-10", topicId: "linked-list", type: "mcq",
    question: "Which operation is more efficient in Linked List than in Array?",
    options: ["Random access", "Memory usage", "Deletion at a known position", "Binary search"],
    answer: "Deletion at a known position",
    explanation: "In arrays, deletion requires shifting O(n) elements. In linked lists, it's just updating pointers (O(1))."
  },

  // STACKS & QUEUES (10)
  {
    id: "sq-1", topicId: "stack-queue", type: "concept",
    question: "What is the principle of a Stack?",
    answer: "LIFO (Last In First Out)",
    explanation: "The last element added is the first one to be removed (like a stack of plates)."
  },
  {
    id: "sq-2", topicId: "stack-queue", type: "mcq",
    question: "Which operation is used to remove an element from a Queue?",
    options: ["Pop", "Push", "Enqueue", "Dequeue"],
    answer: "Dequeue",
    explanation: "Enqueue adds to the back, Dequeue removes from the front."
  },
  {
    id: "sq-3", topicId: "stack-queue", type: "output",
    question: "Stack: []. Ops: Push(1), Push(2), Pop(). What is currently in the stack?",
    answer: "[1]",
    explanation: "2 was added last and removed first."
  },
  {
    id: "sq-4", topicId: "stack-queue", type: "concept",
    question: "What is the 'Top' of a stack?",
    answer: "The pointer to the last element added",
    explanation: "All operations (push, pop, peek) occur at the Top index or reference."
  },
  {
    id: "sq-5", topicId: "stack-queue", type: "mcq",
    question: "Which data structure is used for Breadth-First Search (BFS)?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    explanation: "BFS explores neighbors level-by-level, necessitating a First-In-First-Out approach."
  },
  {
    id: "sq-6", topicId: "stack-queue", type: "concept",
    question: "What is an 'Overflow' in a stack?",
    answer: "Pushing to a full stack",
    explanation: "Occurs when a fixed-size stack is full and an attempt is made to add another element."
  },
  {
    id: "sq-7", topicId: "stack-queue", type: "mcq",
    question: "Which data structure is used for Depth-First Search (DFS)?",
    options: ["Stack", "Queue", "Array", "Linked List"],
    answer: "Stack",
    explanation: "DFS naturally uses recursion (the system stack) or a manual stack to track path backtracking."
  },
  {
    id: "sq-8", topicId: "stack-queue", type: "concept",
    question: "What is a Deque (Double-Ended Queue)?",
    answer: "Allows insertion/deletion at both ends",
    explanation: "Combines properties of both stacks and queues."
  },
  {
    id: "sq-9", topicId: "stack-queue", type: "output",
    question: "Queue: [10, 20]. Ops: Enqueue(30), Dequeue(). New front?",
    answer: "20",
    explanation: "10 is dequeued. 20 becomes the new front."
  },
  {
    id: "sq-10", topicId: "stack-queue", type: "mcq",
    question: "Time complexity for Push/Pop in a Stack?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(1)",
    explanation: "Stack operations are localized to the 'Top' and don't depend on the number of elements."
  },

  // TREES (10)
  {
    id: "tree-1", topicId: "trees", type: "concept",
    question: "What defines a Binary Tree?",
    answer: "Each node has at most 2 children",
    explanation: "Named Left and Right children."
  },
  {
    id: "tree-2", topicId: "trees", type: "mcq",
    question: "What is a Binary Search Tree (BST)?",
    options: ["Sorted tree", "Max 2 children", "Left < Parent < Right", "Perfectly balanced"],
    answer: "Left < Parent < Right",
    explanation: "A specific binary tree where the left subtree contains values smaller than the root, and right subtree contains larger values."
  },
  {
    id: "tree-3", topicId: "trees", type: "output",
    question: "Root(10) -> Left(5), Right(15). In-order traversal output?",
    answer: "5, 10, 15",
    explanation: "In-order follows Left -> Root -> Right."
  },
  {
    id: "tree-4", topicId: "trees", type: "concept",
    question: "What is the 'Height' of a tree?",
    answer: "Number of edges on longest path to a leaf",
    explanation: "Represents the depth of the deepest node in the tree."
  },
  {
    id: "tree-5", topicId: "trees", type: "mcq",
    question: "What is the height of a balanced binary tree with N nodes?",
    options: ["O(N)", "O(N log N)", "O(log N)", "O(1)"],
    answer: "O(log N)",
    explanation: "Logarithmic height allows for efficient search/insertion."
  },
  {
    id: "tree-6", topicId: "trees", type: "concept",
    question: "What is an AVL Tree?",
    answer: "A self-balancing Binary Search Tree",
    explanation: "Ensures the heights of two child subtrees of any node differ by at most one."
  },
  {
    id: "tree-7", topicId: "trees", type: "mcq",
    question: "Which traversal visits nodes level by level?",
    options: ["Pre-order", "In-order", "Post-order", "Level-order (BFS)"],
    answer: "Level-order (BFS)",
    explanation: "Visits root, then children, then grandchildren, etc."
  },
  {
    id: "tree-8", topicId: "trees", type: "concept",
    question: "What is a 'Leaf' node?",
    answer: "A node with no children",
    explanation: "The terminal nodes of a tree."
  },
  {
    id: "tree-9", topicId: "trees", type: "output",
    question: "Binary Heap: [100, 50, 40]. Extract Max. New root?",
    answer: "50",
    explanation: "Max heap removes the root (100) and replaces it with the last node, then 'heaps down'."
  },
  {
    id: "tree-10", topicId: "trees", type: "mcq",
    question: "Time complexity of search in a skewed (unbalanced) BST?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n!)"],
    answer: "O(n)",
    explanation: "If the tree is skewed to one side, it effectively becomes a linked list."
  },

  // GRAPHS (10)
  {
    id: "graph-1", topicId: "graphs", type: "concept",
    question: "What is a Graph?",
    answer: "Vertices + Edges",
    explanation: "A collection of nodes (vertices) connected by links (edges)."
  },
  {
    id: "graph-2", topicId: "graphs", type: "mcq",
    question: "Which data structure is used to represent a dense graph?",
    options: ["Adjacency List", "Adjacency Matrix", "Stack", "Binary Tree"],
    answer: "Adjacency Matrix",
    explanation: "A V x V matrix is efficient for checking connections in graphs with many edges."
  },
  {
    id: "graph-3", topicId: "graphs", type: "output",
    question: "Directed Graph: A->B, B->C. Can you reach C from A?",
    answer: "Yes",
    explanation: "A via B leads to C."
  },
  {
    id: "graph-4", topicId: "graphs", type: "concept",
    question: "What is Dijkstra's Algorithm?",
    answer: "Shortest path in weighted graphs",
    explanation: "Finds the shortest path from a single source to all other vertices in a non-negative weighted graph."
  },
  {
    id: "graph-5", topicId: "graphs", type: "mcq",
    question: "What is the time complexity of BFS using an Adjacency List?",
    options: ["O(V)", "O(E)", "O(V + E)", "O(V^2)"],
    answer: "O(V + E)",
    explanation: "Visits every vertex and traverses every edge once."
  },
  {
    id: "graph-6", topicId: "graphs", type: "concept",
    question: "What is a 'Cycle' in a graph?",
    answer: "A path that starts and ends at same vertex",
    explanation: "A sequence of edges where you can return to the starting point without retraining any edge."
  },
  {
    id: "graph-7", topicId: "graphs", type: "mcq",
    question: "Which algorithm finds the Minimum Spanning Tree (MST)?",
    options: ["Dijkstra", "Kruskal", "A*", "Bellman-Ford"],
    answer: "Kruskal",
    explanation: "Kruskal's and Prim's are the two main algorithms for finding MST."
  },
  {
    id: "graph-8", topicId: "graphs", type: "concept",
    question: "What is a 'Directed' vs 'Undirected' graph?",
    answer: "Edges have direction vs Edges are bi-directional",
    explanation: "In directed graphs, an edge (u,v) only allows travel from u to v."
  },
  {
    id: "graph-9", topicId: "graphs", type: "output",
    question: "BFS from 1 on Graph: 1-2, 1-3, 2-4. Discovery order?",
    answer: "1, 2, 3, 4",
    explanation: "Explores neighbors (2,3) before depth (4)."
  },
  {
    id: "graph-10", topicId: "graphs", type: "mcq",
    question: "Which scenario leads to O(V^2) search time?",
    options: ["Adjacency List BFS", "Adjacency Matrix BFS", "Sparse Graph", "Cyclic Graph"],
    answer: "Adjacency Matrix BFS",
    explanation: "Checking neighbors for each vertex requires scanning the entire row of size V."
  },

  // HTML (10)
  {
    id: "html-1", topicId: "html", type: "concept",
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    explanation: "It is the standard markup language for documents designed to be displayed in a web browser."
  },
  {
    id: "html-2", topicId: "html", type: "mcq",
    question: "Which tag is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: "<h1>",
    explanation: "HTML supports headings from h1 (largest) to h6 (smallest)."
  },
  {
    id: "html-3", topicId: "html", type: "output",
    question: "What is the purpose of <a href='...'>?",
    answer: "Hyperlink",
    explanation: "The 'a' tag (anchor) creates a link to another page or location."
  },
  {
    id: "html-4", topicId: "html", type: "concept",
    question: "What is a 'void' element?",
    answer: "An element with no closing tag",
    explanation: "Examples include <img>, <br>, and <hr>."
  },
  {
    id: "html-5", topicId: "html", type: "mcq",
    question: "Which attribute provides alt text for an image?",
    options: ["title", "src", "alt", "desc"],
    answer: "alt",
    explanation: "The alt attribute describes the image for screen readers or if the image fails to load."
  },
  {
    id: "html-6", topicId: "html", type: "concept",
    question: "What is the DOM?",
    answer: "Document Object Model",
    explanation: "A programming interface for web documents. It represents the page as a tree structure of objects."
  },
  {
    id: "html-7", topicId: "html", type: "mcq",
    question: "Which element is used to group block-level content?",
    options: ["<span>", "<div>", "<p>", "<section>"],
    answer: "<div>",
    explanation: "div is a generic block-level container, whereas span is for inline content."
  },
  {
    id: "html-8", topicId: "html", type: "concept",
    question: "What is HTML5?",
    answer: "Latest major version of HTML",
    explanation: "Introduced semantic elements like <header>, <footer>, and <article> along with video/audio support."
  },
  {
    id: "html-9", topicId: "html", type: "output",
    question: "Input: <ul><li>A</li><li>B</li></ul>. What is it?",
    answer: "Unordered List",
    explanation: "Produces a bulleted list of items A and B."
  },
  {
    id: "html-10", topicId: "html", type: "mcq",
    question: "Where is the <title> tag placed?",
    options: ["<body>", "<meta>", "<head>", "<footer>"],
    answer: "<head>",
    explanation: "Metadata and titles belong in the head section, not visible in the document body."
  },

  // CSS (10)
  {
    id: "css-1", topicId: "css", type: "concept",
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    explanation: "Used for describing the presentation of a document written in a markup language like HTML."
  },
  {
    id: "css-2", topicId: "css", type: "mcq",
    question: "How do you select an element with id 'header'?",
    options: [".header", "#header", "*header", "header"],
    answer: "#header",
    explanation: "The hash symbol is the id selector; the dot is the class selector."
  },
  {
    id: "css-3", topicId: "css", type: "output",
    question: "color: red; color: blue; (in same rule). Final color?",
    answer: "blue",
    explanation: "In CSS, later rules override earlier ones of the same specificity."
  },
  {
    id: "css-4", topicId: "css", type: "concept",
    question: "What is the 'Box Model'?",
    answer: "Content, Padding, Border, Margin",
    explanation: "Every HTML element is considered a rectangular box consisting of these four parts."
  },
  {
    id: "css-5", topicId: "css", type: "mcq",
    question: "Which property controls text size?",
    options: ["text-style", "font-weight", "font-size", "text-size"],
    answer: "font-size",
    explanation: "Standard property to adjust the size of typography."
  },
  {
    id: "css-6", topicId: "css", type: "concept",
    question: "What is 'Flexbox'?",
    answer: "A layout model for one-dimensional alignment",
    explanation: "Provides efficient alignment and distribution of space among items in a container."
  },
  {
    id: "css-7", topicId: "css", type: "mcq",
    question: "Which property is used to create space outside an element's border?",
    options: ["padding", "margin", "border-spacing", "outline"],
    answer: "margin",
    explanation: "Padding is inside the border; Margin is outside."
  },
  {
    id: "css-8", topicId: "css", type: "concept",
    question: "What is Specificity?",
    answer: "Weighting system for selectors",
    explanation: "Determines which CSS rule is applied by the browser when multiple rules target the same element."
  },
  {
    id: "css-9", topicId: "css", type: "output",
    question: "display: none; vs visibility: hidden;. Which removes space?",
    answer: "display: none",
    explanation: "display:none removes the element from the flow. visibility:hidden leaves an empty hole."
  },
  {
    id: "css-10", topicId: "css", type: "mcq",
    question: "What is the default position value?",
    options: ["relative", "absolute", "fixed", "static"],
    answer: "static",
    explanation: "Static elements flow normally with the document; they aren't affected by top/left/right/bottom."
  },

  // JS (10)
  {
    id: "js-1", topicId: "js", type: "concept",
    question: "What is JavaScript?",
    answer: "A high-level, dynamic scripting language",
    explanation: "Used to make web pages interactive and as a core technology of the World Wide Web."
  },
  {
    id: "js-2", topicId: "js", type: "mcq",
    question: "How do you declare a constant variable?",
    options: ["var", "let", "const", "def"],
    answer: "const",
    explanation: "Variables declared with const cannot be reassigned."
  },
  {
    id: "js-3", topicId: "js", type: "output",
    question: "console.log(typeof []);",
    answer: "object",
    explanation: "In JS, arrays are technically specific types of objects."
  },
  {
    id: "js-4", topicId: "js", type: "concept",
    question: "What is 'Hoisting'?",
    answer: "Variables/Functions moved to the top of scope",
    explanation: "JS moves declarations (but not initializations) to the top during the compile phase."
  },
  {
    id: "js-5", topicId: "js", type: "mcq",
    question: "Which operator checks for both value and type equality?",
    options: ["=", "==", "===", "!="],
    answer: "===",
    explanation: "=== (Strict equality) return false if types differ (e.g., 5 === '5' is false)."
  },
  {
    id: "js-6", topicId: "js", type: "concept",
    question: "What is a Promise?",
    answer: "Object representing an eventual completion",
    explanation: "Used for asynchronous operations, allowing you to handle success (.then) or failure (.catch)."
  },
  {
    id: "js-7", topicId: "js", type: "mcq",
    question: "Which method adds an element to the end of an array?",
    options: ["shift()", "pop()", "push()", "unshift()"],
    answer: "push()",
    explanation: "push() adds to end; unshift() adds to front."
  },
  {
    id: "js-8", topicId: "js", type: "concept",
    question: "What is a Closure?",
    answer: "A function bundled with its lexical environment",
    explanation: "Allows a function to access variables from an outer scope even after that scope has closed."
  },
  {
    id: "js-9", topicId: "js", type: "output",
    question: "console.log(0.1 + 0.2 === 0.3);",
    answer: "false",
    explanation: "Floating point precision errors make this roughly 0.30000000000000004."
  },
  {
    id: "js-10", topicId: "js", type: "mcq",
    question: "What is 'Event Bubbling'?",
    options: ["Events starting from Document", "Events starting from Target upwards", "Events not firing", "Async execution"],
    answer: "Events starting from Target upwards",
    explanation: "The event triggers on the innermost element first, then propagates up through its parents."
  }
];
