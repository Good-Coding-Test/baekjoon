const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let map = input.slice(1).map((item) => item.split(" ").map(Number));
const homes = [];
const chickens = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 1) homes.push([i, j]);
    if (map[i][j] === 2) chickens.push([i, j]);
  }
}

function DFS(x, y, combi) {
  let min = Infinity;

  for (let [cx, cy] of combi) {
    const tmp = Math.abs(x - cx) + Math.abs(y - cy);
    if (tmp < min) min = tmp;
  }
  return min;
}

function r() {
  let chickenCombi = getCombinations(chickens, M);

  let min = Infinity;

  for (let combi of chickenCombi) {
    let answer = 0;
    for (let [x, y] of homes) {
      answer += DFS(x, y, combi);
    }
    min = Math.min(answer, min);
  }
  return min;
}

function getCombinations(arr, number) {
  const result = [];
  if (number === 1) return arr.map((item) => [item]);

  arr.forEach((item, index, array) => {
    const rest = array.slice(index + 1);
    const combination = getCombinations(rest, number - 1);
    const attach = combination.map((combi) => [item, ...combi]);
    result.push(...attach);
  });

  return result;
}

console.log(r());
