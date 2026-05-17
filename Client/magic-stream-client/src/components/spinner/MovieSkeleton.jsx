import React from 'react';
import './MovieSkeleton.css';

const MovieSkeleton = () => {
    return (
        <div className="col-md-3 mb-4 flex-shrink-0" style={{ width: '280px' }}>
            <div className="card h-100 shadow-sm movie-card glass-panel border-0 skeleton-card">
                <div className="skeleton-img"></div>
                <div className="card-body d-flex flex-column pt-3">
                    <div className="skeleton-text skeleton-title mb-3"></div>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                        <div className="skeleton-text skeleton-badge"></div>
                        <div className="skeleton-text skeleton-badge-small"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieSkeleton;
