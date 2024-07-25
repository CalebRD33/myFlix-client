import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId)
    return (
        <div>
            <div>
                <img className="w-100" src={movie.image} />
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
            <Link to={`/`}>
            <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
            </Link>
        </div>
    );
};