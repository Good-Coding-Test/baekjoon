const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [N, K] = input.split(" ").map(Number);
let times = Array.from({ length: 100001 }).fill(Infinity);
const needVisit = [];

function BFS(start) {
  needVisit.push(start);
  times[start] = 0;

  while (needVisit.length) {
    const X = needVisit.shift();

    if (X === K) continue;

    if (X - 1 >= 0 && times[X] + 1 < times[X - 1]) {
      needVisit.push(X - 1);
      times[X - 1] = times[X] + 1;
    }
    if (X + 1 <= 100000 && times[X] + 1 < times[X + 1]) {
      needVisit.push(X + 1);
      times[X + 1] = times[X] + 1;
    }
    if (X * 2 <= 100000 && times[X] + 1 < times[X * 2]) {
      needVisit.push(X * 2);
      times[X * 2] = times[X] + 1;
    }
  }
}

BFS(N);
console.log(times[K]);
