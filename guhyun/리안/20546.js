const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
const givenCash = +input[0];

const info = input[1].split(" ").map((e) => +e);

class Person {
  constructor() {
    this.money = givenCash;
    this.stock = 0;
  }
  buy(count, price) {
    this.money -= count * price;
    this.stock += count;
  }
  sell(price) {
    this.money += this.stock * price;
    this.stock = 0;
  }
}
const Jun = new Person();
const Sung = new Person();

let upCnt = 0;
for (let i = 0; i < 14; i++) {
  const cnt1 = Math.floor(Jun.money / info[i]);

  Jun.buy(cnt1, info[i]);
  if (i > 0 && info[i] - info[i - 1] > 0) upCnt++;
  else upCnt = 0;

  if (i > 0 && info[i] - info[i - 1] < 0) downCnt++;
  else downCnt = 0;

  if (upCnt === 3) {
    Sung.sell(info[i]);
    upCnt = 0;
  }
  if (downCnt === 3) {
    const cnt2 = Math.floor(Sung.money / info[i]);
    Sung.buy(cnt2, info[i]);
    upCnt = 0;
  }
}
const JunAsset = Jun.money + Jun.stock * info[13];
const SungAsset = Sung.money + Sung.stock * info[13];
const result =
  JunAsset > SungAsset ? "BNP" : JunAsset < SungAsset ? "TIMING" : "SAMESAME";
console.log(result);
