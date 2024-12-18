const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const T = input[0];
const testCase = input.slice(1);

let answer = [];

for (let i = 0; i < T; i++) {
  function DP(n) {
    if (n < 0) return 0;
    if (n === 0) return 1;
    if (answer[n]) return answer[n];

    answer[n] = DP(n - 1) + DP(n - 2) + DP(n - 3);
    return answer[n];
  }

  DP(testCase[i]);
  console.log(answer[testCase[i]]);
}
