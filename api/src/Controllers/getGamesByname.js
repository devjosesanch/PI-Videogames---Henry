const { Videogame, Genre } = require("../db");
const axios = require("axios")
require('dotenv').config();
const { API_KEY } = process.env  
const { Op } = require("sequelize")//importamos operador op para realizar consulta avanzada en BD SQL con operadores condicionales 

const getVideoGameByName = async (name) => {
   const responseDB = await Videogame.findAll({
      where: {
            name: {
               [Op.iLike]: `%${name}%`
            },
      },
      include: [{
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] }
      }],
   });

   const dbVgByNameClean = responseDB.map((vg) => {
      const { id, name, background_image, platforms, released, rating, Genres } = vg;
      return {
         id, 
         name, 
         background_image, 
         platforms,
         released, 
         rating,
         genres: Genres.map(genre => genre.name)
      }
   }); 

   //Data de API

   const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
      const apiData = await axios.get(API_URL);
      const apiVgByNameRawFirstFilt = apiData.data.results;

   const apiVgByNameRawSecondFilt = apiVgByNameRawFirstFilt.filter(vg => { 
      return vg.name.toLowerCase().includes(name.toLowerCase());
   });
   
   const apiVgByNameClean = apiVgByNameRawSecondFilt.map((vg) =>{                         
      const { id, name, background_image, platforms, released, rating, genres } = vg;
      return {
            id, 
            name, 
            background_image, 
            platforms: platforms.map(platform => platform.platform.name),
            released, 
            rating,
            genres: genres.map(genre => genre.name),
      }
   });

   const allVgByName = [...dbVgByNameClean, ...apiVgByNameClean];

   const numberOfResults = 15; 
   const fifteenVgByNameSlice = allVgByName.slice(0,numberOfResults); 

   return fifteenVgByNameSlice.length ? fifteenVgByNameSlice 
   : `No videogames were found with the name ${name}`;
};

module.exports = getVideoGameByName;