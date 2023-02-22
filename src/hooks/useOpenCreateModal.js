import { useState } from "react";

function useOpenCreateModal() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handlerOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handlerCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  return {
    handlerCloseCreateModal,
    handlerOpenCreateModal,
    openCreateModal,
  };
}

export default useOpenCreateModal;
