import React, { useState, useRef } from 'react';
import { ArrowLeft, Loader2, PenTool, Clock, MapPin, Users, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormGroup } from '../components/FormGroup';
import { useDialog } from '../context/DialogContext';

export const AddFilePage: React.FC = () => {
    const navigate = useNavigate();
    const { openDialog, closeDialog } = useDialog();
    const [formData, setFormData] = useState({ topic: '', time: '', location: '', members: '', fileName: '' });
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fileName) {
            openDialog({ type: 'alert', title: '上傳失敗！', subtitle: '請先選擇音訊檔案', showButton: true, onConfirm: closeDialog });
            return;
        }
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            openDialog({
                type: 'success',
                title: '上傳成功！',
                subtitle: '',
                showButton: true,
                onConfirm: () => {
                    closeDialog();
                    navigate('/files');
                }
            });
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4">
            <button
                onClick={() => navigate('/files')}
                className="flex items-center gap-2 text-[#197675] font-bold mb-6 hover:translate-x-[-4px] transition-transform"
            >
                <ArrowLeft size={20} />
                <span>返回所有檔案</span>
            </button>

            <div className="bg-[#C7DDDD] rounded-[2.5rem] p-10 lg:p-16 shadow-lg relative overflow-hidden">
                {isUploading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4 text-[#197675]">
                            <Loader2 className="w-12 h-12 animate-spin" />
                            <p className="font-bold">檔案上傳中...</p>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <FormGroup
                        icon={<PenTool size={20} />}
                        label="會議主題"
                        placeholder="請輸入內容（字數限34個字）"
                        value={formData.topic}
                        onChange={(val) => setFormData({ ...formData, topic: val })}
                    />

                    <FormGroup
                        type="date"
                        icon={<Clock size={20} />}
                        label="會議時間"
                        placeholder="請選擇日期"
                        value={formData.time}
                        onChange={(val) => setFormData({ ...formData, time: val })}
                    />

                    <FormGroup
                        icon={<MapPin size={20} />}
                        label="會議地點"
                        placeholder="請選擇地點"
                        value={formData.location}
                        onChange={(val) => setFormData({ ...formData, location: val })}
                    />

                    <FormGroup
                        icon={<Users size={20} />}
                        label="會議成員"
                        placeholder="請以逗號區隔人名（例：慶小豐, 慶小富...）"
                        value={formData.members}
                        onChange={(val) => setFormData({ ...formData, members: val })}
                    />

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 px-2">
                            <PenTool size={18} className="text-[#197675]" />
                            <label className="text-lg font-bold">新增檔案</label>
                        </div>
                        <div className="relative group">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".mp3,.wav,audio/*"
                                onChange={(e) => setFormData({ ...formData, fileName: e.target.files?.[0]?.name || '' })}
                            />
                            <input
                                readOnly
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-10 bg-transparent border border-[#197675] rounded-full px-6 outline-none text-[#595959] placeholder-[#999999] cursor-pointer group-hover:bg-white/20 transition-all"
                                placeholder="請上傳檔案（僅限mp3, wav）"
                                value={formData.fileName}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#197675] text-white w-14 h-7 rounded-full flex items-center justify-center hover:bg-[#145e5d] transition-colors"
                            >
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-[#197675] text-white px-12 py-3 rounded-full text-lg font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                        >
                            開始上傳
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
