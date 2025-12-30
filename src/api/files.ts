import { API_BASE_URL } from '../config';
import {
    ApiResponse,
    QueryMeetingRecordsParams,
    QueryMeetingRecordsResponse,
    SingleDownloadParams,
    BatchDownloadParams,
    StartDownloadResponse,
    DownloadStatusData
} from '../types';

export async function fetchMeetingRecordsPaginated(
    params: QueryMeetingRecordsParams
): Promise<ApiResponse<QueryMeetingRecordsResponse>> {
    const url = `${API_BASE_URL}/query_meetingrecords_paginated`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error(`Query failed: ${response.statusText}`);
    }

    return await response.json();
}

// 單一檔案下載 - 啟動非同步生成
export async function startSingleDownload(
    params: SingleDownloadParams
): Promise<ApiResponse<StartDownloadResponse>> {
    const url = `${API_BASE_URL}/start_async_download_word`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error(`Download start failed: ${response.statusText}`);
    }

    return await response.json();
}

// 批次下載 - 啟動非同步生成
export async function startBatchDownload(
    params: BatchDownloadParams
): Promise<ApiResponse<StartDownloadResponse>> {
    const url = `${API_BASE_URL}/start_async_batch_download_word`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error(`Batch download start failed: ${response.statusText}`);
    }

    return await response.json();
}

// 查詢下載狀態
export async function checkDownloadStatus(
    uuid: string
): Promise<ApiResponse<DownloadStatusData>> {
    const url = `${API_BASE_URL}/download/status/${uuid}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
    }

    return await response.json();
}

// 下載檔案 - 觸發瀏覽器下載
export async function downloadFile(uuid: string, fileName: string): Promise<void> {
    const url = `${API_BASE_URL}/download/${uuid}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error(`File download failed: ${response.statusText}`);
    }

    // 取得 blob 並觸發下載
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
}

