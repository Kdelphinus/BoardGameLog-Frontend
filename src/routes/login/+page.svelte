<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import { apiURL } from '$lib/config';

	interface LoginPayload {
		username: string;
		password: string;
	}

	function handleLogin({ username, password }: LoginPayload) {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);

		fetch(apiURL.user.login, {
			method: 'POST',
			body: formData
		})
			.then(async res => {
				const data = await res.json();
				if (!res.ok) throw new Error(data);
				return data;
			})
			.then(data => {
				console.log('로그인 성공!', data);
				// 예: 토큰 저장 및 페이지 이동
			})
			.catch(err => {
				console.log("error: ", err);
				const errMsg = "로그인 실패!"
				alert(errMsg);
				console.error(errMsg);
			});
	}
</script>

<AuthForm type="login" onSubmit={handleLogin} />
