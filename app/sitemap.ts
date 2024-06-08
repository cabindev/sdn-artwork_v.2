import { PrismaClient } from "@prisma/client";
import { MetadataRoute } from "next";

const prisma = new PrismaClient();

interface Post {
  id: number;
  slug: string;
  publishedAt: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
     

      },
    });
    return posts as Post[];
  }

  const posts: Post[] = await getPosts();

  const postUrls = posts.map((post) => ({
    url: `https://sdn-workspaces.sdnthailand.com/posts/${post.id}`,
    lastModified: post.publishedAt,
  }));

  return [
    {
      url: `https://sdn-workspaces.sdnthailand.com/`,
      lastModified: new Date(),
    },
    {
      url: "https://sdn-workspaces.sdnthailand.com/tag",
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
