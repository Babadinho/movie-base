'use client';

import React from 'react';
import useMovieStore from '../store/store';

const page = () => {
  const movies = useMovieStore((state) => state.movies);
  const setError = useMovieStore((state) => state.setError);
  return <div>page</div>;
};

export default page;
