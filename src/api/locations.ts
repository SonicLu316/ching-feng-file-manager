import { fetchApi } from './index';
import { MeetingLocation, ApiResponse } from '../types';

export async function fetchMeetingLocations(): Promise<MeetingLocation[]> {
    try {
        const response = await fetchApi<MeetingLocation[]>('/query_meetinglocations', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        // Status 1 means success
        if (response.status === 1) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.warn('Failed to fetch meeting locations, using fallback', error);
        return [];
    }
}
