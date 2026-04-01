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
  // Arrays
  {
    id: "arr-1",
    topicId: "arrays",
    type: "concept",
    question: "What is an Array?",
    answer: "A contiguous block of memory",
    explanation: "Arrays store elements of the same type sequentially in memory, allowing access to elements in O(1) time using their index."
  },
  {
    id: "arr-2",
    topicId: "arrays",
    type: "mcq",
    question: "What is the time complexity to insert an element at the beginning of an array (shifting the rest)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: "O(n)",
    explanation: "To insert at the beginning, all existing elements must be shifted one position to the right, taking O(n) time."
  },
  {
    id: "arr-3",
    topicId: "arrays",
    type: "output",
    question: "What is the output of this code snippet?",
    codeSnippet: "let arr = [1, 2, 3];\narr[10] = 99;\nconsole.log(arr.length);",
    answer: "11",
    explanation: "In JavaScript, setting an index far out of bounds expands the array length to accommodate it, leaving empty slots in between."
  },

  // Sorting
  {
    id: "sort-1",
    topicId: "sorting",
    type: "concept",
    question: "How does Bubble Sort work?",
    answer: "Repeatedly swapping adjacent elements",
    explanation: "Bubble Sort works by repeatedly swapping the adjacent elements if they are in the wrong order. This process 'bubbles' the largest element to the end."
  },
  {
    id: "sort-2",
    topicId: "sorting",
    type: "mcq",
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
    answer: "O(n^2)",
    explanation: "The worst-case scenario occurs when the chosen pivot is always the smallest or largest element, leading to highly unbalanced partitions."
  },
  {
    id: "sort-3",
    topicId: "sorting",
    type: "output",
    question: "What is the output after 1 pass of Selection Sort on [64, 25, 12, 22, 11]?",
    codeSnippet: "// Selection sort algorithm logic applied for one iteration minimum element search",
    answer: "[11, 25, 12, 22, 64]",
    explanation: "Selection sort finds the minimum element (11) from the unsorted array and swaps it with the first element (64)."
  },

  // Linked List
  {
    id: "ll-1",
    topicId: "linked-list",
    type: "concept",
    question: "What is a Linked List?",
    answer: "A linear data structure of nodes connected by pointers",
    explanation: "Unlike arrays, elements are not stored in contiguous memory locations. Elements are linked using pointers."
  },
  {
    id: "ll-2",
    topicId: "linked-list",
    type: "mcq",
    question: "Which operation is faster in a Linked List compared to an Array?",
    options: ["Accessing the nth element", "Inserting at the beginning", "Binary search", "Finding maximum element"],
    answer: "Inserting at the beginning",
    explanation: "Inserting at the head of a linked list is an O(1) operation, whereas in an array it requires O(n) time to shift elements."
  }
];
