'use client';

import React, { useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Image from 'next/image';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import useMovies from '@/hooks/useMovies';

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
}

const SlideShow = () => {
  const [nowPlayingSwiper, setNowPlayingSwiper] = useState(null);
  const { data: movieData = {} } = useMovies('now_playing', '1');
  const shuffledMovies = movieData.results?.sort(() => Math.random() - 0.5);
  const slicedMovies = shuffledMovies?.slice(0, 15);

  const imagePath = (slicedMovies?.length > 0 && slicedMovies[0].backdrop_path) || (slicedMovies?.length > 0 && slicedMovies[0].poster_path);
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

  return (
    <section className="swiper__container">
      <div className="swiper__heading">
        <h1>Now Playing</h1>
      </div>
      <div className="swiper__bg">{slicedMovies?.length > 0 && <Image src={`${IMAGE_URL}/${imagePath}`} alt="slider bakground" fill priority />}</div>
      <Swiper
        modules={[Navigation, Pagination, Controller]}
        onSwiper={() => setNowPlayingSwiper}
        controller={{ control: nowPlayingSwiper }}
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
        {slicedMovies &&
          slicedMovies.map((movie: Movie, index: number) => {
            const imagePath = movie.backdrop_path || movie.poster_path || '/images/no_image.jpg';
            const fullImagePath = movie.poster_path || movie.backdrop_path ? `${IMAGE_URL}${imagePath}` : imagePath;
            return (
              <SwiperSlide key={index}>
                <MovieCard
                  id={movie.id.toString()}
                  image={fullImagePath}
                  title={movie.title}
                  genre_ids={movie.genre_ids}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  video={movie.video}
                  slidecard
                />
              </SwiperSlide>
            );
          })}
        <button className="swiper__prev">
          <SlArrowLeft />
        </button>
        <button className="swiper__next">
          <SlArrowRight />
        </button>
      </Swiper>
    </section>
  );
};

export default SlideShow;
