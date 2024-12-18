const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = parseInt(input);

function DP() {
  if (n === 1) return 1;
  if (n === 2) return 2;
  const method = new Array(n).fill(0);
  method[0] = 1;
  method[1] = 2;

  if (n > 2) {
    for (let i = 2; i <= n; i++) {
      // 값 오버플로우가 발생하지 않도록 미리 나머지연산
      method[i] = (method[i - 1] + method[i - 2]) % 10007;
    }
  }
  return method[n - 1];
}

console.log(DP());
