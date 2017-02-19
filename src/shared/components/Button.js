import classnames from 'classnames';
import React, { PropTypes } from 'react';
import style from './Button.css';

const Button = ({ accent, caption, className, large, onClick }) => {
  const classes = classnames(style.button,
    accent ? style.accent : undefined,
    large ? style.large : undefined,
    className,
  );

  return (
    <button className={classes} onClick={onClick}>
      {caption}
    </button>
  );
};

Button.propTypes = {
  accent: PropTypes.bool,
  caption: PropTypes.string,
  className: PropTypes.string,
  large: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
