import React from 'react';

const Button = (props) => {
  return <button className={props.className}>{props.name}</button>;
};

export default Button;
