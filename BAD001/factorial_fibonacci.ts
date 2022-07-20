export function factorial(num: number): number {
  if (num == 0 || num == 1) {
    return 1;
  }
  return factorial(num - 1) * num;
}

export function fibonacci(num: number): number {
  if (num == 1 || num == 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}
