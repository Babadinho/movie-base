'use client';

import React, { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import useMovies, { IMAGE_URL } from '@/hooks/useMovies';
import { ThreeDots } from 'react-loader-spinner';
import useMovieStore from '@/store/useMovieStore';
import useMovieTab from '@/store/useMovieTabs';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  page: number;
  total_pages: number;
}

interface TabItem {
  label: string;
  key: string;
}

const Movies = () => {
  const [currentPage, setCurrentPage] = useState('1');
  const currentTab = useMovieTab((state) => state.currentTab);
  const setCurrentTab = useMovieTab((state) => state.setCurrentTab);
  const { isLoading, data: movieData = [] } = useMovies(currentTab, currentPage);
  const movies = useMovieStore((state) => state.movies);
  const setMovies = useMovieStore((state) => state.setMovies);

  const tabItems: TabItem[] = [
    {
      label: 'Upcoming',
      key: 'upcoming'
    },
    {
      label: 'Popular',
      key: 'popular'
    },
    {
      label: 'Top Rated',
      key: 'top_rated'
    }
  ];

  const handleLoadMore = () => {
    if (movieData.page < movieData.total_pages) {
      const nextPage = movieData.page + 1;
      setCurrentPage(nextPage.toString());
    }
  };

  const handSwitchTabs = (tab: string) => {
    setCurrentTab(tab);
    setCurrentPage('1');
  };

  useEffect(() => {
    if (movieData.results && currentPage === '1') {
      setMovies(movieData.results);
    } else if (movieData.results && parseInt(currentPage) > 1) {
      setMovies([...movies, ...movieData.results]);
    } else {
      return;
    }
  }, [movies, movieData, currentPage, setMovies]);

  return (
    <section className="movies">
      <div className="movies__header">
        <div className="movies__heading">
          {tabItems.map((tab) => (
            <div className={`movies__title ${currentTab === tab.key ? 'movies__title--active' : ''}`} key={tab.key} onClick={() => handSwitchTabs(tab.key)}>
              <h2>{tab.label}</h2>
            </div>
          ))}
        </div>
      </div>
      {isLoading && <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="movies__isloading" visible={true} />}

      <div className="movies__items">
        {movies &&
          movies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id.toString()}
              image={`${IMAGE_URL}/${movie.poster_path}`}
              title={movie.title}
              genre_ids={movie.genre_ids}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              video={movie.video}
            />
          ))}
      </div>

      <div className="movies__loadMore">
        {isLoading && parseInt(currentPage) > 1 && <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperStyle={{}} visible={true} />}
        {movies.length > 1 && !isLoading && (
          <button className="movies__loadMore--button" onClick={handleLoadMore} disabled={parseInt(currentPage) === movieData.total_pages}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default Movies;
