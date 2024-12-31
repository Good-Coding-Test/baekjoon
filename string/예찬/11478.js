const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const S = input.split("");
let tmp = "";
const answers = new Set();

function DPS(i, str) {
  if (i === S.length) return;
  answers.add(str + S[i]);
  DPS(i + 1, str + S[i]);
}

for (let i = 0; i < S.length; i++) {
  DPS(i, "");
}

console.log(answers.size);
