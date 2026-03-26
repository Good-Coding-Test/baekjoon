const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let num = 1; // 현재 비교중인 숫자
let index = 0; // 남은 수의 현재 탐색 인덱스

while (index < input.length) {
  const str = String(num); // 한 자리씩 비교하기 위해 현재 숫자를 문자열로 치환

  // 현재 숫자 한 자리씩 남은 수와 비교
  for (let i = 0; i < str.length; i++) {
    // 일치하면 다음 인덱스 탐색
    if (str[i] === input[index]) {
      index++;

      if (index === input.length) break;
    }
  }
  num++;
}

console.log(num - 1);
