import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

const Button = ({
  className,
  children,
  dataTestId,
  disabled,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`button-text ${className}`}
    disabled={disabled}
    data-testid={dataTestId}
    type="button"
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  children: null,
  className: '',
  dataTestId: undefined,
  disabled: false,
};

export default Button;
