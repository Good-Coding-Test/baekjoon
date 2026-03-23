function solution(n, q, ans) {
  var answer = 0;

  function makeCombi() {
    let result = [];

    function dfs(start, path) {
      if (path.length === 5) {
        result.push([...path]);
        return;
      }
      for (let i = start; i <= n; i++) {
        path.push(i);
        dfs(i + 1, path);
        path.pop();
      }
    }
    dfs(1, []);
    return result;
  }

  function isCorrect(arr) {
    for (let i = 0; i < q.length; i++) {
      let count = 0;
      for (let j = 0; j < arr.length; j++) {
        if (arr.includes(q[i][j])) count++;
      }
      if (count !== ans[i]) return false;
    }
    return true;
  }

  for (let com of makeCombi()) {
    if (isCorrect(com)) answer++;
  }

  return answer;
}
