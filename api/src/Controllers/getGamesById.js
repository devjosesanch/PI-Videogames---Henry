const { Videogame, Genre } = require("../db");
const axios = require ("axios");
require('dotenv').config();
const { API_KEY } = process.env;


const getVideoGameById = async (id)=>{
    const source = id.includes("-") ? 'db' : 'API';//Si el ID contiene un guión, se asume que se trata de un ID de la base de datos local; de lo contrario, se asume que es un ID de la API externa

    if(source === "db"){
    const videogameDB = await Videogame.findByPk(id, {
        include:[{
        model: Genre, 
        attributes: ["name"], 
        through: {attributes:[]}
    }]
    });
console.log(videogameDB);
    if (!videogameDB) throw Error(`Request failed with status code 404. There is no videogame with the id ${id}`);

        const { name, background_image, platforms, released, rating, description, Genres } = videogameDB.dataValues;
    
        const vgByIdClean = {
            id, 
            name, 
            background_image, 
            platforms,
            released, 
            rating,
            description,
            genres: Genres ? Genres.map(genre => genre.name) : [],
            
        }
        return vgByIdClean;    
    }; 

    if (source === 'API') {
        const API_URL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
        const apiData = await axios.get(API_URL);

        const vgByIdRaw = apiData.data;
        const { name, background_image, platforms, released, rating, genres, description } = vgByIdRaw;
        
        const vgByIdClean = {
            id, 
            name, 
            background_image, 
            platforms: platforms.map(platform => platform.platform.name),
            released, 
            rating,
            genres: genres.map(genre => genre.name),
            description
        };
        return vgByIdClean;
    };
};

module.exports = getVideoGameById