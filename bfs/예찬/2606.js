const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const cons = input.slice(2).map((item) => item.split(" ").map(Number));
let count = 0;

const selected = [];
let needVisit = [];

needVisit.push(1);

while (needVisit.length) {
  const node = needVisit.pop();

  if (selected.includes(node)) continue;
  selected.push(node);

  for (let con of cons) {
    const [a, b] = con;
    if (a !== node && b !== node) continue;
    if (selected.includes(a) && selected.includes(b)) continue;
    if (selected.includes(a)) needVisit.push(b);
    else needVisit.push(a);
  }

  count++;
}

console.log(count - 1);
