import { useContext } from "react";
import AuthError from "errors/authError";
import FileError from "errors/fileError";
import HttpError from "errors/httpError";

import AlertContext from "context/AlertContext";

const useError = () => {
  const { openAlert } = useContext(AlertContext);

  const showErrorMessage = (message: string) => {
    openAlert("error", message);
  };

  const validateError = (error: any) => {
    if (error instanceof FileError) {
      openAlert("error", error.message);
    }

    if (error instanceof AuthError) {
      openAlert("error", "Erro na autenticação");
    }

    if (error instanceof HttpError) {
      if (parseInt(error.status) == 400) {
        return showErrorMessage("Erro na validação dos dados!");
      }
      if (parseInt(error.status) == 401) {
        return showErrorMessage("Acesso não autorizado!");
      }
      if (parseInt(error.status) == 404) {
        return showErrorMessage("Registro não encontrado!");
      }
      if (parseInt(error.status) == 422) {
        return showErrorMessage("Espaço de armazenamento excedido!");
      }
      if (parseInt(error.status) == 429) {
        return showErrorMessage(
          "Você fez requisições demais, aguarde um momento!"
        );
      }
      if (parseInt(error.status) == 500) {
        return showErrorMessage("Erro interno!");
      }

      showErrorMessage("Aconteceu um erro na requisição!");
    }
  };

  return {
    validateError,
  };
};

export default useError;
