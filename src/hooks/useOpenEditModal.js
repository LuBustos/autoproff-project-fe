import { useState } from "react";

function useOpenEditModal() {
  const [openEditModal, setOpenEditModal] = useState({ open: false, id: null });

  const handlerOpenEditModal = (id) => {
    setOpenEditModal({ open: true, id: id });
  };

  const handlerCloseEditModal = () => {
    setOpenEditModal({ open: false, id: null });
  };

  return {
    openEditModal,
    handlerOpenEditModal,
    handlerCloseEditModal,
  };
}

export default useOpenEditModal;
