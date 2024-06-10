import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCities } from '../Contexts/citiesContext';
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css'
import {useGeolocation} from '../hooks/useGeolocation';
import Button from './Button'
import useUrlPosition from '../hooks/useUrlPosition';

function Map() {
    const {isLoading:isLoadingPosition, position:geolocationPosition,getPosition} = useGeolocation()
    const [mapPosition,setMapPoistion] = useState([19.0760,72.8777]) 
    const {cities} = useCities()
    const [maplat,maplng] = useUrlPosition()
    
    useEffect(function(){
        if (maplat & maplng)
        setMapPoistion([maplat,maplng]);
    },[maplat,maplng])


    useEffect(function(){
        if (geolocationPosition) setMapPoistion([geolocationPosition.lat, geolocationPosition.lng])
    },[geolocationPosition])
    return (
        <div className={styles.mapContainer }>
        <Button type='position' onClick={getPosition} >
            {isLoadingPosition ? "Loading...":"Use Your Position"}
        </Button>
        <MapContainer center={mapPosition} zoom={8} scrollWheelZoom={true} className={styles.mapContainer} >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map ((city) => (
            <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
                <Popup>
                    <span>{city.emoji}</span>
                    <span>{city.cityName}</span>
                </Popup>
            </Marker>)) }
            <ChangeCenter position={mapPosition}/>
            <DetectClick/>
    </MapContainer>
        </div>
    )
}
// eslint-disable-next-line react/prop-types
function ChangeCenter({position}){
    const map = useMap()
    map.setView(position);
    return null
}

function DetectClick(){
    const navigate = useNavigate()
    useMapEvents({
        click:(e) =>{
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}
export default Map
