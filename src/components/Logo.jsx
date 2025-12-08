
import React from 'react';

const Logo = () => {
    return (
    <div className="flex items-center gap-3">
        <svg
            width="36" 
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500"
        >
            {/* el logo contorno de maletin */}
            <rect 
            x="3" y="6" width="18" height="14" rx="2" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            />
            <path 
            d="M9 6V4C9 2.89543 9.89543 2 11 2H13C14.1046 2 15 2.89543 15 4V6" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            />
            
            {/* el "<>" */}
            <path 
            d="M8.5 13L10.5 11M10.5 15L8.5 13" 
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
            />
            <path 
            d="M15.5 13L13.5 11M13.5 15L15.5 13" 
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
            />
            {/* barra diagonal */}
            <path 
            d="M12.5 11.5L11.5 14.5" 
            stroke="white" strokeWidth="1.5" strokeLinecap="round" 
            />
        </svg>
        
        {/* Texto  */}
        <span className="text-xl tracking-wide text-white">
            <span className="font-bold">Codigo</span>
            <span className="font-light opacity-80">Empleo</span>
        </span>
        </div>
    );
};

export default Logo;