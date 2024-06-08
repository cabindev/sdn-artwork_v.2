// modal/page.tsx
'use client';
import { FaRegCopy, FaFacebook, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import Image from 'next/image';
import Head from 'next/head';
import { Toaster, toast } from 'react-hot-toast';
import Stats from '../stats/page';
import Stats1 from '../components/stats';

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
        toast.success('Thank you for your rating!');
      }
    } catch (error) {
      console.error('Failed to update rating:', error);
      toast.error('Failed to update rating');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster />
      <Stats />
      <Stats1/>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="stats stats-vertical lg:stats-horizontal shadow"></div>
      </div>
      <div className="flex space-x-4 overflow-x-auto mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-2 py-1 rounded-md text-xs md:text-sm ${
              selectedCategory === category.name
                ? "bg-black text-white"
                : "bg-gray-200"
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
            className="masonry-item relative transition-shadow duration-300 ease-in-out hover:shadow-2xl"
            onClick={() => openModal(post)}
          >
            {/* <Image
                src={`${siteUrl}${post.imageUrl}`}
                width={500}
                height={500}
                alt={post.title}
                className="object-cover w-full h-full rounded-md"
              /> */}
            <img
              src={`https://sdn-workspaces.sdnthailand.com/${post.imageUrl}`}
              alt={post.title}
              className="object-cover w-full h-full rounded-md bg-base-100 shadow-xl"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 mx-2 rounded-md text-xs md:text-sm bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md text-xs md:text-sm bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <button
              onClick={prevPost}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50"
              style={{ padding: "1rem" }}
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
                style={{ padding: "1rem" }}
              >
                &times;
              </button>
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-2xl font-semibold text-center w-full">
                  {selectedPost.title}
                </h2>
              </div>
              <div className="aspect-w-1 aspect-h-1 mb-4 flex items-center justify-center w-full">
                {/* <Image
                src={`${siteUrl}${selectedPost.imageUrl}`}
                width={500}
                height={500}
                alt={selectedPost.title}
                className="object-cover w-full h-full rounded-md"
              /> */}
                <img
                  src={`https://sdn-workspaces.sdnthailand.com/${selectedPost.imageUrl}`}
                  alt={selectedPost.title}
                  className="object-contain w-full h-full max-h-96"
                />
              </div>
              <div className="text-left w-full flex flex-col items-start">
                <span className="text-gray-600 mb-2">
                  Views: {selectedPost.views}
                </span>
                <span className="text-gray-600">
                  Ratings: {selectedPost.ratings}
                </span>
                <span className="text-gray-600">
                  Downloads: {selectedPost.downloads}
                </span>
              </div>

              <div className="flex flex-wrap justify-center items-center mt-4 space-x-2">
                <FacebookShareButton
                  url={`${siteUrl}/posts/${selectedPost.id}`}
                  title={selectedPost.title}
                  className="w-auto"
                >
                  <FaFacebook size={24} color="black" />
                </FacebookShareButton>

                <button
                  onClick={handleCopy}
                  className="px-2 py-1 text-sm text-white bg-black rounded-md"
                >
                  Copy Link
                </button>

                <a
                  href="#"
                  onClick={() =>
                    handleDownload(selectedPost.zipUrl, selectedPost.id)
                  }
                  className="px-2 py-1 text-sm bg-black text-white rounded-md"
                >
                  Download free
                </a>

                <button
                  onClick={handleRatingChange}
                  className="px-2 py-1 text-sm bg-black text-white rounded-md flex items-center justify-center"
                >
                  <FaHeart size={20} />
                </button>
              </div>

              {copySuccess && (
                <div className="mt-2 text-green-600">{copySuccess}</div>
              )}
            </div>
            <button
              onClick={nextPost}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50"
              style={{ padding: "1rem" }}
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
