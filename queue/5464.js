const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const Rs = [0, ...input.slice(1, 1 + N).map(Number)];
const Wk = [0, ...input.slice(1 + N, 1 + N + M).map(Number)];
const orders = input.slice(1 + N + M).map(Number);
let park = Array(N + 1).fill(-1);
park[0] = Infinity;
let answer = 0;
let queue = [];

while (orders.length) {
  if (queue.length) {
    let empty = park.indexOf(-1);
    if (empty !== -1) {
      let car = queue.shift();
      park[empty] = car;
      answer += Rs[empty] * Wk[car];
    }
  }

  let order = orders.shift();

  if (order > 0) {
    let empty = park.indexOf(-1);
    if (empty === -1) {
      queue.push(order);
      continue;
    }
    park[empty] = order;
    answer += Rs[empty] * Wk[order];
  } else {
    let left = park.indexOf(-order);
    park[left] = -1;
  }
}

console.log(answer);
