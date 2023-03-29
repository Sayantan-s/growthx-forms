import { FormState } from '@/components/organisms/Form/useFormControls';
import { isPlainObject } from 'lodash';

export const fetchCountryData = async () => {
  const res = await fetch('/api/countrydata');
  return await res.json();
};

function createFinalData(payload: FormState) {
  const data: FormState = {};
  for (const key in payload) {
    const value = payload[key];
    try {
      const parsedValue = JSON.parse(value as string);
      if (Array.isArray(parsedValue)) {
        data[key] = parsedValue.join(',');
      } else if (isPlainObject(parsedValue)) {
        const values = Object.values(parsedValue);
        data[key] = values.join(',');
      }
    } catch (error) {
      data[key] = payload[key];
    }
  }
  return data;
}

export const postFormPayload = async (payload: FormState) => {
  const data = createFinalData(payload);
  const res = await fetch(process.env.NEXT_PUBLIC_GROWTHX_API as string, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await res.json();
};
