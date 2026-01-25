function solution(priorities, location) {
  var answer = 1;
  const order = [];

  for (let i = 0; i < priorities.length; i++) {
    order.push(i);
  }

  while (priorities.length) {
    const max_pr = Math.max(...priorities);

    if (priorities[0] < max_pr) {
      priorities.push(priorities.shift());
      order.push(order.shift());
    } else {
      priorities.shift();
      if (order.shift() === location) return answer;

      answer++;
    }
  }

  return answer;
}
