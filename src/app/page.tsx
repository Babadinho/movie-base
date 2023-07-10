'use client';

import useMovies from '@/hooks/useMovies';
import SlideShow from '@/layout/SlideShow';
import { ThreeDots } from 'react-loader-spinner';
import React from 'react';

const Home = () => {
  const { data: movies = [], isLoading } = useMovies('now_playing', '1');

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
      {isLoading ? (
        <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="isloading" visible={true} />
      ) : (
        <SlideShow slicedMovies={movies.results} />
      )}
    </div>
  );
};

export default Home;
