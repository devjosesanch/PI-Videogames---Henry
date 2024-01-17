const { Router } =  require("express");
const getGenresHandler = require("../Handlers/GenresHandlers");

const genresRouter = Router ();

genresRouter.get("/", getGenresHandler);

module.exports = genresRouter;