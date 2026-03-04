const input = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let answer = [];

function dfs(num, length) {
  answer.push(+num);

  for (let i = 0; i < +num[length - 1]; i++) {
    dfs(num + i, length + 1);
  }
}

for (let i = 0; i < 10; i++) {
  dfs(i + "", 1);
}

answer.sort((a, b) => a - b);

console.log(answer.length > input ? answer[input] : -1);
