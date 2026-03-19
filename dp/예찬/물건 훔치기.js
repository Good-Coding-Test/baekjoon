function solution(info, n, m) {
  let dp = Array(m).fill(Infinity);
  dp[0] = 0;

  for (let [a, b] of info) {
    const next = Array(m).fill(Infinity);

    for (let i = 0; i < m; i++) {
      // 도달할 수 없는 경우 제외
      if (dp[i] === Infinity) continue;
      // A가 훔치는 경우
      if (dp[i] + a < n) next[i] = Math.min(next[i], dp[i] + a);
      // B가 훔치는 경우
      if (i + b < m) next[i + b] = Math.min(next[i + b], dp[i]);
    }

    // 해당 누적 사항 dp에 저장
    dp = next;
  }
  let answer = Math.min(...dp);
  return answer === Infinity ? -1 : answer;
}
