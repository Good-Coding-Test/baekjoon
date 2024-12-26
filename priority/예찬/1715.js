const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const cards = input.slice(1).map(Number);

class MinHeap {
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
      const leftIndex = currentIndex * 2;
      const rightIndex = currentIndex * 2 + 1;
      let smallerIndex = currentIndex;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex] < this.heap[smallerIndex]
      ) {
        smallerIndex = leftIndex;
      }

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex] < this.heap[smallerIndex]
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

const minHeap = new MinHeap();
let result = 0;

for (let i = 0; i < N; i++) {
  minHeap.heap_push(cards[i]);
}

for (let j = 0; j < N - 1; j++) {
  const a = minHeap.heap_pop();
  const b = minHeap.heap_pop();
  result += a + b;

  minHeap.heap_push(a + b);
}

console.log(result);
