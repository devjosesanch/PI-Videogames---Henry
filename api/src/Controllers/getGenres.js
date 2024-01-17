const { Genre } = require("../db");
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;

let genresAreLoaded = false;// Para controlar si generos ya fueron cargados 

const getGenres = async () => {
    if (genresAreLoaded) {
        const genresApi = await Genre.findAll();
        const genresClean = genresApi.map(genre => genre.name);
        return genresClean;
    } else {// si genresAreLoaded false obtengo de API lista de generos 
        const API_URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
        const apiData = await axios.get(API_URL);
        const genresApi = apiData.data.results;
        const genresClean = genresApi.map((genre) => genre.name);
        
        const promises = genresClean.map((genre) => {
            return Genre.findOrCreate({
                where: { name: genre }
            });
        });
        await Promise.all(promises);//asegura que todos los géneros se hayan buscado o creado en la base de datos antes de continuar.

        genresAreLoaded = true; 
        return genresClean;    
    };
};

module.exports = getGenres;