import React from "react";
import { InputAdornment, IconButton } from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import styles from "./Switch.module.scss";
import PropTypes from "prop-types";

const Switch = ({ handleClick }) => {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={handleClick}
        id={styles.iconButton}
        aria-label="swap"
      >
        <SyncAltIcon id={styles.svg} />
      </IconButton>
    </InputAdornment>
  );
};

Switch.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Switch;
