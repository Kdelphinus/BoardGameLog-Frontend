import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/stores/auth';

export const load = () => {
	const isLoggedIn = auth.subscribe(($auth) => $auth.isLoggedIn);
	if (!isLoggedIn) {
		throw redirect(302, '/login');
	}
};
