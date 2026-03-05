function solution(land) {
  var answer = 0;
  const dx = [-1, 0, 0, 1];
  const dy = [0, 1, -1, 0];
  let key = 2; // 각 덩어리의 키
  const map = new Map(); // 키에 해당하는 덩어리 크기 저장

  // 초기 dfs를 통해 각 덩어리의 키와 크기 설정
  for (let i = 0; i < land[0].length; i++) {
    for (let j = 0; j < land.length; j++) {
      if (land[j][i] === 1) map.set(key, bfs(j, i, key++));
    }
  }

  function bfs(x, y, k) {
    let queue = [[x, y]];
    land[x][y] = k;
    let count = 1;

    // 덩어리를 끝까지 탐색하여 크기를 반환해냄
    while (queue.length) {
      const [cx, cy] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < land.length &&
          ny < land[0].length &&
          land[nx][ny] === 1
        ) {
          // 해당 키값을 land 배열에 저장(이후에 탐색할 수 있도록)
          land[nx][ny] = k;
          count++;
          queue.push([nx, ny]);
        }
      }
    }

    return count;
  }

  // 각 열마다 탐색
  for (let i = 0; i < land[0].length; i++) {
    let oil = 0;
    let set = new Set(); // 이미 계산한 덩어리 처리하는 Set
    for (let j = 0; j < land.length; j++) {
      if (land[j][i] > 1 && !set.has(land[j][i])) {
        set.add(land[j][i]);
        oil += map.get(land[j][i]); // 찾은 덩어리에 해당하는 크기를 더함
      }
    }
    answer = Math.max(answer, oil);
  }

  return answer;
}
