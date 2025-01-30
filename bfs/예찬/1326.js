const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const bridge = input[1].split(" ").map(Number);
const [start, end] = input[2].split(" ").map(Number);
const min = new Array(N).fill(Infinity);

function BFS() {
  let needVisit = [];
  needVisit.push(start - 1);
  min[start - 1] = 0;

  while (needVisit.length) {
    const node = needVisit.shift();
    const index = bridge[node];

    for (let i = 1; i <= N - 1; i++) {
      const nx = node + i * index;
      if (nx > N - 1) break;

      if (min[node] + 1 < min[nx]) {
        min[nx] = min[node] + 1;
        needVisit.push(nx);
      }
    }

    for (let i = 1; i <= N - 1; i++) {
      const nx = node - i * index;
      if (nx < 0) break;

      if (min[node] + 1 < min[nx]) {
        min[nx] = min[node] + 1;
        needVisit.push(nx);
      }
    }
  }
}
BFS();
const answer = min[end - 1] === Infinity ? -1 : min[end - 1];
console.log(answer);
