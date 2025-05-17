import { apiURL } from '$lib/config';
import type { Post } from '$lib/types';

export async function getLogs(): Promise<Post[]> {
	const response = await fetch(apiURL['gameLog']['list'], {
		method: 'GET'
	});

	const data = await response.json();
	if (!response.ok) throw new Error(data?.detail || '게시글을 불러오지 못했습니다.');
	return data;
}


export async function getParticularLog(postId: string | undefined): Promise<Post> {
	if (postId === undefined) throw new Error();
	const response = await fetch(`${apiURL['gameLog']['particular']}/${postId}`, {
		method: 'GET'
	});

	const data = await response.json();
	if (!response.ok) throw new Error(data?.detail || '게시글을 불러오지 못했습니다.');
	return data;
}