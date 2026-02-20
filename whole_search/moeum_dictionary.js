function solution(word) {
  var answer = 0;
  let moeum = "AEIOU";

  function dfs(start) {
    if (start === word) return true;
    if (start.length === 5) return false;

    for (let i = 0; i < 5; i++) {
      answer++;
      if (dfs(start + moeum[i])) return true;
    }
  }

  dfs("");

  return answer;
}
