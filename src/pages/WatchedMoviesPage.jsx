import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WatchedMoviesPage() {
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    setWatchedMovies(storedMovies);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-8">
        Filmes Assistidos
      </h2>

      {watchedMovies.length === 0 ? (
        <p className="text-center mt-4">Você ainda não assistiu nenhum filme.</p>
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {watchedMovies.map((movie) => (
            <div key={movie.id} className="bg-white shadow-lg rounded-lg p-2 flex flex-col items-center max-w-[175px]">
              <Link to={`/movies/${movie.id}`}>
                <img
                  className="rounded-lg w-[175px] mb-2 h-auto"
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <h1 className="text-base font-semibold text-center mb-1 text-black">
                {movie.title}
              </h1>
              <p className="text-sm text-gray-600">Nota: {movie.vote_average}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
