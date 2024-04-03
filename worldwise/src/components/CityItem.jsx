/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import style from './CityItem.module.css'

const formatDate = (date) =>
new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
}).format(new Date(date));

function CityItem({city}) {
    console.log(city)
    const {cityName, country, date, id,position} = city
    return (
        <li >
            <Link className={style.cityItem} to={`${id}?lat=${position.lat}&lan=${position.lng}`}>
            <h3 className={style.name}>{cityName}</h3>
            <h3> ({country})</h3>
            <time className={style.date}>({formatDate(date)})</time>
            <button className={style.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem