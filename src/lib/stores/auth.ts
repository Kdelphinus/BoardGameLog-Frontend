import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { AuthState } from '$lib/types';

const TOKEN_KEY = 'access_token';
const NAME_KEY = 'name';

function createAuthStore() {
	const initialToken = browser ? localStorage.getItem(TOKEN_KEY) : null;
	const initialName = browser ? localStorage.getItem(NAME_KEY) : null;

	const { subscribe, set, update } = writable<AuthState>({
		isLoggedIn: !!initialToken,
		accessToken: initialToken,
		name: initialName,
	});

	return {
		subscribe,
		// 로그인 처리 + 토큰 저장
		login: (token: string, name: string) => {
			if (browser) {
				localStorage.setItem(TOKEN_KEY, token);
				localStorage.setItem(NAME_KEY, name);
			}
			update((state) => ({
				...state,
				isLoggedIn: true,
				accessToken: token,
				name: name,
			}));
		},
		// 토큰 제거 + 로그인 상태 false
		logout: () => {
			if (browser) {
				localStorage.removeItem(TOKEN_KEY);
				localStorage.removeItem(NAME_KEY);
			}
			set({
				isLoggedIn: false,
				accessToken: null,
				name: null,
			});
		},
		// 로그인한 사용자 정보 저장
		setUser: (name: string) => {
			update((state) => ({
				...state,
				name: name,
			}));
		},
		// 로그인은 유지하되, 사용자 정보만 초기화
		clearUser: () => {
			update((state) => ({
				...state,
				name: null,
			}));
		}
	};
}

export const auth = createAuthStore();
