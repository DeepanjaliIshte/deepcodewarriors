export interface CodingProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic:
    | "arrays"
    | "strings"
    | "searching"
    | "sorting"
    | "linked-lists"
    | "stacks"
    | "queues"
    | "hashing"
    | "trees"
    | "graphs"
    | "recursion"
    | "dynamic-programming";
  topicLabel: string;
  isDaily?: boolean;
  description: string;
  expectedComplexity: {
    time: string;
    space: string;
  };
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    java: string;
    python: string;
  };
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }[];
  hints: string[];
}

export const TOPIC_OPTIONS = [
  { id: "all", label: "All Topics" },
  { id: "arrays", label: "Arrays" },
  { id: "strings", label: "Strings" },
  { id: "searching", label: "Searching" },
  { id: "sorting", label: "Sorting" },
  { id: "linked-lists", label: "Linked Lists" },
  { id: "stacks", label: "Stacks" },
  { id: "queues", label: "Queues" },
  { id: "hashing", label: "Hashing" },
  { id: "trees", label: "Trees" },
  { id: "graphs", label: "Graphs" },
  { id: "recursion", label: "Recursion" },
  { id: "dynamic-programming", label: "Dynamic Programming" },
] as const;

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: "two-sum",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "hashing",
    topicLabel: "Hashing",
    isDaily: true,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(n)",
    },
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
      },
      {
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
      },
    ],
    starterCode: {
      java: `import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Your code here
        lookup = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in lookup:
                return [lookup[diff], i]
            lookup[num] = i
        return []`,
    },
    testCases: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        expectedOutput: "[0, 1]",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        expectedOutput: "[1, 2]",
      },
      {
        input: "nums = [3, 3], target = 6",
        expectedOutput: "[0, 1]",
      },
      {
        input: "nums = [1, 5, 8, 12, 19], target = 17",
        expectedOutput: "[1, 3]",
        isHidden: true,
      },
    ],
    hints: [
      "Can you solve this without checking every pair in O(n^2)?",
      "Use a hash map to store elements you have already seen and their indices.",
    ],
  },
  {
    id: "valid-parentheses",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "stacks",
    topicLabel: "Stacks",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(n)",
    },
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    starterCode: {
      java: `import java.util.*;

public class Solution {
    public boolean isValid(String s) {
        // Your code here
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
    },
    testCases: [
      {
        input: 's = "()"',
        expectedOutput: "true",
      },
      {
        input: 's = "()[]{}"',
        expectedOutput: "true",
      },
      {
        input: 's = "(]"',
        expectedOutput: "false",
      },
      {
        input: 's = "{[]}"',
        expectedOutput: "true",
        isHidden: true,
      },
    ],
    hints: [
      "Process characters one by one. When you see an opening bracket, remember you need to close it.",
      "The last opening bracket must be closed first — this is LIFO (Stack).",
    ],
  },
  {
    id: "reverse-linked-list",
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "linked-lists",
    topicLabel: "Linked Lists",
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(1)",
    },
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    examples: [
      {
        input: "head = [1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]",
      },
      {
        input: "head = [1, 2]",
        output: "[2, 1]",
      },
      {
        input: "head = []",
        output: "[]",
      },
    ],
    starterCode: {
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) { this.val = val; }
 * }
 */
public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None
        curr = head
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        return prev`,
    },
    testCases: [
      {
        input: "head = [1, 2, 3, 4, 5]",
        expectedOutput: "[5, 4, 3, 2, 1]",
      },
      {
        input: "head = [1, 2]",
        expectedOutput: "[2, 1]",
      },
      {
        input: "head = []",
        expectedOutput: "[]",
      },
    ],
    hints: [
      "Maintain pointers to the previous node and current node.",
      "Save the next node before modifying current node's next pointer.",
    ],
  },
  {
    id: "binary-search",
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "searching",
    topicLabel: "Searching",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    expectedComplexity: {
      time: "O(log n)",
      space: "O(1)",
    },
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    examples: [
      {
        input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4",
      },
      {
        input: "nums = [-1, 0, 3, 5, 9, 12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1",
      },
    ],
    starterCode: {
      java: `public class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
    },
    testCases: [
      {
        input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        expectedOutput: "4",
      },
      {
        input: "nums = [-1, 0, 3, 5, 9, 12], target = 2",
        expectedOutput: "-1",
      },
    ],
    hints: [
      "Remember to compute mid with `left + (right - left) / 2` to avoid integer overflow.",
    ],
  },
  {
    id: "longest-substring-without-repeating-characters",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "strings",
    topicLabel: "Strings",
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(min(n, m))",
    },
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    starterCode: {
      java: `import java.util.*;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), maxLen = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int j = 0, i = 0; j < n; j++) {
            if (map.containsKey(s.charAt(j))) {
                i = Math.max(map.get(s.charAt(j)) + 1, i);
            }
            maxLen = Math.max(maxLen, j - i + 1);
            map.put(s.charAt(j), j);
        }
        return maxLen;
    }
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_idx = {}
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in char_idx and char_idx[char] >= left:
                left = char_idx[char] + 1
            char_idx[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
    },
    testCases: [
      {
        input: 's = "abcabcbb"',
        expectedOutput: "3",
      },
      {
        input: 's = "bbbbb"',
        expectedOutput: "1",
      },
      {
        input: 's = "pwwkew"',
        expectedOutput: "3",
      },
    ],
    hints: [
      "Think about using a sliding window with two pointers: left and right.",
      "Store the most recent index of each character in a hash map.",
    ],
  },
  {
    id: "max-subarray-kadane",
    slug: "max-subarray-kadane",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    topic: "arrays",
    topicLabel: "Arrays",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(1)",
    },
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        output: "23",
      },
    ],
    starterCode: {
      java: `public class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        current_sum = max_sum = nums[0]
        for num in nums[1:]:
            current_sum = max(num, current_sum + num)
            max_sum = max(max_sum, current_sum)
        return max_sum`,
    },
    testCases: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        expectedOutput: "6",
      },
      {
        input: "nums = [1]",
        expectedOutput: "1",
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        expectedOutput: "23",
      },
    ],
    hints: [
      "If the current accumulated sum becomes negative, is it beneficial to keep it when moving to the next element?",
    ],
  },
  {
    id: "invert-binary-tree",
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "trees",
    topicLabel: "Trees",
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(h)",
    },
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100",
    ],
    examples: [
      {
        input: "root = [4, 2, 7, 1, 3, 6, 9]",
        output: "[4, 7, 2, 9, 6, 3, 1]",
      },
      {
        input: "root = [2, 1, 3]",
        output: "[2, 3, 1]",
      },
    ],
    starterCode: {
      java: `public class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}`,
      python: `class Solution:
    def invertTree(self, root):
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
    },
    testCases: [
      {
        input: "root = [4, 2, 7, 1, 3, 6, 9]",
        expectedOutput: "[4, 7, 2, 9, 6, 3, 1]",
      },
      {
        input: "root = [2, 1, 3]",
        expectedOutput: "[2, 3, 1]",
      },
    ],
    hints: [
      "Think recursively: swap left and right subtrees, then invert each subtree.",
    ],
  },
  {
    id: "climbing-stairs",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "dynamic-programming",
    topicLabel: "Dynamic Programming",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(1)",
    },
    constraints: ["1 <= n <= 45"],
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps.",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1.",
      },
    ],
    starterCode: {
      java: `public class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int first = 1, second = 2;
        for (int i = 3; i <= n; i++) {
            int third = first + second;
            first = second;
            second = third;
        }
        return second;
    }
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        first, second = 1, 2
        for _ in range(3, n + 1):
            first, second = second, first + second
        return second`,
    },
    testCases: [
      {
        input: "n = 2",
        expectedOutput: "2",
      },
      {
        input: "n = 3",
        expectedOutput: "3",
      },
      {
        input: "n = 5",
        expectedOutput: "8",
      },
    ],
    hints: [
      "To reach step n, you must come from either step n-1 or step n-2. Notice the Fibonacci pattern!",
    ],
  },
  {
    id: "merge-intervals",
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "sorting",
    topicLabel: "Sorting",
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    expectedComplexity: {
      time: "O(n log n)",
      space: "O(n)",
    },
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4",
    ],
    examples: [
      {
        input: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
        output: "[[1, 6], [8, 10], [15, 18]]",
        explanation: "Intervals [1, 3] and [2, 6] overlap, merging them into [1, 6].",
      },
      {
        input: "intervals = [[1, 4], [4, 5]]",
        output: "[[1, 5]]",
      },
    ],
    starterCode: {
      java: `import java.util.*;

public class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> result = new ArrayList<>();
        int[] current = intervals[0];
        result.add(current);
        for (int[] interval : intervals) {
            if (interval[0] <= current[1]) {
                current[1] = Math.max(current[1], interval[1]);
            } else {
                current = interval;
                result.add(current);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}`,
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []
        for interval in intervals:
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[-1][1] = max(merged[-1][1], interval[1])
        return merged`,
    },
    testCases: [
      {
        input: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
        expectedOutput: "[[1, 6], [8, 10], [15, 18]]",
      },
      {
        input: "intervals = [[1, 4], [4, 5]]",
        expectedOutput: "[[1, 5]]",
      },
    ],
    hints: [
      "Sort intervals by their starting times first so overlapping intervals become adjacent.",
    ],
  },
  {
    id: "number-of-islands",
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "graphs",
    topicLabel: "Graphs",
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    expectedComplexity: {
      time: "O(m * n)",
      space: "O(m * n)",
    },
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'.",
    ],
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1",
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3",
      },
    ],
    starterCode: {
      java: `public class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }

    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0'; // sink visited land
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        count = 0
        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
    },
    testCases: [
      {
        input: `grid = [["1","1","0"],["1","1","0"],["0","0","1"]]`,
        expectedOutput: "2",
      },
    ],
    hints: [
      "Use Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse connected cells of land and mark them visited.",
    ],
  },
  {
    id: "trapping-rain-water",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "arrays",
    topicLabel: "Arrays",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    expectedComplexity: {
      time: "O(n)",
      space: "O(1)",
    },
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    examples: [
      {
        input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        output: "6",
        explanation: "The elevation map traps 6 units of rain water.",
      },
      {
        input: "height = [4, 2, 0, 3, 2, 5]",
        output: "9",
      },
    ],
    starterCode: {
      java: `public class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else totalWater += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else totalWater += rightMax - height[right];
                right--;
            }
        }
        return totalWater;
    }
}`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        left_max, right_max = 0, 0
        total = 0
        while left < right:
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    total += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    total += right_max - height[right]
                right -= 1
        return total`,
    },
    testCases: [
      {
        input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        expectedOutput: "6",
      },
      {
        input: "height = [4, 2, 0, 3, 2, 5]",
        expectedOutput: "9",
      },
    ],
    hints: [
      "Water trapped at index i is determined by min(maxLeft, maxRight) - height[i].",
      "Two pointers moving from both ends can track leftMax and rightMax in O(1) space.",
    ],
  },
  {
    id: "lru-cache",
    slug: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    topic: "queues",
    topicLabel: "Queues / Stacks",
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, evict the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    expectedComplexity: {
      time: "O(1) average for get and put",
      space: "O(capacity)",
    },
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
    ],
    examples: [
      {
        input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
      },
    ],
    starterCode: {
      java: `import java.util.*;

public class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> map;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return map.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        map.put(key, value);
    }
}`,
      python: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
    },
    testCases: [
      {
        input: "capacity = 2, put(1, 1), put(2, 2), get(1)",
        expectedOutput: "1",
      },
    ],
    hints: [
      "A combination of a Doubly Linked List and a Hash Map gives O(1) retrieval and O(1) removal/addition.",
    ],
  },
  {
    id: "subsets",
    slug: "subsets",
    title: "Subsets (Power Set)",
    difficulty: "Medium",
    topic: "recursion",
    topicLabel: "Recursion & Backtracking",
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.`,
    expectedComplexity: {
      time: "O(n * 2^n)",
      space: "O(n)",
    },
    constraints: [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All the numbers of nums are unique.",
    ],
    examples: [
      {
        input: "nums = [1, 2, 3]",
        output: "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]",
      },
      {
        input: "nums = [0]",
        output: "[[], [0]]",
      },
    ],
    starterCode: {
      java: `import java.util.*;

public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), nums, 0);
        return result;
    }

    private void backtrack(List<List<Integer>> result, List<Integer> current, int[] nums, int start) {
        result.add(new ArrayList<>(current));
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(result, current, nums, i + 1);
            current.remove(current.size() - 1);
        }
    }
}`,
      python: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        res = []
        def backtrack(start, current):
            res.append(list(current))
            for i in range(start, len(nums)):
                current.append(nums[i])
                backtrack(i + 1, current)
                current.pop()
        backtrack(0, [])
        return res`,
    },
    testCases: [
      {
        input: "nums = [1, 2]",
        expectedOutput: "[[], [1], [2], [1, 2]]",
      },
    ],
    hints: [
      "At each step in the recursion, you choose whether to include nums[i] or not.",
    ],
  },
];

export function getCodingProblem(idOrSlug: string): CodingProblem | undefined {
  return CODING_PROBLEMS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function getDailyChallenge(): CodingProblem {
  // Rotate based on day of year for a fresh daily problem
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return CODING_PROBLEMS[dayOfYear % CODING_PROBLEMS.length];
}
