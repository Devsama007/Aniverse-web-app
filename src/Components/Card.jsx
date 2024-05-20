import React, { useState } from "react";
import "./Card.css";
import {Link} from "react-router-dom";

const Card = ({ anime }) => {
  
  return (
    <Link to={`/anime/${anime.mal_id}`} style={{textDecoration:'none'}}>
    <div className="anime-card">
      <img
        src={anime.images?.jpg?.large_image_url || ""}
        alt={anime.title}
        className="anime-image"
      />
      <h2>{anime.title_english}</h2>
      
        
          <p>Type:{anime.type}</p>
          <p>Episodes:{anime.episodes}</p>
          
      
    </div>
    </Link>
  );
};

export default Card;