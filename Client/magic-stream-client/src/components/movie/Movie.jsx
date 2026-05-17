import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import useWatchlist from '../../hooks/useWatchlist';
import "./Movie.css";

const Movie = ({movie, updateMovieReview}) => {
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(movie.imdb_id);

    const toggleWatchlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWatchlist) {
            removeFromWatchlist(movie.imdb_id);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <div className="col-md-3 mb-4" key={movie._id}>
            <Link
                to={`/stream/${movie.youtube_id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
            <div className="card h-100 shadow-sm movie-card glass-panel border-0">
                <div style={{position:"relative"}} className="overflow-hidden position-relative">
                    <img src={movie.poster_path} alt={movie.title} 
                        className="card-img-top movie-poster"
                    />
                    <div className="overlay">
                        <span className="play-icon-overlay">
                                <FontAwesomeIcon icon={faCirclePlay} />
                        </span>
                    </div>
                    <button 
                        className="watchlist-btn"
                        onClick={toggleWatchlist}
                        title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        <FontAwesomeIcon icon={inWatchlist ? fasHeart : farHeart} color={inWatchlist ? "#ff4757" : "var(--text-color)"} />
                    </button>
                </div>
                <div className = "card-body d-flex flex-column" style={{ color: 'var(--text-color)' }}>
                    <h6 className ="card-title fw-bold text-truncate">{movie.title}</h6>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                        <span className="badge bg-secondary opacity-75">{movie.genre?.[0]?.genre_name}</span>
                        {movie.ranking?.ranking_name && (
                            <span className="badge px-3 py-2" style={{background: 'var(--primary-color)', color: '#000', boxShadow: '0 0 10px rgba(0,242,254,0.4)'}}>
                                {movie.ranking.ranking_name}
                            </span>
                        )}
                    </div>
                </div>
                  {updateMovieReview && (
                        <Button
                            variant="outline-info"
                            size="sm"
                            onClick={e => {
                                e.preventDefault();
                                updateMovieReview(movie.imdb_id);
                            }}
                            className="mx-3 mb-3 rounded-pill fw-semibold"
                        >
                            Update Review
                        </Button>
                    )}
            </div>
            </Link>
        </div>
    )
}
export default Movie;