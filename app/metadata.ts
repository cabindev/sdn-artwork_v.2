// app/posts/[id]/metadata.ts
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const post = await fetch(`https://app-info.healthypublicspaces.com/api/posts/${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const imageUrl = `https://app-info.healthypublicspaces.com${post.imageUrl}`;

  return {
    title: post.title,
    description: `Check out this post about ${post.title}`,
    openGraph: {
      title: post.title,
      description: `Check out this post about ${post.title}`,
      images: [imageUrl, ...previousImages],
      url: `https://app-info.healthypublicspaces.com/posts/${post.id}`,
      type: 'article',
    }
  }
}
