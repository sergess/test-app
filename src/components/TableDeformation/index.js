'use client';

import React, { useRef, useCallback, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';

import { ModalContext } from '@/contexts/modal/ModalContext';
import { useSortData, useVirtualScroll } from '@/hooks/index';
import Button from '@/components/Buttons';
import Loader from '@/components/Loader';
import WithTable from '@/components/HOC/WithTable';

import { TIME_FORMAT } from '@/constants/index';

import styles from './table.module.css';

const Plotly = dynamic(
  () => import('@/components/Plotly'),
  {
    ssr: false,
    loading: () => <Loader />
  },
);

function TableDeformation({ data, ...props }) {

  const { datesRange } = props;

  const { openModal } = useContext(ModalContext);

  const ref = useRef();

  useEffect(() => {
    if (datesRange) requestSort(null, datesRange);
  }, [datesRange]);

  const { items, requestSort, sortConfig } = useSortData(data);

  const {
    getBottomHeight, getTopHeight, start, rowHeight, visibleRows,
  } = useVirtualScroll(items, 40, 6, ref);

  const getClassNamesFor = useCallback(name => {
    if (!sortConfig) {
      return;
    }

    return sortConfig.key === name && styles[sortConfig.direction];
  }, []);


  const onPlot = () => {
    openModal({
      content: <Plotly data={items} />,
    });
  };

  return (
    <>
      <Button onClick={onPlot} style={{ marginTop: '10px' }}>Plotly</Button>
      <div className={styles.wrapper} style={{ maxHeight: rowHeight * visibleRows + 1 }} ref={ref}>
        <div style={{ height: getTopHeight() }} />
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th onClick={() => requestSort('time')}><span className={`${styles.tab__heading} ${getClassNamesFor('time')}`}>Дата и время измерения:</span></th>
              <th>Цикл измерения</th>
              <th>Отметка, м</th>
              <th>&#9651;, м</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {
              items.slice(start, start + visibleRows + 1).map((item, key) => (
                <tr key={item.objectId + key}>
                  <th>{format(item.time, TIME_FORMAT)}</th>
                  <td>-</td>
                  <td>{ item.data.value }</td>
                  <td>{ item.data.delta ? item.data.delta : '-' }</td>
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

export default WithTable(TableDeformation);
