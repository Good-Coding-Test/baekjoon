const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const board = [];
const answer = [];
let cnt = 0;
const Indexs = {};

const checkBingo = (x, y) => {
  let cnt = 0;
  //가로
  let flag = true;
  for (let i = 0; i < 5; i++) {
    if (board[y][i] !== -1) flag = false;
  }
  if (flag) cnt++;
  //세로
  flag = true;
  for (let i = 0; i < 5; i++) {
    if (board[i][x] !== -1) flag = false;
  }
  if (flag) cnt++;

  //대각선
  if (x === y) {
    flag = true;

    for (let i = 0; i < 5; i++) {
      if (board[i][i] !== -1) flag = false;
    }
    if (flag) cnt++;
  }
  if (x + y === 4) {
    flag = true;

    for (let i = 0; i < 5; i++) {
      if (board[i][4 - i] !== -1) flag = false;
    }

    if (flag) cnt++;
  }
  return cnt;
};

for (let i = 0; i < 5; i++) {
  board.push(input[i].split(" ").map((e) => +e));
  answer.push(input[i + 5].split(" ").map((e) => +e));
  for (let j = 0; j < 5; j++) {
    Indexs[board[i][j]] = {
      x: j,
      y: i,
    };
  }
}
let count = 0;
let flag = false;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    const { x, y } = Indexs[answer[i][j]];
    board[y][x] = -1;
    count += checkBingo(x, y);
    cnt++;
    if (count >= 3) {
      console.log(cnt);
      flag = !flag;
      break;
    }
  }
  if (flag) break;
}
