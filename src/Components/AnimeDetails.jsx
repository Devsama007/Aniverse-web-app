// AnimeDetails.jsx

import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import "./AnimeDetails.css";

const AnimeDetails = () => {
  const{id}=useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        console.log("Fetching anime details for ID:", id);
        
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
      //  console.log("API Response (AnimeDescription):", data);
        console.log('Fetched Anime Details:', data);
        setAnime(data.data);
      } catch (error) {
        console.error("Error fetching anime details:", error.message);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if(! anime){
  return <p>Loading...</p>;
    }

//Functional button
const visitAnimeWebsite=()=>{
  window.open(anime.url, "_blank");
};
  
  return(
    
 <div className="description">
<Link to="/">
  </Link>

   <img src={anime.images?.jpg?.large_image_url} alt={anime.title} style={{maxWidth:"100%"}} className="des-img"/>
   
   <h2>{anime.title}</h2>

   <button onClick={visitAnimeWebsite} className="web-button">Watch Now</button>
   
   <p>Title(Eng):{anime.title_english}</p>
   <p>Title(Jap):{anime.title_japanese}</p>
   <p>Type:{anime.type}</p>
   <p>Episodes:{anime.episodes}</p>
   <p>Status:{anime.status}</p>
   <p>Score:{anime.score}</p>
   <p className="des-info">Description:{anime.synopsis}</p>
   </div>
 
 ) 
};

export default AnimeDetails;