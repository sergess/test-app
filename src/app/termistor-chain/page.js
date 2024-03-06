import { Api } from '@/servises/index';

import TableTermistor from '@/components/TableTermistor';

async function getData() {
  const apiService = new Api();
  const res = await apiService.getMeasurementById('termo');

  return res;
}

export default async function Page() {
  const data = await getData();

  return (
    <TableTermistor
      data={data}
      heading="Термокоса:"
    />
  );
}
