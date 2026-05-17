import React, { useMemo } from 'react';
import { useSearch } from '../../context/SearchContext';
import MovieCarousel from './MovieCarousel';
import Movie from '../movie/Movie'; 

const Movies = ({movies, updateMovieReview, message}) => {
    const { searchQuery } = useSearch();

    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes((searchQuery || '').toLowerCase())
    );

    // Group movies by genre
    const genres = useMemo(() => {
        const groups = {};
        movies.forEach(movie => {
            if (movie.genre && movie.genre.length > 0) {
                movie.genre.forEach(g => {
                    if (!groups[g.genre_name]) {
                        groups[g.genre_name] = [];
                    }
                    groups[g.genre_name].push(movie);
                });
            } else {
                if (!groups['Uncategorized']) groups['Uncategorized'] = [];
                groups['Uncategorized'].push(movie);
            }
        });
        return groups;
    }, [movies]);

    // If searching, show traditional grid
    if (searchQuery) {
        return (
            <div className="container mt-2 mb-5 animate-fade-in">
                <h3 className="mb-4 fw-bold" style={{color: 'var(--text-color)'}}>
                    Search Results for "{searchQuery}"
                </h3>
                <div className="row">
                    {filteredMovies && filteredMovies.length > 0
                        ? filteredMovies.map((movie) => (
                            <Movie key={movie.imdb_id} updateMovieReview={updateMovieReview} movie={movie} />
                        ))
                        : <h4 className="text-muted text-center mt-5">{message || "No movies found matching your search."}</h4>
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-2 mb-5 animate-fade-in px-0">
            {Object.keys(genres).length > 0 ? (
                Object.keys(genres).sort().map(genreName => (
                    <MovieCarousel 
                        key={genreName} 
                        title={genreName} 
                        movies={genres[genreName]} 
                        updateMovieReview={updateMovieReview} 
                    />
                ))
            ) : (
                <h4 className="text-muted text-center mt-5">{message || "No movies available."}</h4>
            )}
        </div>
    )
}
export default Movies;