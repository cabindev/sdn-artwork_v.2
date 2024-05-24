import { type NextRequest } from 'next/server';
import { readdir, unlink, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'desc';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  const whereCondition = category
    ? {
        category: {
          is: {
            name: category,
          },
        },
        title: {
          contains: search,
        },
      }
    : {
        title: {
          contains: search,
        },
      };

  try {
    const [posts, totalPosts] = await prisma.$transaction([
      prisma.post.findMany({
        where: whereCondition,
        include: {
          category: true, // Include category data in the response
        },
        orderBy: {
          createdAt: sort as 'asc' | 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.post.count({
        where: whereCondition,
      }),
    ]);
    const totalPages = Math.ceil(totalPosts / limit);
    return NextResponse.json({ posts, totalPages });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const categoryId = formData.get('categoryId') as string | null;
  const image = formData.get('image') as File | null;
  const zip = formData.get('zip') as File | null;

  let imageUrl: string | null = null;
  let zipUrl: string | null = null;

  if (image) {
    const byteLength = await image.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const timestamp = new Date().getTime();
    const fileExtension = path.extname(image.name);
    const fileName = `${timestamp}${fileExtension}`;
    const pathOfImage = `./public/images/${fileName}`;
    imageUrl = `/images/${fileName}`; // URL สำหรับการเข้าถึงไฟล์

    await writeFile(pathOfImage, bufferData);
  }

  if (zip) {
    const byteLength = await zip.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const timestamp = new Date().getTime();
    const fileExtension = path.extname(zip.name);
    const fileName = `${timestamp}${fileExtension}`;
    const pathOfZip = `./public/zip/${fileName}`;
    zipUrl = `/zip/${fileName}`; // URL สำหรับการเข้าถึงไฟล์

    await writeFile(pathOfZip, bufferData);
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        imageUrl,
        zipUrl,
      },
    });


    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (request: NextRequest) => {
  const { id, type } = await request.json();

  try {
    if (type === 'view') {
      await prisma.post.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    } else if (type === 'download') {
      await prisma.post.update({
        where: { id },
        data: { downloads: { increment: 1 } },
      });
    }



    return NextResponse.json({ msg: 'Update successful' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};