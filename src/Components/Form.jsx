 /* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities ,isLoading} from "../Contexts/citiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [Lat,Lng] = useUrlPosition()
  const {createCity} = useCities()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji,setEmoji] = useState()
  const [geoCodingError, setGeoCodingError] = useState("")
  const navigate = useNavigate()

  useEffect(function(){
    if (!Lat  && !Lng ) return;

    async function fetchCityData(){
      try{
        setIsLoadingGeocoding(true)
        const res = await fetch(
          `${BASE_URL}?latitude=${Lat}&longitude=${Lng}`)
        const data = await res.json()
        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else ");
        console.log(data.city)
        setCityName(data.city || data.locality|| "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      }catch(err){
        setGeoCodingError(err.message)
      }
      finally{
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  },
  [Lat,Lng]
);

  async function handleSubmit(e){
    e.preventDefault()
    if (!cityName || !date) return ;
    const newCity ={
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{Lat,Lng},
      }
      await createCity(newCity);
      navigate('/app/cities')
    }


  if (isLoadingGeocoding) return <Spinner/>

  if (!Lat && ! Lng) return <Message message="Start by Clicking somewhere on a map "/>

  if (geoCodingError) return <Message message={geoCodingError}/>

  return (
    <form className={`${styles.form}  ${isLoading ? styles.loading:""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */
        }
        <ReactDatePicker onChange={date =>setDate (date)}  selected={date} dateFormat='dd/MM/yyyy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>ADD</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
