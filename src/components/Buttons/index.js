import React from 'react';

import styles from './button.module.css';

export default function Button({ onClick, children, ...rest }) {
  return (
    <button
      type="button"
      className={styles.primary}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
