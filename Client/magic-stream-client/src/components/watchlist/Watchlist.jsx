import React from 'react';
import useWatchlist from '../../hooks/useWatchlist';
import Movie from '../movie/Movie';

const Watchlist = ({ updateMovieReview }) => {
    const { watchlist } = useWatchlist();

    return (
        <div className="container mt-5 mb-5 animate-fade-in">
            <h2 className="mb-4 fw-bold" style={{color: 'var(--primary-color)'}}>My Watchlist</h2>
            {watchlist.length === 0 ? (
                <div className="text-center mt-5 glass-panel p-5 rounded">
                    <h4 className="text-muted">Your watchlist is empty</h4>
                    <p className="opacity-75">Explore movies and click the heart icon to add them here!</p>
                </div>
            ) : (
                <div className="row">
                    {watchlist.map((movie) => (
                        <Movie key={movie.imdb_id} updateMovieReview={updateMovieReview} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
