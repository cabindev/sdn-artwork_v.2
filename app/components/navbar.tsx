import React from 'react'
import ThemeToggle from './themes'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">
          SDN-Workspaces
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
