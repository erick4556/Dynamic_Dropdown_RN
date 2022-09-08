import axios from 'axios';
import {REACT_APP_COUNTRY_STATE_CITY_API} from '@env';

const url = 'https://api.countrystatecity.in/v1/countries';

export const requestCountryData = async () => {
  return await axios.get(url, {
    headers: {
      'X-CSCAPI-KEY': REACT_APP_COUNTRY_STATE_CITY_API,
    },
  });
};

export const requestStateData = async countryCode => {
  return await axios.get(
    `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
    {
      headers: {
        'X-CSCAPI-KEY': REACT_APP_COUNTRY_STATE_CITY_API,
      },
    },
  );
};

export const requestCityData = async (countryCode, stateCode) => {
  return await axios.get(
    `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
    {
      headers: {
        'X-CSCAPI-KEY': REACT_APP_COUNTRY_STATE_CITY_API,
      },
    },
  );
};
