const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [N, M] = input.split(" ").map(Number);
const array = Array.from({ length: N }).map((_, index) => index + 1);

const DFS = (arr, index) => {
  if (arr.length === M) console.log(arr.join(" "));

  for (let i = index + 1; i < N; i++) {
    DFS([...arr, array[i]], i);
  }
};

DFS([], -1);
