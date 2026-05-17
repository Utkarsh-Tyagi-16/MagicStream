import {useState, useEffect} from 'react';
import axiosClient from '../../api/axiosConfig'
import Movies from '../movies/Movies';
import MovieSkeleton from '../spinner/MovieSkeleton';
import HeroSection from './HeroSection';

const Home =({updateMovieReview}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setMessage("");
            try{
                const response = await axiosClient.get('/movies');
                setMovies(response.data);
                if (response.data.length === 0){
                    setMessage('There are currently no movies available')
                }

            }catch(error){
                console.error('Error fetching movies:', error)
                setMessage("Error fetching movies")
            }finally{
                setLoading(false)
            }
        }
        fetchMovies();
    }, []);

    const featuredMovie = movies.length > 0 ? movies[0] : null;

    return (
        <div className="home-page animate-fade-in">
            {loading ? (
                <div className="container mt-5">
                    <div className="row">
                        {[...Array(8)].map((_, i) => <MovieSkeleton key={i} />)}
                    </div>
                </div>
            ):  (
                <>
                    <HeroSection movie={featuredMovie} />
                    <Movies movies={movies} updateMovieReview={updateMovieReview} message={message}/>
                </>
            )}
        </div>
    );
};

export default Home;
