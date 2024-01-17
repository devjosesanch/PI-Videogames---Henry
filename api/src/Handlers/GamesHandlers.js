const  getVideoGames = require ("../Controllers/getAllGames.js");
const  getVideoGameById = require ("../Controllers/getGamesById.js");
const  getVideoGameByName = require ("../Controllers/getGamesByname.js");
const  postVg = require ("../Controllers/postGames.js");

//------------------------ALL and NAME

const getVideoGamesHandler = async (req, res) => {
    try {
        const name = req.query.name//Extrae valor de parametro de consulta name de la URL 
        const videoG = name? await getVideoGameByName(name) : await getVideoGames();//si se proporciona name para el parametro de consulta se llama a getVideoGameByName
        res.status(200).send(videoG);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

//--------------------------------ID

const  getVideoGameByIdHandler = async (req, res) => {
    try { 
        let id = req.params.id;
        const videoG = await getVideoGameById(id);
        res.status(200).send(videoG);   
    } catch (error) {
        res.status(404).send({error: error.message});
    };
};

//-------------------------------POST

const postVideogameHandler = async (req, res) => {
    try{
        const { name, background_image, platforms, released, rating, description, genres } = req.body;
        const vgCreated = await postVg(name, background_image, platforms, released, rating, description, genres);
        return res.status(200).send(vgCreated);
    }catch (error){
        res.status(400).json({error: error.message});
    }
};

module.exports = { getVideoGamesHandler,  getVideoGameByIdHandler,  postVideogameHandler };