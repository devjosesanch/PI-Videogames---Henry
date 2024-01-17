import styles from "./loading.module.css";
import loadingGif from "../../assets/3hQC.gif"

const Loading = () => {
    return (
            <img className={styles.gif} src={loadingGif} alt="Loading" />
    );
};

export default Loading;