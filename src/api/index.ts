import { FormState } from '@/components/organisms/Form/useFormControls';

export const fetchCountryData = async () => {
  const res = await fetch('/api/countrydata');
  return await res.json();
};

export const postFormPayload = async (payload: FormState) => {
  try {
    for (const key in payload) {
      const value = JSON.parse(payload[key] as string);
    }
  } catch (error) {
    console.log('HELLO');
  }
  // const res = await fetch(process.env.NEXT_PUBLIC_GROWTHX_API as string, {
  //   method: 'POST',
  //   body: JSON.stringify(payload),
  // });
  // return (await res.json()) as FormSubmissionApiResponse;
};
