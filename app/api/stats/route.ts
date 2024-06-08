import { NextResponse ,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  try {
    const topRatedPosts = await prisma.post.findMany({
      orderBy: {
        ratings: 'desc',
      },
      take: 5,
      select: {
        id: true,
        title: true,
        ratings: true,
        downloads: true,    
      },
    });
    revalidatePath('/');
    return NextResponse.json(topRatedPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch top rated posts' }, { status: 500 });
  }
};
