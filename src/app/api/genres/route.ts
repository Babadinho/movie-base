import { NextRequest, NextResponse } from 'next/server';

import fetcher from '@/libs/fetcher';

const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

export async function GET(req: NextRequest) {
  const REQUEST_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`;
  try {
    const genres = await fetcher(REQUEST_URL);
    return NextResponse.json(genres);
  } catch (error) {
    return NextResponse.json(error);
  }
}
