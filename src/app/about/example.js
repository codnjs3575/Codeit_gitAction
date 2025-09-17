function solution(priorities, location) {
  // priorities = [2, 1, 3, 2]
  // location = 2
  // priorities[location]이 몇 번째로 실행되는지 확인하여 return
  // 방법 1. 앞에서부터 보면서 하나씩 확인하기
  // 방법 2. 우선순위별로 sort해서 확인하기

  // 나의 우선순위보다 큰 것이 있는지 확인하는 방법
  // Math.max(pop한 대상, [...priorities])

  const queue = priorities.map((p, i) => {
    return [p, i];
  });
  let printed = 0;

  while (queue.length > 0) {
    const [prio, idx] = queue.shift(); // 맨 앞 문서의 (우선순위, 인덱스)
    const restMax = queue.length
      ? Math.max(...queue.map((item) => item[0]))
      : -Infinity;

    if (prio >= restMax) {
      printed += 1;

      if (idx === location) return printed;
    } else queue.push([prio, idx]);
  }
  return printed;
}
solution([2, 1, 3, 2], 2);
