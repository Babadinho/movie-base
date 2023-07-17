'use client';

import React from 'react';
import Upcoming from '@/layout/Upcoming';
import SlideShow from '@/layout/SlideShow';
import useNowPlaying from '@/hooks/useNowPlaying';

const Home = () => {
  const { data: movies = [] } = useNowPlaying();

  // Randomly shuffle and slice the movies array if it's not undefined
  let slicedMovies = [];

  if (movies.results) {
    // Randomly shuffle the movies array
    const shuffledMovies = movies.results.sort(() => Math.random() - 0.5);

    // Slice the first 10 items from the shuffled array
    slicedMovies = shuffledMovies.slice(0, 12);
  }

  return (
    <div>
      <SlideShow slicedMovies={slicedMovies} />
      <Upcoming />
    </div>
  );
};

export default Home;
