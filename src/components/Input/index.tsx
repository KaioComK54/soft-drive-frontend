import { useEffect, useState } from "react";
import { Container, InputBase } from "./styles";

import IconButton from "@mui/material/IconButton";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface props {
  value: string;
  onChange: Function;
  name: string;
  placeholder: string;
  errors: string[];
  type?: string;
  disabled?: boolean;
}

const Input = ({
  value,
  onChange,
  name,
  placeholder,
  errors,
  type,
  ...rest
}: props) => {
  const [typed, setTyped] = useState<string | undefined>("text");

  useEffect(() => {
    setTyped(type);
  }, []);

  const hidden = () => {
    if (type === "password") {
      if (typed === "text") {
        setTyped("password");
      }
      if (typed === "password") {
        setTyped("text");
      }
    }
  };

  return (
    <Container>
      <InputBase
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={({ target }: any) => onChange(target.value)}
        className={errors.includes(name) ? "error" : ""}
        autocomplete="off"
        type={typed}
        {...rest}
      />
      {type === "password" && (
        <IconButton onClick={hidden}>
          {typed === "text" ? (
            <VisibilityIcon style={{ color: "#3C4043" }} />
          ) : (
            <VisibilityOffIcon style={{ color: "#3C4043" }} />
          )}
        </IconButton>
      )}
    </Container>
  );
};

export default Input;
