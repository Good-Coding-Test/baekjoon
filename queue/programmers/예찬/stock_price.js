function solution(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  for (let i = 0; i < prices.length; i++) {
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      const prev = stack.pop();
      answer[prev] = i - prev;
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    const prev = stack.pop();
    answer[prev] = prices.length - 1 - prev;
  }

  return answer;
}
