"use client"
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type ContextType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<ContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const contextValue: ContextType = { searchValue, setSearchValue };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

