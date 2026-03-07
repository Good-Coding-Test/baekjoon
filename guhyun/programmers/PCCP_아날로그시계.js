function solution(h1, m1, s1, h2, m2, s2) {
  function getCount(h, m, s) {
    let bell = -1; // 0시0분0초는 1번만 울린다

    bell += (h * 60 + m) * 2; // 초침이 한바퀴 돌때 시침, 분침 총 2번 만난다
    bell -= h; // 59분 -> 00분일때 분침은 초침과 만나지 않는다
    if (h >= 12) bell -= 2; // 11시59분59초->12시경우 분,초침과 만나지 않고 12시에 1번 만난다

    const hDegree = (h * 30 + m * 0.5 + s * (0.5 / 60)) % 360;
    const mDegree = (m * 6 + 0.1 * s) % 360;
    const sDegree = (6 * s) % 360;

    if (sDegree >= hDegree) bell++; // 초침이 시침을 지나쳤다
    if (sDegree >= mDegree) bell++; // 초침이 분침을 지나쳤다

    return bell;
  }
  // 0시0분0초부터 시작, 끝 시각까지 횟수
  let totalBell = getCount(h2, m2, s2) - getCount(h1, m1, s1);
  // 시작시간이 0시거나 12시이면 +1
  if ((h1 === 0 || h1 === 12) && m1 === 0 && s1 === 0) totalBell++;
  return totalBell;
}
