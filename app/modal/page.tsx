// app/modal/page.tsx
'use client';
import { FaRegCopy, FaFacebook, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import Image from 'next/image';
import Head from 'next/head';
import { Toaster, toast } from 'react-hot-toast';
import Rated from '../components/reted';




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
  ratings: number;
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
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [changing, setChanging] = useState<boolean>(false);

  const siteUrl = 'https://sdn-workspaces.sdnthailand.com';

  useEffect(() => {
    fetchCategories();
    fetchPosts();
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
        limit: '20',
      }).toString();
      const res = await axios.get(`/api/posts?${query}`);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  const openModal = async (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
    await axios.patch('/api/posts', { id: post.id, type: 'view' });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const nextPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPost) {
      const currentIndex = posts.findIndex((post) => post.id === selectedPost.id);
      const nextIndex = (currentIndex + 1) % posts.length;
      setSelectedPost(posts[nextIndex]);
    }
  };

  const prevPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPost) {
      const currentIndex = posts.findIndex((post) => post.id === selectedPost.id);
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
    await axios.patch('/api/posts', { id: postId, type: 'download' });
    window.location.href = zipUrl;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${siteUrl}/posts/${selectedPost?.id}`);
      setCopySuccess('Link copied!');
      toast.success('Link copied to clipboard!');
      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
    } catch (err) {
      setCopySuccess('Failed to copy link');
      toast.error('Failed to copy link');
      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
    }
  };

  const handleRatingChange = async () => {
    setChanging(true);
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: 1 }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setSelectedPost(updatedPost);

        // Update the rating in the Rated component
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? { ...post, ratings: updatedPost.ratings } : post
          )
        );

        toast.success('Thank you for your rating!');
      }
    } catch (error) {
      console.error('Failed to update rating:', error);
      toast.error('Failed to update rating');
    } finally {
      setChanging(false);
    }
  };

  const topRatedPosts: Post[] = [...posts].sort((a, b) => b.ratings - a.ratings).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster />
      <Rated posts={topRatedPosts} />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search artwork..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-base-300 bg-base-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === ''
              ? "bg-black text-white shadow-md"
              : "bg-base-200 hover:bg-base-300"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.name
                ? "bg-black text-white shadow-md"
                : "bg-base-200 hover:bg-base-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {posts.map((post) => (
          <div
            key={post.id}
            className="masonry-item group relative cursor-pointer overflow-hidden rounded-xl"
            onClick={() => openModal(post)}
          >
            <img
              src={`https://sdn-workspaces.sdnthailand.com/${post.imageUrl}`}
              alt={post.title}
              className="object-cover w-full h-full rounded-xl bg-base-100 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end p-4">
              <div>
                <p className="text-white font-semibold text-sm truncate">{post.title}</p>
                <p className="text-white/70 text-xs">{post.category?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-base-200 hover:bg-base-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (totalPages <= 5) return true;
            if (page === 1 || page === totalPages) return true;
            return Math.abs(page - currentPage) <= 1;
          })
          .reduce<(number | string)[]>((acc, page, idx, arr) => {
            if (idx > 0 && typeof arr[idx - 1] === 'number' && (page as number) - (arr[idx - 1] as number) > 1) {
              acc.push('...');
            }
            acc.push(page);
            return acc;
          }, [])
          .map((item, idx) =>
            typeof item === 'string' ? (
              <span key={`dots-${idx}`} className="px-2 py-2 text-sm opacity-50">...</span>
            ) : (
              <button
                key={item}
                onClick={() => handlePageChange(item as number)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item
                    ? "bg-black text-white shadow-md"
                    : "bg-base-200 hover:bg-base-300"
                }`}
              >
                {item}
              </button>
            )
          )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-base-200 hover:bg-base-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {modalIsOpen && selectedPost && (
        <>
          <Head>
            <title>{selectedPost.title}</title>
            <meta property="og:title" content={selectedPost.title} />
            <meta
              property="og:description"
              content="Description of your post"
            />
            <meta
              property="og:image"
              content={`https://sdn-workspaces.sdnthailand.com/${selectedPost.imageUrl}`}
            />
            <meta
              property="og:url"
              content={`${siteUrl}/posts/${selectedPost.id}`}
            />
            <meta property="og:type" content="article" />
          </Head>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* Prev Button */}
            <button
              onClick={prevPost}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white text-2xl flex items-center justify-center transition-colors z-50"
            >
              &#8249;
            </button>

            {/* Modal Content */}
            <div
              className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center text-lg z-10 transition-colors"
              >
                &times;
              </button>

              {/* Image */}
              <div className="flex items-center justify-center bg-base-200 rounded-t-2xl">
                <img
                  src={`https://sdn-workspaces.sdnthailand.com/${selectedPost.imageUrl}`}
                  alt={selectedPost.title}
                  className="object-contain w-full max-h-[50vh]"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3">
                  {selectedPost.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm opacity-60 mb-5">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    {selectedPost.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    {selectedPost.ratings}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    {selectedPost.downloads}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#"
                    onClick={() =>
                      handleDownload(selectedPost.zipUrl, selectedPost.id)
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    Download
                  </a>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
                  >
                    <FaRegCopy size={14} />
                    Copy Link
                  </button>

                  <FacebookShareButton
                    url={`${siteUrl}/posts/${selectedPost.id}`}
                    title={selectedPost.title}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-base-200 hover:bg-base-300 rounded-lg transition-colors">
                      <FaFacebook size={16} />
                      Share
                    </span>
                  </FacebookShareButton>

                  <button
                    onClick={changing ? () => {} : handleRatingChange}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      changing
                        ? 'bg-base-200 opacity-50 cursor-not-allowed'
                        : 'bg-base-200 hover:bg-red-100 hover:text-red-500'
                    }`}
                  >
                    <FaHeart size={14} />
                    Like
                  </button>
                </div>

                {copySuccess && (
                  <div className="mt-3 text-sm text-green-600">{copySuccess}</div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextPost}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white text-2xl flex items-center justify-center transition-colors z-50"
            >
              &#8250;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PopupModal;
