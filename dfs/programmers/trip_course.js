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

function solution(tickets) {
  var answer = [];

  let visited = Array(tickets.length).fill(false);

  tickets.sort();

  function dfs(cur, arr) {
    if (arr.length === tickets.length + 1) {
      answer = arr;
      return true;
    }

    for (let i = 0; i < tickets.length; i++) {
      let [start, end] = tickets[i];

      if (start === cur && !visited[i]) {
        visited[i] = true;

        if (dfs(end, [...arr, end])) return true;

        visited[i] = false;
      }
    }

    return false;
  }

  dfs("ICN", ["ICN"]);

  return answer;
}
