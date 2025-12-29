import { API_BASE_URL } from '../config';
import { LoginRequest, LoginResponse } from '../types';

export async function loginApi(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}
