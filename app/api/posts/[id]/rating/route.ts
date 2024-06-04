// api/posts/[id]/rating/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
    });

    if (post) {
      const updatedPost = await prisma.post.update({
        where: { id: Number(params.id) },
        data: {
          ratings: post.ratings + 1,
        },
      });

      return NextResponse.json(updatedPost);
    } else {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
