import React from 'react';

import styles from './loader.module.css';

export default function Loader() {
  return (
    <div className={styles.body}>
      <div className={styles.spinner} />
    </div>
  );
}
