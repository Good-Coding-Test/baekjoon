const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const method = input.split("-");
let answer = 0;

for (let i = 0; i < method.length; i++) {
  const numbers = method[i].split("+").map(Number);
  const sum = numbers.reduce((previous, number) => number + previous);

  i === 0 ? (answer += sum) : (answer -= sum);
}

console.log(answer);
