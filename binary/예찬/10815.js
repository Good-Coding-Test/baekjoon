const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const cards = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const M = parseInt(input[2]);
const question = input[3].split(" ").map(Number);
const answer = [];

function binarySearch(q) {
  let start = 0;
  let end = N - 1;
  let answer = false;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (cards[mid] < q) {
      start = mid + 1;
    } else if (cards[mid] > q) {
      end = mid - 1;
    }
    if (cards[mid] === q) {
      answer = true;
      break;
    }
  }

  return answer ? 1 : 0;
}

for (let i = 0; i < M; i++) {
  answer.push(binarySearch(question[i]));
}

console.log(answer.join(" "));
