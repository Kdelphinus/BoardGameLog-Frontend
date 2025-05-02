<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import { signup } from '$lib/api/auth';
	import { goto } from '$app/navigation';
	import type { SignUpPayload } from '$lib/types';

	async function handleSignUp(payload: SignUpPayload) {
		try {
			await signup(payload);
			await goto('/login');
		} catch (err) {
			alert('회원가입 실패');
			console.error(err);
		}
	}
</script>

<AuthForm type="signup" onSubmit={handleSignUp} />