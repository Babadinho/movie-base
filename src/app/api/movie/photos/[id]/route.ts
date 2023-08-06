import { NextRequest, NextResponse } from 'next/server';

import fetcher from '@/libs/fetcher';

const API_KEY = process.env.APP_API_KEY;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const REQUEST_URL = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`;
    const photos = await fetcher(REQUEST_URL);
    if (photos) {
      return NextResponse.json(photos);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
