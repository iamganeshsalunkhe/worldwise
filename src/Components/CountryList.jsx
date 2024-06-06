
/* eslint-disable react/prop-types */

import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'

function CountryList({cities,isLoading})  {
    if (isLoading){
        <Spinner/>
    }
    if (!cities.length) return  <Message message='add your first city by clicking on a city on the map' />
    
    const countries = cities.reduce((arr,city) =>
       { if (!arr.map(el =>el.country).includes(city.countries))
            return [...arr,{country:city.country,emoji:city.emoji}]
    else return arr
    } ,[])
    return (
        <ul className={styles.countryList}>
            {countries.map(country =><CountryItem country={country} key={country.country}  />)}
        </ul>
    )
}

export default CountryList