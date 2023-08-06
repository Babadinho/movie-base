'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="movieDetails__backArrow">
      <button onClick={() => router.back()} data-testid="back-button">
        <FaArrowLeftLong size={25} />
      </button>
    </div>
  );
};

export default BackButton;
