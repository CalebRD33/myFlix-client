import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Dark Knight",
            description: "The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City. Their efforts are derailed by the Joker, an anarchistic mastermind who seeks to test how far Batman will go to save the city from chaos.",
            genre: "Action",
            director: "Christopher Nolan",
            image: "https://m.media-amazon.com/images/I/818hyvdVfvL._AC_SY879_.jpg"
        },
        {
            id: 2,
            title: "Inception",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
            genre: "Sci-Fi",
            director: "Christopher Nolan",
            image: "https://m.media-amazon.com/images/I/71uKM+LdgFL._AC_SL1000_.jpg"
        },
        {
            id: 3,
            title: "Pulp Fiction",
            description: "The lives of two mob hit men, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.",
            genre: "Crime",
            director: "Quentin Tarantino",
            image: "https://m.media-amazon.com/images/I/71uLn3j0yWL._AC_SX679_.jpg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    
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