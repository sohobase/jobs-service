import classnames from 'classnames';
import React, { PropTypes } from 'react';
import style from './Button.css';

const Button = ({ accent, caption, className, onClick }) => {
  const classes = classnames(style.button,
    accent ? style.accent : undefined,
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
  onClick: PropTypes.func,
};

export default Button;
