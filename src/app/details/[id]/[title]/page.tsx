'use client';

import React from 'react';
import Image from 'next/image';
import useMovieDetails from '@/hooks/useMovieDetails';
import { FaRegThumbsUp } from 'react-icons/fa';
import { MdOutlineAccessTime } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import Link from 'next/link';
import { ThreeDots } from 'react-loader-spinner';
import MovieCast from '@/components/MovieCast';

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  imdb_id: string;
  homepage: string;
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
  runtime: number;
  genres?: Genre[];
}

const MovieDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
  const IMDB_URL = 'https://www.imdb.com/title';

  const { isLoading, data: movieData = {} as Movie } = useMovieDetails(id);

  const genreNames = movieData?.genres?.map((genre: { name: string }) => {
    return genre.name;
  });

  const genreList = genreNames?.join(', ');
  const releaseYear = new Date(movieData?.release_date).getFullYear();

  function formatNumberToK(number: number) {
    if (number >= 1000) {
      const units = ['K', 'M', 'B', 'T'];
      const suffixIndex = Math.floor(Math.log10(number) / 3);
      const formattedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);

      return formattedNumber + units[suffixIndex - 1];
    }

    return number?.toString();
  }

  if (isLoading) {
    return <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperClass="movieDetails__isloading" wrapperStyle={{}} visible={true} />;
  }

  return (
    <>
      <section className="movieDetails">
        <div className="movieDetails__image">
          <Image src={`${IMAGE_URL}/${movieData.backdrop_path}`} fill alt="" />
        </div>
        <div className="movieDetails__wrapper">
          <div className="movieDetails__poster">
            <Image src={`${IMAGE_URL}/${movieData.poster_path}`} fill alt="" />
          </div>
          <div className="movieDetails__details">
            <h1 className="movieDetails__title">{movieData.title}</h1>
            <div className="movieDetails__info">
              <span className="movieDetails__date">
                <SlCalender />
                {releaseYear}
              </span>
              <span className="movieDetails__runtime">
                <MdOutlineAccessTime />
                {movieData.runtime} <span>min</span>
              </span>
              <div className="movieDetails__rating">
                <FaRegThumbsUp />
                <span className="movieDetails__voteAverage">{movieData.vote_average.toFixed(1)}</span>
              </div>
            </div>
            <p className="movieDetails__overview">{movieData.overview}</p>
            <div className="movieDetails__otherInfo">
              <div className="movieDetails__genre">
                <span>Genres: </span>
                {genreList}
              </div>
              <div className="movieDetails__budget">
                <span>Budget: </span>${movieData.budget.toLocaleString()}
              </div>
              <div className="movieDetails__revenue">
                <span>Revenue: </span>${movieData.revenue.toLocaleString()}
              </div>
              <div className="movieDetails__website">
                <span>Website: </span>
                <Link href={movieData?.homepage} target="_blank">
                  {movieData.homepage}
                </Link>
              </div>
              <div className="movieDetails__imdb">
                <span>Imdb: </span>
                <Link href={`${IMDB_URL}/${movieData.imdb_id}`} target="_blank">{`${IMDB_URL}/${movieData.imdb_id}`}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MovieCast id={parseInt(id)} imdb_id={movieData.imdb_id} />
    </>
  );
};

export default MovieDetails;
