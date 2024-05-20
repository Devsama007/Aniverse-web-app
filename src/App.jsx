import "./App.css";
import Card from "./Components/Card";

import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route,Routes,Link}from "react-router-dom";
import AnimeDetails from"./Components/AnimeDetails";
import AnimeCarousel from "./Components/AnimeCarousel";
import Genres from "./Components/Genres";
import About from "./Components/About";
import AnimeList from "./Components/AnimeList";

export default function App() {
  const [topAnime, setTopAnime] = useState([]);
  // For adding pages
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 24; // Set the desired items per page
  //const [carouselImages,setCarouselImages]=useState([]);
  const [searchQuery,setSearchQuery]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const
[allSearchResults,setAllSearchResults]=useState([]);
  

  useEffect(() => {
    const getTopAnime = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data);
        setTopAnime(data.data);
        setTotalItems(data.pagination.items.total); // Set totalItems from API response

//const images=data.data.map((anime)=>anime.images?.jpg?.large_image_url).slice(0,8);
        //setCarouselImages(images);

        
      } catch (error) {
        console.error("Error fetching top anime:", error.message);
      }
    };

    getTopAnime();
  }, [currentPage]);

const carouselAnimeList=topAnime.slice(0,10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

//Search results
  const fetchSearchResults=async()=>{
    try{
      const response=await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`)
  if(!response.ok){
    throw new Error(`HTTP error! status:${response.status}`);
    }
      const data=await response.json();
      console.log("Search Results:",data);
setAllSearchResults(data.data||[]);
      }catch(error){
      console.error("Error fetching search results:",error.message);
 setAllSearchResults([]);

      }
    };
  
const handleSearch=(event)=>{
  setSearchQuery(event.target.value);
setCurrentPage(1);
};

    useEffect(() => {
    // Filter anime based on search query
    if(searchQuery){
fetchSearchResults();
}else{
setAllSearchResults([]);
    }
      },[searchQuery]);


  
  return (
    <Router>

<div>
  {/*Navbar*/}
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      
      <li><Link to="/genres">Genres</Link></li>
      
      <li><Link to="/about">About</Link></li>
      
    </ul>
  {/* Search bar */}
<div className="search-bar" >
<input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={handleSearch}
              style={{ margin: "10px", padding: "5px" }}
            />
</div>
    
  </nav>

  {/*Routes*/}
      <Routes>
        <Route path="/" element={
    <div>
      <AnimeCarousel title="Top Anime Slides" carouselAnimeList={carouselAnimeList}/>
      <h1 style={{textAlign:"center",fontWeight:"bold"}}>Top Anime</h1>

      
  {/*Conditional render search results */}       
      {searchQuery&&allSearchResults.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {allSearchResults.map((anime) => (
                  <Card key={anime.mal_id} anime={anime} />
                ))}
              </div>
            ):(

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {topAnime.slice(0, itemsPerPage).map((anime) => (
                  <Card key={anime.mal_id} anime={anime} />
                ))}
              </div>
            )}

            <div className="main-pg-btn">
              <button style={{marginRight:"100px"}} 
                onClick={handlePrevPage} disabled={currentPage === 1}
>  Prev Page
              </button>
              
              <button style={{marginLeft:"100px"}}
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
>    Next Page
              </button>
            </div>
          </div>
        }
      />

      {/* Route for Details */}
      <Route path="/anime/:id" element={<AnimeDetails />} />

        {/*Route for Genres*/}
      <Route path="/genres" element={<Genres/>}/>

        {/*Route for About*/}
      <Route path="/about" element={<About/>}/>
        
        {/*Route for Genres*/}
      <Route path="/" element={<Genres/>}/>

       <Route path="/anime/genre/:genreId" element={<AnimeList/>}/>

      
    </Routes>
   </div>
  </Router>
);
}