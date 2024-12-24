const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const testCase = input.slice(1).map(Number);

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  heap_push(element) {
    this.heap.push(element);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex] > element) {
      const tmp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[parentIndex];
      this.heap[parentIndex] = tmp;
      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  heap_pop() {
    if (this.heap.length === 1) return 0;
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    let currentIndex = 1;

    while (true) {
      let leftIndex = currentIndex * 2;
      let rightIndex = currentIndex * 2 + 1;
      let smallerIndex = currentIndex;

      if (
        leftIndex < this.heap.length &&
        this.heap[smallerIndex] > this.heap[leftIndex]
      ) {
        smallerIndex = leftIndex;
      }

      if (
        rightIndex < this.heap.length &&
        this.heap[smallerIndex] > this.heap[rightIndex]
      ) {
        smallerIndex = rightIndex;
      }

      if (smallerIndex === currentIndex) break;

      const tmp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[smallerIndex];
      this.heap[smallerIndex] = tmp;
      currentIndex = smallerIndex;
    }

    return returnValue;
  }
}

const priorityQueue = new PriorityQueue();
const result = [];

for (let i = 0; i < N; i++) {
  if (testCase[i] === 0) result.push(priorityQueue.heap_pop());
  else priorityQueue.heap_push(testCase[i]);
}

console.log(result.join("\n"));
