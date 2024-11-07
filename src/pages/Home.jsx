import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [filmes, setFilmes] = useState([]);
  const [series, setSeries] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const carrosselFilmes = useRef(null); 
  const carrosselSeries = useRef(null); 
  const carrosselUpcoming = useRef(null); 

  // Fetch filmes populares
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=5f092e7b0137a79c104366c92b60b848&language=pt-br"
    )
      .then((data) => data.json())
      .then((res) => setFilmes(res.results))
      .catch((erro) => console.log(erro));
  }, []);

  // Fetch séries 
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=5f092e7b0137a79c104366c92b60b848&language=pt-br"
    )
      .then((data) => data.json())
      .then((res) => setSeries(res.results))
      .catch((erro) => console.log(erro));
  }, []);

  // Fetch filmes por vir
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=5f092e7b0137a79c104366c92b60b848&language=pt-br"
    )
      .then((data) => data.json())
      .then((res) => setUpcomingMovies(res.results))
      .catch((erro) => console.log(erro));
  }, []);

  const handleScroll = (direction, carrossel) => {
    if (direction === "left") {
      carrossel.current.scrollBy({
        left: -300, 
        behavior: "smooth", 
      });
    } else {
      carrossel.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Filmes Populares</h2>

      <div className="relative">
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-2 rounded-full z-10"
          onClick={() => handleScroll("left", carrosselFilmes)}
        >
          {"<"}
        </button>

        <div
          ref={carrosselFilmes}
          className="flex overflow-x-scroll scrollbar-hide space-x-4"
        >
          {filmes.map((filme) => (
            <div
              key={filme.id}
              className="min-w-[200px] max-w-xs bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
            >
              <img
                className="rounded-lg w-full mb-4"
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                alt={filme.title}
              />
              <h1 className="text-lg font-semibold text-center mb-2 text-black">
                {filme.title}
              </h1>
              <p className="text-sm text-black">
                Popularidade: {filme.popularity.toFixed(0)}
              </p>
            </div>
          ))}
        </div>

        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-2 rounded-full z-10"
          onClick={() => handleScroll("right", carrosselFilmes)}
        >
          {">"}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mt-12 mb-8">Séries Populares</h2>

      <div className="relative">
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-2 rounded-full z-10"
          onClick={() => handleScroll("left", carrosselSeries)}
        >
          {"<"}
        </button>

        <div
          ref={carrosselSeries}
          className="flex overflow-x-scroll scrollbar-hide space-x-4"
        >
          {series.map((serie) => (
            <div
              key={serie.id}
              className="min-w-[200px] max-w-xs bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
            >
              <img
                className="rounded-lg w-full mb-4"
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
              />
              <h1 className="text-lg font-semibold text-center mb-2 text-black">
                {serie.name}
              </h1>
              <p className="text-sm text-black">
                Popularidade: {serie.popularity.toFixed(0)}
              </p>
            </div>
          ))}
        </div>

        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-2 rounded-full z-10"
          onClick={() => handleScroll("right", carrosselSeries)}
        >
          {">"}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mt-12 mb-8">Filmes que estão por Vir</h2>

      <div className="relative">
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-2 rounded-full z-10"
          onClick={() => handleScroll("left", carrosselUpcoming)}
        >
          {"<"}
        </button>

        <div
          ref={carrosselUpcoming}
          className="flex overflow-x-scroll scrollbar-hide space-x-4"
        >
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[200px] max-w-xs bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
            >
              <img
                className="rounded-lg w-full mb-4"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h1 className="text-lg font-semibold text-center mb-2 text-black">
                {movie.title}
              </h1>
              <p className="text-sm text-black">
                Lançamento: {new Date(movie.release_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-2 rounded-full z-10"
          onClick={() => handleScroll("right", carrosselUpcoming)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
