import React from 'react';
import Image from 'next/image';
import useMovieDetails from '@/hooks/useMovieDetails';
import { FaRegThumbsUp } from 'react-icons/fa';
import { MdOutlineAccessTime } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import Link from 'next/link';
import MovieCast from '@/components/movieDetails/MovieCast';
import MoviePhotos from '@/components/movieDetails/MoviePhotos';
import SimilarMovies from '@/components/movieDetails/SimilarMovies';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  budget: number;
  revenue: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  imdb_id: number;
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

const MovieDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
  const IMDB_URL = 'https://www.imdb.com/title';

  const response = await useMovieDetails(id);

  if (response.status === 404) {
    notFound();
  }

  const movieData = (await response.json()) as Movie;

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

  const imagePath = movieData.poster_path || movieData.backdrop_path || '/images/no_image.jpg';
  const fullImagePath = movieData.poster_path || movieData.backdrop_path ? `${IMAGE_URL}${imagePath}` : imagePath;

  return (
    <div className="movieDetails">
      <section className="movieDetails_main">
        <div className="movieDetails__image">
          <Image src={`${fullImagePath}`} fill alt={movieData.title} priority />
        </div>
        <BackButton />
        <div className="movieDetails__wrapper">
          <div className="movieDetails__poster">
            <Image src={fullImagePath} fill alt="" />
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
                <span className="movieDetails__voteAverage">&#40;{formatNumberToK(movieData.vote_count)}&#41;</span>
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
      <MoviePhotos id={parseInt(id)} />
      <SimilarMovies id={parseInt(id)} />
    </div>
  );
};

export default MovieDetails;
