import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const { id } = useParams(); 
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br&append_to_response=credits,videos`
        );
        const data = await response.json();
        
        if (response.ok) {
          setFilme(data);
        } else {
          setErro("Erro ao carregar os dados do filme");
        }
      } catch (error) {
        setErro("Erro de conexão ou ao buscar os dados");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;
  if (!filme) return <div>Filme não encontrado!</div>;

  const backdropUrl = `https://image.tmdb.org/t/p/original${filme.backdrop_path}`;

  return (
    <div
      className="p-4 text-white"
      style={{
        backgroundImage: `url(${backdropUrl})`,  
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", 
      }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded-lg"> 
        <h1 className="text-3xl font-bold mb-4">{filme.title}</h1>
        <p><strong>Sinopse:</strong> {filme.overview}</p>
        <p><strong>Data de Lançamento:</strong> {new Date(filme.release_date).toLocaleDateString()}</p>
        <p><strong>Avaliação:</strong> {filme.vote_average}</p>

        <h2 className="text-xl font-semibold mt-4">Elenco:</h2>
        <ul>
          {filme.credits.cast.slice(0, 5).map((actor) => (
            <li key={actor.cast_id}>
              {actor.name} como {actor.character}
            </li>
          ))}
        </ul>

        {filme.videos.results.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Trailer:</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${filme.videos.results[0].key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
