const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, k] = input[0].split(" ").map(Number);
const words = input.slice(1).map((word) => word.substring(4, word.length - 4));
const alphabet = "bdefghijklmopqrsuvwxyz".split("");
const str = new Set(["a", "n", "t", "i", "c"]);
let answer = 0;

if (k < 5) {
  console.log(0);
  process.exit();
}
if (k === 26) {
  console.log(N);
  process.exit();
}

function dfs(index, count) {
  if (count >= k) {
    answer = Math.max(answer, find());
    return;
  }

  for (let i = index; i < alphabet.length; i++) {
    if (!str.has(alphabet[i])) {
      str.add(alphabet[i]);
      dfs(i + 1, count + 1);
      str.delete(alphabet[i]);
    }
  }
}

function find() {
  let value = 0;

  for (const word of words) {
    if ([...word].every((item) => str.has(item))) value++;
  }
  return value;
}

dfs(0, 5);
console.log(answer);
