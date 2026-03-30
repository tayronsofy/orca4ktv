'use client'

import React from 'react';

interface BrevoIframeFormProps {
    planName?: string;
    price?: string;
    isOpen: boolean;
    onClose?: () => void;
    formUrl?: string; // Optional prop for specific form URL
}

const BrevoIframeForm: React.FC<BrevoIframeFormProps> = ({ planName, price, isOpen, onClose, formUrl }) => {
    // Default to the 1-month form if no URL provided
    const defaultUrl = "https://d35d7546.sibforms.com/serve/MUIFABcNLakD2jacljgYIn-UHpEDCBU9I4dN99xxru3Nm07fPF03m78cMOb3k2TxRtcigsmQcCUYA1V5Hlhr-d0hrpIZZgfLZWFEcD6q4eaO01Bq-BM1XqAkEn2TekeNfJxYNCU5ZDbNL2JvQ2hCmUeYSx9UOFgTXGPp9T5qBuVX3B_T38zvuzrNtO9RsTRmW4iv2ejj38ehXioqVg==";
    const src = formUrl || defaultUrl;
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-transparent overflow-y-auto"
            style={{
                visibility: isOpen ? 'visible' : 'hidden',
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
                transition: 'opacity 0.3s ease'
            }}
            onClick={onClose} // Enable click outside to close
        >
            <div
                className="relative w-[540px]"
                style={{
                    transform: 'scale(0.85)',
                    transformOrigin: 'top center',
                    marginBottom: '-140px'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking the form
            >
                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-0 -right-8 z-50 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white font-bold transition-colors backdrop-blur-md shadow-lg border border-white/10"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                )}

                {/* Brevo Iframe */}
                <div className="flex justify-center w-full">
                    <iframe
                        width="540"
                        height="950"
                        src={src}
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                        style={{
                            display: 'block',
                            width: '100%',
                            background: 'transparent',
                            overflow: 'hidden'
                        }}
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default BrevoIframeForm;
