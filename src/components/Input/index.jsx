import React, { useState } from "react";
import {
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { validateCurrency } from "../../utils/";
import Switch from "../Switch";

const TextInput = ({ id, label }) => {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = ({ target: { value } }) => {
    const isValid = validateCurrency(value);
    // show what user has typed in
    setValue(value);

    if (!isValid) setHasError(true);
    // remove old error messages if user has corrected invalid input
    else if (isValid && hasError) setHasError(false);
  };
  return (
    <FormControl aria-describedby="amount">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        value={value}
        onChange={handleChange}
        endAdornment={<Switch handleClick={() => {}} />}
      />
      {hasError && (
        <FormHelperText error={hasError}>
          {value} is not a valid number
        </FormHelperText>
      )}
    </FormControl>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
