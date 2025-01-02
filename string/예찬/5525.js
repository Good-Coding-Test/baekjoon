const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const M = parseInt(input[1]);
const S = input[2];
// let P = "";
let answer = 0;

// for (let i = 0; i < N; i++) {
//   P += "IO";
//   if (i === N - 1) P += "I";
// }

// for (let i = 0; i < M; i++) {
//   const index = S.indexOf(P, i);

//   if (S.indexOf(P, i) !== -1) {
//     answer++;
//     i = index + 1;
//   }
// }

let count = 0;
let i = 0;

while (i < M - 1) {
  if (S[i] === "I" && S.slice(i, i + 3) === "IOI") {
    count++;
    if (count >= N) answer++;
    i += 2;
  } else {
    count = 0;
    i++;
  }
}

console.log(answer);
