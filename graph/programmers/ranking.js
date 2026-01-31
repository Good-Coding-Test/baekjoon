function solution(n, results) {
  var answer = 0;

  const players = Array.from({ length: n }, (item, index) => index + 1);
  const matches = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));

  results.forEach(([a, b]) => {
    matches[a][b] = 1;
    matches[b][a] = -1;
    matches[a][a] = 0;
    matches[b][b] = 0;
  });

  for (let mid of players) {
    for (let start of players) {
      for (let end of players) {
        if (matches[start][mid] === 1 && matches[mid][end] === 1)
          matches[start][end] = 1;
        if (matches[start][mid] === -1 && matches[mid][end] === -1)
          matches[start][end] = -1;
      }
    }
  }

  matches.slice(1).forEach((match) => {
    match.slice(1).every((m) => m !== false) && answer++;
  });

  return answer;
}
