'use client';

import React, { useState } from 'react';
import useSimilarMovies from '@/hooks/useSimilarMovies';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import MovieCard from './MovieCard';

interface SimilarMoviesProps {
  id: number;
}

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

const SimilarMovies = ({ id }: SimilarMoviesProps) => {
  const { isLoading, data: similarMovies = {} } = useSimilarMovies(id.toString());
  const [similarSwiper, setSimilarSwiper] = useState(null);
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

  if (isLoading) {
    return;
  }

  if (similarMovies.results.length === 0) {
    return;
  }

  return (
    <section className="similarMovies">
      <div className="similarMovies__wrapper">
        <div className="similarMovies__header">
          <h2 className="similarMovies__heading">Similar Movies</h2>
        </div>
        <div className="similarMovies__content">
          <Swiper
            modules={[Navigation, Pagination, Controller]}
            onSwiper={() => setSimilarSwiper}
            controller={{ control: similarSwiper }}
            pagination={{
              dynamicBullets: true,
              clickable: true
            }}
            slidesPerView={'auto'}
            navigation={{
              prevEl: '.swiper__prev',
              nextEl: '.swiper__next'
            }}
          >
            {similarMovies?.results.map((movie: Movie) => {
              if (movie.poster_path !== null && movie.backdrop_path !== null) {
                return (
                  <SwiperSlide key={movie.id}>
                    <MovieCard
                      id={movie.id.toString()}
                      image={`${IMAGE_URL}/${movie.poster_path !== null ? movie.poster_path : movie.backdrop_path}`}
                      title={movie.title}
                      genre_ids={movie.genre_ids}
                      release_date={movie.release_date}
                      vote_average={movie.vote_average}
                      video={movie.video}
                    />
                  </SwiperSlide>
                );
              }
            })}
            <div className="swiper__prev">
              <SlArrowLeft />
            </div>
            <div className="swiper__next">
              <SlArrowRight />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SimilarMovies;
