import { useEffect, useState } from 'react';
import GenreCard from '../components/GenreCard';

export default function GenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=5f092e7b0137a79c104366c92b60b848&language=pt-BR'
    )
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error('Erro ao carregar gêneros: ', error));
  }, []);

  return (
    <>
      <h2 className='col-span-4 text-2xl font-bold text-center mb-5'>
        Veja os filmes por gênero
      </h2>
      <main className='text-black grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center'>
        {genres.map((genre) => (
          <GenreCard key={genre.id} id={genre.id} name={genre.name} />
        ))}
      </main>
    </>
  );
}

