/* eslint-disable react/prop-types */
import CityItem from './CityItem'
import style from './CityList.module.css'
import Spinner from "./Spinner"
import Message from "./Message";
function CityList({cities, isLoading}) {
    
    if (isLoading) return < Spinner/>;
    if(!cities.length) return <Message message = "Add Your First City..."/>


    return (
        <ul className={style.CityList}>
            
            {cities.map(city => <CityItem city={city} key ={city.id}/>)}
        </ul>
    )
}

export default CityList