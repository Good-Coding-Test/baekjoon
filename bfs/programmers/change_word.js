function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  let needVisit = [begin];
  let visited = new Map();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  visited.set(begin, 0);

  while (needVisit.length) {
    let word = needVisit.shift();
    let depth = visited.get(word);

    if (word === target) return depth;

    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        if (alphabet[j] === word[i]) continue;

        const changed_word = word.slice(0, i) + alphabet[j] + word.slice(i + 1);

        if (words.includes(changed_word) && !visited.has(changed_word)) {
          visited.set(changed_word, depth + 1);
          needVisit.push(changed_word);
        }
      }
    }
  }

  return 0;
}
