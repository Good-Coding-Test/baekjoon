function solution(diffs, times, limit) {
  var answer = 0;
  let start = 1;
  let end = diffs.reduce((a, b) => (a > b ? a : b), 0);

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let time = limit;
    let flag = true;

    for (let i = 0; i < diffs.length; i++) {
      const dif = diffs[i] - mid;
      if (!i || dif <= 0) {
        if (times[i] <= time) time -= times[i];
        else {
          flag = false;
          break;
        }
      } else {
        if (dif * (times[i - 1] + times[i]) + times[i] <= time)
          time -= dif * (times[i - 1] + times[i]) + times[i];
        else {
          flag = false;
          break;
        }
      }
    }

    if (flag) {
      end = mid - 1;
      answer = mid;
    } else {
      start = mid + 1;
    }
  }

  return answer;
}
