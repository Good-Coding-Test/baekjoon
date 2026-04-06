const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const map = new Map();

for (let str of input) {
  map.set(str, (map.get(str) || 0) + 1);
}

const dict = [...map.keys()].sort();

for (let str of dict) {
  console.log(str, ((map.get(str) / input.length) * 100).toFixed(4));
}
