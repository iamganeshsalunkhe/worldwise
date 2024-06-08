

import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet';

import styles from './Map.module.css'
import { useEffect, useState } from 'react';
import { useCities } from '../Contexts/citiesContext';

function Map() {
    const [mapPosition,setMapPoistion] = useState([17.050177,74.270271]) 
    
    const {cities} = useCities()

    const [serachParams]=useSearchParams();
    const mapLat = serachParams.get('lat')
    const mapLng = serachParams.get('lng')

    useEffect(function(){
        if (mapLat && mapLng)
        setMapPoistion([mapLat,mapLng]);
    },[mapLat,mapLng])

    return (
        <div className={styles.mapContainer }>
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
