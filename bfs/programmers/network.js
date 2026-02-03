function solution(n, computers) {
  var answer = 0;

  let visited = new Set();
  let needVisit = [];

  for (let i = 0; i < n; i++) {
    if (visited.has(i)) continue;
    needVisit.push(i);
    visited.add(i);

    while (needVisit.length) {
      const idx = needVisit.shift();
      for (let j = 0; j < n; j++) {
        if (visited.has(j) || !computers[idx][j]) continue;

        needVisit.push(j);
        visited.add(j);
      }
    }

    answer++;
  }

  return answer;
}
