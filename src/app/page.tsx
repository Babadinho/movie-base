import Movies from '@/layout/Movies';
import SlideShow from '@/layout/SlideShow';
import React from 'react';
import useNowPlaying from '@/hooks/useNowPlaying';
import { notFound } from 'next/navigation';

const Home = async () => {
  const response = await useNowPlaying('now_playing', '1');

  if (response.status === 404) {
    notFound();
  }

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
