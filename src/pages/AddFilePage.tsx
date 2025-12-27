import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Loader2, PenTool, Clock, MapPin, Users, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormGroup } from '../components/FormGroup';
import { useDialog } from '../context/DialogContext';
import { fetchMeetingLocations } from '../api/locations';
import { uploadMeetingRecord } from '../api/upload';
import { useAuth } from '../context/AuthContext';

export const AddFilePage: React.FC = () => {
    const navigate = useNavigate();
    const { openDialog, closeDialog } = useDialog();
    const { email } = useAuth();
    const [formData, setFormData] = useState({
        topic: '',
        time: (() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        })(),
        location: '',
        members: '',
        fileName: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [locationOptions, setLocationOptions] = useState<{ value: string | number; label: string }[]>([
        { value: '', label: '請選擇' }
    ]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const locations = await fetchMeetingLocations();
                const options = locations.map(loc => ({
                    value: loc.流水號,
                    label: `${loc.廠區}-${loc.會議室}`
                }));
                setLocationOptions([{ value: '', label: '請選擇' }, ...options]);
            } catch (error) {
                console.error('Error loading locations:', error);
                setLocationOptions([{ value: '', label: '請選擇' }]);
            }
        };
        loadLocations();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFormData({ ...formData, fileName: file.name });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!selectedFile) {
            openDialog({ type: 'alert', title: '上傳失敗！', subtitle: '請先選擇音訊檔案', showButton: true, onConfirm: closeDialog });
            return;
        }
        if (!formData.topic) {
            openDialog({ type: 'alert', title: '上傳失敗！', subtitle: '請輸入會議主題', showButton: true, onConfirm: closeDialog });
            return;
        }
        if (!formData.time) {
            openDialog({ type: 'alert', title: '上傳失敗！', subtitle: '請選擇會議時間', showButton: true, onConfirm: closeDialog });
            return;
        }
        if (!formData.location) {
            openDialog({ type: 'alert', title: '上傳失敗！', subtitle: '請選擇會議地點', showButton: true, onConfirm: closeDialog });
            return;
        }

        setIsUploading(true);
        try {
            // Adjust time format if needed (FormGroup date input usually gives YYYY-MM-DD)
            // If FormGroup type="datetime-local" it gives YYYY-MM-DDTHH:mm
            // Assuming the simple date input for now, but API might expect full datetime. 
            // The user prompt example says "2025-12-26 11:34:20". 
            // Since input type="date" only gives date, we might append default time or change input type.
            // But strict to user request logic: "會議時間" parameter.
            // Let's assume input value is sufficient or append " 09:00:00" if it's just date to match format "YYYY-MM-DD HH:mm:ss" approximately
            // Or better, let's keep it as is if backend handles it, but plan said "YYYY-MM-DD HH:mm:ss".
            // For now, I'll append current time or 00:00:00 if it's just date string.
            // Actually, let's check input type. It's 'date'.
            // I'll append a default time to satisfy common backend datetime parsing if needed, 
            // or just send what user inputs if it's strictly just date. 
            // The prompt example shows full datetime. Let's make it robust by appending current time safely or just "00:00:00".
            // Wait, let's just send the value first. If backend needs specific format, I'll fix.
            // But to be safe with "2025-12-26 11:34:20" format example, I should probably format it.

            // Let's modify logic to ensure format.
            let meetingTime = formData.time;
            if (meetingTime.length === 10) { // YYYY-MM-DD
                meetingTime += ' 09:00:00'; // Default start time
            } else if (meetingTime.includes('T')) {
                meetingTime = meetingTime.replace('T', ' ') + ':00';
            }

            const response = await uploadMeetingRecord({
                file: selectedFile,
                topic: formData.topic,
                meetingTime: meetingTime,
                locationId: formData.location,
                members: formData.members || '無',
                originalFileName: selectedFile.name,
                creator: email || 'unknown'
            });

            if (response.status === 1) {
                openDialog({
                    type: 'success',
                    title: '上傳成功！',
                    subtitle: '檔案已成功上傳',
                    showButton: true,
                    onConfirm: () => {
                        closeDialog();
                        navigate('/files');
                    }
                });
            } else {
                openDialog({
                    type: 'alert',
                    title: '上傳失敗！',
                    subtitle: response.message || '上傳失敗',
                    showButton: true,
                    onConfirm: closeDialog
                });
            }

        } catch (error) {
            console.error(error);
            openDialog({
                type: 'alert',
                title: '上傳失敗！',
                subtitle: '網路錯誤，請稍後再試',
                showButton: true,
                onConfirm: closeDialog
            });
        } finally {
            setIsUploading(false);
        }
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
                        type="datetime-local"
                        icon={<Clock size={20} />}
                        label="會議時間"
                        placeholder="請選擇日期時間"
                        value={formData.time}
                        onChange={(val) => setFormData({ ...formData, time: val })}
                    />

                    <FormGroup
                        type="select"
                        icon={<MapPin size={20} />}
                        label="會議地點"
                        placeholder="請選擇地點"
                        value={formData.location}
                        onChange={(val) => setFormData({ ...formData, location: val })}
                        options={locationOptions}
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
                                onChange={handleFileChange}
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
