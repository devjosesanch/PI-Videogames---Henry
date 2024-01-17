import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // middleware para manejar asincronía
import rootReducer from "./reducer"; // Asegúrate de que este archivo exporta tu reducer combinado

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;