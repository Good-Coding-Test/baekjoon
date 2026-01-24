const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const answer = [];

class Stack {
  constructor() {
    this.stack = {};
    this.top = 0;
  }

  size() {
    return this.top;
  }

  push(item) {
    this.stack[this.top++] = item;
  }

  pop() {
    const item = this.stack[--this.top];
    delete this.stack[this.top];
    return item;
  }

  peek() {
    if (this.size() === 0) return null;
    return this.stack[this.top - 1];
  }
}

for (let i = 0; i < N; i++) {
  const stack = new Stack();
  const ps = input[i + 1];
  let flag = false;

  for (let x in ps) {
    if (ps[x] === "(") {
      stack.push(ps[x]);
    } else {
      if (stack.size()) stack.pop();
      else {
        flag = true;
        break;
      }
    }
  }

  answer.push(stack.size() === 0 && !flag ? "YES" : "NO");
}

console.log(answer.join("\n"));
