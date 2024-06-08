import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import { CitiesProvider } from './Contexts/citiesContext';
import Product from './pages/product';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import Applayout from './pages/Applayout';
import Login from './pages/Login';
import CityList from './Components/CityList';
import CountryList from './Components/CountryList';
import City from './Components/City';
import Form from './Components/Form';



function App() {
  return (
  <CitiesProvider>
    <BrowserRouter>
      <Routes>
        <Route index element ={<Homepage />}/>
        <Route path = 'product' element ={<Product/>} />
        <Route path='pricing' element ={<Pricing/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path = 'app' element={<Applayout/>}> 
          <Route index element={<Navigate replace to='cities'/>}
          />
          <Route path='cities' element ={<CityList/>}
          />
          <Route path='cities/:id' element={<City/>}/>
          <Route path='countries' element={<CountryList /> }
          />
          <Route path='form' element={<Form />}/>
          </Route>
        <Route path='*' element= {<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  </CitiesProvider>
  )
}

export default App


