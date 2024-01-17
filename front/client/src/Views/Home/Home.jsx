import Cards from "../../Components/Cards/Cards.jsx";
import Filters from "../../Components/Filter/Filter.jsx";
import { useEffect} from "react"; 
import { useDispatch, useSelector} from "react-redux";
import { getVideoGames, getGenres} from "../../redux/actions.js";

import styles from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();//Envia action a mi store
    const videoGames = useSelector((state) =>state.videoGames);//quiero que este suscrito a cualquier cambio que ocurra en el estado
    const genres = useSelector((state) => state.genres);
    const currentVg = useSelector((state) => state.currentVg);
    useEffect(() => {//se ejecutará después de que el componente se monte en el DOM.
    if (!videoGames.length) dispatch(getVideoGames());//si la longitud es cero se envia accion a traves de dispatch 
    if (!genres.length) dispatch(getGenres());
    },[dispatch, videoGames, genres])//El efecto se ejecutará cada vez que una de estas dependencias cambie 

    const VG_PER_PAGE = 15;
    const currentVgLength = currentVg.length;
    const numberOfPages = Math.ceil(currentVgLength / VG_PER_PAGE);

    return (
        <div className={styles.mainContainer}>
            <Filters />
        
            <Cards VG_PER_PAGE={VG_PER_PAGE} />
    
        </div>
        );
    };
    
export default Home;