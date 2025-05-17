<script lang="ts">
	import type { Post } from '$lib/types';
	export let data: { post: Post };
</script>

<main class="max-w-3xl mx-auto p-6 bg-white rounded shadow">
	<h1 class="text-3xl font-bold mb-4">{data.post.subject}</h1>

	<ul class="text-gray-700 mb-6 space-y-1">
		<li><strong>작성자:</strong> {data.post.user_name}</li>
		<li><strong>게임 이름:</strong> {data.post.game_name}</li>
		<li><strong>소요 시간:</strong> {data.post.during_time}분</li>
		<li><strong>참여 인원:</strong> {data.post.participant_num}명</li>
	</ul>

	{#if data.post.picture}
		<img src={data.post.picture} alt="게임 사진" class="w-full h-auto rounded mb-4" />
	{/if}

	{#if data.post.content}
		<div class="prose max-w-none">
			<p>{data.post.content}</p>
		</div>
	{/if}
</main>
