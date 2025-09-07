import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./assets/components/Header.jsx";
import Home from "./assets/pages/Home.jsx";
import ComicsPage from "./assets/pages/ComicsPage.jsx";
import CharacterComicsPage from "./assets/pages/CharacterComicsPage.jsx";
import FavoritesPage from "./assets/pages/FavoritesPage.jsx";
import LogIn from "./assets/pages/LogIn.jsx";
import SignUp from "./assets/pages/SignUp.jsx";
import Hero from "./assets/components/Hero.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/characters" element={<Home />} />
        <Route path="/comics" element={<ComicsPage />} />
        <Route path="/character/:id/comics" element={<CharacterComicsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
