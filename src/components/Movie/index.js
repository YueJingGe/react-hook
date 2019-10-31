import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
    console.log(movie);
    
  const Poster = movie.Poster ? movie.Poster : DEFAULT_PLACEHOLDER_IMAGE;

  return (
    <div className="App-movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`the movie titled: ${movie.Title}`}
          src={Poster}
        ></img>
      </div>
      <p>{movie.Year}</p>
    </div>
  );
};

export default Movie;
