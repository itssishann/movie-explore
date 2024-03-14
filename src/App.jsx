import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Trending from './components/trending';
import Popular from './components/Popular';
import Movies from './components/Movies';
import Tvshow from './components/Tvshows';
import Actors from './components/Actors';
import Moviedetails from './components/templates/movieDetails';
import Tvdetails from './components/templates/Tvdetails';
import Persondetails from './components/templates/Persondetails';
import MobileAlert from './components/templates/MobileAlert';
import NotFound404 from './components/NotFound404';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobileKeywords = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

    const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
    setIsMobile(isMobileDevice);
  }, []);

  if (isMobile) {
    return (
      <div className='bg-[#1F1E24] h-screen w-screen flex'>
        <MobileAlert />
      </div>
    );
  }

  return (
    <div className='bg-[#1F1E24] h-screen w-screen flex'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} />
        <Route path="/tv" element={<Tvshow />} />
        <Route path="/tv/details/:id" element={<Tvdetails />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/person/details/:id" element={<Persondetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <MobileAlert />
    </div>
  );
}

export default App;
