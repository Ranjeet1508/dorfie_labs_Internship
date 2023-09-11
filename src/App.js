import './App.css';
import axios from "axios"

import {
  Box,
  Heading,
  Flex,
  Select
}
  from '@chakra-ui/react'
import { useEffect, useState } from 'react';

function App() {
  const [countryData, setCountryData] = useState([]);
  const [countryId, setCountryId] = useState("");

  const [stateData, setStateData] = useState([]);
  const [filterState, setFilterState] = useState([]);
  const [stateId, setStateId] = useState("");

  const [cityData, setCityData] = useState([]);
  const [filterCity, setFilterCity] = useState([]);
  const [cityId, setCityId] = useState("");


  const getCountryFromAPI = async () => {
    await axios.get('https://d32sbion19muhj.cloudfront.net/pub/interview/countries')
      .then(function (response) {
        // handle success
        setCountryData(response.data.data);
        getStateFromAPI();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const getStateFromAPI = async () => {
    await axios.get('https://d32sbion19muhj.cloudfront.net/pub/interview/states')
      .then(function (response) {
        // handle success
        setStateData(response.data.data)
        const statesInSelectedCountry = stateData.filter(state => state.country_id == countryId);
        setFilterState(statesInSelectedCountry)
        getCityFromAPI();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const getCityFromAPI = async () => {
    await axios.get('https://d32sbion19muhj.cloudfront.net/pub/interview/cities')
      .then(function (response) {
        // handle success
        setCityData(response.data.data)
        const citiesInSelectedState = cityData.filter(city => city.state_id == stateId);
        setFilterCity(citiesInSelectedState);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    getCountryFromAPI();
  }, [countryId, stateId])


  return (
    <div className="App">
      <Heading backgroundColor='pink.200' pt={2} pb={2}>Welcome to Dorfie labs</Heading>

      
        <Flex mt={20} className='myInputs' justifyContent={'space-evenly'}>
          
            <Select width={'15rem'} name='country' placeholder='Select Country' onChange={(e) => setCountryId(e.target.value)}>
              {countryData.map((elem) =>
                <option key={elem.id} value={elem.id}>{elem.name}</option>
              )}
            </Select>
          

          
          <Select name='state' width={'15rem'} placeholder='Select State' onChange={(e) => setStateId(e.target.value)}>
            {filterState.map((elem) =>
              <option key={elem.id} value={elem.id}>{elem.name}</option>
            )}
          </Select>

          
            <Select name='city' width={'15rem'} placeholder='Select City' onChange={(e) => setCityId(e.target.value)}>
              {filterCity.map((elem) =>
                <option key={elem.id} value={elem.id}>{elem.name}</option>
              )}
            </Select>
          
        </Flex>
      
    </div>
  );
}

export default App;
