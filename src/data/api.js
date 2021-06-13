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

export const fetchConversion = ({ from, to, amount }) => {
  /* I have exposed the api key in here so this project can quickly be ran
   key would be on process.env.REACT_APP_API_KEY, */
  return Axios.get(
    `https://v6.exchangerate-api.com/v6/5ff10449bb35e2a8da9286b3/pair/${from}/${to}/${amount}`
  ).then(({ data }) => {
    console.log(data);
    const {
      conversion_result: result,
      base_code: convertFrom,
      target_code: convertTo,
    } = data;
    return { result, convertFrom, convertTo };
  });
};
