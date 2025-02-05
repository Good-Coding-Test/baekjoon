const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const dices = input.slice(1).map((item) => item.split(" ").map(Number));
const answer = [];

function roll(underIndex) {
  let under = dices[0][underIndex];
  let maxValue = 0;
  for (let i = 0; i < N; i++) {
    const index = dices[i].indexOf(under);
    let reverseIndex;
    switch (index) {
      case 0:
        reverseIndex = 5;
        break;
      case 1:
        reverseIndex = 3;
        break;
      case 2:
        reverseIndex = 4;
        break;
      case 3:
        reverseIndex = 1;
        break;
      case 4:
        reverseIndex = 2;
        break;
      case 5:
        reverseIndex = 0;
        break;
    }

    const max = Math.max(
      ...dices[i].filter(
        (_, number) => number !== index && number !== reverseIndex
      )
    );

    maxValue += max;
    under = dices[i][reverseIndex];
  }
  return maxValue;
}

for (let i = 0; i < 6; i++) {
  answer.push(roll(i));
}

console.log(Math.max(...answer));
