import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Error404  from "../Error404/Error404";
import Loading from "../../Components/Loading/Loading";
import noImage from "../../assets/noImage.png";

import styles from "./Detail.module.css";

const Detail = () => {
    const { id } = useParams();
    const [ vgDetail, setVgDetail ] = useState({}); //vgDetail es una variable de estado que inicialmente se establece en un objeto vacío, setVgDetail lo utilizaremos para actualizar el estado
    const [ errorState, setErrorState ] = useState('');

    useEffect(() => {
        const API_URL = `http://localhost:3001/videogames/${id}`;   
        axios.get(API_URL)
            .then(response => response.data)//respuesta exitosa
            .then(data => {
                setVgDetail(data); 
            })
            .catch(error => {
                setErrorState(error.code); 
            });

        return () => {//cuando componente se desmonta o cambia id
            setVgDetail({});
            setErrorState('');
        }
    }, [id]);//id como arreglo de dependencias, se ejecutara esto cada vez que cambie el id 

    const { name, background_image, platforms, released, rating, description, genres} = vgDetail;

    return (
        errorState
            ? errorState === 'ERR_BAD_REQUEST'
            ? <Error404 />
            : <div>Error 503. Not connected to the server.</div>
            : !Object.keys(vgDetail).length
            ? <Loading />
            : (<div className={styles.mainContainer}>

                <div className={styles.Container}>

                    {!name
                    ? <h1 className={styles.name}>No name provided</h1>
                    : <h1 className={styles.name}>{name}</h1>}
                    
                    <img
                    className={styles.image}
                    src={background_image ? background_image : noImage}
                    alt="Videogame"/>

                    <div className={styles.dataContainer}>

                    <p className={styles.data}>{` Id: ${id}`}</p>
                    <p className={styles.data}>
                        ⭐ Rating:{" "}
                        {rating === undefined
                        ? <span>No rating provided</span>
                        : <span>{rating}</span>}</p>

                    <p className={styles.data}>
                        Released:{" "}
                        {!released
                        ? <span>No date released provided</span>
                        : <span>{released}</span>}</p>
                        
                    <p className={styles.data}>
                        Genres:{" "}
                        {!genres?.length
                        ? <span>No genres provided</span>
                        : genres.map((genre, index) => {
                        return genres.length - 1 === index
                            ? <span key={index}>{genre}</span>
                            : <span key={index}>{`${genre} | `}</span>
                        })}</p>

                    <p className={styles.data}>
                        🎮 Platforms:{" "}
                        {!platforms?.length
                        ? <span>No platforms provided</span>
                        : platforms.map((platform, index) => {
                            return platforms.length - 1 === index
                            ? <span key={index}>{platform}</span>
                            : <span key={index}>{`${platform} | `}</span>
                        })}</p>
                </div>
            </div>

                        {!description
                        ? <div className={styles.description}>No description provided</div>
                        : <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: description }}
                        ></div>}

        </div>
        )
    );
    };
    
    export default Detail;