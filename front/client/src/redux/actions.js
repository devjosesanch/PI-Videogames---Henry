import axios from "axios";
import { GET_VIDEOGAMES, 
    UPDATE_PAGE_NUMBER, 
    SEARCH_BY_NAME, 
    FILTER_BY_GENRE,  
    GET_GENRES, 
    GET_DETAIL, 
    UPDATE_VG, 
    FILTER_BY_CREATOR, 
    RESET_FILTERS, 
    SORT_BY_ALPHABET, 
    SORT_BY_RATING } from "../redux/action-types"; 

export const getVideoGames = () => {
 
    return async (dispatch) => {
    try{
        const response = await axios.get('http://localhost:3001/videogames');
        console.log(response);

        const VideoGames = response.data;//Se extraen la lista de videojuegos y se almacenan en la variable VideoGames.
    dispatch({//Dispara la acción 
        type: GET_VIDEOGAMES,//tipo de acción 
        payload: VideoGames//lista de videoGames como carga util
});
    }catch(error){
        alert(error.message);
    }
}}

export const getGenres = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:3001/genres');
        console.log(response);
        const genres = response.data;
        dispatch({
            type: GET_GENRES,
            payload: genres
        });
    };
};

export const updatePageNumber = (page) => {
    return {
        type: UPDATE_PAGE_NUMBER,
        payload: page
    };
};

export const searchByName = (vgName) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3001/videogames?name=${vgName}`);
            const vgByName = response.data;
            dispatch({
                type: SEARCH_BY_NAME,
                payload: vgByName
            });
        } catch (error) {
            alert("No se encontraron coincidencias.");
        }
    };
}

export const filterByGenre = (genres) => {
    return {
        type: FILTER_BY_GENRE,
        payload: genres
    };
};


export const filterByCreator = (creator) => {
    return {
        type: FILTER_BY_CREATOR,
        payload: creator
    };
};

export const getDetail = (id) => {
    
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        const vgById = response.data;
        dispatch({
                type: GET_DETAIL,
                payload: vgById
            })
    }
}

export const updateWithNewVg = (newVg) => {
    return {
        type: UPDATE_VG,
        payload: newVg
    }
}

export const resetFilters = () => {
    return {
        type: RESET_FILTERS,
    };
};

export const sortByAlphabet = (order) => {
    return {
        type: SORT_BY_ALPHABET,
        payload: order
    };
};

export const sortByRating = (order) => {
    return {
        type: SORT_BY_RATING,
        payload: order
    };
};