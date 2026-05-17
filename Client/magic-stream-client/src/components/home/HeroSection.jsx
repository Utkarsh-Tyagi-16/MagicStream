import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './HeroSection.css';

const HeroSection = ({ movie }) => {
    const navigate = useNavigate();

    if (!movie) return null;

    return (
        <div className="hero-container mb-5" style={{
            backgroundImage: `linear-gradient(to right, var(--hero-grad-start) 15%, var(--hero-grad-end) 100%), url(${movie.poster_path})`
        }}>
            <div className="hero-content animate-fade-in">
                <h1 className="hero-title">{movie.title}</h1>
                <div className="hero-meta mb-3">
                    <span className="badge bg-info text-dark me-2">Featured</span>
                    {movie.genre && movie.genre.map(g => (
                        <span key={g.genre_id} className="text-muted fw-semibold me-2">{g.genre_name}</span>
                    ))}
                </div>
                <p className="hero-description opacity-75 mb-4" style={{ color: 'var(--text-color)' }}>
                    {movie.admin_review || "Experience the magic of cinema with this incredible masterpiece. Available now on MagicStream. Watch it today in stunning high definition."}
                </p>
                <div className="d-flex gap-3">
                    <Button variant="info" size="lg" className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center" onClick={() => navigate(`/stream/${movie.youtube_id}`)}>
                        <FontAwesomeIcon icon={faPlay} className="me-2" /> Play Now
                    </Button>
                    <Button variant="outline-light" size="lg" className="rounded-pill px-4 glass-panel d-flex align-items-center">
                        <FontAwesomeIcon icon={faInfoCircle} className="me-2" /> More Info
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
