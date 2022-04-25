import { useState, useContext, useEffect } from "react";
import { sendUserFile, getAFile, deleteAFile } from "services/fileApi";

import UserFileContext from "context/UserFileContext";
import AlertContext from "context/AlertContext";
import HttpError from "errors/httpError";

const fileTypes = ["TXT", "PDF"];
const maxSize = 2; // In .MB

const fileErrorsMessage = {
  nameError: "Verifique a formatação do nome do arquivo!",
  typeError: "A extensão do arquivo informado é inválida!",
  sizeError: "O arquivo fornecido é muito grande!",
};

const fileNameBlackList = {
  special: `\`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`,
  directory: ["../", "./", "~/", "~"],
};

const useFile = () => {
  const [file, setFile] = useState<any>();
  const { fetchUserFilesRequest } = useContext(UserFileContext);
  const { openAlert } = useContext(AlertContext);

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", file);

    const result = await sendUserFile(data);

    if (result instanceof HttpError) throw result;

    setFile(null);
    openAlert("success", "Arquivo enviado com sucesso");
  };

  const handleDownload = async (id: string) => {
    const result = await getAFile(id);

    if (result instanceof HttpError) throw result;
  };

  const handleDelete = async (id: string) => {
    const result = await deleteAFile(id);

    if (result instanceof HttpError) throw result;

    fetchUserFilesRequest();
  };

  const validateName = (file: File): never | any => {
    const { name } = file;

    const [fileName] = name.split(".");

    if (!fileName) {
      setErrorMessage(fileErrorsMessage.nameError);
      throw new Error();
    }

    const includesSpecials = fileNameBlackList.special
      .split("")
      .some((caractere) => fileName.includes(caractere));

    const includesDirectory = fileNameBlackList.directory.some((caractere) =>
      fileName.includes(caractere)
    );

    if (includesSpecials || includesDirectory) {
      setErrorMessage(fileErrorsMessage.nameError);
      throw new Error();
    }
  };

  const validateType = (file: File): never | any => {
    const { name } = file;

    const nameSplitted = name.split(".");

    const type = nameSplitted[nameSplitted.length - 1];

    if (!type) {
      setErrorMessage(fileErrorsMessage.typeError);
      throw new Error();
    }

    const isValidType = fileTypes.includes(type.toLocaleUpperCase());

    if (!isValidType) {
      setErrorMessage(fileErrorsMessage.typeError);
      throw new Error();
    }
  };

  const validateSize = (file: File): never | any => {
    const { size } = file;

    const isValidFileSize = size / 1000 / 1000 <= maxSize;

    if (!isValidFileSize) {
      setErrorMessage(fileErrorsMessage.sizeError);
      throw new Error();
    }
  };

  const validadeFile = (file: File) => {
    setErrorMessage("");
    validateName(file);
    validateType(file);
    validateSize(file);
  };

  return {
    file,
    setFile,
    validadeFile,
    fileTypes,
    maxSize,
    errorMessage,
    handleSubmit,
    handleDownload,
    handleDelete,
  };
};

export default useFile;
