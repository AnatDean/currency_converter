import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ label, handleClick, disabled }) => {
  return (
    <button disabled={disabled} className={styles.button} onClick={handleClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
