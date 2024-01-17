import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";
import noImage from "../../assets/noImage.png"

const Card = ({ id, name, background_image, rating, genres}) => {

  return (
    <NavLink to={`/detail/${id}`} className={styles.NavLink}>

      <div className={styles.cardcontainer}>
        <h1 className={styles.title}>{name}</h1>
        <img className={styles.image}
        src={background_image ? background_image : noImage} 
        alt={name}/>

        <p className={styles.rating}>{`☆ ${rating}`}</p>

        <p className={styles.genres}>
            {!genres?.length ? (
              <span>No genres provided</span>
            ) : (
              genres.map((genre, index) => {
                return genres.length - 1 === index ? (//i el género actual es el último en el array.
                  <span key={index}>{genre}</span>
                ) : (
                  <span key={index}>{`${genre} | `}</span>
                );
              })
            )}
          </p>
        </div>
      </NavLink>
);
};        

export default Card;