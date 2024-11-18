const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// 시간 복잡도 개선을 위한 큐 생성
class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    this.queue[this.tail++] = element;
  }

  dequeue() {
    const element = this.queue[this.head];
    delete this.queue[this.head++];
    return element;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const n = parseInt(input[0].split(" ")[1]) - 1;
const m = parseInt(input[0].split(" ")[0]) - 1;
const box = input.slice(1).map((item) => item.split(" ").map(Number));
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];
const needSpread = new Queue(); // 전이되고 있는 토마토 큐
const period = box.map((item) => item.map(() => 0)); // 전이된 기간

// 상자 초기 값 세팅
box.forEach((item, index) =>
  item.forEach((item2, index2) => {
    // 값이 1이면 전이 시작
    if (item2 === 1) {
      needSpread.enqueue([index, index2]);
      period[index][index2] = 1;
    }
    // -1이면 비어있는 곳이므로 기간에 -1값 할당
    if (item2 === -1) period[index][index2] = -1;
  })
);

function bfs() {
  // 큐가 빈 상태일 때까지 반복
  while (!needSpread.isEmpty()) {
    // 구조분해 할당으로 현재 토마토의 좌표 받아옴
    const [x, y] = needSpread.dequeue();

    for (let i = 0; i < 4; i++) {
      // 상하좌우 방향 반복, x는 이전, nx는 다음 좌표를 가리킴
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx <= n &&
        ny <= m &&
        nx >= 0 &&
        ny >= 0 &&
        period[nx][ny] === 0 &&
        box[nx][ny] !== -1
      ) {
        // 이미 전이된 토마토이거나 좌표가 상자를 넘어서지 않는다면
        // 해당 토마토를 큐에 추가하고 이전 일차+1을 배열에 할당
        needSpread.enqueue([nx, ny]);
        period[nx][ny] = period[x][y] + 1;
      }
    }
  }

  // 반복문 종료시에도 0인 값이 남아있다면 전이가 될 수 없는 상태이므로 -1 리턴
  if (period.some((item) => item.some((item) => item === 0))) return -1;
  // 그 외 경우에는 배열의 최댓값(모두 전이된 일차) 리턴.
  // 일차가 0일차가 아닌 1일차부터 시작하므로 -1
  return Math.max(...period.flat()) - 1;
}

console.log(bfs());
