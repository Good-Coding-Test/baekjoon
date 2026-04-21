function solution(s) {
  var answer = [];
  let count = 0;
  let idx = 0;

  while (s !== "1") {
    idx++;
    let tmp = s;
    s = "";
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i] === "1") s += "1";
      else count++;
    }
    let len = s.length;

    let i = -1;
    while (1) {
      if (2 ** (i + 1) > len) break;
      i++;
    }
    s = "";
    for (let a = i; a >= 0; a--) {
      if (len >= 2 ** a) {
        len -= 2 ** a;
        s += "1";
      } else s += "0";
    }
  }

  return [idx, count];
}
