const { Router } = require("express");
const { getVideoGamesHandler, getVideoGameByIdHandler, postVideogameHandler } = require("../Handlers/GamesHandlers")

const routerVideoGames = Router();


routerVideoGames.get("/", getVideoGamesHandler); 

routerVideoGames.get("/:id", getVideoGameByIdHandler);

routerVideoGames.get("/name", getVideoGamesHandler);

routerVideoGames.post("/", postVideogameHandler);//cuando se recibe una solicitud de tipo POST en esta ruta se ejecuta función postVideogameHandler

module.exports = routerVideoGames;

