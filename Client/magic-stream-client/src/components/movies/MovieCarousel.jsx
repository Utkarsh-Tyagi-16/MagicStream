import React, { useRef } from 'react';
import Movie from '../movie/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './MovieCarousel.css';

const MovieCarousel = ({ title, movies, updateMovieReview }) => {
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
            carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="movie-carousel-container mb-4">
            <h4 className="carousel-title mb-1 fw-bold ps-5">{title}</h4>
            <div className="carousel-wrapper">
                <button className="carousel-control left glass-panel" onClick={() => scroll('left')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="carousel-track" ref={carouselRef}>
                    {movies.map((movie) => (
                        <div key={movie.imdb_id} className="carousel-item-wrapper">
                            <Movie movie={movie} updateMovieReview={updateMovieReview} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control right glass-panel" onClick={() => scroll('right')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default MovieCarousel;
