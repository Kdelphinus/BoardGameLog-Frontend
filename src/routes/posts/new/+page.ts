import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { auth } from '$lib/stores/auth';

export const load = () => {
	const authState = get(auth);
	if (!authState.isLoggedIn) {
		throw redirect(302, '/login');
	}
};
