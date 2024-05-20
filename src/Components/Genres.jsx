// Genres.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchWithRetry from './fetchWithRetry';

const Genres = () => {
  const [genresData, setGenresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await fetchWithRetry('https://api.jikan.moe/v4/genres/anime');
        setGenresData(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleSelectGenre = (id) => {
    navigate(`/anime/genre/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Anime Genres</h1>
      <div className="genre-list">
        {genresData.map((genre) => (
          <div
            key={genre.mal_id}
            className="genre-item"
            onClick={() => handleSelectGenre(genre.mal_id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
