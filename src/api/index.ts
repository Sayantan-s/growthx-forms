export const fetchCountryData = async () => {
  const res = await fetch('/api/countrydata');
  return await res.json();
};
