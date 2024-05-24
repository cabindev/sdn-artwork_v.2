'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
              src={post.imageUrl}
              width={500}
              height={500}
              alt={post.title}
              className="object-cover w-full h-full rounded-md"
            />
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
  );
};

export default Product;
