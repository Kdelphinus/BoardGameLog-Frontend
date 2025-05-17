<script lang="ts">
	let { type, onSubmit } = $props();

	// 반응적으로 쓰일 변수는 $state()로 감싸줘야 함
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();  // fetch 전에 페이지 reload 되는 것 방지

		if (type === 'signup' && password !== confirmPassword) {
			alert('비밀번호가 일치하지 않습니다!');
			return;
		}

		const payload =
			type === 'signup'
				? { username, email, password, confirmPassword }
				: { username, password };

		await onSubmit(payload); // 상위에서 전달받은 함수 실행
	}
</script>

<!--prevent는 페이지 리로딩을 막고 우리가 정의한 함수만 실행되도록 설정-->
<form
	class="flex flex-col gap-4 max-w-md mx-auto mt-20 p-6 border border-gray-200 shadow-sm rounded-lg"
	onsubmit={handleSubmit}
>
	<h1 class="text-2xl font-bold mb-2 text-center">
		{type === 'login' ? '로그인' : '회원가입'}
	</h1>

	<input
		type="text"
		placeholder="닉네임"
		bind:value={username}
		class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		required
	/>

	{#if type === 'signup'}
		<input
			type="email"
			placeholder="이메일"
			bind:value={email}
			class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			required
		/>
	{/if}

	<input
		type="password"
		placeholder="비밀번호"
		bind:value={password}
		class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		required
	/>

	{#if type === 'signup'}
		<input
			type="password"
			placeholder="비밀번호 확인"
			bind:value={confirmPassword}
			class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			required
		/>
	{/if}

	<button
		type="submit"
		class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
	>
		{type === 'login' ? '로그인' : '회원가입'}
	</button>
</form>
