import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';


export const FavoriteMovies = ({favMovies}) => {
    return (
        <Row>
            <h4>Favorite Movies</h4>
            <hr/> 
            {favMovies.map((movie) => (
                <Col className="mb-5" key={movie.id} xs={12} md={6} lg={3}>
                    <MovieCard movie={movie} />
                </Col>
            ))}  
        </Row>
    )
}