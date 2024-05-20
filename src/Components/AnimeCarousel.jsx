// AnimeCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AnimeCarousel.css";

const AnimeCarousel = ({ title, carouselAnimeList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Set the interval (in milliseconds) between slides
  };

  return (
    <div>
      <Slider {...settings}>
        {carouselAnimeList.map((anime) => (
          <div key={anime.mal_id} className="carousel-item">
            
            <div
              className="carousel-image"
              style={{
                backgroundImage: `url(${anime.images?.jpg?.large_image_url})`,
              }}
            >
              <img
                src={anime.images?.jpg?.large_image_url}
                alt={anime.title}
                className="full-image"
              />
            </div>

            <p className="carousel-anime-title">{anime.title_english}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AnimeCarousel;
