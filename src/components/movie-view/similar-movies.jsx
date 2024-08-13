import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';


export const SimilarMovies = ({similarMovies, movie}) => {
    return (
        <Row>
            <h4>Similar Movies</h4>
            <hr/>
            {similarMovies
            .filter((m) => m.id !== movie.id)
            .map((movie) => (                
                <Col className="mb-5" key={movie.id} xs={12} md={6} lg={3}>
                    <MovieCard movie={movie} />
                </Col>
            ))}  
        </Row>
    )
}