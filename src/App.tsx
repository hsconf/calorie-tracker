import './App.css'
import NavBar from "./containers/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewMeal from "./containers/NewMeal/NewMeal";

const App = () => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-meal" element={<NewMeal />} />
                    <Route path="edit/:id" element={<NewMeal />} />
                </Routes>
            </main>
        </>
    );
};

export default App
