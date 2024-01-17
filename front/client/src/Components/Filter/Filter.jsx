import {  searchByName, filterByGenre, filterByCreator,  sortByAlphabet, sortByRating, resetFilters } from "../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePageNumber} from "../../redux/actions";

import styles from "./filters.module.css";

const Filters = () =>{
//Estados locales para almacenar los valores de los campos de busqueda
    const [vgName, setVgName] = useState("");//setVgName fn para actualizar estado
    const [genre, setGenre] = useState("");
    const [creator, setCreator] = useState("");
    const [order, setOrder] = useState("");

    const dispatch = useDispatch(); 
    const genres = useSelector((state) => state.genres);

    // Función se ejecutará cada vez que ocurra  cambio en el campo de búsqueda
    const handleSearchInput = (event) => {
        const inputValue = event.target.value;// Obtiene el valor actual del campo de búsqueda.
        setVgName(inputValue);// Actualiza el estado local con el valor del campo de búsqueda.
        dispatch(updatePageNumber(1));//envio acción para actualizar pagina a 1
    };
    
    // Función encargada de manejar el evento de enviar el formulario de búsqueda
    const handleSearchSubmit = (event) =>{
        event.preventDefault();
        dispatch(searchByName(vgName));//Envía acción de búsqueda con el nombre del VG
        setVgName("");//restablecer campo de busqueda 
        setGenre("");
        setCreator("");
        setOrder("");
        dispatch(updatePageNumber(1));
    };

    //Función se ejecutará cada vez que el usuario seleccione una opción en el campo de genre
    const handleFilterByGenre = (event) => {
        const genre = event.target.value;//Obtiene el valor seleccionado del campo de género
        setGenre(genre);//actualizo estado local con valor de genero seleccionado 
        dispatch(filterByGenre(genre));
        setVgName("");
        dispatch(updatePageNumber(1));
    }

    const handleFilterByCreator = (event) => {
        const creator = event.target.value;
        setCreator(creator);//Actualiza el estado 'creator' con el valor seleccionado
        dispatch(filterByCreator(creator));//Envia acción a store
        setVgName("");
        setOrder("");
        dispatch(updatePageNumber(1));
    }

    const handleSort = (event) => {
        const order = event.target.value;
        setOrder(order);
        if (order === "a_z" || order === "z_a") {
            dispatch(sortByAlphabet(order));
        } else if (order === "ratingAsc" || order === "ratingDesc") {
            dispatch(sortByRating(order));
    }
        dispatch(updatePageNumber(1));
    };

    const handleResetFilters = (event) => {
        event.preventDefault();
        dispatch(resetFilters());//envio accion a tienda
        setVgName("");
        setCreator("");
        setGenre("");
        setOrder("");
        dispatch(updatePageNumber(1));
        };

    return(
        <div className={styles.mainContainer}>

            <form className={styles.searchbarContainer} onSubmit={handleSearchSubmit}>
            <input className={styles.searchInput}
                type="text"
                placeholder="Search by name..."
                value={vgName}
                onChange={handleSearchInput}
            />
            <button className={styles.searSubmitButton}
                type="submit"> Search</button>
            </form>

        <div className={styles.filtersAndSortsContainer}>
            <select className={styles.genreSelect}
                name="filterByGenre"
                value={genre}
                onChange={handleFilterByGenre}
            >
            <option disabled value="">Genre</option>
            <option value="allGenres">All Genres</option>
            {genres.map((genre, index) =>{
                return(
                    <option key={index} value={genre}>{genre}</option>
                );
            })}
        </select>

        <select className={styles.creatorSelect}
            name="filterByCreator"
            value={creator}
            onChange={handleFilterByCreator}
        >
            <option disabled value="">Creator</option>
            <option value="all">All</option>
            <option value="db">Database</option>
            <option value="api">API</option>
        </select>

        <select className={styles.sortSelect}
            name="Sort"
            value={order}
            onChange={handleSort}
            >
            <option disabled value="">Sort</option>
            <option value="a_z">A-Z</option>
            <option value="z_a">Z-A</option>
            <option value="ratingAsc">Rating ↑</option>
            <option value="ratingDesc">Rating ↓</option>
            </select>

        <button className={styles.resetButton} onClick={handleResetFilters}>Reset</button>
        </div>
    </div>
    );
};

export default Filters;