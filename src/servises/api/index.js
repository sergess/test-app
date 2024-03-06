import { requestJson } from '@/utils/index';

export class Api {
  baseUrl = 'http://localhost:3000/';

  async callAsync(
    uri,
    init,
  ) {
    const response = await requestJson(`${this.baseUrl}${uri}`, {
      ...init,
      headers: {
        ...init?.headers,
      },
    });

    return response;
  }

  async getMeasurementById(id) {
    const { ok, data: response } = await this.callAsync(`${id}_response.json`);

    if (!ok || !response) {
      return null;
    }

    const { data } = response;

    return data;
  }

  async getTrendById(id) {
    const { ok, data: response } = await this.callAsync(`${id}_trend_response.json`);

    if (!ok || !response) {
      return null;
    }

    const { data } = response;

    return data;
  }
}

export default Api;
