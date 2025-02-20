import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const apiKey = process.env.REACT_APP_OMDB_API_KEY;
const API_URL = 'https://omdbapi.com?apikey=' + apiKey;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([""]);
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies(searchTerm);
    }, []);
        return (
        <div className="app">
            <h1>Movie Land</h1>

            <div className='search'>
                <input 
                  placeholder='Search for movies'
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <button onClick={() => {
                    searchMovies(searchTerm)
                }}>Search</button>
            </div>

            {
                movies?.length > 0 //By adding the ? it prevents an error if movies is not defined
                ? (
                  <div className='container'>
                    {
                        movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))
                    }
                  </div>
                ) : (
                  <div className='empty'> 
                      <h2>No movies found</h2>
                  </div>
                )
            }
        </div>
    );
}

export default App;
