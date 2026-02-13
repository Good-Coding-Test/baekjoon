function solution(answers) {
  var answer = [];
  let a = [1, 2, 3, 4, 5];
  let b = [2, 1, 2, 3, 2, 4, 2, 5];
  let c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let arr = Array(3).fill(0);

  for (let i = 0; i < answers.length; i++) {
    if (a[i % a.length] === answers[i]) arr[0] += 1;
    if (b[i % b.length] === answers[i]) arr[1] += 1;
    if (c[i % c.length] === answers[i]) arr[2] += 1;
  }

  arr.forEach((item, index) => {
    if (Math.max(...arr) === item) answer.push(index + 1);
  });

  return answer;
}
