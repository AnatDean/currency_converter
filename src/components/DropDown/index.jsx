import React from "react";
import { TextField, FormControl, InputAdornment } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import styles from "./DropDown.module.scss";
import Flag from "../Flag";

// Designed with uber reusability in mind

const SearchAbleDropDown = ({
  label,
  selectedProperty,
  getImgSrc,
  getOptionLabel,
  getOptionText,
  options,
  setSelected,
  selected,
}) => {
  // create props out of option for flag adornment
  const createFlagProps = (option) => {
    return {
      alt: `${getOptionLabel(option)} flag`,
      src: `${getImgSrc(option)}`,
    };
  };

  // render option in drop down
  const renderOption = (option) => (
    <div
      className={styles.menuItem}
      selected={selected === selectedProperty(option)}
    >
      {getImgSrc && <Flag {...createFlagProps(option)} />}

      {getOptionText(option)}
    </div>
  );

  // store dropdown selection
  const handleChange = (event, newValue) => {
    // set null or option object based on stored property
    setSelected(
      !newValue
        ? newValue
        : options.find(
            (option) => selectedProperty(option) === selectedProperty(newValue)
          )
    );
  };
  return (
    <FormControl>
      <Autocomplete
        id={label}
        options={options}
        autoHighlight
        value={selected}
        onChange={handleChange}
        renderOption={renderOption}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => {
          params.InputProps.startAdornment = !selected ? null : (
            <InputAdornment position="start">
              {<Flag {...createFlagProps(selected)} />}
            </InputAdornment>
          );
          return (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              label={label}
              id={`${label}--input`}
              fullWidth
            />
          );
        }}
      />
    </FormControl>
  );
};

SearchAbleDropDown.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionText: PropTypes.func.isRequired,
  getImgSrc: PropTypes.func,
  selectedProperty: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.object,
  setSelected: PropTypes.func.isRequired,
};
SearchAbleDropDown.defaultProps = {
  getImgSrc: null,
  selected: null,
};

export default SearchAbleDropDown;
