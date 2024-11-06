const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

//사회자와 참가자의 배열 분리

const challenger = input.slice(0, 5).map((item) => item.split(" "));
const referee = input.slice(5).map((item) => item.split(" "));
let call = 0;

//3빙고인지 검증하기

function isBingo(n) {
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (challenger[i][j] === n) {
        challenger[i][j] = true;

        let cnt = 0;

        for (var k = 0; k < 5; k++) {
          // 왼쪽 대각선
          if (challenger[k][k] !== true) {
            break;
          }
          if (k === 4) cnt++;
        }

        for (let k = 0; k < 5; k++) {
          //오른쪽 대각선
          if (challenger[k][4 - k] !== true) {
            break;
          }
          if (k === 4) cnt++;
        }

        for (let k = 0; k < 5; k++) {
          //가로
          for (let t = 0; t < 5; t++) {
            if (challenger[k][t] !== true) {
              break;
            }
            if (t === 4) cnt++;
          }
        }

        for (let k = 0; k < 5; k++) {
          //세로
          for (let t = 0; t < 5; t++) {
            if (challenger[t][k] !== true) {
              break;
            }
            if (t === 4) cnt++;
          }
        }

        if (cnt >= 3) {
          console.log(call);
          return true;
        }
      }
    }
  }
  return false;
}

referee.some((item) =>
  item.some((index) => {
    call++;
    return isBingo(index);
  })
);
