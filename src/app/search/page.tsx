'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchMovies from '@/hooks/useSearchMovies';
import useMovieStore from '@/store/useMovieStore';
import { ThreeDots } from 'react-loader-spinner';
import MovieCard from '@/components/MovieCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoMdClose } from 'react-icons/io';
import { IMAGE_URL } from '@/hooks/useMovies';

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

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query');
  const searchYear = searchParams.get('year');
  const [currentPage, setCurrentPage] = useState('1');
  const searchedMovies = useMovieStore((state) => state.searchedMovies);
  const setSearchedMovies = useMovieStore((state) => state.setSearchedMovies);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const { isLoading, data: movieData = [] } = useSearchMovies(searchTerm, currentPage, searchYear);

  if (searchTerm === '') {
    router.push('/');
  }

  const handleYearChange = (date: Date) => {
    setSelectedYear(date.getFullYear());
  };

  const handleLoadMore = () => {
    if (movieData.page < movieData.total_pages) {
      const nextPage = movieData.page + 1;
      setCurrentPage(nextPage.toString());
    } else {
      return;
    }
  };

  useEffect(() => {
    if (movieData.results && parseInt(currentPage) === 1) {
      setSearchedMovies(movieData.results);
    } else if (movieData.results && parseInt(currentPage) > 1) {
      setSearchedMovies([...searchedMovies, ...movieData.results]);
    } else {
      return;
    }
  }, [movieData, setSearchedMovies, currentPage, searchedMovies]);

  const selectedDate = selectedYear ? new Date(selectedYear, 0, 1) : null;

  useEffect(() => {
    if (selectedYear !== null) {
      router.push(`/search/?query=${searchTerm}&year=${selectedYear.toString()}`);
    }
  }, [router, searchTerm, selectedYear]);

  const handleClearYear = () => {
    router.push(`/search/?query=${searchTerm}`);
    setSelectedYear(null);
  };

  return (
    <section className="searchPage">
      <h1 className="searchPage__heading">
        Search results for &nbsp;<span>&#39;{searchTerm}&#39;</span>
      </h1>
      {searchedMovies && (
        <div className="searchPage__dateWrapper">
          <span>Filter by: </span>
          <div className="searchPage__dateContent">
            <DatePicker
              wrapperClassName="searchPage__datePicker"
              selected={selectedDate}
              placeholderText="Year"
              onChange={handleYearChange}
              dateFormat="yyyy"
              showYearPicker
              scrollableYearDropdown
              yearDropdownItemNumber={10}
              value={searchYear?.toString()}
            />
            {searchYear && <IoMdClose size={20} className="searchPage__dateContent--clear" onClick={handleClearYear} />}
          </div>
        </div>
      )}

      {isLoading && <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="searchPage__isloading" visible={true} />}

      <div className="movies__items">
        {searchedMovies &&
          searchedMovies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
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
        {searchedMovies.length > 1 && !isLoading && (
          <button className="movies__loadMore--button" onClick={handleLoadMore} disabled={parseInt(currentPage) === movieData.total_pages}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
