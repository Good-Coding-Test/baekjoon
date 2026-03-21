function solution(storage, requests) {
  var answer = storage.length * storage[0].length;
  const dx = [-1, 0, 0, 1];
  const dy = [0, 1, -1, 0];
  const h = storage.length;
  const w = storage[0].length;

  // 보드판 생성(패딩 포함)
  const board = Array.from({ length: h + 2 }, () => Array(w + 2).fill("."));
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      board[i + 1][j + 1] = storage[i][j];
    }
  }

  // 문자열 개수에 따라 다른 함수 실행
  for (let req of requests) {
    if (req.length === 1) {
      answer -= removeByForklift(req);
    } else {
      answer -= removeByCrane(req[0]);
    }
  }

  function removeByCrane(char) {
    let count = 0;

    for (let i = 0; i < h + 2; i++) {
      for (let j = 0; j < w + 2; j++) {
        if (board[i][j] === char) {
          board[i][j] = ".";
          count++;
        }
      }
    }

    return count;
  }

  // 지게차가 접근할 수 있는 바깥 부분 구하는 함수
  function getOutside() {
    let visited = Array.from({ length: h + 2 }, () => Array(w + 2).fill(false));
    let needVisit = [[0, 0]];
    visited[0][0] = true;

    while (needVisit.length) {
      const [x, y] = needVisit.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < h + 2 &&
          ny < w + 2 &&
          !visited[nx][ny] &&
          board[nx][ny] === "."
        ) {
          visited[nx][ny] = true;
          needVisit.push([nx, ny]);
        }
      }
    }
    return visited;
  }

  // 지게차를 통해 바깥 영역에 있는 것만 제거
  function removeByForklift(char) {
    const visited = getOutside();
    let count = 0;

    for (let i = 0; i < h + 2; i++) {
      for (let j = 0; j < w + 2; j++) {
        if (board[i][j] !== char) continue;

        for (let d = 0; d < 4; d++) {
          const nx = i + dx[d];
          const ny = j + dy[d];
          if (visited[nx][ny]) {
            board[i][j] = ".";
            count++;
            break;
          }
        }
      }
    }
    return count;
  }

  return answer;
}
