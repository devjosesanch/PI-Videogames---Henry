const axios = require ("axios");
const { Videogame, Genre } = require("../db");
const db = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;


const getVideoGames = async ()=>{
    console.log('si llego');
    const dbData = await Videogame.findAll({//Obtener games de base de datos
        include:[{
            model: Genre, 
            attributes: ["name"], 
            through: { attributes: []}
        }]
    });
 console.log(dbData);
    const dbVideoGames =  dbData.map((vg) =>{
        const { id, name, background_image, rating, Genres } = vg;
        return {
            id, 
            name, 
            background_image, 
            rating,
            genres: Genres.map(genre => genre.name)
        }
    });

    const BASE_API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

    const numberOfResultsPerPage = 15;            
    const numberOfResultsExpected = 100;           
    const numberOfRequestsRequired = Math.ceil(numberOfResultsExpected/numberOfResultsPerPage);        // Math.ceil(150/15) 10

//Solicitud de datos API externa
    const apiPromises = [];
    for (let page = 1; page <= numberOfRequestsRequired; page++) {
        apiPromises.push(axios.get(`${BASE_API_URL}&page_size=${numberOfResultsPerPage}&page=${page}`)); 
    };
    
    const promisesResults = await Promise.all(apiPromises);

    const apiVgUnflattened = promisesResults.map(apiResponse => apiResponse.data.results);//Obtener resultados individuales de cada pagina en un nuevo array    
    const apiVgApi = apiVgUnflattened.flat(1); //aplana array a 1 nivel

    let apiVideogamesClean = apiVgApi.map((vg) => {
        const { id, name, background_image, rating, genres } = vg;
        return {
            id, 
            name, 
            background_image, 
            rating,
            genres: genres.map(genre => genre.name),
        };
    });

    apiVideogamesClean = apiVideogamesClean.slice(0, numberOfResultsExpected);//limito cantidad de resultados obtenidos de la API, seleccionamos elementos desde el primer elemento del array, indice 0 
    const allVideoGames = [...dbVideoGames, ...apiVideogamesClean];
    
    return allVideoGames;
};

module.exports = getVideoGames; 
