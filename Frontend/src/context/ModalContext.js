import { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const [component, setComponent] = useState(() => <></>);

  return (
    <ModalContext.Provider
      value={{ openModal, setOpenModal, component, setComponent }}>
      {children}
    </ModalContext.Provider>
  );
};
