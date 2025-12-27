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

