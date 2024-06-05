import Map from "../Components/Map"
import Sidebar from "../Components/Sidebar"
import styles from './Applayout.module.css'

function Applayout() {
    return (
        <div className={styles.app}>
            <Sidebar/>
            <Map />
        </div>
    )
}

export default Applayout
