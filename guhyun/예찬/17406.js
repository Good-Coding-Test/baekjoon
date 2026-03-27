const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const cals = input.slice(1 + N).map((item) => item.split(" ").map(Number));
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let answer = Infinity;

for (let p of makeCombi()) {
  let tmpMap = input.slice(1, 1 + N).map((item) => item.split(" ").map(Number));

  for (let idx of p) {
    let [x, y, c] = cals[idx];

    for (let i = 1; i <= c; i++) {
      // 왼쪽 위부터 한 바퀴 회전
      let nx = x - i - 1;
      let ny = y - i - 1;
      prev = tmpMap[nx][ny]; // 회전 직전 값 저장
      for (let d = 0; d < 4; d++) {
        for (let j = 0; j < i * 2; j++) {
          const tmp = prev;
          nx += dx[d];
          ny += dy[d];
          prev = tmpMap[nx][ny]; // prev에 다음 값을 저장
          tmpMap[nx][ny] = tmp; // 이전 값을 다음 순서로 변경(회전)
        }
      }
    }
  }

  let value = Infinity;

  // 배열 값(각 행 최소값) 구하기
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = 0; j < M; j++) {
      sum += tmpMap[i][j];
    }
    value = Math.min(value, sum);
  }

  answer = Math.min(answer, value);
}

console.log(answer);

// 연산 순서 순열 생성
function makeCombi() {
  let result = [];

  function dfs(path, used) {
    if (path.length === K) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < K; i++) {
      if (used[i]) continue;
      path.push(i);
      used[i] = true;
      dfs(path, used);
      path.pop();
      used[i] = false;
    }
  }

  let used = Array(K).fill(false);
  dfs([], used);

  return result;
}
