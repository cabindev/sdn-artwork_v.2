import React from 'react'
import ThemeToggle from './themes'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass glass-highlight">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="/" className="text-lg font-semibold tracking-tight">
          SDN-Workspaces
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
