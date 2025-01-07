const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, M, B] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(" ").map(Number));
let answer = [Infinity, 0];

function binarySearch() {
  //   let start = type === 0 ? Math.min(...map) : Math.max(...map);
  //   let end = type === 0 ? Math.max(...map) : Math.min(...map);
  //   let condition = type === 0 ? start <= end : start >= end;
  let start = Math.min(...map.flat());
  let end = Math.max(...map.flat());

  for (let a = start; a <= end; a++) {
    let time = 0;
    let blocks = B;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] > a) {
          time += 2 * (map[i][j] - a);
          blocks += map[i][j] - a;
        } else if (map[i][j] < a) {
          time += a - map[i][j];
          blocks -= a - map[i][j];
        }
      }
    }
    if (blocks >= 0) {
      if (answer[0] > time || (time === answer[0] && a > answer[1]))
        answer = [time, a];
    }
  }
  return answer.join(" ");
}

console.log(binarySearch());
