const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [input, ...arr] = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.split(" ").map(Number);

// 그래프를 만듦.
const graph = Array.from({ length: N + 1 }, () => []);

// 각 노드에 대한 간선 정보를 저장
for (let i = 0; i < M; i++) {
  const [front, back] = arr[i].split(" ");
  graph[+back].push(+front);
}

// 각 노드에 대한 DFS
function dfs(start) {
  const stack = [start];
  const visited = new Array(N + 1).fill(false);
  let count = 0; // 해킹 가능한 컴퓨터 수
  visited[start] = true; // 시작 노드 방문 처리

  while (stack.length) {
    const node = stack.pop();
    // 해당 노드와 연결된 노드들을 탐색
    for (let next of graph[node]) {
      if (visited[next]) continue;
      stack.push(next);
      visited[next] = true;
      count++;
    }
  }

  return count;
}

let max = -1;
let answer = [];

for (let i = 1; i <= N; i++) {
  let count = dfs(i);
  if (count > max) {
    max = count;
    answer = [i];
  } else if (count === max) {
    answer.push(i);
  }
}

console.log(answer.join(" "));
