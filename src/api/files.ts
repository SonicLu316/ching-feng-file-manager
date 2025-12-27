import { API_BASE_URL } from '../config';
import { ApiResponse, QueryMeetingRecordsParams, QueryMeetingRecordsResponse } from '../types';

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
