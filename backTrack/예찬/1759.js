const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [L, C] = input[0].split(" ").map(Number);
const letters = input[1].split(" ").sort();
const answer = [];

function DFS(str, index) {
  if (str.length === L) {
    if (str.some((item) => "aeiou".includes(item)) && isTwoJauem(str)) {
      answer.push(str.join(""));
    }
    return;
  }
  for (let i = index + 1; i < C; i++) {
    DFS([...str, letters[i]], i);
  }
}

function isTwoJauem(str) {
  let count = 0;

  for (let letter of str) {
    if (!"aeiou".includes(letter)) count++;
    if (count === 2) return true;
  }
  return false;
}

for (let i = 0; i < C; i++) {
  DFS([letters[i]], i);
}

console.log(answer.join("\n"));
