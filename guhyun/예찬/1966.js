const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const T = parseInt(input[0]);
const testCase = input.slice(1);

for (let i = 0; i < T; i++) {
  const [N, M] = testCase[i * 2].split(" ").map(Number);
  const arr = testCase[i * 2 + 1].split(" ").map(Number);
  const queue = arr.map((priority, index) => ({ priority, index }));
  let index = 0;

  while (arr.length > 0) {
    const popEl = queue.shift();
    if (queue.some((item) => popEl.priority < item.priority)) queue.push(popEl);
    else {
      index++;
      if (popEl.index === M) {
        console.log(index);
        break;
      }
    }
  }
}
