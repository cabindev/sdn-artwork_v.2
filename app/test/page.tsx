'use client'
import { useEffect, useState } from 'react';
interface Post {
    id: number;
    title: string;
    imageUrl:string;
    content: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    ratings: string;
  }
  
  interface ApiResponse {
    posts: Post[];
    totalPages: number;
  }
  
const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiResponse = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <h2>{post.ratings}</h2>
            <img src={`${post.imageUrl}`} alt='image'></img>
            <p>{post.content}</p>
            <small>Category ID: {post.categoryId}</small>
            <br />
            <small>Created at: {new Date(post.createdAt).toLocaleString()}</small>
            <br />
            <small>Updated at: {new Date(post.updatedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
