import React from 'react';
import { Download } from 'lucide-react';
import { DialogConfig } from '../types';

interface CustomDialogProps {
  config: DialogConfig;
  onClose: () => void;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({ config, onClose }) => {
  const { type, title, subtitle, onConfirm, showButton } = config;

  return (
    // 移除 backdrop-blur-sm 以避免 Windows 上的效能問題
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-[#F5F7F6] w-[600px] min-h-[300px] rounded-[32px] border-2 border-[#0E6A66] p-12 flex flex-col items-center justify-center gap-10 shadow-[0_12px_48px_rgba(14,106,102,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-4">
            {type === 'success' && (
              <div className="w-[64px] h-[64px] rounded-full bg-[#0E6A66] flex items-center justify-center text-white text-3xl font-bold">
                ✓
              </div>
            )}
            {type === 'alert' && (
              <div className="w-[64px] h-[64px] rounded-full bg-[#AA4A2E] flex items-center justify-center text-white text-4xl font-bold">
                ×
              </div>
            )}
            {type === 'download' && (
              <div className="w-[52px] h-[52px] rounded-2xl border-2 border-[#0E6A66] flex items-center justify-center text-[#0E6A66]">
                <Download size={28} />
              </div>
            )}
            {type === 'no-data' && (
              <div className="w-[60px] h-[60px] rounded-full bg-[#AA4A2E] flex items-center justify-center text-white text-3xl font-bold">
                !
              </div>
            )}
            <h2 className="text-[36px] font-medium text-[#535353] tracking-[2px]">{title}</h2>
          </div>
          {subtitle && (
            <p className="text-[24px] text-[#6B6B6B] tracking-[2px] mt-2">{subtitle}</p>
          )}
        </div>
        {showButton && (
          <button
            onClick={onConfirm || onClose}
            className="w-[160px] h-[64px] bg-[#0E6A66] text-white rounded-[32px] text-[28px] font-medium tracking-[4px] shadow-[0_10px_24px_rgba(14,106,102,0.25)] hover:bg-[#0A4F4C]"
            style={{ willChange: 'background-color' }}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};