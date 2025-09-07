import logo from "../images/marvel-hero.jpg";

function Hero() {
  return (
    <section className="hero">
      <img src={logo} alt="Marvel Hero" />
      <h2>Bienvenue dans l’univers Marvel</h2>
      <p>Découvre les héros, leurs histoires et explore leurs comics !</p>
    </section>
  );
}

export default Hero;
