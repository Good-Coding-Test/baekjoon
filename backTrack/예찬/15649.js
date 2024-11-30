const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [N, M] = input.split(" ").map(Number);
let selected = Array.from({ length: M }).fill(false);

function DFS(arr, depth) {
  if (depth === M) {
    let answer = "";
    for (let node of arr) {
      answer += node + " ";
    }
    console.log(answer);
    return;
  }

  for (let i = 0; i < N; i++) {
    // 원소의 수만큼 반복
    // 이미 선택된 원소라면 건너뜀
    if (selected[i]) continue;
    arr.push(i + 1);
    selected[i] = true;
    DFS(arr, depth + 1);
    //선택된 원소 정상화
    selected[i] = false;
    arr.pop();
  }
}

DFS([], 0);
