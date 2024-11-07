import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MovieListPage() {
  const [search, setSearch] = useState("");
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br"
    )
      .then((data) => data.json())
      .then((res) => setFilmes(res.results))
      .catch((erro) => console.log(erro))
      .finally(() => console.log("Fim"));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const addToWatched = (movie) => {
    let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    if (!watchedMovies.some((m) => m.id === movie.id)) {
      watchedMovies.push(movie);
      localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      alert('Filme adicionado aos Assistidos!');
    } else {
      alert('Filme já está na lista de Assistidos.');
    }
  };

  const addToWatchLater = (movie) => {
    let watchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies')) || [];
    if (!watchLaterMovies.some((m) => m.id === movie.id)) {
      watchLaterMovies.push(movie);
      localStorage.setItem('watchLaterMovies', JSON.stringify(watchLaterMovies));
      alert('Filme adicionado a Ver Depois!');
    } else {
      alert('Filme já está na lista de Ver Depois.');
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-8">
        Veja o catálogo completo de filmes
      </h2>

      <div className="flex justify-center my-4">
        <input
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-black"
          type="text"
          id="search"
          placeholder="Buscar filme..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {filmes
          .filter((filme) =>
            filme.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((filme) => (
            <div key={filme.id} className="bg-white shadow-lg rounded-lg p-2 flex flex-col items-center max-w-[175px]">
              <Link to={`/movies/${filme.id}`}> 
                <img
                  className="rounded-lg w-[175px] mb-2 h-auto"
                  src={`https://image.tmdb.org/t/p/w185${filme.poster_path}`}
                  alt={filme.title}
                />
              </Link>
              <h1 className="text-base font-semibold text-center mb-1 text-black">
                {filme.title}
              </h1>
              <p className="text-sm text-gray-600">Nota: {filme.vote_average}</p>

              <button
                onClick={() => addToWatched(filme)}
                className="bg-green-600 text-white p-1 rounded mt-2 w-full text-xs"
              >
                Adicionar a Assistidos
              </button>

              <button
                onClick={() => addToWatchLater(filme)}
                className="bg-blue-600 text-white p-1 rounded mt-2 w-full text-xs"
              >
                Adicionar a Ver Depois
              </button>
            </div>
          ))}
      </section>
    </>
  );
}
