//app/api/uploads/route.ts
import { type NextRequest } from 'next/server';
import { readdir, unlink, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const imageFiles = await readdir("./public/images");
  const zipFiles = await readdir("./public/zip");
  return NextResponse.json({ msg: "Files retrieved successfully", files: imageFiles, zips: zipFiles });
};

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const image = formData.get("image") as File | null;
  const zip = formData.get("zip") as File | null;

  if (image) {
    const byteLength = await image.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const timestamp = new Date().getTime();
    const fileExtension = path.extname(image.name);
    const fileName = `${timestamp}${fileExtension}`;
    const pathOfImage = `./public/images/${fileName}`;
    const imageUrl = `/images/${fileName}`; // URL สำหรับการเข้าถึงไฟล์

    await writeFile(pathOfImage, bufferData);

    // บันทึก URL ของไฟล์ลงในฐานข้อมูล
    await prisma.post.create({
      data: {
        title: 'title',
        content: 'content',
        categoryId: 1,
        imageUrl: imageUrl,
      },
    });
  }

  if (zip) {
    const byteLength = await zip.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const timestamp = new Date().getTime();
    const fileExtension = path.extname(zip.name);
    const fileName = `${timestamp}${fileExtension}`;
    const pathOfZip = `./public/zip/${fileName}`;
    const zipUrl = `/zip/${fileName}`; // URL สำหรับการเข้าถึงไฟล์

    await writeFile(pathOfZip, bufferData);

    // บันทึก URL ของไฟล์ลงในฐานข้อมูล
    await prisma.post.create({
      data: {
        title: 'title',
        content: 'content',
        categoryId: 1,
        zipUrl: zipUrl,
      },
    });
  }

  return NextResponse.json({ msg: "Files uploaded successfully" });
};