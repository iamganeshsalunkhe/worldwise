import { BrowserRouter, Routes,Route } from  "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import Applayout from "./Pages/Applayout";
import LogIn from "./Pages/Login"
import "./index.css";


export default function App(){
    return (
    <BrowserRouter>
    
        <Routes>
            <Route path="/" element ={<HomePage/>}/>
            <Route path = 'product' element= {<Product/>} />    
            <Route path="pricing" element= {<Pricing />} />
            <Route path="App" element= {<Applayout/>}/>
            <Route path="login" element={<LogIn/>}/>
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    
    </BrowserRouter>
    )
}