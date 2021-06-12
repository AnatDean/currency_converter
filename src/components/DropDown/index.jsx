import React, { useState } from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

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
  const style = {
    textAlign: "start",
  };
  const countries = [GBP, EUR, USD];

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
            style={style}
            selected={selected === initial}
            value={initial}
          >
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
