import {Routes, Route, useLocation} from "react-router-dom";
import Landing from './Views/Landing/landing.jsx';
import Home from './Views/Home/Home.jsx';
import Detail from "./Views/Detail/Detail.jsx";
import Create from './Views/Create/Create.jsx';
import Error404 from './Views/Detail/Detail.jsx';
import Nav from './Components/Nav/NavBar.jsx'
import Filters from "./Components/Filter/Filter.jsx";
import Pagination from "./Components/Pagination/Pagination.jsx";

import './App.css';

const App = () => {
    return (
    <div className="App">
      {!((useLocation()).pathname === "/") && <Nav path="/:"/>}

      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/> 
        <Route path="/create" element={<Create/>}/>
        <Route path="/devfilters" element={<Filters />} />
        <Route path="/devpagination" element={<Pagination />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
    );
}

export default App;
