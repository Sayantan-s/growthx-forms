import fs from 'fs/promises';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import path from 'path';

type Key = 'dial_code' | 'code' | 'name';

interface DialType {
  [key: string]: string;
}

type CountryType = {
  [K in Key]: string;
};

export type CountryData = { [key: string]: CountryType };

function memoize<TResult>(fn: () => TResult) {
  let result: TResult;
  return () => {
    if (result) {
      console.log('Returning from cache...');
      return result;
    }
    result = fn();
    return result;
  };
}

function returnCountryDialCode(readJson: CountryType[]) {
  const obj: DialType = {};
  readJson.forEach((country) => {
    obj[country.code] = country.dial_code;
  });
  return obj;
}

async function getCountryData() {
  const finaldata: CountryData = {} as CountryData;
  const jsonDirectory = path.join(process.cwd(), 'db', 'countryDialCodes.json');
  const readJson: CountryType[] = JSON.parse(
    await fs.readFile(jsonDirectory, 'utf-8')
  );
  const flagsResponse = await fetch(process.env.FLAGS_API!);
  const flags = await flagsResponse.json();
  const getData = returnCountryDialCode(readJson);
  for (const key in flags) {
    finaldata[key] = {
      name: flags[key],
      dial_code: getData[key.toUpperCase()],
      code: key,
    };
  }
  return finaldata;
}

const getData = memoize(getCountryData);

export default async function handler(_: NextRequest, res: NextApiResponse) {
  const data = await getData();
  res.json({ data });
}
