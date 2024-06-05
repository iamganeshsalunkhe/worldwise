import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Product from './pages/product';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import Applayout from './pages/Applayout';
import Login from './pages/Login';
import CityList from './Components/CityList';
import { useEffect, useState } from 'react';

const URL =`http://localhost:7000`

function App() {
  const[cities,setCites] = useState([])
  const [isLoading,setIsLoading] = useState(false)

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
  },[ ])
  return (
    <BrowserRouter>
      <Routes>
        <Route index element ={<Homepage />}/>
        <Route path = 'product' element ={<Product/>} />
        <Route path='pricing' element ={<Pricing/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path = 'app' element={<Applayout/>}> 
          <Route index element={<CityList cities= {cities} isLoading={isLoading }/>}
          />
          <Route path='cities' element ={<CityList cities ={cities} isLoading ={isLoading}/>}
          />
          <Route path='countries' element={<p>Countries</p>}/>
          </Route>
          <Route path='form' element={<p>Form</p>}/>
        <Route path='*' element= {<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App


