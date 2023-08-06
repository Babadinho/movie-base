import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Loading() {
  return (
    <span>
      <BeatLoader color="#E90A0A" className="swiper__isloading" />
    </span>
  );
}
