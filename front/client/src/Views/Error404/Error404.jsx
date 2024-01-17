
import { Link } from "react-router-dom";
import styles from "./error404.module.css";

const Error404 = () => {
    return (
    <div className={styles.mainContainer}>
        
        <h1 className={styles.errorMessage}>Page not found</h1>

        <Link to={`/home`}>
        <button className={styles.goBackButton}>Go back home!</button>
        </Link>
    </div>
    );
};

export default Error404;