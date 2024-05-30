"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface Category {
  id: number
  name: string
}

interface Post {
  id: number
  title: string
  imageUrl: string
  zipUrl: string
  category: Category
  views: number
  downloads: number
}

export default function ListPost (){
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('desc')

  useEffect(() => {
    fetchCategories()
    fetchPosts()
  }, [category, search, sort])

  const fetchPosts = async () => {
    try {
      const query = new URLSearchParams({ category, search, sort }).toString();
      const res = await axios.get(`/api/posts?${query}`);
      const data = res.data;
  
      if (data && Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        console.error('Invalid posts data:', data);
        setPosts([]); // ตั้งค่า posts เป็น array ว่างในกรณีที่ข้อมูลไม่ถูกต้อง
      }
    } catch (error) {
      console.error('Failed to fetch posts', error);
      setPosts([]); // ตั้งค่า posts เป็น array ว่างในกรณีที่เกิดข้อผิดพลาด
    }
  };
  

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      const data = res.data;
  
      if (data && Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Invalid categories data:', data);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };
  

  const handleApplyFilters = () => {
    fetchPosts()
  }

  const deletePost = async (id: number) => {
    try {
      await axios.delete(`/api/posts/${id}`)
      fetchPosts()
    } catch (error) {
      console.error('Failed to delete the post', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Blog Posts</h1>
  
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-full sm:w-auto"
          >
            Apply
          </button>
        </div>
      </div>
  
      <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ZIP
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-normal">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  <div className="text-sm font-medium text-gray-900">
                    {post.category?.name || 'No Category'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  {post.imageUrl && (
                    <div className="avatar">
                      <div className="w-8 rounded">
                        <img
                          src={post.imageUrl}
                          alt={`image-${post.id}`}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  {post.zipUrl && (
                    <a
                      href={post.zipUrl}
                      download
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Download ZIP
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    href={`/posts/edit/${post.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <Link
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        href="/posts/create"
      >
        Create a New Post
      </Link>
    </div>
  );
}
