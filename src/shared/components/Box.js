import classnames from 'classnames';
import React, { PropTypes } from 'react';
import style from './Box.css';

const Box = ({ className, children, title, text }) => {
  const classes = classnames(style.box, className);

  return (
    <div className={classes}>
      { title && <h6 className={style.title}>{title}</h6> }
      { text && <p className={style.text}>{text}</p> }
      { children && <div className={style.text}>{children}</div> }
    </div>
  );
};

Box.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Box;
