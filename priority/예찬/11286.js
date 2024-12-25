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
    const realEl = Math.abs(element);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && Math.abs(this.heap[parentIndex]) >= realEl) {
      if (
        Math.abs(this.heap[parentIndex]) === realEl &&
        this.heap[parentIndex] < element
      )
        break;

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
      const rightIndex = currentIndex * 2 + 1;
      const leftIndex = currentIndex * 2;
      let smallerIndex = currentIndex;

      if (
        (leftIndex < this.heap.length &&
          Math.abs(this.heap[leftIndex]) < Math.abs(this.heap[smallerIndex])) ||
        (Math.abs(this.heap[leftIndex]) === Math.abs(this.heap[smallerIndex]) &&
          this.heap[leftIndex] < this.heap[smallerIndex])
      ) {
        smallerIndex = leftIndex;
      }

      if (
        (rightIndex < this.heap.length &&
          Math.abs(this.heap[rightIndex]) <
            Math.abs(this.heap[smallerIndex])) ||
        (Math.abs(this.heap[rightIndex]) ===
          Math.abs(this.heap[smallerIndex]) &&
          this.heap[rightIndex] < this.heap[smallerIndex])
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
const answer = [];

for (let i = 0; i < N; i++) {
  if (!testCase[i]) answer.push(priorityQueue.heap_pop());
  else priorityQueue.heap_push(testCase[i]);
}

console.log(answer.join("\n"));
