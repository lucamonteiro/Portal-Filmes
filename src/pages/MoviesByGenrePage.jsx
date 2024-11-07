import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MoviesByGenrePage() {
  const { id } = useParams(); 
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=5f092e7b0137a79c104366c92b60b848&with_genres=${id}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Erro ao buscar filmes: ", error));
  }, [id]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">Filmes por Gênero</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "> 
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white text-black shadow-lg undroed-lg p-2 flex flex-col items-center max-w-[175px]">
            <img
              className="rounded-lg w-full mb-4"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3 className="text-lg font-semibold text-center mb-2">{movie.title}</h3>
            <p className="text-sm text-center">Popularidade: {movie.popularity.toFixed(0)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
