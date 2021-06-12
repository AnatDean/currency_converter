import { getCountryFromCurrencyInitial, validateCurrency } from "../utils/";

describe("validateCurrency", () => {
  test("given whole number (in text form) returns true", () => {
    let input = "1";
    expect(validateCurrency(input)).toBe(true);
  });
  test("given any letters returns false", () => {
    let input = "a";
    expect(validateCurrency(input)).toBe(false);

    input = "1a";
    expect(validateCurrency(input)).toBe(false);
  });

  test("given number with 1 decimal point returns true", () => {
    let input = "1.5";
    expect(validateCurrency(input)).toBe(true);

    input = "2.99";
    expect(validateCurrency(input)).toBe(true);
  });

  test("given number with more than 2 decimal places, return true", () => {
    /* even though this is not a normal currency value, 
  it is a valid input as the programme can 
  interpret a valid value from it */
    let input = "1.57";
    expect(validateCurrency(input)).toBe(true);
  });

  test("given number with invalid number of decimals returns false", () => {
    let input = "1.5.0";
    expect(validateCurrency(input)).toBe(false);
  });

  // given more time would go into detail with more customisation of number inputs
  test.todo(
    "given number with commas for large inputs, will return true e.g. 1,000,000"
  );
});

describe("getCountryFromCurrencyInitial", () => {
  test("given 3 character currency code, will return 2 character country code", () => {
    let input = "EUR";
    expect(getCountryFromCurrencyInitial(input)).toBe("EU");

    input = "USD";
    expect(getCountryFromCurrencyInitial(input)).toBe("US");
  });
});
