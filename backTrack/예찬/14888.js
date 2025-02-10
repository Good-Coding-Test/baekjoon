const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const numbers = input[1].split(" ").map(Number);
const method = input[2].split(" ").map(Number);
let min = Infinity;
let max = -Infinity;

function DFS(index, current) {
  if (index === N - 1) {
    min = Math.min(current, min);
    max = Math.max(current, max);
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (method[i]) {
      const tmp = calculate(current, numbers[index + 1], i);
      method[i]--;
      DFS(index + 1, tmp);
      method[i]++;
    }
  }
}

function calculate(value, nextValue, operator) {
  switch (operator) {
    case 0:
      return value + nextValue;
    case 1:
      return value - nextValue;
    case 2:
      return value * nextValue;
    case 3:
      return value < 0
        ? -Math.floor(-value / nextValue)
        : Math.floor(value / nextValue);
  }
}

DFS(0, numbers[0]);

console.log(max + "\n" + min);
