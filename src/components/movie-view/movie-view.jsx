import { useParams } from "react-router";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const movie = movies.find((m) => m.id === movieId)

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    useEffect(() => {
        if(storedUser && storedUser.FavoriteMovies)  {
            const isFavorite = storedUser.FavoriteMovies.includes(movieId);
            setIsFavorite(isFavorite);
        }
    }, [movieId]);

    const addFavMovie = (event) => {
        event.preventDefault();         

        fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            if (data) {                
                localStorage.setItem("user", JSON.stringify(data));
                setIsFavorite(true);
            } else {
                alert("Failed to add movie to favorites");
            }
        });
    };

    const removeFavMovie = (event) => {
        event.preventDefault();              

        fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setIsFavorite(false);
            } else {
                alert("Failed to delete movie from favorites");
            }
        });
    };

    return (
        <div>
            <div>
                <img className="img" src={movie.image} />
            </div>
            <div>
                {/* Using inline styles*/}
                <span style={{ fontWeight: 'bold'}}>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                {/* Using CSS classes*/}
                <span className="bold-text">Genre: </span>
                <span>{movie.genre}</span> 
            </div>
            <div>
                <span className="bold-text">Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span className="bold-text">Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                {isFavorite ? (
                    <Button variant="danger" onClick={removeFavMovie}>Remove from Favorites</Button>                    
                ) : (
                    <Button onClick={addFavMovie}>Add to Favorites</Button>
                )}
            </div>
        </div>
    );
};