'use client';

import React, { useCallback, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { ThreeDots } from 'react-loader-spinner';
import { AiFillPlaySquare } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useUpcoming, { IMAGE_URL } from '@/hooks/useUpcoming';

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

const Upcoming = () => {
  const [currentPage, setCurrentPage] = useState('1');
  const [upcomingSwiper, setUpcomingSwiper] = useState<any>(null);
  const { isLoading, data: upcomingMovies = [] } = useUpcoming('upcoming', currentPage);

  const handleSwiperTransitionEnd = useCallback(() => {
    if (upcomingSwiper.isEnd && upcomingMovies.page < upcomingMovies.total_pages) {
      const nextPage = upcomingMovies.page + 1;
      setCurrentPage(nextPage.toString());
      return upcomingSwiper.slideTo(0);
    }
  }, [upcomingMovies, upcomingSwiper]);

  const handleTransitionStart = useCallback(() => {
    if (upcomingSwiper.isBeginning && upcomingMovies.page === 1) {
      return setCurrentPage(upcomingMovies.total_pages?.toString());
    } else if (upcomingSwiper.isBeginning && upcomingMovies.page > 1) {
      const previousPage = upcomingMovies.page - 1;
      return setCurrentPage(previousPage.toString());
    }
  }, [upcomingMovies, upcomingSwiper]);

  const handlePrev = useCallback(() => {
    if (upcomingSwiper) {
      handleTransitionStart();
      upcomingSwiper.slidePrev();
    }
  }, [upcomingSwiper, handleTransitionStart]);

  const handleNext = useCallback(() => {
    if (upcomingSwiper) {
      if (upcomingSwiper.isEnd && currentPage === upcomingMovies.total_pages?.toString()) {
        setCurrentPage('1');
        return upcomingSwiper.slideTo(0);
      } else {
        upcomingSwiper.slideNext();
      }
    }
  }, [upcomingSwiper, handleSwiperTransitionEnd, upcomingMovies, currentPage]);

  return (
    <div className="upcoming">
      <div className="upcoming__header">
        <div className="upcoming__heading">
          <div className="upcoming__title">
            <AiFillPlaySquare /> <h1>Upcoming</h1>
          </div>
        </div>
        <div className="upcoming__navigation">
          {!isLoading && (
            <div className="upcoming__page">
              {upcomingMovies.page} <span>/</span> {upcomingMovies.total_pages}
            </div>
          )}
          <div className="upcoming__arrows">
            <div className="upcoming__prev" onClick={handlePrev}>
              <FaChevronLeft />
            </div>
            <div className="upcoming__next" onClick={handleNext}>
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="isloading" visible={true} />}
      <Swiper
        modules={[Navigation, Pagination, Controller]}
        onSwiper={setUpcomingSwiper}
        controller={{ control: upcomingSwiper }}
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        spaceBetween={25}
        slidesPerView={'auto'}
        navigation={{
          prevEl: '.upcoming__prev',
          nextEl: '.upcoming__next'
        }}
        className="upcoming__swiper"
        wrapperClass="upcoming__SwiperWrapper"
        onTransitionEnd={handleSwiperTransitionEnd}
        onSlideResetTransitionStart={handleTransitionStart}
      >
        {upcomingMovies.results &&
          upcomingMovies.results.map((movie: Movie) => (
            <SwiperSlide key={movie.id} className="upcoming__SwiperSlide">
              <MovieCard
                image={`${IMAGE_URL}/${movie.poster_path}`}
                title={movie.title}
                genre_ids={movie.genre_ids}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                video={movie.video}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Upcoming;
