const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const bans = new Set(input[2] ? input[2].split(" ") : null);
let max = Infinity;

if (N === 100) {
  console.log(0);
  return;
}

for (let i = 0; i <= 1000000; i++) {
  let s = String(i);
  let flag = true;
  for (j = 0; j < s.length; j++) {
    if (bans.has(s[j])) {
      flag = false;
      break;
    }
  }
  if (flag) {
    max = Math.min(s.length + Math.abs(N - i), max);
  }
}

console.log(Math.min(max, Math.abs(N - 100)));
