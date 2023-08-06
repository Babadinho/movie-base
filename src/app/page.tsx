'use client';

import Movies from '@/layout/Movies';
import useMovies from '@/hooks/useMovies';
import SlideShow from '@/layout/SlideShow';
import React from 'react';

const Home = () => {
  const { data: movies = [] } = useMovies('now_playing', '1');

  // Randomly shuffle and slice the movies array if it's not undefined
  let slicedMovies = [];

  if (movies.results) {
    // Randomly shuffle the movies array
    const shuffledMovies = movies.results.sort(() => Math.random() - 0.5);

    // Slice the first 10 items from the shuffled array
    slicedMovies = shuffledMovies.slice(0, 12);
  }

  return (
    <div className="main">
      <SlideShow slicedMovies={slicedMovies} />
      <Movies />
    </div>
  );
};

export default Home;
