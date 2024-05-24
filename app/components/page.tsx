'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import { FacebookShareButton, FacebookIcon } from 'react-share';

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  zipUrl: string;
  category: Category;
  views: number;
  downloads: number;
}

const Product = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const siteUrl = 'https://app-info.healthypublicspaces.com';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCategories();
      await fetchPosts();
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory, search, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const query = new URLSearchParams({
        category: selectedCategory,
        search,
        page: currentPage.toString(),
        limit: '10',
      }).toString();
      const res = await axios.get(`/api/posts?${query}`);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleShare = (post: Post) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}/posts/${post.id}`;
    window.open(shareUrl, '_blank');
  };

  const handleDownload = (zipUrl: string, postId: number) => {
    window.open(zipUrl, '_blank');
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    if (selectedPost) {
      document.title = selectedPost.title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', selectedPost.title);
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute('content', selectedPost.title);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute('content', selectedPost.title);
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute('content', `${siteUrl}${selectedPost.imageUrl}`);
      document
        .querySelector('meta[property="og:url"]')
        ?.setAttribute('content', `${siteUrl}/posts/${selectedPost.id}`);
    }
  }, [selectedPost]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <meta name="description" content={posts[0]?.title} />
        <meta property="og:title" content={posts[0]?.title} />
        <meta property="og:description" content={posts[0]?.title} />
        <meta property="og:image" content={`${siteUrl}${posts[0]?.imageUrl}`} />
        <meta property="og:url" content={`${siteUrl}/posts/${posts[0]?.id}`} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex space-x-4 overflow-x-auto mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-2 py-1 text-sm rounded-md ${
                selectedCategory === category.name
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="masonry-grid">
          {posts.map((post) => (
            <div key={post.id} className="masonry-item relative" onClick={() => handlePostClick(post)}>
              <Image
                src={`${siteUrl}${post.imageUrl}`}
                width={500}
                height={500}
                alt={post.title}
                className="object-cover w-full h-full rounded-md"
              />
              <FacebookShareButton
                url={`${siteUrl}/posts/${post.id}`}
                title={post.title}
                hashtag="#สุขภาพดี"
                className="absolute top-2 right-2"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <button
                onClick={() => handleDownload(post.zipUrl, post.id)}
                className="absolute bottom-2 right-2 bg-green-500 text-white rounded-md px-2 py-1 text-sm"
              >
                ดาวน์โหลดฟรี
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
