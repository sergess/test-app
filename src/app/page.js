import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      Test App:
      <Link href="/termistor-chain">ThermistorChain</Link>
      <Link href="/deformation-control">DeformationControl</Link>
    </>
  );
}
