import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import { updateWithNewVg } from "../../redux/actions";
import validationFunctions, { validateGenres, validatePlatforms, validateSubmit } from "./validate";
import axios from "axios";

import styles from "./Create.module.css";


const Create = () => {
    const allGenres = useSelector(state => state.genres); // acceder el estado de los géneros del store de Redux. allGenres almacena este estado     
    const dispatch = useDispatch();//permite enviar acciones a reducer
    
    useEffect(() => {
        if (!allGenres.length) {//verifico longitud del array si es cero despacho acción getGenres
            dispatch(getGenres());//obtengo generos 
        } 
    }, [dispatch, allGenres]);// se ejecuta cuando allGenres cambie 

    const emptyVg = {name: '', image: '', description: '', released: '', rating: '', platforms: [], genres: []};
    const emptyErrors = {name: '', image: '', description: '', released: '', rating: '', platforms: '', genres: ''};//objeto para almacenar mensajes de error asociados a campos del formulario
    const emptyArray = [];

    //Estados iniciales
    const [ newVg, setNewVg ] = useState(emptyVg);//Almacenar la información del videojuego que se está creando 
    const [ errors, setErrors ] = useState(emptyErrors);//almacenar msj de error 
    const [ genresBoxes, setGenresBoxes ] = useState(emptyArray);//Almacena estado de las casillas de verifiacaión de generos 
    const [platformOptions] = useState(["PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox","Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux" ]);

    //Se ejecutará cuando allGenres cambie 
    useEffect(() => {
        if (allGenres.length) {//si no esta vacio se ejecuta
            const emptyGenresBoxes = allGenres.map(genre => false);//inicialmente todas las casillas de verificación se establecen en false
            setGenresBoxes(emptyGenresBoxes);//utiliza para actualizar estado genresBoxes con nuevo array
        }
    }, [allGenres]);


    const handleChange = (event) => {// se llama cada vez que hay un cambio en cualquier campo del formulario.
        const { value } = event.target;//extrae propiedad value- valor actual del campo de entrada 
        const property = event.target.name;// obtiene propiedad name del elemento que desencadenó el evento
        setNewVg({...newVg, [property]: value});// actualizo estado newVg con nuevo valor de campo de entrada 
        const errorMessage = validationFunctions[property](value);//Realizar validaciones y dvuelve mensaje de error 
        setErrors({...errors, [property]: errorMessage});// actualizo estado componnte llamado errors
    };

    const handlePlatformChange = (event) => {
        const platformName = event.target.name;
        const isChecked = event.target.checked;
    
        const updatedPlatforms = isChecked
            ? [...newVg.platforms, platformName]
            : newVg.platforms.filter((platform) => platform !== platformName);
    
        // Actualizar el estado de las plataformas y los errores
        setNewVg({ ...newVg, platforms: updatedPlatforms });
    
        const errorMessage = validatePlatforms(updatedPlatforms);
        setErrors({ ...errors, platforms: errorMessage });
    };
    
    

//Gestiona cambios en la selección de generos en un formulario
    const handleGenresChange = (event) => {
        const index = event.target.id; 
        const genreName = event.target.name;//contiene el nombre del genero seleccionado 
        const oldValue = genresBoxes[index];//determinar si el genero en esa posición estaba seleccionado o no antes del cambio 
        const genres = !oldValue             
            ? [...newVg.genres, genreName] 
            : [...newVg.genres.filter(genre => genre !== genreName)];

        setNewVg({...newVg, genres});//actualizo estado
        const errorMessage = validateGenres(genres);
        setErrors({...errors, genres: errorMessage});

        const updatedGenresBoxes = [...genresBoxes];
        updatedGenresBoxes[index] = !oldValue;
        setGenresBoxes(updatedGenresBoxes);
    };

    //Maneja el envio de formulario 
    const handleSubmit = (event) => {
        event.preventDefault();// evita que form recargue pagina
        const errorMessage = validateSubmit(newVg, errors); 
        if (errorMessage) {//si hay un mensaje de error se muestra alerta
            window.alert(errorMessage);  
        } else {
            const newVgToSubmit = {...newVg, background_image: newVg.image}; 
            const API_URL = "http://localhost:3001/videogames"; 
            axios.post(API_URL, newVgToSubmit)// La información del videojuego (almacenada en newVgToSubmit) se envía al servidor.
                .then((response) => {//Cuando la solicitud POST se completa con éxito, el código dentro de este bloque .then se ejecuta.
                    const newVgWithId = {id: response.data.id, ...newVgToSubmit};
                    dispatch(updateWithNewVg(newVgWithId));//actualiza estado de la app con nuevo vg agregado
                    window.alert("Videogame added to the Database");
                    setNewVg(emptyVg);
                    const emptyGenresBoxes = allGenres.map(genre => false);
                    setGenresBoxes(emptyGenresBoxes);
                })
                .catch((error) => {console.log(error)})
        }
    };

    const handleReset = (event) => {
        setNewVg(emptyVg);//restablece los valores del formulario a sus estados iniciales
        setErrors(emptyErrors);
        const emptyGenresBoxes = allGenres.map(genre => false);//para que ningun genero este seleccionado 
        setGenresBoxes(emptyGenresBoxes);
    };

    return (
        !allGenres.length ? <p>Loading...</p>
        : <div className={styles.mainContainer}>
            
            <form className={styles.formContainer}
                onSubmit={handleSubmit}>
            {/* controlador que se ejecutará cuando se envíe el formulario */}

                <div className={styles.nameAndReleasedAndRatingContainer}>

                    <label className={styles.label}>NAME {' '} 
                        <input className={`${styles.input} ${styles.nameInput}`}
                            name="name"
                            value={newVg.name}
                            onChange={handleChange}
        // utiliza para actualizar el estado newVg con el nuevo valor ingresado por el usuario
                            placeholder='Videogame Name...'
                            autoFocus={true}/>

                        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                    </label>

        
                    <label className={styles.label}>RELEASED {' '} 
                        <input className={`${styles.input} ${styles.dateInput}`}
                            type="date"  
                            name="released"
                            value={newVg.released}
                            onChange={handleChange}
                            max="9999-12-31"/>

                        {errors.released && <p className={styles.errorMessage}>{errors.released}</p>}
                    </label>

            
                    <label className={styles.label}>⭐ RATING {' '} 
                        <input className={`${styles.input} ${styles.ratingInput}`}
                            type="number"
                            name="rating"
                            value={newVg.rating}
                            onChange={handleChange}
                            placeholder='1.00-5.00'
                            step="0.1"/>

                        {errors.rating && <p className={styles.errorMessage}>{errors.rating}</p>}
                    </label>
                </div>

                <div className={styles.nameAndReleasedAndRatingContainer}>
                    <label className={styles.label}>IMAGE {' '} 
                        <textarea className={styles.input}
                            name="image"
                            value={newVg.image}
                            onChange={handleChange}
                            placeholder='https://...'
                            rows="2"/>

                        {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
                    </label>


                    <label className={styles.label}>DESCRIPTION {' '} 
                        <textarea className={styles.input}
                            name="description"
                // para identificar el campo en el backend cuando se envía el formulario.
                            value={newVg.description}
                            onChange={handleChange}
                            placeholder='Max 1000 characters'
                            rows="6"/>

                        {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                    </label>
                </div>
            
                <div className={styles.nameAndReleasedAndRatingContainer}>

                    <label className={styles.label}>PLATFORMS {' '}
                        <div className={styles.checkboxContainer}>
                            <div className={styles.checkboxSubcontainer}>
                                {platformOptions.map((platform, index) => {
                                    return (
                                        <label key={index} className={styles.genreLabel}>{platform}
                                        <input className={styles.genreInput}
                                            type="checkbox"
                                            name={platform}
                                            checked={newVg.platforms.includes(platform)}
                                            onChange={handlePlatformChange}
                                        >
                                    </input>
                            </label>
                        )})}
                        </div>

                        {errors.platforms && <p className={styles.errorMessage}>{errors.platforms}</p>}
                        </div>
                </label>


                <label className={styles.label}>GENRES {' '}
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxSubcontainer}>
                            {allGenres.map((genre, index) => {
                                return (
                                    <label className={styles.genreLabel} key={index}>{genre}
                                        <input className={styles.genreInput}
                                            type="checkbox"
                                            id={index}
                                            name={genre}
                                            checked={genresBoxes[index] || false}   
                                            onChange={handleGenresChange}
                                            >
                                        </input>
                                    </label>
                                )
                            })}
                        </div>

                        {errors.genres && <p className={styles.errorMessage}>{errors.genres}</p>}
                    </div>
                </label>
                </div>

                <div className={styles.buttonsContainer}>
                    <button type="submit" className={styles.submitButton}>Create</button>

                    <button className={styles.resetButton} 
                    type="button" 
                    onClick={handleReset}>Reset</button>
                </div>
                    </form>
        </div>
    );
};

export default Create; 