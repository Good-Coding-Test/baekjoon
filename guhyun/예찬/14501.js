const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let n = parseInt(input[0]); // 퇴사 전 출근일
let t = []; // 상담 기간
let p = []; // 상담 페이
let money = []; // 각 상담 루틴별 총 페이

input.forEach((item, index) => {
  // 각 배열 요소에 해당하는 수 할당
  if (index > 0) {
    t.push(parseInt(item.split(" ")[0]));
    p.push(parseInt(item.split(" ")[1]));
  }
});

let k = 0; // money 배열에 저장될 각 상담 루틴의 임시 총 페이

function loop(a, k) {
  // 일째를 의미하는 a와 k를 인자로 하는 재귀함수
  if (n <= a) {
    // 일째가 퇴사일을 넘어가면 쌓았던 돈을 배열에 저장
    money.push(k);
    return;
  }

  if (a + t[a] <= n) {
    // a일째의 상담을 했을 시에 퇴사일을 넘어가지 않는다면 일째와 돈을 늘려 재귀 호출
    loop(a + t[a], k + p[a]);
  }

  loop(a + 1, k); // a일째 상담 여부와 관계없이 다음날로 넘기기
}

loop(0, k);
console.log(Math.max(...money));
