/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext,useState,useEffect, useContext } from "react";

const CitiesContext = createContext()
const URL =`http://localhost:7000`

function CitiesProvider({children}){
    const [cities,setCites] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

  useEffect(function(){
    async function fetchCities(){
      try{
      setIsLoading(true)
      const res  = await fetch(`${URL}/cities`)
      const data = await res.json()
      setCites(data)
    } catch{
      alert('There is an error loading data')
    }finally{
      setIsLoading(false)
    }
  }
  fetchCities();
  },[ ]);

 async function getCity(id){
      try{
      setIsLoading(true)
      const res  = await fetch(`${URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
    } catch{
      alert('There is an error loading data')
    }finally{
      setIsLoading(false)
    }
  }

  async function createCity(newCity){
      try{
      setIsLoading(true)
      const res  = await fetch(`${URL}/cities/`, {
        method:'POST',
        body:JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json"
      }})
      const data = await res.json()
      setCites(cities =>[...cities,data])
    } catch{
      alert('There is an error while creating city')
    }finally{
      setIsLoading(false)
    }
  }

  async function deleteCity(id){
      try{
      setIsLoading(true)
      await fetch(`${URL}/cities/${id}`, {
        method:'DELETE',
      });
      setCites(cities =>cities.filter((city => city.id !== id)))
    } catch{
      alert('There is an error while deleting city')
    }finally{
      setIsLoading(false)
    }
  }

  return <CitiesContext.Provider
   value={{
    cities, 
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity
   }}>
    {children}
  </CitiesContext.Provider>
}

function useCities(){
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("Cities context used outside cities provider")
    return context;
}

export {CitiesProvider,useCities}; 

