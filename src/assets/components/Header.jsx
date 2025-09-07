import { useState } from "react";
import logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" aria-label="Accueil" className="logo">
        <img src={logo} alt="marvel" />
      </Link>

      {/* bouton burger visible seulement en petit écran */}
      <button
        className="burger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav ${open ? "open" : ""}`}>
        <NavLink to="/characters" end onClick={() => setOpen(false)}>
          Personnages
        </NavLink>
        <NavLink to="/comics" onClick={() => setOpen(false)}>
          Comics
        </NavLink>
        <NavLink to="/favorites" onClick={() => setOpen(false)}>
          Favoris
        </NavLink>
        <NavLink to="/login" onClick={() => setOpen(false)}>
          Se connecter
        </NavLink>
        <NavLink to="/signup" onClick={() => setOpen(false)}>
          S’inscrire
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
