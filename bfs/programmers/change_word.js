function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const visited = new Map();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const queue = [begin];

  visited.set(begin, 0);

  while (queue.length) {
    const word = queue.shift();
    const depth = visited.get(word);

    if (word === target) return depth;

    for (let i = 0; i < word.length; i++) {
      for (let ch of alphabet) {
        if (ch === word[i]) continue;

        const next = word.slice(0, i) + ch + word.slice(i + 1);

        if (words.includes(next) && !visited.has(next)) {
          visited.set(next, depth + 1);
          queue.push(next);
        }
      }
    }
  }

  return 0;
}
