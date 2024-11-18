const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const ablilty = [];
let total = 0;
for (let i = 1; i <= N; i++) {
  ablilty.push(input[i].split(" ").map((e) => +e));
  total += ablilty[i - 1].reduce((acc, e) => (acc += e));
}
let min = Number.MAX_VALUE;

const q = [];
const recursion = (idx, score) => {
  if (q.length === parseInt(N / 2)) {
    //start팀에 안들어간 인덱스 추출
    const num = Array.from({ length: N }, (e, i) => i).filter(
      (e) => !q.includes(e)
    );
    let linkScore = 0;

    //link 점수 계산
    for (let i = 0; i < N / 2; i++) {
      for (let j = i + 1; j < N / 2; j++) {
        linkScore += ablilty[num[i]][num[j]] + ablilty[num[j]][num[i]];
      }
    }
    const diff = Math.abs(score - linkScore);
    if (diff < min) min = diff;
    return;
  }

  for (let i = idx + 1; i < N; i++) {
    //start 팀에 안들어간 인덱스 삽입
    q.push(i);
    let score1 = 0;
    //새로 들어간 사람과 start 팀에 있던 사람들의 점수 계산
    for (let j = 0; j < q.length - 1; j++) {
      score1 += ablilty[q[j]][i] + ablilty[i][q[j]];
    }
    //누적해서 호출
    recursion(i, score + score1);
    q.pop();
  }
};

recursion(-1, 0);
console.log(min);
