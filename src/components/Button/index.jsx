import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ label, handleClick }) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
