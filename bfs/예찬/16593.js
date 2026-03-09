const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [A, B] = input.split(" ").map(Number);
const map = new Map();
const MAX_NUM = 1000000000;
const needVisit = [A];
map.set(A, 0);

while (needVisit.length) {
  const a = needVisit.shift();

  if (a === B) {
    console.log(map.get(a) + 1);
    return;
  }
  const next = map.get(a) + 1;
  const case1 = map.get(a * 2);
  const case2 = map.get(Number(a + "1"));

  if ((!case1 || case1 > next) && a * 2 < MAX_NUM) {
    needVisit.push(a * 2);
    map.set(a * 2, next);
  }

  if ((!case2 || case2 > next) && Number(a + "1") < MAX_NUM) {
    needVisit.push(Number(a + "1"));
    map.set(Number(a + "1"), next);
  }
}

console.log(-1);
