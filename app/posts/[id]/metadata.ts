import { Metadata } from 'next';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  category: Category;
  description: string;
}

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata | undefined> {
  try {
    const res = await axios.get<Post>(`https://sdn-workspaces.sdnthailand.com/api/posts/${params.id}`);
    const post = res.data;

    if (!post) {
      return;
    }

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        locale: "en_US",
        url: `https://sdn-workspaces.sdnthailand.com/posts/${params.id}`,
        siteName: "sdn-workspace",
        images: [
          {
            url: `https://sdn-workspaces.sdnthailand.com${post.imageUrl}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata', error);
    return;
  }
}
