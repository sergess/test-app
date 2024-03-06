import { Api } from '@/servises/index';

import TableDeformation from '@/components/TableDeformation';

async function getData() {
  const apiService = new Api();
  const res = await apiService.getMeasurementById('deformation');

  return res;
}

export default async function Page() {
  const data = await getData();

  return (
    <TableDeformation data={data} heading="Деформационная марка" />
  );
}
