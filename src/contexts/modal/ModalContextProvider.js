'use client';

import React, { useMemo, useState } from 'react';

import Modal from '@/components/Modal';
import { ModalContext } from './ModalContext';

export default function ModalProvider({ children }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (withContent) => {
    setModalContent(withContent);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const valueModalProvider = useMemo(() => ({
    openModal,
    closeModal,
  }), []);

  return (
    <ModalContext.Provider value={valueModalProvider}>
      { modalOpened && <Modal {...modalContent} /> }
      {children}
    </ModalContext.Provider>
  );
}
