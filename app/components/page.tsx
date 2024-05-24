//components/page.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';

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

  if (loading) {
    return <div>Loading...</div>;
  }
  const firstPost = posts[0] || null;

  return (
    <div>
      {firstPost && (
        <Head>
          <title>{firstPost.title}</title>
          <meta name="description" content={firstPost.title} />
          <meta property="og:title" content={firstPost.title} />
          <meta property="og:description" content={firstPost.title} />
          <meta property="og:image" content={`${siteUrl}${firstPost.imageUrl}`} />
          <meta property="og:url" content={`${siteUrl}/posts/${firstPost.id}`} />
          <meta property="og:type" content="article" />
        </Head>
      )}
        
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
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category.name
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="masonry-grid">
        {posts.map((post) => (
          <div key={post.id} className="masonry-item relative">
            <Image
              src={`${siteUrl}${post.imageUrl}`}
              width={500}
              height={500}
              alt={post.title}
              className="object-cover w-full h-full rounded-md"
            />
            <button
              onClick={() => handleShare(post)}
              className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-2"
            >
              Share
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
