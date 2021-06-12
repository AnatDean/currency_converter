import { useEffect, useState } from "react";
import SearchAbleDropDown from "./components/DropDown";
import TextInput from "./components/Input/";
import { getCountryFromCurrencyInitial } from "./utils/index";
import "./styles/global.scss";
// import { countries } from "./data/countries";
import { fetchCurrencies } from "./data/api";

function App() {
  const [convertTo, setConvertTo] = useState(null);
  const [countries, setCountries] = useState([]);
  const [convertFrom, setConvertFrom] = useState(null);
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

  return (
    <div className="App">
      <form>
        <TextInput
          handleAdornmentClick={switchCurrencies}
          showSwitch
          id="converter__amount"
          label="amount"
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
      </form>
    </div>
  );
}

export default App;
