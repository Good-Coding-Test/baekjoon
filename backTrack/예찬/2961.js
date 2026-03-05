const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const tastes = input.slice(1).map((item) => item.split(" ").map(Number));

function makeCombi(n) {
  let result = [];
  let path = [];

  function dfs(start) {
    if (path.length) result.push([...path]);

    for (let i = start; i < n; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(0);
  return result;
}

const combos = makeCombi(N);
let answer = Infinity;

for (let i = 0; i < combos.length; i++) {
  let S = 1;
  let B = 0;
  for (let x of combos[i]) {
    S *= tastes[x][0];
    B += tastes[x][1];
  }
  answer = Math.min(Math.abs(S - B), answer);
}

console.log(answer);
