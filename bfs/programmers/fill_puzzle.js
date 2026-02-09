function solution(game_board, table) {
  var answer = 0;
  const dx = [-1, 0, 0, 1];
  const dy = [0, 1, -1, 0];

  function bfs(board, x, y, target) {
    const queue = [[x, y]];
    const shape = [[0, 0]];
    const n = game_board.length;
    board[x][y] = -1;

    while (queue.length) {
      const [cx, cy] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < n &&
          ny < n &&
          board[nx][ny] === target
        ) {
          queue.push([nx, ny]);
          board[nx][ny] = -1;
          shape.push([nx - x, ny - y]);
        }
      }
    }

    return shape;
  }

  function normalize(shape) {
    shape.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const [x, y] = shape[0];

    return shape.map(([i, j]) => [i - x, j - y]);
  }

  function rotate(shape) {
    return shape.map(([x, y]) => [y, -x]);
  }

  let blank = [];
  let block = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (game_board[i][j] === 0) {
        blank.push(normalize(bfs(game_board, i, j, 0)));
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (table[i][j] === 1) {
        block.push(normalize(bfs(table, i, j, 1)));
      }
    }
  }

  const used = Array(block.length).fill(false);

  for (let blnk of blank) {
    for (let i = 0; i < block.length; i++) {
      if (used[i] || blnk.length !== block[i].length) continue;
      let blck = block[i];

      for (let r = 0; r < 4; r++) {
        blck = normalize(blck);

        if (
          blck.every(([x, y], idx) => x === blnk[idx][0] && y === blnk[idx][1])
        ) {
          used[i] = true;
          answer += blck.length;
          break;
        }

        blck = rotate(blck);
      }

      if (used[i]) break;
    }
  }

  return answer;
}
