import SearchAbleDropDown from "./components/DropDown";
import TextInput from "./components/Input/";
import { getCountryFromCurrencyInitial } from "./utils/index";
import "./styles/global.scss";
import { countries } from "./data/countries";
import { useState } from "react";

function App() {
  const [convertFrom, setConvertFrom] = useState(countries[0]);
  const [convertTo, setConvertTo] = useState(null);

  // props for all country dropdowns
  const searchAbleDropDownProps = {
    getOptionText: (option) => `${option.initial}/ ${option.fullName}`,
    getOptionLabel: (option) => option.fullName,
    selectedProperty: (option) => option.initial,
    getImgSrc: (option) =>
      `https://www.countryflags.io/${getCountryFromCurrencyInitial(
        option.initial
      )}/flat/64.png`,
    options: countries,
  };

  const handleSelection = (selection, handler) => {
    // set null or option object based on stored property
    handler(selection);
  };

  return (
    <div className="App">
      <form>
        <TextInput showSwitch id="converter__amount" label="amount" />
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
