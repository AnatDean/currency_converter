import React, { useState } from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./DropDown.module.scss";

const DropDown = ({ label, onChange }) => {
  const [selected, setSelected] = useState("");
  const GBP = {
    initial: "GBP",
    fullName: "British Pound Sterling",
  };
  const EUR = {
    initial: "EUR",
    fullName: "Euro",
  };
  const USD = {
    initial: "USD",
    fullName: "American Dollars",
  };
  const countries = [GBP, EUR, USD];
  const getCountryFromCurrencyInitial = (initial) => {
    return initial.slice(0, -1);
  };

  return (
    <FormControl>
      <InputLabel id={label}>{label}:</InputLabel>
      <Select
        autoWidth
        id={label}
        onChange={({ target }) => setSelected(target.value)}
      >
        {countries.map(({ initial, fullName }) => (
          <MenuItem
            key={initial}
            className={styles.menuItem}
            selected={selected === initial}
            value={initial}
          >
            <img
              height={30}
              alt={`${fullName} flag`}
              src={`https://www.countryflags.io/${getCountryFromCurrencyInitial(
                initial
              )}/flat/64.png`}
            />
            {initial}/ {fullName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropDown;
