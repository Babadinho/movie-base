import React, { useCallback, useState } from 'react';
import useMoviePhotos from '@/hooks/useMoviePhotos';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

interface MoviePhotosProps {
  id: number;
  imdb_id: number;
}

interface Photo {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

const MoviePhotos = ({ id, imdb_id }: MoviePhotosProps) => {
  const { isLoading, data: moviePhotos = {} } = useMoviePhotos(id.toString());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

  let photos = moviePhotos.backdrops?.slice(0, 8);
  let lightBoxPhotos = moviePhotos.backdrops;

  if (!photos || photos.length === 0) {
    photos = moviePhotos.posters?.slice(0, 4);
  }

  if (!lightBoxPhotos || lightBoxPhotos.length === 0) {
    lightBoxPhotos = moviePhotos.posters;
  }

  const handleLightBoxOpen = useCallback(() => {
    return lightboxOpen;
  }, [lightboxOpen]);

  const handleLightBoxClose = useCallback(() => {
    setLightboxOpen(false);
  }, [setLightboxOpen]);

  if (isLoading) {
    return;
  }

  return (
    <section className="moviePhotos">
      <div className="moviePhotos__wrapper">
        <div className="moviePhotos__header">
          <h2 className="moviePhotos__heading">Photos</h2>
          <div className="moviePhotos__heading--lightbox">
            <span onClick={() => setLightboxOpen(true)}>
              View All Photos <MdOutlineArrowForwardIos />
            </span>
          </div>
        </div>
        <div className="moviePhotos__content">
          {photos.map((photo: Photo, index: any) => (
            <div className="moviePhotos__photo" key={index}>
              <Image
                src={`${IMAGE_URL}${photo.file_path}`}
                alt={''}
                width={300}
                height={Math.round(330 / photo.aspect_ratio)}
                onClick={() => {
                  setActiveImageIndex(photos.findIndex((p: Photo) => p === photo));
                  setLightboxOpen(true);
                }}
              />
            </div>
          ))}
        </div>
        <Lightbox
          open={handleLightBoxOpen()}
          index={activeImageIndex}
          close={handleLightBoxClose}
          slides={lightBoxPhotos?.map((photo: Photo) => ({
            src: `${IMAGE_URL}${photo.file_path}`
          }))}
          plugins={[Zoom, Counter]}
          counter={{ container: { style: { top: 0, bottom: 'unset' } } }}
        />
      </div>
    </section>
  );
};

export default MoviePhotos;
