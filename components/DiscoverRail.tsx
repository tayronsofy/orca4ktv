'use client'


import React from 'react';
import { MediaItem } from '../types';

interface DiscoverRailProps {
  title: string;
  items: MediaItem[];
}

const DiscoverRail: React.FC<DiscoverRailProps> = ({ title, items }) => {
  return (
    <div className="mb-12 last:mb-0 px-6 md:px-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-100 flex items-center justify-between">
        {title}
        <button className="text-xs font-bold text-[#e5a00d] hover:underline uppercase tracking-widest">See All</button>
      </h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex-shrink-0 w-44 md:w-56 snap-start group cursor-pointer"
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-[#002952] border border-transparent group-hover:border-[#e5a00d] transition-all duration-300">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                 <button className="bg-white text-black rounded-full p-3 w-10 h-10 flex items-center justify-center mx-auto mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                   <i className="fas fa-play ml-1"></i>
                 </button>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-300 truncate group-hover:text-white">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverRail;
