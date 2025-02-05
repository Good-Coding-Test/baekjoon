const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const like = parseInt(input[1]);
const student = input[2].split(" ").map(Number);

const frame = new Map();

for (let i = 0; i < like; i++) {
  if (frame.has(student[i])) {
    frame.set(student[i], frame.get(student[i]) + 1);
    continue;
  }

  if (frame.size === N) {
    let minValue = Infinity;
    let minKey = [];
    for (let [key, value] of frame) {
      if (value < minValue) {
        minValue = value;
        minKey = [key];
      } else if (value === minValue) {
        minKey.push(key);
      }
    }
    if (minKey.length > 1) {
      const tmpKey = minKey[0];
      frame.delete(tmpKey);
    } else {
      frame.delete(minKey[0]);
    }
    frame.set(student[i], 1);
  } else {
    frame.set(student[i], 1);
  }
}

const answer = [...frame.keys()].sort((a, b) => a - b);

console.log(answer.join(" "));
