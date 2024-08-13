import { useParams } from "react-router";
import "./movie-view.scss";
import { Button, Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { SimilarMovies } from "./similar-movies";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const movie = movies.find((m) => m.id === movieId)
    const [similarMovies, setSimilarMovies] = useState([]);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    useEffect(() => {
        fetchMovies();

        if(storedUser && storedUser.FavoriteMovies)  {
            const isFavorite = storedUser.FavoriteMovies.includes(movieId);
            setIsFavorite(isFavorite);
        }
    }, [movieId]);

    const fetchMovies = () => {
        fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.map((movie) => {
              return {
                id: movie._id,
                image: movie.ImagePath,
                title: movie.Title, 
                genre: movie.Genre.Name,
                description: movie.Description,
                director: movie.Director.Name
              }
            });

            setSimilarMovies(
                moviesFromApi.filter((m) => m.genre === movie.genre)
            );
            console.log(similarMovies);
          });
      } 

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
        <Container>
            <Row>
            <Col className="mb-5" sm={12} md={6}>
            <div>
                {/* Using inline styles*/}
                <span style={{ fontSize: '3rem', fontWeight: 'bold'}}>{movie.title}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{fontSize: '1.5rem', fontFamily: 'helvetica', color: 'rgba(0, 0, 0, 0.5)' }}>{movie.director}</span>
                <span style={{fontSize: '1.2rem', fontFamily: 'helvetica' }}>{movie.genre}</span>
            </div>
            <br/>        
            <div>
                <span>{movie.description}</span>
            </div>            
            <br/>
            <div>
                {isFavorite ? (
                    <Button variant="danger" onClick={removeFavMovie}>Remove from Favorites</Button>                    
                ) : (
                    <Button variant="success" onClick={addFavMovie}>Add to Favorites</Button>
                )}
            </div>
            </Col>
            
            <Col sm={12} md={6}>
                <div>
                    <img className="img" src={movie.image} />
                </div>
            </Col>
            </Row>
            <br/>            
            <SimilarMovies similarMovies={similarMovies} movie={movie}/>            
        </Container>
    );
};
