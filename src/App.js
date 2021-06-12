import { useEffect, useState } from "react";
import SearchAbleDropDown from "./components/DropDown";
import TextInput from "./components/Input/";
import { getCountryFromCurrencyInitial } from "./utils/index";
import "./styles/global.scss";
import { fetchConversion, fetchCurrencies } from "./data/api";
import Button from "./components/Button";

function App() {
  const [convertTo, setConvertTo] = useState(null);
  const [amount, setAmount] = useState("");
  const [countries, setCountries] = useState([]);
  const [convertFrom, setConvertFrom] = useState(null);
  const [conversion, setConversion] = useState(0);

  useEffect(() => {
    fetchCurrencies().then((countries) => {
      setCountries(countries);
      setConvertFrom(
        countries.find(({ currencyCode }) => currencyCode === "GBP")
      );
    });
  }, []);

  // props for all country dropdowns
  const searchAbleDropDownProps = {
    getOptionText: (option) => `${option.currencyCode}/ ${option.currencyName}`,
    getOptionLabel: (option) => option.currencyName,
    selectedProperty: (option) => option.currencyCode,
    getImgSrc: (option) =>
      `https://www.countryflags.io/${getCountryFromCurrencyInitial(
        option.currencyCode
      )}/flat/64.png`,
    options: countries,
  };

  const handleSelection = (selection, handler) => {
    // set null or option object based on stored property
    handler(selection);
  };

  const switchCurrencies = () => {
    const currConvertFrom = convertFrom ? { ...convertFrom } : null;
    const currConvertTo = convertTo ? { ...convertTo } : null;
    setConvertFrom(currConvertTo);
    setConvertTo(currConvertFrom);
  };

  const convertCurrencies = (e) => {
    e.preventDefault();
    fetchConversion({
      from: convertFrom.currencyCode,
      to: convertTo.currencyCode,
      amount,
    }).then((result) => {
      setConversion(result);
    });
  };

  return (
    <div className="App">
      <form>
        <TextInput
          handleAdornmentClick={switchCurrencies}
          showSwitch
          id="converter__amount"
          label="amount"
          value={amount}
          setValue={setAmount}
        />
        <SearchAbleDropDown
          onChange={() => {}}
          id="converter__currency--from"
          label="convert from"
          {...searchAbleDropDownProps}
          setSelected={(selection) =>
            handleSelection(selection, setConvertFrom)
          }
          selected={convertFrom}
        />
        <SearchAbleDropDown
          onChange={() => {}}
          id="converter__currency--from"
          label="convert to"
          {...searchAbleDropDownProps}
          setSelected={(selection) => handleSelection(selection, setConvertTo)}
          selected={convertTo}
        />
        <Button label="Convert" handleClick={convertCurrencies} />
        {conversion && (
          <p>{`${amount} ${convertFrom.currencyCode} is eqivalent to ${conversion} ${convertTo.currencyCode}`}</p>
        )}
      </form>
    </div>
  );
}

export default App;
