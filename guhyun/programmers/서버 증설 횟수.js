function solution(players, m, k) {
  var answer = 0;
  let arr = Array(24).fill(0);
  let server = 0;

  for (let i = 0; i < 24; i++) {
    if (arr[i]) server -= arr[i];

    const needServer = Math.floor(players[i] / m) - server;
    if (needServer > 0) {
      answer += needServer;
      arr[i + k] = needServer;
      server += needServer;
    }
  }

  return answer;
}
