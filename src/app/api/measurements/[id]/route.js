import { NextResponse } from 'next/server';

import { Api } from '@/servises/api';

// eslint-disable-next-line import/prefer-default-export,func-style
export async function GET(request, { params }) {
  const { id } = params;

  const apiService = new Api();

  const res = await apiService.getMeasurementById(id);

  if (!res) {
    return NextResponse.json({ error: 'Bad request' }, { status: 500 });
  }

  return NextResponse.json(res);
}
