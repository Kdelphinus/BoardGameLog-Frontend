<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import { login } from '$lib/api/auth';
	import { goto } from '$app/navigation';
	import type { LoginPayload } from '$lib/types';

	async function handleLogin(payload: LoginPayload) {
		try {
			await login(payload);
			await goto('/');
		} catch (err) {
			alert('로그인 실패');
			console.error(err);
		}
	}
</script>

<AuthForm type="login" onSubmit={handleLogin} />
