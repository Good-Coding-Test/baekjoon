function solution(s) {
  var answer = 1;
  let str = [];

  for (let i = 0; i < s.length; i++) {
    if (str.length && s[i] === str[str.length - 1]) {
      str.pop();
    } else str.push(s[i]);
  }

  if (str.length) answer = 0;

  return answer;
}
