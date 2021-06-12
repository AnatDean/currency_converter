/**
 * Handles the validity of a given input typed by user
 *
 * @param {String} e The user input.
 *
 * @returns {boolean}
 */

export const validateCurrency = (input) => {
  try {
    const isValid = Number(input);
    // input cannot be converted to number
    if (isNaN(isValid)) throw new Error();
    return true;
  } catch (err) {
    return false;
  }
};

export const getCountryFromCurrencyInitial = (initial) => {
  return initial.slice(0, -1);
};
