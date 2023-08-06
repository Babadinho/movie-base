import { NextResponse } from 'next/server';

import fetcher from '@/libs/fetcher';

const API_KEY = process.env.APP_API_KEY;

export async function GET() {
  const REQUEST_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`;
  try {
    const genres = await fetcher(REQUEST_URL);
    return NextResponse.json(genres);
  } catch (error) {
    return NextResponse.json(error);
  }
}
