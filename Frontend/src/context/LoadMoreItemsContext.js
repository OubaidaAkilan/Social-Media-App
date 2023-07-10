import { createContext, useState } from 'react';

export const LoadMoreItemsContext = createContext();

export const LoadMoreItemsContextProvider = ({ children }) => {
  const [noOfPage, setNoOfPage] = useState(1);

  const [loading, setLoading] = useState(false);

  return (
    <LoadMoreItemsContext.Provider
      value={{ noOfPage, setNoOfPage, loading, setLoading }}>
      {children}
    </LoadMoreItemsContext.Provider>
  );
};
