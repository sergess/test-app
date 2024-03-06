'use client';

import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';

import { ModalContext } from '@/contexts/modal/ModalContext';
import Button from '@/components/Buttons';
import Loader from '@/components/Loader';

import 'react-calendar/dist/Calendar.css';
import styles from './table.module.css';


const CustomCalendar = dynamic(
  () => import('@/components/CustomCalendar'),
  {
    ssr: false,
    loading: () => <Loader />
  },
);

export default function WithTable(WrappedTable) {
  return function Comp({ children, ...props }) {
    const { heading } = props;
    const [datesRange, setDatesRange] = useState(null);
    const { openModal } = useContext(ModalContext);

    const onCalendar = () => {
      openModal({
        content: <CustomCalendar onChange={value => setDatesRange(value)} />,
      });
    };

    return (
      <>
        <h1 className={styles.heading}>{ heading }</h1>
        <Button onClick={onCalendar}>Select dates</Button>
        <WrappedTable datesRange={datesRange} {...props }>{children}</WrappedTable>
      </>
    );
  };
}
