import { auth } from '$lib/stores/auth';
import { apiURL } from '$lib/config';
import type { LoginPayload, SignUpPayload } from '$lib/types';

export async function login({ username, password }: LoginPayload) {
	const body = new URLSearchParams({ username, password });
	const response = await fetch(apiURL['user']['login'], {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	const data = await response.json();
	if (!response.ok) throw new Error(data?.detail || 'Login failed');
	if (data.access_token && data.name) {
		auth.login(data.access_token, data.name); // 로그인 성공 시 저장
	}

	return data;
}

export async function signup(payload: SignUpPayload) {
	const jsonData = {
		name: payload.username,
		email: payload.email,
		password: payload.password,
		check_password: payload.confirmPassword
	};

	const response = await fetch(apiURL['user']['signup'], {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(jsonData)
	});

	const data = await response.json();
	if (!response.ok) throw new Error(data?.detail || 'Signup failed');
	return data;
}
