import React from 'react';

interface LogoIconProps {
  size?: 'sm' | 'lg';
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 'sm' }) => {
  const outerSize = size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const innerSize = size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  return (
    <div className={`relative ${outerSize} flex items-center justify-center`}>
      <div className={`absolute ${outerSize} border-2 border-[#BFA666] rounded-full`} />
      <div className={`${innerSize} bg-[#BFA666] rounded-full flex items-center justify-center text-white font-bold ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
        CF
      </div>
    </div>
  );
};