const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const maze = input[1].split(" ").map(Number);
const min = new Array(N).fill(Infinity);

function dp() {
  min[0] = 0;
  let needVisit = [0];

  while (needVisit.length) {
    const x = needVisit.shift();
    const range = maze[x];

    for (let i = 1; i <= range; i++) {
      const nx = x + i;

      if (nx < N && min[x] + 1 < min[nx]) {
        min[nx] = min[x] + 1;
        needVisit.push(nx);
      }
    }
  }
}

dp();

min[N - 1] === Infinity ? console.log(-1) : console.log(min[N - 1]);
