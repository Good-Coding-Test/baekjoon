const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Pos {
  constructor(_pos, _cnt) {
    this.pos = _pos;
    this.cnt = _cnt;
  }
}
const [N, K] = input[0].split(" ").map((e) => +e);
const visited = Array(100001).fill(false);
const queue = [];

queue.push(new Pos(N, 0));
let idx = 0;
while (queue.length > idx) {
  const q = queue[idx++];
  if (q.pos === K) {
    console.log(q.cnt);
    break;
  }
  if (q.pos * 2 <= 100000 && !visited[q.pos * 2]) {
    queue.push(new Pos(q.pos * 2, q.cnt));
    visited[q.pos * 2] = true;
  }
  if (q.pos - 1 >= 0 && !visited[q.pos - 1]) {
    queue.push(new Pos(q.pos - 1, q.cnt + 1));
    visited[q.pos - 1] = true;
  }
  if (q.pos + 1 <= 100000 && !visited[q.pos + 1]) {
    queue.push(new Pos(q.pos + 1, q.cnt + 1));
    visited[q.pos + 1] = true;
  }
}
