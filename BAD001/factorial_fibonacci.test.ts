import { factorial, fibonacci } from "./factorial_fibonacci";

describe("factorial", () => {
  it("factorial", () => {
    const result = factorial(0);
    expect(result).toBe(1);

    const result2 = factorial(5);
    expect(result2).toBe(120);
  });
});

it("fibonacci", () => {
  const result = fibonacci(2);
  expect(result).toBe(1);

  const result2 = fibonacci(10);
  expect(result2).toBe(55);
});
