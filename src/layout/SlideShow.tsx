'use client';

import React, { useCallback, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import useMovies, { IMAGE_URL } from '@/hooks/useMovies';
import Image from 'next/image';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { ThreeDots } from 'react-loader-spinner';

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

const SlideShow = ({ slicedMovies }: { slicedMovies: Movie[] }) => {
  const [nowPlayingSwiper, setNowPlayingSwiper] = useState<any>(null);
  const { isLoading } = useMovies('now_playing', '1');

  const handlePrev = useCallback(() => {
    if (nowPlayingSwiper) {
      nowPlayingSwiper.slidePrev();
    }
  }, [nowPlayingSwiper]);

  const handleNext = useCallback(() => {
    if (nowPlayingSwiper) {
      nowPlayingSwiper.slideNext();
    }
  }, [nowPlayingSwiper]);

  return (
    <section className="swiper__container">
      <div className="swiper__heading">
        <h1>Now Playing</h1>
      </div>
      {isLoading && <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="isloading" visible={true} />}
      <div className="swiper__bg">{slicedMovies.length > 0 && <Image src={`${IMAGE_URL}/${slicedMovies[0].backdrop_path}`} alt="slider bakground" fill />}</div>
      <Swiper
        modules={[Navigation, Pagination, Controller]}
        onSwiper={setNowPlayingSwiper}
        controller={{ control: nowPlayingSwiper }}
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        loop={true}
        spaceBetween={20}
        slidesPerView={'auto'}
        navigation={{
          prevEl: '.swiper__prev',
          nextEl: '.swiper__next'
        }}
        slideActiveClass="slidecard__active"
      >
        {slicedMovies &&
          slicedMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard
                id={movie.id.toString()}
                image={`${IMAGE_URL}/${movie.backdrop_path}`}
                title={movie.title}
                genre_ids={movie.genre_ids}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                video={movie.video}
                slidecard
              />
            </SwiperSlide>
          ))}
        <div className="swiper__prev" onClick={handlePrev}>
          <SlArrowLeft />
        </div>
        <div className="swiper__next" onClick={handleNext}>
          <SlArrowRight />
        </div>
      </Swiper>
    </section>
  );
};

export default SlideShow;
