import useGenres from '@/hooks/useGenres';
import Image from 'next/image';
import React from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

interface Genre {
  id: number;
  name: string;
}
interface SlideCardProps {
  backdrop_path: string;
  title: string;
  overview?: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  onClick?: () => void;
  video?: boolean;
  genres?: Genre[];
}

const SlideCard = ({ backdrop_path, title, overview, genre_ids, release_date, vote_average, video, onClick }: SlideCardProps) => {
  const { data: genres = [] } = useGenres();

  const genreNames = genre_ids.map((id) => {
    const genre = genres.genres?.find((genre: { id: number }) => genre.id === id);
    return genre ? genre.name : '';
  });

  const releaseYear = new Date(release_date).getFullYear();
  return (
    <div className="slidecard" onClick={onClick}>
      <div className="slidecard__wrapper">
        <div className="slidecard__image">
          <Image src={backdrop_path} alt={title} fill />
        </div>
        <div className="slidecard__details">
          <div className="slidecard__rating">
            <FaThumbsUp size={13} />
            <span>{vote_average}</span>
          </div>
          <h2 className="slidecard__title">{title}</h2>
          {/* <div className="slidecard__overview">{overview}</div> */}
          <div className="slidecard__info">
            <div className="slidecard__genre">{genreNames.join(', ')}</div>
            {/* <div className="slidecard__date">{releaseYear}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
