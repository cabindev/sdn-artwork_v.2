'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from 'react-share';

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  categoryId: number;
  category?: Category;
}

const PostDetail = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = params;
  const siteUrl = 'https://app-info.healthypublicspaces.com';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(`/api/posts/${id}`);
        setPost(postResponse.data);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchPost();
    fetchCategories();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const postCategory = categories.find(category => category.id === post.categoryId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">{post.title}</h1>
      <div className="mb-4">
        {post.imageUrl && (
          <img src={`https://app-info.healthypublicspaces.com/${post.imageUrl}`} alt="Post Image" className="w-full h-auto rounded-md" />
        )}
      </div>
      <div className="mb-4">
        <span className="block text-sm font-medium text-gray-700">Category:</span>
        <span className="block text-lg">{postCategory?.name || 'No Category'}</span>
      </div>
      <div className="flex space-x-2 mt-4">
        <FacebookShareButton url={`${siteUrl}/posts/${post.id}`} title={post.title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={`${siteUrl}/posts/${post.id}`} title={post.title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default PostDetail;
