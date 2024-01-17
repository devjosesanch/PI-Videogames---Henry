import { NavLink } from "react-router-dom/";
import styles from "./landing.module.css"


const LandingPage = () => {
    return(
        <div className={styles.mainContainer}>
        <div className={styles.welcomeCont}>
            
            <p className={styles.welcome}>WELCOME TO</p>
            <h1 className={styles.name}>VIDEOGAMES</h1>
            <h2 className={styles.textN}> By dev Jose Sanchez</h2>
            <NavLink to="/home"><button className={styles.boton}>START!</button></NavLink>
        </div>
        </div>
    );
}

export default LandingPage; 