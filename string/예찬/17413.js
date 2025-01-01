const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const S = input.split(">");
let answer = "";

if (S.length === 1) {
  const tmpStr = S[0].split(" ");
  for (let i = 0; i < tmpStr.length; i++) {
    answer += tmpStr[i].split("").reverse().join("") + " ";
  }
  console.log(answer);
  return;
}

for (let i = 0; i < S.length; i++) {
  const tmpStr = S[i].split("<");

  if (tmpStr[0]) {
    if (tmpStr[0].split(" ").length > 1) {
      for (let j = 0; j < tmpStr[0].split(" ").length; j++) {
        answer += tmpStr[0].split(" ")[j].split("").reverse().join("");
        j === tmpStr[0].split(" ").length - 1 ? null : (answer += " ");
      }
    } else answer += tmpStr[0].split("").reverse().join("");
  }
  if (tmpStr[1]) {
    answer += "<" + tmpStr[1] + ">";
  }
}

console.log(answer);
