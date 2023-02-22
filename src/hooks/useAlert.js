import { useState } from "react";

function useAlert() {
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: null,
    severity: null,
  });

  const showAlert = (message, severity) => {
    setOpenAlert({ open: true, message: message, severity: severity });
  };

  const closeAlert = () =>
    setOpenAlert({
      open: false,
      message: null,
      severity: null,
    });

  return { closeAlert, showAlert, openAlert };
}

export default useAlert;
