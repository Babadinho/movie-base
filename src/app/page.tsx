import Movies from '@/components/home/Movies';
import SlideShow from '@/components/home/SlideShow';
import React from 'react';

const Home = async () => {
  return (
    <div className="main">
      <SlideShow />
      <Movies />
    </div>
  );
};

export default Home;
