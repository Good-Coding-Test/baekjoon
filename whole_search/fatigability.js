function solution(k, dungeons) {
  var answer = 0;

  function getAllPermutations(length) {
    let result = [];
    let visited = Array(dungeons.length).fill(false);

    function dfs(path) {
      if (path.length === length) result.push([...path]);

      for (let i = 0; i < length; i++) {
        if (visited[i]) continue;

        visited[i] = true;
        path.push(i);

        dfs(path);

        path.pop();
        visited[i] = false;
      }
    }

    dfs([]);
    return result;
  }

  const tries = getAllPermutations(dungeons.length);

  for (let t of tries) {
    let visits = 0;
    let life = k;
    for (let a of t) {
      if (life >= dungeons[a][0]) {
        life -= dungeons[a][1];
        visits++;
      }
    }
    if (visits === dungeons.length) {
      answer = visits;
      break;
    }
    answer = Math.max(answer, visits);
  }

  return answer;
}
