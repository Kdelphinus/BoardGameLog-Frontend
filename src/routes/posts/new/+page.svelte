<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiURL } from '$lib/config';
	import { parseMarkdown } from '$lib/utils/markdown';
	import { auth } from '$lib/stores/auth';
	import type { Game } from '$lib/types';

	let subject = '';
	let game_name = '';
	let during_time: number | undefined = undefined;
	let participant_num: number | undefined = undefined;
	let content = '';
	let picture = '';
	let suggestedGames: Game[] = [];
	let fileInput: HTMLInputElement;
	let fileInputButton: HTMLButtonElement;
	let dragging = false;
	let accessToken: string | null;
	auth.subscribe(value => accessToken = value.accessToken);

	// 미리보기 동적 업데이트를 위한 HTML 처리
	const handleFileDrop = (e: DragEvent) => {
		e.preventDefault();
		dragging = false;
		const files = e.dataTransfer?.files;
		if (files && files?.length > 0) {
			const file = files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				picture = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleFileSelect = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files?.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				picture = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleGameNameChange = async () => {
		// TODO 입력된 문자와 일치하는 게임 제목을 반환하는 api와 연결해야 함
		// 임시 게임 데이터
		const mockGames = [
			{ id: 1, name: 'test game' },
			{ id: 2, name: '카탄' },
			{ id: 3, name: '카르카손' },
			{ id: 4, name: '뱅' },
			{ id: 5, name: '캐스캐디아' },
			{ id: 6, name: '다빈치 코드' },
			{ id: 7, name: '할리갈리' },
			{ id: 8, name: '카후나' },
			{ id: 9, name: '세븐 원더스' },
			{ id: 10, name: '스플렌더 듀얼' },
			{ id: 11, name: '스플렌더' },
			{ id: 12, name: '아크노바' }
		];

		if (game_name.trim() === '') {
			suggestedGames = [];
			return;
		}

		// 검색어를 포함하는 게임 필터링
		const filteredGames = mockGames.filter(game =>
			game.name.toLowerCase().includes(game_name.toLowerCase())
		);

		// API 호출을 시뮬레이션하기 위한 지연
		await new Promise(resolve => setTimeout(resolve, 300));

		suggestedGames = filteredGames;
	};


	const handleSubmit = async () => {
		const payload = {
			subject,
			game_name,
			during_time,
			participant_num,
			content,
			picture
		};

		const res = await fetch(apiURL['gameLog']['create'], {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
			body: JSON.stringify(payload)
		});

		if (res.ok) {
			await goto('/');
		} else {
			const err = await res.json();
			alert('작성 실패: ' + err?.detail || '알 수 없는 오류');
		}
	};
</script>

<main class="max-w-5xl mx-auto p-6 grid grid-cols-2 gap-6">
	<section>
		<h1 class="text-2xl font-bold mb-4">게시글 작성</h1>

		<div class="space-y-4">
			<input bind:value={subject} class="w-full border p-2 rounded" placeholder="제목" />

			<!-- 게임 이름 필터링 -->
			<input
				bind:value={game_name}
				class="w-full border p-2 rounded"
				on:input={handleGameNameChange}
				placeholder="게임 이름"
			/>
			{#if suggestedGames.length > 0}
				<ul class="border p-4 mt-2 max-h-48 overflow-auto">
					{#each suggestedGames as game (game.id)}
						<button class="p-2 hover:bg-gray-200 cursor-pointer" on:click={() => game_name = game.name}>
							{game.name}
						</button>
					{/each}
				</ul>
			{/if}

			<!--TODO 게임 정보 기준으로 min, max 값 조정하기-->
			<div class="relative">
				<input
					bind:value={during_time}
					class="w-full border p-2 rounded"
					id="during-time"
					min="0"
					type="number"
				/>
				<label
					class="absolute left-2 top-2 text-gray-400 pointer-events-none"
					class:hidden={during_time !== undefined && during_time !== null}
					for="during-time"
				>
					소요 시간 (분)
				</label>
			</div>

			<div class="relative">
				<input
					bind:value={participant_num}
					class="w-full border p-2 rounded"
					id="participant-num"
					min="1"
					type="number"
				/>
				<label
					class="absolute left-2 top-2 text-gray-400 pointer-events-none"
					class:hidden={participant_num !== undefined && participant_num !== null}
					for="participant-num"
				>
					참여 인원
				</label>
			</div>

			<!-- 이미지 업로드 -->
			<button
				bind:this={fileInputButton}
				class="w-full border p-4 rounded bg-gray-100 hover:bg-gray-200 focus:ring focus:ring-blue-300 text-left"
				class:bg-gray-300={dragging}
				on:click={() => fileInput.click()}
				on:dragleave={() => dragging = false}
				on:dragover={(e) => { e.preventDefault(); dragging = true; }}
				on:drop={handleFileDrop}
				type="button"
			>
				<input
					accept="image/*"
					bind:this={fileInput}
					class="hidden"
					on:change={handleFileSelect}
					type="file"
				/>

				<span class="text-sm text-gray-600">
					이미지를 여기에 드래그하거나 클릭하세요.
				</span>

				{#if picture}
					<img src={picture} alt="업로드된 이미지" class="mt-4 max-w-full h-auto rounded" />
				{/if}
			</button>

			<textarea
				bind:value={content}
				class="w-full border p-2 rounded"
				placeholder="내용을 Markdown 형식으로 입력하세요"
				rows="10"
			></textarea>

			<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" on:click={handleSubmit}>
				작성 완료
			</button>
		</div>
	</section>

	<!-- 미리보기 -->
	<section>
		<h2 class="text-xl font-semibold mb-2">미리보기</h2>
		<div class="prose max-w-none border p-4 rounded bg-gray-50">
			<!-- DOMPurify로 sanitize된 안전한 HTML -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html parseMarkdown(content)}
		</div>
	</section>
</main>
