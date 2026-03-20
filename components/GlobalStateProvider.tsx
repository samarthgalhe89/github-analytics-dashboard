"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalStateContextType {
  dashboardData: any;
  setDashboardData: (data: any) => void;
  
  searchUsername: string;
  setSearchUsername: (name: string) => void;
  searchData: any;
  setSearchData: (data: any) => void;
  
  versusUser1Search: string;
  setVersusUser1Search: (name: string) => void;
  versusData1: any;
  setVersusData1: (data: any) => void;
  
  versusUser2Search: string;
  setVersusUser2Search: (name: string) => void;
  versusData2: any;
  setVersusData2: (data: any) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [searchData, setSearchData] = useState<any>(null);
  
  const [versusUser1Search, setVersusUser1Search] = useState<string>("");
  const [versusData1, setVersusData1] = useState<any>(null);
  
  const [versusUser2Search, setVersusUser2Search] = useState<string>("");
  const [versusData2, setVersusData2] = useState<any>(null);

  const value = {
    dashboardData, setDashboardData,
    searchUsername, setSearchUsername,
    searchData, setSearchData,
    versusUser1Search, setVersusUser1Search,
    versusData1, setVersusData1,
    versusUser2Search, setVersusUser2Search,
    versusData2, setVersusData2,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
