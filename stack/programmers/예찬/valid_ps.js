function solution(s) {
  var answer = true;
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(s[i]);
    } else {
      if (!stack.length) {
        answer = false;
        break;
      } else {
        stack.pop();
      }
    }
  }

  if (stack.length) answer = false;

  return answer;
}
