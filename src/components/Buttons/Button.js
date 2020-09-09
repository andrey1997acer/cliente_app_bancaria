import React, { useState } from "react";
import {Button} from 'rsuite'
const ButtonSesion = (props) => {
  const [isMen, setIsMen] = useState(props.ismen);

  const onClickHandled = () => {
    props.funcion();
  }

  return (
  <Button onClick={onClickHandled} color={props.color}>{props.name}</Button>
  );
};

export default ButtonSesion;
