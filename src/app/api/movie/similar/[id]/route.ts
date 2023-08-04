import { NextRequest, NextResponse } from 'next/server';

import fetcher from '@/libs/fetcher';

const API_KEY = process.env.APP_API_KEY;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const REQUEST_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`;
    const similarMovies = await fetcher(REQUEST_URL);
    if (similarMovies) {
      return NextResponse.json(similarMovies);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
