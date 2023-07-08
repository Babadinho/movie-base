import React from 'react';
import SlideCard from '@/components/SlideCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const SlideShow = () => {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        centeredSlides
        centeredSlidesBounds={true}
        navigation
        slideActiveClass="slidecard__active"
        pagination={{ clickable: true }}
        effect="coverflow"
        coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
      >
        <SwiperSlide>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide>
          <SlideCard />
        </SwiperSlide>
        <SwiperSlide>
          <SlideCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SlideShow;
