import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import axiosClient from '../api/axiosConfig';
import toast from 'react-hot-toast';

const useWatchlist = () => {
    const { auth } = useAuth();
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (auth?.user_id) {
                try {
                    const response = await axiosClient.get(`/watchlist/${auth.user_id}`);
                    setWatchlist(response.data || []);
                } catch (error) {
                    console.error("Error fetching watchlist:", error);
                }
            } else {
                setWatchlist([]);
            }
        };
        fetchWatchlist();
    }, [auth]);

    const addToWatchlist = async (movie) => {
        if (!auth) {
            toast.error("Please log in to add movies to your watchlist.");
            return;
        }
        
        // Optimistic UI update
        setWatchlist((prev) => {
            if (prev.find(m => m.imdb_id === movie.imdb_id)) return prev;
            return [...prev, movie];
        });

        try {
            await axiosClient.post('/watchlist/add', {
                user_id: auth.user_id,
                imdb_id: movie.imdb_id
            });
            toast.success(`${movie.title} added to watchlist!`);
        } catch (error) {
            console.error("Error adding to watchlist:", error);
            toast.error("Failed to add movie to watchlist.");
        }
    };

    const removeFromWatchlist = async (imdb_id) => {
        if (!auth) return;

        // Optimistic UI update
        setWatchlist((prev) => prev.filter(m => m.imdb_id !== imdb_id));

        try {
            await axiosClient.post('/watchlist/remove', {
                user_id: auth.user_id,
                imdb_id: imdb_id
            });
            toast.success("Removed from watchlist");
        } catch (error) {
            console.error("Error removing from watchlist:", error);
            toast.error("Failed to remove movie.");
        }
    };

    const isInWatchlist = (imdb_id) => {
        return watchlist.some(m => m.imdb_id === imdb_id);
    };

    return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};

export default useWatchlist;
