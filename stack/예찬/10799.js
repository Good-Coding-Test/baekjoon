const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let stack = [];
let answer = 0;
let count = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === "(") {
    stack.push("(");
    count++;
  } else {
    count--;
    if (stack[stack.length - 1] === "(") answer += count;
    else answer++;
    stack.push(")");
  }
}

console.log(answer);
