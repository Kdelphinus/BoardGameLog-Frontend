<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { apiURL } from '$lib/config';
	import type { Post } from '$lib/types';

	let posts: Post[] = []; // 게시글 목록
	let isLoading = true;

	onMount(async () => {
		try {
			const res = await fetch(apiURL['gameLog']['list']);
			posts = await res.json();
		} catch (error) {
			console.error('게시글 불러오기 실패:', error);
		} finally {
			isLoading = false;
		}
	});

	const handleLogout = () => {
		auth.logout();
	};
</script>

<header class="flex justify-between items-center p-4 border-b">
	<h1 class="text-2xl font-bold">메인 페이지</h1>
	<div>
		{#if $auth.isLoggedIn}
			<span class="mr-4">{$auth.name}님 환영합니다!</span>
			<button on:click={handleLogout} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				로그아웃
			</button>
		{:else}
			<a href="/login" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
				로그인
			</a>
			<a href="/signup" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				회원가입
			</a>
		{/if}
	</div>
</header>

<main class="p-4">
	{#if isLoading}
		<p>게시글을 불러오는 중...</p>
	{:else if posts.length === 0}
		<p>게시글이 없습니다.</p>
	{:else}
		<ul class="space-y-4">
			{#each posts as post (post.id)}
				<li class="p-4 border rounded shadow">
					<h2 class="text-xl font-semibold">{post.subject}</h2>
					<p class="text-gray-600">{post.content}</p>
				</li>
			{/each}
		</ul>
	{/if}
</main>

