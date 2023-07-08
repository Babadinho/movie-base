import Image from 'next/image';
import React from 'react';

interface SlideCardProps {
  onClick?: () => void;
  hasVideo?: boolean;
}

const SlideCard = ({ onClick, hasVideo }: SlideCardProps) => {
  return (
    <div className="slidecard">
      <div className="slidecard__wrapper">
        {/* <Image src="#" alt="#" width={100} height={100} /> */}
        <div className="slidecard__details">
          <div className="slidecard__title">Jaws</div>
          <div className="slidecard__overview">Jaws movie</div>
          <div className="slidercard__info">
            <div className="slidecard__genre">Thriller</div>
            <div className="slidecard__date">11/5/1991</div>
            <div className="slidecard__popularity">9.5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
