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
