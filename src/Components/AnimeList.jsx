import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchWithRetry from './fetchWithRetry';

const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return 'winter';
  if (month >= 4 && month <= 6) return 'spring';
  if (month >= 7 && month <= 9) return 'summer';
  return 'fall';
};

const currentYear = new Date().getFullYear();
const currentSeason = getCurrentSeason();

const AnimeList = () => {
  const { genreId } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false); // Adjusted for clarity
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchAnimeBySeasonAndGenre = async () => {
      setLoading(true);
      try {
        const url = `https://api.jikan.moe/v4/seasons/${currentYear}/${currentSeason}?page=${currentPage}`;
        const seasonData = await fetchWithRetry(url);
        
        if (seasonData.data.length === 0) {
          setHasMore(false); // No more data to load
          return;
        }

        // Filter and deduplicate in one step
        const newAnime = seasonData.data.filter(anime => 
          anime.genres.some(genre => genre.mal_id === parseInt(genreId, 10))
        );
        const combinedList = [...animeList, ...newAnime];
        const uniqueAnimeList = Array.from(new Map(combinedList.map(anime => [anime.mal_id, anime])).values());

        setAnimeList(uniqueAnimeList);
        setHasMore(seasonData.pagination.has_next_page); // Assuming the API provides this
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeBySeasonAndGenre();
  }, [genreId, currentPage]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  if (loading && currentPage === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Anime List</h1>
      <div className="anime-list">
        {animeList.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <p>{anime.title}</p>
          </div>
        ))}
      </div>
      {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
      {loading && currentPage > 1 && <div>Loading more...</div>}
    </div>
  );
};

export default AnimeList;
