import React from 'react';
import ThemeToggle from './themes';
export default function Navbar() {
    return (<div className="navbar bg-base-100">
      <div className="flex-1">
        <ThemeToggle />
        <a href="/" className="text-xl">
          SDN-Workspaces
        </a>
      </div>
    </div>);
}
