function solution(brown, yellow) {
  var answer = [];
  let a = 0;
  let b = 0;

  for (let i = 1; i <= yellow; i++) {
    if (yellow % i === 0) {
      a = i;
      b = yellow / i;

      if (a * 2 + b * 2 + 4 === brown) return [b + 2, a + 2];
    }
  }

  return answer;
}
