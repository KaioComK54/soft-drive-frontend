import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import registerApi, { DataTypeComplete, DataType } from "services/registerApi";
import HttpError from "errors/httpError";

import AlertContext from "context/AlertContext";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const nameBlackList = {
  special: `\`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`,
  directory: ["../", "./", "~/", "~"],
};

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const useRegister = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const { openAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const handleFirstname = (value: string) => {
    setFirstName(value);
  };

  const handleLastName = (value: string) => {
    setLastName(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const validadeNameOrLastName = (name: string) => {
    const includesSpecials = nameBlackList.special
      .split("")
      .some((caractere) => name.includes(caractere));

    const includesDirectory = nameBlackList.directory.some((caractere) =>
      name.includes(caractere)
    );

    if (includesSpecials || includesDirectory) {
      setErrorMessage("O nome não pode conter caracteres especiais!");
      setErrors((errors) => [...errors, "firstName", "lastName"]);
      throw new Error();
    }
  };

  const validateEmail = (email: string) => {
    const emailIsValid = emailRegex.test(email);

    if (!emailIsValid) {
      setErrorMessage("Email inválido!");
      setErrors((errors) => [...errors, "email"]);
      throw new Error();
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coencidem!");
      setErrors((errors) => [...errors, "password", "confirmPassword"]);
      throw new Error();
    }

    if (password.length < 8) {
      setErrorMessage("As senhas devem ter no mínimo 8 dígitos!");
      setErrors((errors) => [...errors, "password", "confirmPassword"]);
      throw new Error();
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        `A senha deve possuir pelo menos: 
         1 caractere minúsculo, 
         1 caractere maiúsculo, 
         1 dígito numérico, 
         1 dígito especial.`
      );
      setErrors((errors) => [...errors, "password", "confirmPassword"]);
      throw new Error();
    }
  };

  const emptyFields = (): boolean => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return true;
    }

    return false;
  };

  const validateData = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: DataTypeComplete) => {
    setErrorMessage("");
    setErrors([]);
    validadeNameOrLastName(firstName);
    validadeNameOrLastName(lastName);
    validateEmail(email);
    validatePassword(password, confirmPassword);
  };

  const handleSubmit = async (data: DataType) => {
    const result = await registerApi(data);

    if (result instanceof HttpError) throw result;

    openAlert("success", "Cadastrado com sucesso!");
    navigate("/entrar");
  };

  return {
    validateData,
    handleSubmit,
    errorMessage,
    errors,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    setName: handleFirstname,
    setLastName: handleLastName,
    setEmail: handleEmail,
    setPassword: handlePassword,
    setConfirmPassword: handleConfirmPassword,
    emptyFields,
  };
};

export default useRegister;
