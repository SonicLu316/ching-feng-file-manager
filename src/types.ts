export interface FileRecord {
  id: string;
  title: string;
  duration: string;
  date: string;
  status: string;
}

export type ViewType = 'all' | 'add';

export type DialogType = 'success' | 'alert' | 'download' | 'no-data';

export interface DialogConfig {
  isOpen: boolean;
  type: DialogType;
  title: string;
  subtitle?: string;
  onConfirm?: (() => void) | null;
  showButton?: boolean;
}

export interface MeetingLocation {
  流水號: number;
  廠區: string;
  會議室: string;
  其他說明: string | null;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface UploadMeetingRecordParams {
  file: File;
  topic: string;
  meetingTime: string;
  locationId: string | number;
  members: string;
  originalFileName: string;
  creator: string;
}


export enum MeetingRecordStatus {
  Pending = 0,      // 等待處理
  Processing = 1,   // 處理中
  Completed = 2,    // 已完成
  Failed = 3        // 失敗
}

export interface MeetingRecord {
  流水號: number;
  任務id: string;
  主題: string;
  會議時間: string;
  地點id: number;
  會議成員: string;
  原始檔名: string;
  啟用: number;
  建立者: string;
  到期時間: string;
  建立時間: string;
  RowNumber: number;
  會議記錄狀態: MeetingRecordStatus;
  內部錄音檔名: string;
  地點名稱: string;
  錄音文字檔下載: any[]; // Assuming array of download objects, detail not provided but array in example
}

export interface QueryMeetingRecordsParams {
  主題?: string;
  開始時間?: string;
  結束時間?: string;
  頁碼: string;   // API expects string? Plan says string.
  每頁筆數: string; // API expects string? Plan says string.
}

export interface QueryMeetingRecordsResponse {
  總筆數: number;
  資料: MeetingRecord[];
}
