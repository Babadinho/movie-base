'use client';

import React, { useCallback, useRef } from 'react';
import SlideCard from '@/components/SlideCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { IMAGE_URL } from '@/hooks/useMovies';
import Image from 'next/image';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

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
  const swiperRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  return (
    <div className="swiper__container">
      <div className="swiper__heading">
        <h1>Now Playing</h1>
      </div>
      <div className="swiper__bg">{slicedMovies && <Image src={`${IMAGE_URL}/${slicedMovies[0].backdrop_path}`} alt="slider bakground" fill />}</div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        loop={true}
        spaceBetween={20}
        slidesPerView={'auto'}
        centeredSlides
        centeredSlidesBounds={true}
        navigation={{
          prevEl: '.swiper__prev',
          nextEl: '.swiper__next'
        }}
        slideActiveClass="slidecard__active"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slicedMovies &&
          slicedMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <SlideCard
                backdrop_path={`${IMAGE_URL}/${movie.backdrop_path}`}
                title={movie.title}
                genre_ids={movie.genre_ids}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                video={movie.video}
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
    </div>
  );
};

export default SlideShow;
