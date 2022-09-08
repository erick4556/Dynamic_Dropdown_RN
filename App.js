import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {
  requestCityData,
  requestCountryData,
  requestStateData,
} from './src/service/methods';

const url = 'https://api.countrystatecity.in/v1/countries';

const DropdownComponent = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    /* A function that is being called in the useEffect hook. */
    getCountryData();
  }, []);

  const getCountryData = async () => {
    /* var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY':
          'API_KEY',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const count = Object.keys(response.data).length;
        let countryArray = [];
        for (var x = 0; x < count; x++) {
          countryArray.push({
            value: response.data[x].iso2,
            label: response.data[x].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      }); */
    try {
      const response = await requestCountryData();
      console.log('Countries', response.data);
      const count = Object.keys(response.data).length;
      let countriesArray = [];
      for (var x = 0; x < count; x++) {
        countriesArray.push({
          value: response.data[x].iso2,
          label: response.data[x].name,
        });
      }
      setCountryData(countriesArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleState = async countryCode => {
    try {
      const response = await requestStateData(countryCode);
      console.log('States', response.data);
      const count = Object.keys(response.data).length;
      let statesArray = [];
      for (var x = 0; x < count; x++) {
        statesArray.push({
          value: response.data[x].iso2,
          label: response.data[x].name,
        });
      }
      setStateData(statesArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCity = async (countryCode, stateCode) => {
    try {
      const response = await requestCityData(countryCode, stateCode);
      console.log('Cities', response.data);
      const count = Object.keys(response.data).length;
      let citiesArray = [];
      for (var x = 0; x < count; x++) {
        citiesArray.push({
          value: response.data[x].iso2,
          label: response.data[x].name,
        });
      }
      setCityData(citiesArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={countryData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Country' : '...'}
          searchPlaceholder="Search..."
          value={country}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCountry(item.value);
            handleState(item.value);
            setCountryName(item.label);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stateData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select State' : '...'}
          searchPlaceholder="Search..."
          value={state}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setState(item.value);
            handleCity(country, item.value);
            setStateName(item.label);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cityData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select City' : '...'}
          searchPlaceholder="Search..."
          value={city}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCity(item.value);
            setCityName(item.label);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#0F3460',
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
          }}
          onPress={() =>
            Alert.alert(
              `You have selected\nCountry: ${countryName}\nState: ${stateName}\nCity: ${cityName}`,
            )
          }>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#533483',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
