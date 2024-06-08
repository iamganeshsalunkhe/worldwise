/* eslint-disable react/prop-types */

import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../Contexts/citiesContext'

function CityList()  {
    const {cities,isLoading} = useCities(); 
    if (isLoading){
        <Spinner/>
    }
    if (!cities.length) return  <Message message='add your first city by clicking on a city on the map' />
    return (
        <ul className={styles.cityList}>
            {cities.map(city =><CityItem city={city} key ={city.id}/>)}
        </ul>
    )
}

export default CityList