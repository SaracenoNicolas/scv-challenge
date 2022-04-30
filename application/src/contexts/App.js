import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

export default AppContext;

export function AppContextProvider({ children }) {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    // populate bond and stocks data
    fetch('api/investments')
    .then(response => response.json())
    .then(data => {
      setInvestments(data);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        investments
      }}
    >
      {children}
    </AppContext.Provider>
  );
}