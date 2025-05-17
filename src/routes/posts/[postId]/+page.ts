import type { Load } from '@sveltejs/kit';
import type { Post } from '$lib/types';
import { getParticularLog } from '$lib/api/logs';

export const load: Load = async ({ params }) => {
	const post: Post = await getParticularLog(params.postId);
	return { post };
};
