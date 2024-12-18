const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);
const ij = input.slice(2).map((item) => item.split(" ").map(Number));
const sumArray = new Array(N + 1).fill(0);
sumArray[1] = numbers[0];

for (let i = 1; i <= N; i++) {
  sumArray[i] = sumArray[i - 1] + numbers[i - 1];
}

for (let k = 0; k < M; k++) {
  const [i, j] = ij[k];
  console.log(sumArray[j] - sumArray[i - 1]);
}
