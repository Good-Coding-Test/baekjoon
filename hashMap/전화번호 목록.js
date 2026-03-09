function solution(phone_book) {
  var answer = true;

  const set = new Set();

  for (let word of phone_book) {
    set.add(word);
  }

  for (let word of phone_book) {
    for (let i = 0; i < word.length - 1; i++) {
      const w = word.slice(0, i + 1);
      if (set.has(w)) return false;
    }
  }

  return answer;
}
