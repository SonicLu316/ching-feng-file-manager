import React from 'react';

interface FormGroupProps {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  options?: { value: string | number; label: string }[];
}

export const FormGroup: React.FC<FormGroupProps> = ({
  icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  options = []
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 px-2">
        <span className="text-[#197675]">{icon}</span>
        <label className="text-lg font-bold">{label}</label>
      </div>
      <div className="relative">
        {type === 'select' ? (
          <div className="relative">
            <select
              className={`w-full h-10 bg-transparent border border-[#197675] rounded-full px-6 outline-none text-[#595959] appearance-none cursor-pointer focus:bg-white/30 transition-colors z-10 relative ${value ? 'has-value' : ''}`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {options.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Custom arrow for select */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#197675]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
          </div>
        ) : (
          <>
            <input
              type={type}
              className={`w-full h-10 bg-transparent border border-[#197675] rounded-full px-6 outline-none text-[#595959] placeholder-[#999999] focus:bg-white/30 transition-colors cursor-pointer relative z-10 ${value ? 'has-value' : ''}`}
              placeholder={type === 'date' ? '' : placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {type === 'date' && !value && (
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none z-0">
                {placeholder || '請選擇日期'}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};