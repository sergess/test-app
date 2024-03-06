'use client';

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.css';

export default function CustomCalendar({ onChange }) {
  return (
    <div className={styles.wrapper}>
      <Calendar selectRange onChange={onChange} />
    </div>
  );
}
