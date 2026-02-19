function solution(n, wires) {
  var answer = n;

  function dfs(visited, graph, node) {
    visited[node] = true;
    let count = 1;
    for (let i of graph[node]) {
      if (visited[i]) continue;

      count += dfs(visited, graph, i);
    }

    return count;
  }

  for (let i = 0; i < wires.length; i++) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let j = 0; j < wires.length; j++) {
      if (i === j) continue;

      const [a, b] = wires[j];
      graph[a].push(b);
      graph[b].push(a);
    }

    const visited = Array(n + 1).fill(false);
    const count = dfs(visited, graph, 1);
    answer = Math.min(answer, Math.abs(count - (n - count)));
  }

  return answer;
}
