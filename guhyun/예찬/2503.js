const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const tries = input.slice(1).map((item) => item.split(" ").map(Number));
const combi = [];
let answer = 0;
allcombi([]);

function allcombi(arr) {
  if (arr.length === 3) return combi.push(arr.join(""));

  for (let i = 1; i <= 9; i++) {
    if (arr.includes(i)) continue;
    allcombi([...arr, i]);
  }
}

function sameStrikeBall(origin, target) {
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < 3; i++) {
    if (origin[i] === target[i]) strike++;
    else if (origin.includes(target[i])) ball++;
  }
  return [strike, ball];
}

function isValidate(node) {
  for (let [question, s, b] of tries) {
    const [s1, b1] = sameStrikeBall(question.toString(), node);
    if (s1 !== s || b1 !== b) return false;
  }
  return true;
}

for (let node of combi) {
  if (isValidate(node)) answer++;
}

console.log(answer);
