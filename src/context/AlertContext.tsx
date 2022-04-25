import { createContext, useState } from "react";

interface AlertTypes {
  openAlert: Function;
  closeAlert: Function;
  open: boolean;
  message: string;
  type: string;
}

const initial = {
  openAlert: () => {},
  closeAlert: () => {},
  open: false,
  message: "",
  type: "success",
};

const AlertContext = createContext<AlertTypes>(initial);

const AlertContexProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("success");
  const [message, setMessage] = useState<string>("");

  const openAlert = (type: string, message: string) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <AlertContext.Provider
      value={{
        openAlert,
        closeAlert,
        open,
        message,
        type,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContexProvider };
export default AlertContext;
