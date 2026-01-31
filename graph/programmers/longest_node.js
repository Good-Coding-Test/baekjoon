function solution(n, edge) {
  var answer = 0;
  let graph = {};

  edge.forEach(([a, b], index) => {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  });

  let queue = [1];
  let isVisit = Array(n + 1).fill(0);
  isVisit[1] = 1;

  while (queue.length) {
    const cur = queue.shift();
    graph[cur].forEach((item, index) => {
      if (!isVisit[item]) {
        isVisit[item] = isVisit[cur] + 1;
        queue.push(item);
      }
    });
  }

  const max = Math.max(...isVisit);

  isVisit.forEach((item) => {
    if (item === max) answer++;
  });

  return answer;
}
