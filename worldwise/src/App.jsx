import { BrowserRouter, Routes,Route,Navigate } from  "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import Applayout from "./Pages/Applayout";
import LogIn from "./Pages/Login"
import "./index.css";
import Form from './components/Form';
import City from './components/City';
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

const URL = 'http://localhost:9000'
export default function App(){
    const[cities, setCities] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    useEffect(function(){
        
        async function fetchcities(){
        try{
            setIsLoading(true) 
            const res= await fetch(`${URL}/cities`)
            const data = await res.json()
            setCities(data)
        } catch{
            alert("Error while fetching data")
        } finally{
            setIsLoading(false)
        }
    }
        fetchcities();
    },[])


    return (
    <BrowserRouter>
        <Routes>
            <Route index element ={<HomePage/>}/>
            <Route path = 'product' element= {<Product/>} />    
            <Route path="pricing" element= {<Pricing />} />
            <Route path="App" element= {<Applayout/>}>
                <Route index element={<Navigate replace to ='cities'/>}/>
                <Route path="cities" element= {<CityList cities={cities} isLoading= {isLoading} />}/>
                <Route path="cities/:id" element={<City/>}/>
                <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}/>
                <Route path="form" element={<Form/>} /> 
            </Route>
            <Route path="login" element={<LogIn/>}/>
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    
    </BrowserRouter>
    )
}