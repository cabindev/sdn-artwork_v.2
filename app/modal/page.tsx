'use client'
import { useEffect, useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from 'react-share';
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

const PopupModal = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const siteUrl = 'https://app-info.healthypublicspaces.com';

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [selectedCategory, search, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
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
      const response = await fetch(`/api/posts?${query}`);
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  const openModal = async (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
    await fetch('/api/posts', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: post.id, type: 'view' }),
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const nextPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPost) {
      const currentIndex = posts.findIndex(post => post.id === selectedPost.id);
      const nextIndex = (currentIndex + 1) % posts.length;
      setSelectedPost(posts[nextIndex]);
    }
  };

  const prevPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPost) {
      const currentIndex = posts.findIndex(post => post.id === selectedPost.id);
      const prevIndex = (currentIndex - 1 + posts.length) % posts.length;
      setSelectedPost(posts[prevIndex]);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDownload = async (zipUrl: string, postId: number) => {
    await fetch('/api/posts', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: postId, type: 'download' }),
    });
    window.location.href = zipUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {selectedPost && (
        <Head>
          <meta property="og:title" content={selectedPost.title} />
          <meta property="og:description" content={selectedPost.title} />
          <meta property="og:url" content={`${siteUrl}/post/${selectedPost.id}`} />
          <meta property="og:image" content={selectedPost.imageUrl} />
          <meta name="twitter:title" content={selectedPost.title} />
          <meta name="twitter:description" content={selectedPost.title} />
          <meta name="twitter:image" content={selectedPost.imageUrl} />
        </Head>
      )}
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
          <div
            key={post.id}
            className="masonry-item relative"
            onClick={() => openModal(post)}
          >
            <img
              src={post.imageUrl}
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

      {modalIsOpen && selectedPost && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <button
            onClick={prevPost}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50"
            style={{ padding: '1rem' }}
          >
            &#8249;
          </button>
          <div
            className="relative bg-white/90 p-4 rounded-lg w-full max-w-5xl mx-auto flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 text-4xl"
              style={{ padding: '1rem' }}
            >
              &times;
            </button>
            <div className="flex justify-between items-center mb-4 w-full">
              <h2 className="text-2xl font-semibold text-center w-full">
                {selectedPost.title}
              </h2>
            </div>
            <div className="aspect-w-1 aspect-h-1 mb-4 flex items-center justify-center w-full">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="object-contain w-full h-full max-h-96"
              />
            </div>
            <div className="text-right w-full flex justify-between items-center">
              <span className="text-gray-700">Views: {selectedPost.views}</span>
              <span className="text-gray-700">
                Downloads: {selectedPost.downloads}
              </span>
              <a
                href="#"
                onClick={() => handleDownload(selectedPost.zipUrl, selectedPost.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Download free
              </a>
            </div>
            <div className="flex space-x-2 mt-4">
              <FacebookShareButton url={`${siteUrl}/post/${selectedPost.id}`} title={selectedPost.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={`${siteUrl}/post/${selectedPost.id}`} title={selectedPost.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </div>
          <button
            onClick={nextPost}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50"
            style={{ padding: '1rem' }}
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}

export default PopupModal;
