import React, { useState } from 'react';
import useMovieCast from '@/hooks/useMovieCast';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Link from 'next/link';

interface MovieCastProps {
  id: number;
  imdb_id: number;
}

interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

const MovieCast = ({ id, imdb_id }: MovieCastProps) => {
  const { isLoading, data: movieCast = {} } = useMovieCast(id.toString());
  const [castSwiper, setCastSwiper] = useState<any>(null);
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
  const IMDB_URL = 'https://www.imdb.com/title';

  const castList = movieCast.cast?.slice(0, 16).sort((a: { order: number }, b: { order: number }) => a.order - b.order);

  if (isLoading) {
    return <ThreeDots height="70" width="70" radius="9" color="#FF0000" ariaLabel="three-dots-loading" wrapperClass="movieCast__isloading" wrapperStyle={{}} visible={true} />;
  }

  return (
    <section className="movieCast">
      <div className="movieCast__wrapper">
        <div className="movieCast__header">
          <h2 className="movieCast__heading">Cast</h2>
          <span className="movieCast__heading--link">
            <Link target="_blank" href={`${IMDB_URL}/${imdb_id}/fullcredits`}>
              All Cast & Crew <MdOutlineArrowForwardIos />
            </Link>
          </span>
        </div>

        <div className="movieCast__content">
          <Swiper
            modules={[Navigation, Pagination, Controller]}
            onSwiper={setCastSwiper}
            controller={{ control: castSwiper }}
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
            {castList.map((cast: CastMember) => (
              <SwiperSlide key={cast.id} className="movieCast__member">
                <div className="movieCast__image">
                  <Image src={`${IMAGE_URL}/${cast.profile_path}`} alt={cast.name} width={200} height={300} />
                </div>
                <div className="movieCast__details">
                  <p className="movieCast__name">{cast.name}</p>
                  <p className="movieCast__character">{cast.character}</p>
                </div>
              </SwiperSlide>
            ))}
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

export default MovieCast;
