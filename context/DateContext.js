import React, { createContext, useState, useContext } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const numberOfSelectedDays = selectedStartDate && selectedEndDate
    ? Math.ceil((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  return (
    <DateContext.Provider value={{ selectedStartDate, selectedEndDate, numberOfSelectedDays, setSelectedStartDate, setSelectedEndDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);
