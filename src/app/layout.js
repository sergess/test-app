import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import ModalProvider from '@/contexts/modal/ModalContextProvider';

import './globals.css';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Test App',
  description: 'Test App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          <Link href="/" className={styles.home}>Home</Link>
          <main className={styles.main}>
            {children}
          </main>
        </ModalProvider>
      </body>
    </html>
  );
}
