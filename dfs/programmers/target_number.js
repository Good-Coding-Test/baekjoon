function solution(numbers, target) {
  var answer = 0;

  function dfs(x, i) {
    if (i === numbers.length - 1) {
      if (x === target) answer++;
      return;
    }

    dfs(x + numbers[i + 1], i + 1);
    dfs(x - numbers[i + 1], i + 1);
  }

  dfs(numbers[0], 0);
  dfs(-numbers[0], 0);

  return answer;
}
