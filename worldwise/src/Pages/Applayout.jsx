// import style from "./AppLayout.module.css";
import style from './Applayout.module.css'

import SideBar from "../components/SideBar"
import Map from '../components/Map'

function Applayout() {
    return (
        <div className={style.app}>
            <SideBar/>
            <Map/>
        </div>
    )
}

export default Applayout
