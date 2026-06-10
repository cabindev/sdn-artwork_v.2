import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json(await prisma.post.findUnique({
    where: { id: Number(params.id) },
  }));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const categoryId = formData.get('categoryId') as string | null;
  const image = formData.get('image') as File | null;
  // zipUrl คือลิงก์ดาวน์โหลดภายนอก (เช่น NAS) แทนการอัปโหลดไฟล์เข้าระบบ
  const zipInput = formData.get('zipUrl') as string | null;

  let imageUrl: string | undefined;
  const zipUrl: string | undefined =
    zipInput !== null ? zipInput.trim() : undefined;

  if (image) {
    const byteLength = await image.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const timestamp = new Date().getTime();
    const fileExtension = path.extname(image.name);
    const fileName = `${timestamp}${fileExtension}`;
    const pathOfImage = `./public/images/${fileName}`;
    imageUrl = `/images/${fileName}`;

    await writeFile(pathOfImage, bufferData);
  }

  try {
    const post = await prisma.post.update({
      where: { id: Number(params.id) },
      data: {
        title,
        content,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        ...(imageUrl && { imageUrl }),
        ...(zipUrl !== undefined && { zipUrl }),
      },
    });

    // Revalidate the path to ensure the updated post data is immediately visible
    revalidatePath('/');

    return NextResponse.json(post);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: Number(params.id) },
    });

    // Revalidate the path to ensure the post is removed from the UI
    revalidatePath('/');

    return NextResponse.json(deletedPost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
