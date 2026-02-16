function solution(k, dungeons) {
  var answer = 0;
  let visited = Array(dungeons.length).fill(false);

  function dfs(depth, life) {
    answer = Math.max(answer, depth);

    for (let i = 0; i < dungeons.length; i++) {
      if (visited[i]) continue;
      if (life < dungeons[i][0]) continue;

      visited[i] = true;
      life -= dungeons[i][1];

      dfs(depth + 1, life);

      life += dungeons[i][1];
      visited[i] = false;
    }
  }

  dfs(0, k);

  return answer;
}
