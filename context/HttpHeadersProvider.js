import React, { createContext, useContext, useState } from 'react';

const HttpHeadersContext = createContext();

const HttpHeadersProvider = ({ children }) => {
  const [headers, setHeaders] = useState({});

  return (
    <HttpHeadersContext.Provider value={{ headers, setHeaders }}>
      {children}
    </HttpHeadersContext.Provider>
  );
};

export const useHttpHeaders = () => useContext(HttpHeadersContext);
export default HttpHeadersProvider;
