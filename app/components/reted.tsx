// app/stats/page.tsx

'use client';
import React from 'react';

interface Post {
  id: number;
  title: string;
  ratings: number;
  downloads: number;
}

interface Props {
  posts: Post[];
}
export default function Rated({ posts } : Props){

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 hidden md:block">
      <h1 className="text-2xl font-semibold mb-6">Top Rated Artwork</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        {posts.map((post) => (
          <div key={post.id} className="stat">
            <div className="stat-title">{post.title}</div>
            <div className="stat-value">{post.ratings}</div>
            <div className="stat-desc">Ratings</div>
          </div>
        ))}
      </div>
    </div>
  );
};

