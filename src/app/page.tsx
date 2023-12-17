import Movies from '@/components/home/Movies';
import SlideShow from '@/components/home/SlideShow';
import React from 'react';
import useNowPlaying from '@/hooks/useNowPlaying';

const Home = async () => {
  const response = await useNowPlaying('now_playing', '1');

  const movieData = await response.json();

  let slicedMovies = [];

  if (movieData.results) {
    const shuffledMovies = movieData.results.sort(() => Math.random() - 0.5);

    slicedMovies = shuffledMovies.slice(0, 15);
  }

  return (
    <div className="main">
      <SlideShow slicedMovies={slicedMovies} />
      <Movies />
    </div>
  );
};

export default Home;
