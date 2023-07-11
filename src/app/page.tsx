'use client';

import useMovies from '@/hooks/useNowPlaying';
import SlideShow from '@/layout/SlideShow';
import React from 'react';

const Home = () => {
  const { data: movies = [] } = useMovies();

  // Randomly shuffle and slice the movies array if it's not undefined
  let slicedMovies = [];

  if (movies.results) {
    // Randomly shuffle the movies array
    const shuffledMovies = movies.results.sort(() => Math.random() - 0.5);

    // Slice the first 10 items from the shuffled array
    slicedMovies = shuffledMovies.slice(0, 1);
  }

  return (
    <div>
      <SlideShow slicedMovies={movies.results} />
    </div>
  );
};

export default Home;
