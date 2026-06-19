'use client'

import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import { Search, Monitor, X, ChevronRight, PlayCircle } from 'lucide-react';
import 'flag-icons/css/flag-icons.min.css';

interface Channel {
    fullText: string;
    category: string;
    country: string;
    name: string;
}

interface CountryGroup {
    name: string;
    count: number;
    channels: Channel[];
    code?: string;
}

interface ChannelsPageProps {
    seoContent?: React.ReactNode;
}

const ChannelsPage: React.FC<ChannelsPageProps> = ({ seoContent }) => {
    const [data, setData] = useState<Channel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [selectedCountry, setSelectedCountry] = useState<CountryGroup | null>(null);

    // Parse CSV Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./channels.csv');
                const reader = response.body?.getReader();
                const result = await reader?.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value);

                Papa.parse(csv, {
                    header: false,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const parsedChannels: Channel[] = results.data.map((row: any) => {
                            const rawCategory = row[0] || '';
                            const rawName = row[1] || '';

                            let country = 'Global';
                            let category = 'General';

                            if (rawCategory.includes(':')) {
                                const parts = rawCategory.split(':');
                                if (parts.length > 1) {
                                    country = parts[1].trim();
                                    country = country.replace(',', '').trim();
                                }
                                category = parts[0].trim();
                            } else {
                                category = rawCategory;
                            }

                            // Simple cleanup for display
                            let name = rawName;

                            return {
                                fullText: rawCategory + ' ' + rawName,
                                category,
                                country: country || 'Global',
                                name
                            };
                        });
                        setData(parsedChannels);
                        setLoading(false);
                    },
                });
            } catch (error) {
                console.error('Error loading channels:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 1. Group Data by Country
    const groupedCountries = useMemo(() => {
        const groups: Record<string, Channel[]> = {};

        data.forEach(channel => {
            if (!groups[channel.country]) {
                groups[channel.country] = [];
            }
            groups[channel.country].push(channel);
        });

        // Convert to array and sort alphabetically
        return Object.entries(groups)
            .map(([name, channels]) => ({
                name,
                count: channels.length,
                channels
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [data]);

    // 2. Filter Countries based on Search
    const filteredCountries = useMemo(() => {
        if (!searchTerm) return groupedCountries;
        return groupedCountries.filter(group =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [groupedCountries, searchTerm]);


    return (
        <div className="min-h-screen bg-[#000a1c] text-white pb-12" style={{ paddingTop: '200px' }}>
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="text-center mb-16">
                    <span className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        IPTV Channel Directory · 2026
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6 leading-tight">
                        IPTV Channel List 2026 - 22,000+ Live Channels Across 150+ Countries
                    </h1>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                        Browse the complete ORCA 4K TV IPTV channel list - <span className="text-white font-bold">22,000+ live TV channels</span> in 4K HDR with HDR10+ and Dolby Vision, plus <span className="text-white font-bold">100,000+ on-demand titles</span>. Premium IPTV channels from the USA, UK, Canada, Germany, Netherlands, France, Spain, Italy, Portugal, Latin America, MENA, and more - sports, news, movies, kids, music, and 30+ international languages. Click any country to view its channel lineup.
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-xl mx-auto mb-12 relative">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Search for a country (e.g., France, USA, UK)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#001530] border border-gray-700/50 rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-white placeholder-gray-500 shadow-xl text-lg relative z-20"
                                style={{ color: '#ffffff', backgroundColor: '#001530', paddingLeft: '60px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 shadow-lg shadow-purple-500/20"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCountries.map((group) => (
                            <div
                                key={group.name}
                                onClick={() => setSelectedCountry(group)}
                                className="bg-[#001f3f] hover:bg-[#2a2e33] border border-white/5 hover:border-purple-500/30 rounded-2xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-900/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                        <Monitor size={24} />
                                    </div>
                                    <div className="bg-white/5 px-3 py-1 rounded-full text-xs font-medium text-gray-300 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        {group.count} Channels
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-300 transition-colors truncate">
                                    {group.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Click to view list</p>

                                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    <ChevronRight className="text-purple-500" />
                                </div>
                            </div>
                        ))}

                        {filteredCountries.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p className="text-xl">No countries found matching "{searchTerm}"</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ----------------- MODAL POPUP ----------------- */}
                {selectedCountry && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                            onClick={() => setSelectedCountry(null)}
                        ></div>

                        {/* Content */}
                        <div className="bg-[#001530] w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl flex flex-col relative z-10 animate-fade-in-up overflow-hidden" style={{ maxHeight: '85vh' }}>

                            {/* Header */}
                            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-[#001f3f]">
                                <div>
                                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                        {selectedCountry.name}
                                    </h2>
                                    <p className="text-purple-400 mt-1 font-medium">
                                        {selectedCountry.count} Channels Available
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedCountry(null)}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-0 min-h-0">
                                {/* Virtualization would be better for massive lists, but simplified map for now */}
                                <div className="divide-y divide-white/5">
                                    {selectedCountry.channels.map((channel, idx) => (
                                        <div key={idx} className="p-4 md:px-8 hover:bg-white/5 transition-colors flex items-center group">
                                            <PlayCircle className="w-5 h-5 text-gray-600 group-hover:text-purple-500 mr-4 transition-colors" />
                                            <div>
                                                <div className="text-gray-200 group-hover:text-white font-medium">
                                                    {channel.name}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">
                                                    Category: {channel.category}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 bg-[#001f3f] rounded-b-3xl flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Updates daily. 99.9% Uptime.
                                </span>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setSelectedCountry(null)}
                                        className="px-6 py-2.5 rounded-xl text-gray-300 hover:bg-white/5 transition-colors font-medium"
                                    >
                                        Close
                                    </button>
                                    <a
                                        href="/iptv#pricing"
                                        className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-900/30 transition-all hover:scale-105"
                                    >
                                        Get Access Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Server-rendered SEO content block */}
            {seoContent}

            <style>{`
          .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: #001f3f; 
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #3f444b; 
              border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #575e67; 
          }
          @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
              animation: fade-in-up 0.3s ease-out forwards;
          }
      `}</style>
        </div>
    );
};

export default ChannelsPage;
