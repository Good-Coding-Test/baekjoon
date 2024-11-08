const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

//현금 및 주가 세팅

let junMoney = parseInt(input[0]);
let junStock = 0;
let minMoney = parseInt(input[0]);
let minStock = 0;
let stock = input[1].split(" ");
let fluctUp = 0;
let fluctDown = 0;

for (let i = 0; i < 14; i++) {
  const curStock = parseInt(stock[i]);

  if (i > 1) {
    const prevStock = parseInt(stock[i - 1]);
    // 주가 변동성 체크
    if (curStock > prevStock) {
      fluctUp++;
      fluctDown = 0;
    } else if (curStock < prevStock) {
      fluctDown--;
      fluctUp = 0;
    } else {
      fluctDown = 0;
      fluctUp = 0;
    }
  }
  //준현이는 살 수 있다면, 전량매수
  while (junMoney >= curStock) {
    junStock++;
    junMoney -= curStock;
  }

  if (fluctUp >= 3 && minStock > 1) {
    //성민이 3일간 주식상승일 때 전량 매도
    minMoney += curStock * minStock;
    minStock = 0;
    fluctUp = 0; //팔았으니 변동성 초기화
  } else if (fluctDown <= -3) {
    //성민이 3일간 주식하락일 때 전량 매수
    while (minMoney >= curStock) {
      minStock++;
      minMoney -= curStock;
      fluctDown = 0; //샀으니 변동성 초기화
    }
  }

  if (i === 13) {
    if (junStock * curStock + junMoney > minStock * curStock + minMoney)
      console.log("BNP");
    else if (junStock * curStock + junMoney < minStock * curStock + minMoney)
      console.log("TIMING");
    else console.log("SAMESAME");
  }
}
