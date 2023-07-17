import { NextRequest, NextResponse } from 'next/server';

import fetcher from '@/libs/fetcher';

const API_KEY = process.env.APP_API_KEY;

export async function GET(req: NextRequest, { params }: { params: { page: string; type: string } }) {
  try {
    const { type, page } = params;

    const REQUEST_URL = `https://api.themoviedb.org/3/movie/${type}/?api_key=${API_KEY}&language=en-US&page=${page}`;
    const movies = await fetcher(REQUEST_URL);
    if (movies) {
      return NextResponse.json(movies);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
