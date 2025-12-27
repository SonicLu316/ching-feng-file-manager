import { API_BASE_URL } from '../config';
import { ApiResponse, UploadMeetingRecordParams } from '../types';

function formatDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

export async function uploadMeetingRecord(params: UploadMeetingRecordParams): Promise<ApiResponse<string>> {
    const url = `${API_BASE_URL}/add_meetingrecords_with_file`;

    // Calculate expire time: current time + 14 days
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 14);
    const expireTime = formatDateTime(expireDate);

    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('任務id', '');
    formData.append('主題', params.topic);
    formData.append('會議時間', params.meetingTime);
    formData.append('地點id', params.locationId.toString());
    formData.append('會議成員', params.members);
    formData.append('原始檔名', params.originalFileName);
    formData.append('啟用', '1');
    formData.append('建立者', params.creator);
    formData.append('到期時間', expireTime);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // Note: fetching with FormData automatically sets Content-Type to multipart/form-data with boundary
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Upload API error:', error);
        throw error;
    }
}
