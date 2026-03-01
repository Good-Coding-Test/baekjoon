const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const T = +input[0];

for (let i = 0; i < T; i++) {
  const p = input[3 * i + 1];
  const n = +input[3 * i + 2];
  let arr = input[3 * i + 3]
    .slice(1, input[3 * i + 3].length - 1)
    .split(",")
    .map(Number);

  let flag = true;
  let start = 0;
  let end = n ? n - 1 : -1;
  let isReversed = false;

  for (let j = 0; j < p.length; j++) {
    const cmd = p[j];

    if (cmd === "R") {
      if (start <= end) isReversed = !isReversed;
    } else {
      if (start > end) {
        flag = false;
        break;
      }
      isReversed ? (end -= 1) : (start += 1);
    }
  }

  let answer = isReversed
    ? arr.slice(start, end + 1).reverse()
    : arr.slice(start, end + 1);

  console.log(flag ? "[" + answer.join(",") + "]" : "error");
}
