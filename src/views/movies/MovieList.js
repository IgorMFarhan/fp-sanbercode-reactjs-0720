import React, { useContext } from "react";
import { CContainer, CRow } from "@coreui/react";
import { MovieContext } from "../../context/MovieContext";
import MovieCard from "./MovieCard";
import { AuthContext } from "../../context/AuthContext";

const MovieList = () => {
  const [movies] = useContext(MovieContext);
  const [auth] = useContext(AuthContext);

  const compare = (a, b) => {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  };

  let daftarFilm = movies.list ? movies.list.sort(compare) : "";

  return (
    <CContainer>
      {daftarFilm !== "" ?
        <CRow>
          {daftarFilm.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image_url={movie.image_url}
                year={movie.year}
                duration={movie.duration}
                genre={movie.genre}
                id={movie.id}
                rating={movie.rating}
                description={movie.description}
                review={movie.review}
                edit_url={`/movie/edit/${movie.id}`}
                status={auth.status}
              />
            );
          })
          }
        </CRow>
        :
        <h1 className="h1 text-center m-3">Movie is not available, back to home</h1>
      }
    </CContainer>
  );
};

export default MovieList;
