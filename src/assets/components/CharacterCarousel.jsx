import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { imgUrl } from "../utils/img.js";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function CharacterCarousel({ characters = [], onToggleFavorite, isFavorite }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const slides = useMemo(() => chunk(characters, 10), [characters]);

  // Si la liste change et que l'index sort de la plage, on le remet à 0
  useEffect(() => {
    if (index > slides.length - 1) setIndex(0);
  }, [slides.length, index]);

  if (!characters.length) return null;

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));
  const next = () => setIndex((i) => (i < slides.length - 1 ? i + 1 : i));

  const goToComics = (id) => navigate(`/character/${id}/comics`);

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel-nav"
        onClick={prev}
        disabled={index === 0}
        aria-label="Précédent"
      >
        ◀
      </button>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((group, slideIdx) => (
            <ul key={slideIdx} className="carousel-slide">
              {group.map((c) => (
                <li
                  key={c._id}
                  className="card card--clickable"
                  onClick={() => goToComics(c._id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    // Si l'utilisateur appuie sur Entrée ou Espace
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goToComics(c._id);
                    }
                  }}
                >
                  <div className="card-thumb">
                    {c.thumbnail ? (
                      <img src={imgUrl(c.thumbnail)} alt={c.name} />
                    ) : (
                      // aria-hidden = ignoré par les lecteurs d’écran
                      <div className="thumb-placeholder" aria-hidden="true">
                        ?
                      </div>
                    )}
                  </div>

                  <h4 className="characters-name" title={c.name}>
                    {c.name}
                  </h4>

                  <div className="card-actions">
                    <button
                      type="button"
                      className="card-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite?.({
                          type: "character",
                          _id: c._id,
                          name: c.name,
                          thumbnail: c.thumbnail,
                          description: c.description || "",
                        });
                      }}
                    >
                      {isFavorite?.({ type: "character", _id: c._id })
                        ? "★ Favori"
                        : "☆ Favori"}
                    </button>

                    <Link
                      className="card-action link"
                      to={`/character/${c._id}/comics`}
                      onClick={(e) => e.stopPropagation()}
                      title="Voir les comics liés"
                    >
                      Comics →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="carousel-nav"
        onClick={next}
        disabled={index >= slides.length - 1}
        aria-label="Suivant"
      >
        ▶
      </button>

      <div
        className="carousel-dots"
        role="tablist"
        aria-label="Navigation des slides"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Aller au groupe ${i + 1}`}
            aria-selected={i === index}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterCarousel;
