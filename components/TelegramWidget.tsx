'use client'


import React from 'react';

const TelegramWidget: React.FC = () => {
    const telegramUsername = 'SMART4K_support';

    return (
        <a
            href={`https://t.me/${telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 bg-blue-500 text-white rounded-full p-4 shadow-lg flex items-center gap-3 transition-transform duration-300 hover:scale-110 group"
            aria-label="Chat with us on Telegram"
        >
            <i className="fab fa-telegram text-3xl"></i>
            <span className="text-sm font-bold uppercase tracking-wide hidden sm:block group-hover:block transition-all duration-300">
                Chat with us
            </span>
        </a>
    );
};

export default TelegramWidget;
