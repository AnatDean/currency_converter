import Axios from "axios";

export const fetchCurrencies = () => {
  return Axios.get(`https://openexchangerates.org/api/currencies.json`).then(
    ({ data }) => {
      return Object.entries(data).map(([currencyCode, currencyName]) => {
        return { currencyCode, currencyName };
      });
    }
  );
};
