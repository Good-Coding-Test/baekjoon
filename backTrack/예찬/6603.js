const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

for (let i = 0; i < input.length - 1; i++) {
  backTrack(input[i].split(" ").map(Number));

  i < input.length - 2 && console.log("");
}

function backTrack(array) {
  const k = array[0];
  const S = array.slice(1);

  DFS(k, [], S, 0);
}

function DFS(k, array, S, index) {
  if (array.length === 6) {
    console.log(array.join(" "));
    return;
  }
  for (let i = index; i < k; i++) {
    DFS(k, [...array, S[i]], S, i + 1);
  }
}
