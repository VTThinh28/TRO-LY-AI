import React from 'react';
import { IconName } from '../types';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const getPath = (name: IconName) => {
    switch (name) {
      case 'gift':
        return <path d="M20 12v10H4V12M2 7h20v5H2V7zm10 0v15M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'package':
        return <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 00 3 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'check':
        return <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'sliders':
        return <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'ruler':
        return <path d="M2 12.2l1.4-1.4 8 8 1.4-1.4-8-8 1.4-1.4 8 8 1.4-1.4-8-8L12.2 2l9.2 9.2-1.6 1.6-8-8-1.4 1.4 8 8-1.4 1.4-8-8-1.4 1.4 8 8-1.4 1.4-8-8L2 12.2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'clipboard':
        return <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'image':
        return <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-3.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM6 17l4.5-6 2.5 3.5 3.5-5 4.5 7H6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'youtube':
        return <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27v6.54z" stroke="currentColor" strokeWidth="2" fill="currentColor" />;
      case 'palette':
        return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.41 0 .75-.34.75-.75 0-.2-.08-.39-.21-.52-.46-.46-.66-1.12-.52-1.76.15-.65.74-1.12 1.41-1.12h1.57c2.76 0 5-2.24 5-5s-2.24-5-5-5zM6.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'search':
        return <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'download':
        return <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      case 'shutterstock':
        return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l4 2.5-4 2.5zm1-9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>; // Generic circle play approx for shutterstock logo vibe
      case 'google':
        return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>; // Generic G/info style
      case 'pinterest':
        return <path d="M8 12h8m-8 4h8m-8-8h8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>; // Stylized P
      case 'behance':
        return <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2-1 8 4-10 5-10-5 8-4 2 1z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>; // Layers
      case 'freepik':
         return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>;
      default:
        return <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" />;
    }
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      className={className}
    >
      {getPath(name)}
    </svg>
  );
};