import { fizzBuzz } from "./FizzBuzz";

it("fizzBuzz", () => {
  let actual = fizzBuzz(3);
  expect(actual).toEqual("1, 2, Fizz,");

  let actual2 = fizzBuzz(5);
  expect(actual2).toEqual("1, 2, Fizz, 4, Buzz,");
});
