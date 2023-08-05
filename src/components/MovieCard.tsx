import useGenres from '@/hooks/useGenres';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

interface Genre {
  id: number;
  name: string;
}
interface MovieCardProps {
  id: string;
  image: string;
  poster_path?: string;
  title: string;
  overview?: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  onClick?: () => void;
  video?: boolean;
  genres?: Genre[];
  slidecard?: boolean;
}

const MovieCard = ({ id, image, title, genre_ids, release_date, vote_average, slidecard, onClick }: MovieCardProps) => {
  const { data: genres = [] } = useGenres();

  const genreNames = genre_ids
    .map((id) => {
      const genre = genres.genres?.find((genre: { id: number }) => genre.id === id);
      return genre ? genre.name : '';
    })
    .slice(0, 2);

  const releaseYear = new Date(release_date).getFullYear();

  const formatMovieTitle = (title: string) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/[:\s,]+/g, '-');
  };

  return (
    <div className={slidecard ? 'slidecard' : 'moviecard'} onClick={onClick}>
      <div className={slidecard ? 'slidecard__wrapper' : 'moviecard__wrapper'}>
        <Link href={`/details/${id}/${formatMovieTitle(title)}`}>
          <div className={slidecard ? 'slidecard__image' : 'moviecard__image'}>
            <Image src={image} alt={title} fill priority={slidecard} />
          </div>{' '}
        </Link>
        <div className={slidecard ? 'slidecard__details' : 'moviecard__details'}>
          <Link href={`/details/${id}/${formatMovieTitle(title)}`}>
            <h2 className={`${slidecard ? 'slidecard__title' : 'moviecard__title'} ${!slidecard && title.length > 21 ? 'moviecard__longtitle' : ''}`}>{title}</h2>
          </Link>
          <div className={slidecard ? 'slidecard__genre' : 'moviecard__genre'}>{genre_ids.length > 0 ? genreNames.join(', ') : 'NA'}</div>
          <div className="moviecard__info">
            <div className={slidecard ? 'slidecard__date' : 'moviecard__date'}>{releaseYear ? releaseYear : 'NA'}</div>
            <div className={slidecard ? 'slidecard__rating' : 'moviecard__rating'}>
              <FaThumbsUp size={13} />
              <span>{vote_average}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
