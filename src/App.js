import { useEffect, useState } from "react";
import SearchAbleDropDown from "./components/DropDown";
import TextInput from "./components/Input/";
import { getCountryFromCurrencyInitial } from "./utils/index";
import "./styles/global.scss";
import { fetchConversion, fetchCurrencies } from "./data/api";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Timer from "./components/Timer";
import Err from "./components/Err";

function App() {
  // form data
  const [convertTo, setConvertTo] = useState(null);
  const [amount, setAmount] = useState("");
  const [countries, setCountries] = useState([]);
  const [convertFrom, setConvertFrom] = useState(null);

  // store conversion and from/to based on requested data not what is currently in form
  const [conversion, setConversion] = useState(null);

  // page states
  const [isLoading, setIsLoading] = useState(false);
  const [hasErr, setHasErr] = useState(false);

  useEffect(() => {
    fetchCurrencies()
      .then((countries) => {
        // remove any previous errors
        if (hasErr) setHasErr(false);
        setCountries(countries);
        setConvertFrom(
          countries.find(({ currencyCode }) => currencyCode === "GBP")
        );
      })
      .catch((err) => setHasErr(true));
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

  const isSubmissionDisabled =
    convertTo !== null && convertFrom !== null && amount;

  const convertCurrencies = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetchConversion({
      from: convertFrom.currencyCode,
      to: convertTo.currencyCode,
      amount,
    })
      .then((result) => {
        setConversion(result);
        setIsLoading(false);
        // remove any previous errors
        if (hasErr) setHasErr(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasErr(true);
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
        <Button
          label="Convert"
          disabled={!isSubmissionDisabled}
          handleClick={convertCurrencies}
        />
        {isLoading ? <Loader /> : null}
        {hasErr ? <Err /> : null}
        {conversion ? <Timer conversion={conversion} /> : null}

        {/* summary of conversion applied */}
        {conversion ? (
          <p>{`${amount} ${conversion.convertFrom} is eqivalent to ${conversion.result} ${conversion.convertTo}`}</p>
        ) : null}
      </form>
    </div>
  );
}

export default App;
