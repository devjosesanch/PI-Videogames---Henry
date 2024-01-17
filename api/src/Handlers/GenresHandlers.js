const  getGenres = require("../Controllers/getGenres");

const getGenresHandler = async (req,res) => {
    try {
        const genres = await getGenres();
        res.status(200).send(genres);   
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports =  getGenresHandler 