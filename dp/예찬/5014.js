const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [F, S, G, U, D] = input.split(" ").map(Number);
const dp = Array(F + 1).fill(Infinity);
let needVisit = [[S, 0]];
dp[S] = 0;

while (needVisit.length) {
  const [cur, cnt] = needVisit.shift();
  if (cur + U <= F && dp[cur] + 1 < dp[cur + U]) {
    needVisit.push([cur + U, cnt + 1]);
    dp[cur + U] = dp[cur] + 1;
  }
  if (cur - D >= 1 && dp[cur] + 1 < dp[cur - D]) {
    needVisit.push([cur - D, cnt + 1]);
    dp[cur - D] = dp[cur] + 1;
  }
}

console.log(dp[G] === Infinity ? "use the stairs" : dp[G]);
