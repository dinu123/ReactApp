import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import LocationCard from './Components/LocationList/location';
import LocationDetails from './Components/LocarionDetails/locationDetails';
import { gql } from '@apollo/client';
import {useMutation} from '@apollo/client';
import { Circles } from 'react-loader-spinner';






const DELETE_LOCATION =  gql`
mutation Mutation($locationRemoveId: String!, $tenant: String!) {
  locationRemove(id: $locationRemoveId, tenant: $tenant) {
    ... on LocationCommandResponse {
      resourceID
    }
  }
}
`;

function App() {
  const[activeId, setActiveId] = useState('');
  const[isListRefresh,setIsListRefresh] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

  const [locationRemove] = useMutation(DELETE_LOCATION);
  const cardClickHandler = (id:any) => {
    setActiveId(id);
  }
  const deletehandler = async(id:any) => {
    setIsLoading(true);
      try {
        const result = await locationRemove({
          variables: {  "locationRemoveId": id,
          "tenant": "692627ef-fda8-4203-b108-e8e9f52ad410"
        },
        });
  
        console.log('Location Remved:', result.data.locationRemove);
        setIsListRefresh(prev => prev +1);
        setActiveId('');
        // Handle success or update the UI as needed
      } catch (error) {
        console.error('Error editing location:', error);
        // Handle the error
      }
      setIsLoading(false);
  }
  return (
   
    <div className="app-container">
      {isLoading && <Circles
  height="80"
  width="80"
  color="#000"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  visible={true}
/>}
      <LocationCard onCardClikHandler = {cardClickHandler} key = {isListRefresh}/>
      {activeId && <LocationDetails locationId = {activeId} delteLocation = {deletehandler}/>}
    </div>
  );
}

export default App;
