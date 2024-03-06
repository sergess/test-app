'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { format } from 'date-fns';

import { useSortData, useVirtualScroll } from '@/hooks/index';
import WithTable from "@/components/HOC/WithTable";

import { INCREMENT, TIME_FORMAT } from '@/constants/index';

import styles from './table.module.css';

function TableTermistor({ data, ...props }) {
  const { datesRange } = props;

  const ref = useRef();

  const generateLackColumn = useMemo(() => {
    // [Todo] Will simplify the expression.
    const numberOfCells = Math.max(...data.map(item => Object.keys(item.data)).flat()) / INCREMENT + 1;
    return new Array(numberOfCells).fill(0).map((_, key) => key * INCREMENT);
  },[data]);

  useEffect(() => {
    if (datesRange) requestSort(null, datesRange);
  }, [datesRange]);

  const { items, requestSort, sortConfig } = useSortData(data);

  const {
    getBottomHeight, getTopHeight, start, rowHeight, visibleRows,
  } = useVirtualScroll(items, 40, 6, ref);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name && styles[sortConfig.direction];
  };

  return (
    <>
      <div className={styles.wrapper} style={{ maxHeight: rowHeight * visibleRows + 1 }} ref={ref}>
        <div style={{ height: getTopHeight() }} />
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th onClick={() => requestSort('time')}><span className={`${styles.tab__heading} ${getClassNamesFor('time')}`}>Дата и время измерения:</span></th>
              <th>
                T
                <sub>e</sub>
              </th>
              {
                generateLackColumn.map((item) => (
                  <th key={item}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {
              items.slice(start, start + visibleRows + 1).map((item, key) => (
                <tr key={item.objectId + key}>
                  <th>{format(item.time, TIME_FORMAT)}</th>
                  <th>{ item.averageTemperature}</th>
                  {
                    generateLackColumn.map((k) => (
                      <React.Fragment key={k}>
                        { item.data.hasOwnProperty(k) ? <td>{item.data[k].value}</td> : <td>-</td> }
                      </React.Fragment>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
        <div style={{ height: getBottomHeight() }} />
      </div>
    </>
  );
}

export default WithTable(TableTermistor);
