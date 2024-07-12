import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const movieFromApi = data.map((doc) => {
                    return {
                        id: doc._id,
                        image: doc.ImagePath,
                        title: doc.Title, 
                        genre: doc.Genre.Name,
                        description: doc.Description,
                        director: doc.Director.Name                                                           
                    };
                });

                setMovies(movieFromApi);
            });            
    }, []);
    
    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id}
                    movie={movie} 
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};