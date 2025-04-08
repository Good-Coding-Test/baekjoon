const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);

let answer = [];

for (let num of arr) {
  let start = 0;
  let end = answer.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (answer[mid] < num) {
      start = mid + 1;
    } else end = mid;
  }

  if (start === answer.length) answer.push(num);
  else answer[start] = num;
}

console.log(answer.length);
