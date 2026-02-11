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
      <h1 className="text-2xl font-bold mb-6">
        Top Rated Artwork
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="relative overflow-hidden rounded-xl bg-base-200 p-4 border border-base-300 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-sm font-medium truncate">{post.title}</span>
            </div>
            <div className="text-3xl font-bold">
              {post.ratings}
            </div>
            <div className="text-xs opacity-60 mt-1">Ratings</div>
          </div>
        ))}
      </div>
    </div>
  );
};
