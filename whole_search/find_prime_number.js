function solution(numbers) {
  var answer = 0;

  function getAllPermutations(number) {
    let result = new Set();
    let visited = Array(number.length).fill(false);

    function dfs(path) {
      if (path.length) result.add(+path);

      for (let i = 0; i < number.length; i++) {
        if (visited[i]) continue;

        visited[i] = true;
        path += number[i];

        dfs(path);

        path = path.slice(0, path.length - 1);
        visited[i] = false;
      }
    }

    dfs("");
    return result;
  }

  function isPrime(number) {
    if (number < 2) return false;

    for (let i = 2; i * i <= number; i++) {
      if (number % i === 0) return false;
    }

    return true;
  }

  for (let num of getAllPermutations(numbers)) {
    if (isPrime(num)) answer++;
  }

  return answer;
}
