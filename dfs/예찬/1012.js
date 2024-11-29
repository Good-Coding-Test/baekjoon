const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);
let index = 1; // 테스트 케이스를 맞추기 위한 인덱스
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];

for (let i = 0; i < T; i++) {
  const [M, N, t] = input[index].split(" ").map(Number);
  const visited = new Set();
  const needVisit = [];
  let count = 0;

  const cabages = new Set(
    input
      .slice(index + 1, index + 1 + t)
      .map((item) => item.split(" ").join(","))
  );

  index += t + 1;

  for (let cabage of cabages) {
    const [x, y] = cabage.split(",").map(Number);

    // 이미 visited에 들어있으면 continue
    if (visited.has(`${x},${y}`)) continue;
    needVisit.push([x, y]);

    while (needVisit.length) {
      const [x, y] = needVisit.pop();
      if (visited.has(`${x},${y}`)) continue;
      visited.add(`${x},${y}`);

      for (let j = 0; j < 4; j++) {
        const nx = x + dx[j];
        const ny = y + dy[j];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < M &&
          ny < N &&
          cabages.has(`${nx},${ny}`) &&
          !visited.has(`${nx},${ny}`)
        ) {
          needVisit.push([nx, ny]);
        }
      }
    }
    // 반복문이 끝나 순회가 끝나면 그때 count 1 증가
    // (연결돼있다는 뜻이므로)
    count++;
  }
  console.log(count);
}
