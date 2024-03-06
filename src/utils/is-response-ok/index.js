import { isObject } from '@/utils/is-object';
import { isBoolean } from '@/utils/is-boolean';

export const isResponseOk = (response) => {
  if (isObject(response)) {
    const objectResponse = response;

    if ('ok' in objectResponse && isBoolean(objectResponse?.ok)) {
      return Boolean(objectResponse?.ok);
    }
  }

  return true;
};

export default isResponseOk;
