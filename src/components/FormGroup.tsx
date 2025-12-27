import React from 'react';

interface FormGroupProps {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ 
  icon, 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = "text" 
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 px-2">
        <span className="text-[#197675]">{icon}</span>
        <label className="text-lg font-bold">{label}</label>
      </div>
      <div className="relative">
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
      </div>
    </div>
  );
};