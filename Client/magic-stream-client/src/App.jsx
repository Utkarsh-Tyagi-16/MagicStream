import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/home/Home';
import Recommended from './components/recommended/Recommended';
import Review from './components/review/Review';
import Header from './components/header/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Layout from './components/Layout';
import RequiredAuth from './components/RequiredAuth';
import Watchlist from './components/watchlist/Watchlist';
import axiosClient from './api/axiosConfig';
import useAuth from './hooks/useAuth';
import StreamMovie from './components/stream/StreamMovie';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from './context/ThemeContext';

import { Toaster } from 'react-hot-toast';
import {Route, Routes, useNavigate} from 'react-router-dom'

function App() {

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const updateMovieReview = (imdb_id) => {
      navigate(`/review/${imdb_id}`);
  };
   
  const handleLogout = async () => {
        try {
            const response = await axiosClient.post("/logout",{user_id: auth.user_id});
            console.log(response.data);
            setAuth(null);
            console.log('User logged out');
        } catch (error) {
            console.error('Error logging out:', error);
        } 
    };

  return (
    <ThemeProvider>
      <SearchProvider>
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: 'var(--glass-bg)',
            color: 'var(--text-color)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
          }
        }}/>
        <Header handleLogout = {handleLogout}/>
        <Routes path="/" element = {<Layout/>}>
          <Route path="/" element={<Home updateMovieReview={updateMovieReview}/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/watchlist" element={<Watchlist updateMovieReview={updateMovieReview}/>}></Route>
          <Route element = {<RequiredAuth/>}>
              <Route path="/recommended" element={<Recommended/>}></Route>
              <Route path="/review/:imdb_id" element={<Review/>}></Route>
              <Route path="/stream/:yt_id" element={<StreamMovie/>}></Route>
          </Route>
        </Routes>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default App
