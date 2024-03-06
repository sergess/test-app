'use client';

import React, { useState, useMemo } from 'react';

import { DataContext } from './DataContext';

export default function DataProvider({
  children,
  value,
}) {
  const [data, setData] = useState(value);

  const valueDataProvider = useMemo(() => ({
    data,
    setData,
  }), [data]);

  return (
    <DataContext.Provider value={valueDataProvider}>
      {children}
    </DataContext.Provider>
  );
}
