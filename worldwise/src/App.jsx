import { BrowserRouter, Routes,Route } from  "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import Applayout from "./Pages/Applayout";
import LogIn from "./Pages/Login"
import "./index.css";
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
            <Route path="/" element ={<HomePage/>}/>
            <Route path = 'product' element= {<Product/>} />    
            <Route path="pricing" element= {<Pricing />} />
            <Route path="App" element= {<Applayout/>}>
                <Route path="cities" element= {<CityList cities={cities} isLoading= {isLoading} />}/>
                <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}/>
                <Route path="form" element={<p>Form</p>} /> 
            </Route>
            <Route path="login" element={<LogIn/>}/>
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    
    </BrowserRouter>
    )
}