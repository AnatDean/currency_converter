import React, { useState } from "react";
import { TextField, FormControl, InputLabel } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import styles from "./DropDown.module.scss";

const SearchAbleDropDown = ({
  label,
  selectedProperty,
  getImgSrc,
  getOptionLabel,
  getOptionText,
  options,
}) => {
  const [selected, setSelected] = useState(options[0]);

  const renderOption = (option) => (
    <div
      className={styles.menuItem}
      selected={selected === selectedProperty(option)}
    >
      {getImgSrc && (
        <img
          height={30}
          alt={`${getOptionLabel(option)} flag`}
          src={`${getImgSrc(option)}`}
        />
      )}

      {getOptionText(option)}
    </div>
  );

  return (
    <FormControl>
      <Autocomplete
        id={label}
        options={options}
        autoHighlight
        value={selected}
        onChange={(event, newValue) => {
          setSelected(
            !newValue
              ? newValue
              : options.find(
                  (option) =>
                    selectedProperty(option) === selectedProperty(newValue)
                )
          );
        }}
        renderOption={renderOption}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            label={label}
            id={`${label}--input`}
          />
        )}
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
};
SearchAbleDropDown.defaultProps = {
  getImgSrc: null,
};

export default SearchAbleDropDown;
