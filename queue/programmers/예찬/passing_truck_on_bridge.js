function solution(bridge_length, weight, truck_weights) {
  var answer = 0;
  let bridge = Array(bridge_length).fill(0);
  let currWeight = 0;

  while (truck_weights.length || currWeight > 0) {
    answer++;

    currWeight -= bridge.shift();

    if (currWeight + truck_weights[0] <= weight) {
      const truck = truck_weights.shift();
      currWeight += truck;
      bridge.push(truck);
    } else {
      bridge.push(0);
    }
  }
  return answer;
}
