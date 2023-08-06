import { NextRequest, NextResponse } from 'next/server';

import fetcher from '@/libs/fetcher';

const API_KEY = process.env.APP_API_KEY;

export async function GET(req: NextRequest, { params }: { params: { query: string; page: string } }) {
  try {
    const { query, page } = params;
    const year = req.nextUrl.searchParams.get('year');

    const REQUEST_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&primary_release_year=${year}&api_key=${API_KEY}&language=en-US&page=${page}`;
    const movies = await fetcher(REQUEST_URL);
    if (movies) {
      return NextResponse.json(movies);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
