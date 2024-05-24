'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { FacebookShareButton, FacebookIcon } from 'react-share';

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

interface Metadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: [{
      url: string;
      alt: string;
      width: number;
      height: number;
    }];
    url: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    creator: string;
    images: {
      url: string;
      alt: string;
    };
  };
}

const PostDetail = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;
  const siteUrl = 'https://app-info.healthypublicspaces.com';

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const res = await axios.get(`${siteUrl}/api/posts/${id}`);
          setPost(res.data);
        } catch (error) {
          setError('Failed to fetch post');
          console.error('Failed to fetch post', error);
        }
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;

  const metadata: Metadata = {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{
        url: `${siteUrl}${post.imageUrl}`,
        alt: `Image of ${post.title}`,
        width: 1200,
        height: 630
      }],
      url: `${siteUrl}/posts/${post.id}`,
      type: "article",
      siteName: "Create Next App",
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yellowdev',
      title: post.title,
      description: post.description,
      creator: '@yellowdev',
      images: {
        url: `${siteUrl}${post.imageUrl}`,
        alt: `Image of ${post.title}`,
      },
    },
  };

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images.url} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1>{post.title}</h1>
        <Image
          src={`${siteUrl}${post.imageUrl}`}
          alt={post.title}
          width={800}
          height={450}
          className="rounded"
        />
        <p>{post.description}</p>
        <FacebookShareButton
          url={`${siteUrl}/posts/${post.id}`}
          title={post.title}
          hashtag="#example"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default PostDetail;
