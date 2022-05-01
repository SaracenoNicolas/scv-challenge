import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

export default AppContext;

export function AppContextProvider({ children }) {
  const [investments, setInvestments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const refreshData = () => {
    setLoadingData(true);
    setSelectedInvestment(null);
    // populate bond and stocks data
    fetch('api/investments')
    .then(response => response.json())
    .then(data => {
      setInvestments(data);
      setLoadingData(false);
    });

  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    !loadingData &&
    <AppContext.Provider
      value={{
        investments,
        selectedInvestment,
        setSelectedInvestment,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}