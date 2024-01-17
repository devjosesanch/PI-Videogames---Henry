import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import { useSelector } from "react-redux";
import styles from "./Cards.module.css";

const Cards = (props) => {
    const { VG_PER_PAGE } = props;
    const currentVg = useSelector((state) => state.currentVg);
    const currentPageNumber = useSelector((state) => state.currentPageNumber);
  
    const firstVgRenderedIndex = (currentPageNumber - 1) * VG_PER_PAGE; 
    const lastVgRenderedIndex = firstVgRenderedIndex + VG_PER_PAGE - 1; 

    //creo nuevo array con VG a mostar en pg actual
    const renderedVg = currentVg.slice(
      firstVgRenderedIndex,
      lastVgRenderedIndex + 1
    );
  
    return (
      typeof currentVg === "string" ? (
        <h1 className={styles.notFoundText}>{currentVg}</h1>
      ) : (
        <div>
          {!currentVg.length ? ( // Si currentVg está vacío
            <div>
              <Loading />
            </div>
          ) : ( // Si currentVg no está vacío
            <div className={styles.mainContainer}>
              {renderedVg.map((vg, index) => {
                return (
                  <Card
                    key={index}
                    id={vg.id}
                    name={vg.name}
                    background_image={vg.background_image}
                    genres={vg.genres}
                    rating={vg.rating}
                  />
                );
              })}
            </div>
          )}
        </div>
      )
    );
  };
  
  export default Cards;