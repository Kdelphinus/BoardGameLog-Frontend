<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import { apiURL } from '$lib/config';

	interface SignUpPayload {
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
	}

	function handleSignUp({ username, email, password, confirmPassword }: SignUpPayload) {
		const jsonData = {
			'name': username,
			'email': email,
			'password': password,
			'check_password': confirmPassword
		};

		fetch(apiURL.user.signup, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonData)
		})
			.then(async res => {
				const data = await res.json();
				if (!res.ok) throw new Error(data);
				return data;
			})
			.then(data => {
				console.log('회원가입 성공!', data);
				// 예: 토큰 저장 및 페이지 이동
			})
			.catch(err => {
				console.log("error: ", err);
				const errMsg = "회원가입 실패"
				alert(errMsg);
				console.error(errMsg);
			});
	}
</script>

<AuthForm type="signup" onSubmit={handleSignUp} />