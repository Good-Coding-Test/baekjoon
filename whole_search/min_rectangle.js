function solution(sizes) {
  var answer = 0;

  let h = [];
  let v = [];

  for (let [a, b] of sizes) {
    h.push(Math.max(a, b));
    v.push(Math.min(a, b));
  }

  answer = Math.max(...h) * Math.max(...v);

  return answer;
}
