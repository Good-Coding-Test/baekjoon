const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const N = parseInt(input);
const min = Array(N + 1).fill(Infinity);
min[0] = 0;

function DP() {
  let needVisit = [0];

  while (needVisit.length) {
    const current = needVisit.shift();
    if (current + 5 <= N && min[current] + 1 < min[current + 5]) {
      min[current + 5] = min[current] + 1;
      needVisit.push(current + 5);
    }
    if (current + 3 <= N && min[current] + 1 < min[current + 3]) {
      min[current + 3] = min[current] + 1;
      needVisit.push(current + 3);
    }
  }
}

DP();

min[N] === Infinity ? console.log(-1) : console.log(min[N]);
