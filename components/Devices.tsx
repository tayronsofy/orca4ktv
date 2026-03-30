'use client'


import React from 'react';

const devices = [
  { name: 'Apple TV', icon: 'fab fa-apple' },
  { name: 'Fire TV', icon: 'fab fa-amazon' },
  { name: 'Roku', icon: 'fas fa-tv' },
  { name: 'Samsung', icon: 'fas fa-mobile-screen-button' },
  { name: 'Android', icon: 'fab fa-android' },
  { name: 'iOS', icon: 'fab fa-apple' },
];

const Devices: React.FC = () => {
  return (
    <section className="py-24 bg-[#2c3034]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white">Available on your favorite devices</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {devices.map((device, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 rounded-2xl bg-[#1f2326] flex items-center justify-center mb-4 border border-white/5 transition-all group-hover:border-[#a855f7] group-hover:-translate-y-2">
                <i className={`${device.icon} text-3xl text-gray-400 group-hover:text-[#a855f7] transition-colors`}></i>
              </div>
              <p className="font-semibold text-gray-300 group-hover:text-white">{device.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Devices;
