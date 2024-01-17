const { Videogame, Genre } = require("../db");

const postVg = async(name, background_image, platforms, released, rating, description, genres)=>{

    const vgInstance = await Videogame.create({
        name, 
        background_image, 
        platforms, 
        released, 
        rating, 
        description
    });
    const genresFromDb = await Genre.findAll({
        where: {name: genres}});
    await vgInstance.addGenres(genresFromDb);
    return vgInstance;
}
module.exports = postVg;