import { GET_VIDEOGAMES, SEARCH_BY_NAME, RESET_FILTERS, FILTER_BY_CREATOR, FILTER_BY_GENRE, SORT_BY_ALPHABET, SORT_BY_RATING, UPDATE_PAGE_NUMBER, GET_GENRES, UPDATE_VG} from "./action-types"; 

//Estructura inicial del estado global
const initialState = {
    videoGames: [],
    genres: [],
    currentVg: [],
    currentPageNumber: 1,
    filteredByCreator: [],
    filteredByGenre: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VIDEOGAMES: {//Se ejecuta en caso de que llegue una acción con este tipo
            const videoGames = action.payload;//extrae lista de vg
            return {
                ...state,//copio estado actual para asegurar que no se modifiquen las propiedades no relacionadas con la acción 
                videoGames: [...videoGames],
                filteredByCreator: [...videoGames],
                filteredByGenre: [...videoGames],
                currentVg: [...videoGames]
            };
        }

        case UPDATE_PAGE_NUMBER: {
            const currentPageNumber = action.payload;
            return {
                ...state,
                currentPageNumber
            };
        }
        
        case SEARCH_BY_NAME: {
            const filteredByName = action.payload;
            return {
                ...state,
                currentVg: filteredByName //Se actualiza la propiedad currentVg del estado con el valor de filteredByName. Esto significa que en el estado global, la propiedad currentVg ahora contiene los datos del videojuego filtrado por nombre.
            };
        }

        case RESET_FILTERS: {
            const currentVg = state.videoGames;
            return {
                ...state,
                currentVg
            };
        }

        case FILTER_BY_CREATOR: {
            const creator = action.payload;
            let filteredByCreator;//variable para almacenar los vg filtrados

            if (creator === 'all') {
                filteredByCreator = [...state.videoGames];
            } else if (creator === 'db') {
                filteredByCreator = [...state.videoGames].filter(vg => {
                    return isNaN(vg.id)
                })
            } else if (creator === 'api') {
                filteredByCreator = [...state.videoGames].filter(vg => {
                    return !isNaN(vg.id)
                })
            }

            let currentVg = [...filteredByCreator].filter(vg => {
                return state.filteredByGenre.includes(vg)
            });

            if (!currentVg.length) {
                currentVg = "No videogames were found with the provided filters."
            }

            return {
                ...state,
                filteredByCreator: filteredByCreator,
                currentVg: currentVg       
            };
        }

        case FILTER_BY_GENRE: {
            const genre = action.payload;

            let filteredByGenre;

            if (genre === 'allGenres') {
                filteredByGenre = [...state.videoGames];
            } else {
                filteredByGenre = [...state.videoGames].filter(vg => {
                    return vg.genres.includes(genre);
                })
            } 

            let currentVg = [...filteredByGenre].filter(vg => {
                return state.filteredByCreator.includes(vg)
            });

            if (!currentVg.length) {
                currentVg = "No videogames were found with the provided filters."
            }

            return {
                ...state,
                filteredByGenre: filteredByGenre,
                currentVg: currentVg        
            };
        }

        case SORT_BY_ALPHABET: {
            const order = action.payload;      
            const compareFunction = ((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });

            const sortedAz = [...state.currentVg].sort(compareFunction);
            const sortedVg = order === 'a_z' ? sortedAz : [...sortedAz].reverse();

            return {
                ...state,
                currentVg: sortedVg
            };
        }


        case SORT_BY_RATING: {
            const order = action.payload;    
            const compareFunction = ((a, b) => {
                return a.rating - b.rating;
            });

            const sortedAsc = [...state.currentVg].sort(compareFunction);
            const sortedVg = order === 'ratingAsc' ? sortedAsc : [...sortedAsc].reverse();

            return {
                ...state,
                currentVg: sortedVg
            };
        }

        case GET_GENRES: {
            const genres = action.payload;
            return {
                ...state,
                genres
            };
        }

        case UPDATE_VG: {
            const newVg = action.payload;
            const videoGames = [newVg, ...state.videoGames];

            return {
                ...state,
                videoGames,
                filteredByCreator: videoGames,
                filteredByGenre: videoGames,
                currentVg: videoGames
            };
        }

        default: //Retorna el estado sin cambios si no se reconoce la acción
            return {
                ...state
            };
    }
};

export default rootReducer;