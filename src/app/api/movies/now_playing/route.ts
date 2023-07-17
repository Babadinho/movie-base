import { NextRequest, NextResponse } from 'next/server';

import fetcher from '@/libs/fetcher';

const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

export async function GET(req: NextRequest) {
  const REQUEST_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
  try {
    const movies = await fetcher(REQUEST_URL);
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(error);
  }
}
