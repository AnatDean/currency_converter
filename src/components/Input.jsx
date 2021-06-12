import React, { useState } from "react";
import { Input, FormControl, InputLabel } from "@material-ui/core";
import PropTypes from "prop-types";

const TextInput = ({ id, label }) => {
  const [value, setValue] = useState("");
  return (
    <FormControl aria-describedby="amount">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </FormControl>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
