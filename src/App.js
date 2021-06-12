import SearchAbleDropDown from "./components/DropDown";
import TextInput from "./components/Input/";
import { getCountryFromCurrencyInitial } from "./utils/index";
import "./styles/global.scss";
import { countries } from "./data/countries";

function App() {
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

  return (
    <div className="App">
      <form>
        <TextInput showSwitch id="converter__amount" label="amount" />
        <SearchAbleDropDown
          onChange={() => {}}
          id="converter__currency--from"
          label="convert from"
          {...searchAbleDropDownProps}
        />
      </form>
    </div>
  );
}

export default App;
