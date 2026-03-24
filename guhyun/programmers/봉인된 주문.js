function solution(n, bans) {
  // 26진수를 숫자로 치환
  function toNumber(str) {
    let result = 0;

    for (let i = 0; i < str.length; i++) {
      result += 26 ** (str.length - 1 - i) * (str.charCodeAt(i) - 96);
    }
    return result;
  }

  // 숫자를 26진수로 치환
  function toString(num) {
    let result = "";

    while (num > 0) {
      num--; // %는 0부터 시작하므로 -1을 한 뒤에 치환
      result = String.fromCharCode((num % 26) + 97) + result;
      num = Math.floor(num / 26);
    }
    return result;
  }

  // 금지된 주문을 사전 순서로 정렬
  const sortedBans = bans.map(toNumber).sort((a, b) => a - b);

  // 금지된 주문이 사전상으로 n보다 앞선다면 그만큼 사전이 앞으로 밀리기 때문에 구해야 할 순서를 1씩 증가시킨다.
  for (let ban of sortedBans) {
    if (ban <= n) n++;
    else break;
  }

  return toString(n);
}
