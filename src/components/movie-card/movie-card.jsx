import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-card.scss"

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick}>
            <Card.Img variant="top" src={useBootstrapBreakpoints.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Button onClick={() => onMovieClick(book)} variant="link">Open</Button>
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
    onMovieClick: PropTypes.func.isRequired
};