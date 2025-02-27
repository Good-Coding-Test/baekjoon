const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const k = parseInt(input[0]);
const array = input[1].split(" ");

let max = [];
let min = [];

function dfs(depth, arr) {
  if (depth === k) {
    if (!max.length && !min.length) {
      max = arr;
      min = arr;
    } else {
      if (parseInt(max.join("")) < parseInt(arr.join(""))) max = arr;
      else min = arr;
    }

    return;
  }

  for (let i = 0; i < 10; i++) {
    if (!arr.includes(i)) {
      if (max.length && max[depth + 1] > i && min.length && min[depth + 1] < i)
        continue;

      if (array[depth] === ">") {
        if (arr[depth] > i) dfs(depth + 1, [...arr, i]);
      } else {
        if (arr[depth] < i) dfs(depth + 1, [...arr, i]);
      }
    }
  }
}

for (let i = 0; i < 10; i++) {
  if (max.length && max[0] > i && min.length && min[0] < i) continue;

  dfs(0, [i]);
}

console.log(max.join(""));
console.log(min.join(""));
