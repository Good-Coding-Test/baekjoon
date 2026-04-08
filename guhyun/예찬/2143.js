const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
const N = +input[1];
const M = +input[3];
const A = input[2].split(" ").map(Number);
const B = input[4].split(" ").map(Number);
let resultA = [];
let resultB = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  let sum = 0;
  for (let j = i; j < N; j++) {
    sum += A[j];
    resultA.push(sum);
  }
}

for (let i = 0; i < M; i++) {
  let sum = 0;
  for (let j = i; j < M; j++) {
    sum += B[j];
    resultB.push(sum);
  }
}

const map = new Map();

for (let a of resultA) {
  map.set(a, (map.get(a) || 0) + 1);
}

for (let b of resultB) {
  const target = T - b;

  if (map.has(target)) {
    answer += map.get(target);
  }
}

console.log(answer);
