import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
  
import "./movie-card.scss"

export const MovieCard = ({ movie }) => {

    const addFavMovie = (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        

        fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Movie added to favorites");
                window.location.reload();
            } else {
                alert("Failed to add movie to favorites");
            }
        });
    };

    const removeFavMovie = (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        

        fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Movie deleted from favorites");
                window.location.reload();
            } else {
                alert("Failed to delete movie from favorites");
            }
        });
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="outline-success">Open</Button>
                    <Button onClick={addFavMovie}>Add to Favorites</Button>
                    <Button onClick={removeFavMovie}>Remove from Favorites</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
};