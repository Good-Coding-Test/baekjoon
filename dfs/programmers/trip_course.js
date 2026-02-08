function solution(tickets) {
  var answer = [];
  let graph = {};

  for (let [start, end] of tickets) {
    if (!graph[start]) graph[start] = [];

    graph[start].push(end);
  }

  Object.keys(graph).forEach((key) => {
    graph[key].sort((a, b) => a.localeCompare(b));
  });

  function dfs(airport) {
    while (graph[airport]?.length) {
      dfs(graph[airport].shift());
    }

    answer.push(airport);
  }

  dfs("ICN");

  return answer.reverse();
}
