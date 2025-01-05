const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const numbers = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

const average =
  numbers.reduce((prev, current) => prev + current) / numbers.length;

const middle = numbers[Math.floor((N - 1) / 2)];

let mostTmp = {};
let mostArr = [];
let max = 0;
numbers.forEach((item) => {
  if (mostTmp[item]) mostTmp[item]++;
  else mostTmp[item] = 1;

  if (mostTmp[item] > max) {
    max = mostTmp[item];
    mostArr = [item];
  } else if (mostTmp[item] === max) {
    mostArr.push(item);
  }
});
mostArr.sort((a, b) => a - b);

const most = mostArr && mostArr.length > 1 ? mostArr[1] : mostArr[0];

const range = Math.max(...numbers) - Math.min(...numbers);

console.log(Math.round(average) | 0);
console.log(middle);
console.log(most);
console.log(range);
