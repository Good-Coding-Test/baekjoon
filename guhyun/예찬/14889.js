const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]); // 총 인원
let minDifference = Infinity; // 양 팀 능력치 차이 최솟값

// 능력치 배열
const status = input.slice(1).map((item) => item.split(" ").map(Number));
// 선수가 S팀으로 선택되었는지 여부
const selected = Array(N).fill(false);

function sum(array) {
  // 선택된 팀의 능력치 총합 계산 함수
  let max = 0;

  // 이중반복문으로 인자로 받은 임시배열의 모든 능력치 총합 누적
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      max += parseInt(status[array[i]][array[j]]);
    }
  }
  return max;
}

// 현재 위치 a와 선택된 팀원의 수인 t를 인자로 받는 재귀함수
function loop(a, t) {
  // 총 인원의 절반이 선택되면 팀 나누기 종료
  if (t === N / 2) {
    let tmp = [];
    let tmp2 = [];

    // S팀에 선택된 사람이면 tmp, 그렇지 않으면 tmp2 임시 배열에 팀원 저장
    for (let i = 0; i < N; i++) {
      if (!selected[i]) tmp2.push(i);
      else tmp.push(i);
    }
    const sumS = sum(tmp);
    const sumL = sum(tmp2);
    minDifference = Math.min(minDifference, Math.abs(sumS - sumL));
    return;
  }

  // 반복문으로 인원을 선택하고, 재귀함수 호출
  for (let i = a; i < N; i++) {
    // 아직 선택되지 않은 사람이라면 그 사람을 고르고 다음 사람으로 넘기는 재귀함수 호출
    if (!selected[i]) {
      selected[i] = true;
      // 고른 팀원 수 +1, 현재 고르는 팀원 위치 +1
      loop(i + 1, t + 1);
      // 재귀함수가 끝난 이후(팀원 선택이 끝난 후)에 다른 팀을 만드는 경우의 수를 찾기 위해 다시 미선택 처리함
      selected[i] = false;
    }
  }
}

loop(0, 0);
console.log(minDifference);
