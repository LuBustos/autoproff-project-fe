import { useState } from "react";

function useOpenRemoveModal() {
  const [openRemoveModal, setOpenRemoveModal] = useState({
    open: false,
    id: null,
    row_name: null,
  });

  const handlerOpenRemoveModal = (rowId,rowName) => {
    setOpenRemoveModal({ open: true, id: rowId, row_name: rowName });
  };

  const handlerCloseRemoveModal = () => {
    setOpenRemoveModal({ open: false, id: null, row_name: null });
  };

  return {
    openRemoveModal,
    handlerOpenRemoveModal,
    handlerCloseRemoveModal,
  };
}

export default useOpenRemoveModal;
