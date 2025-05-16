export type AuthState = {
	isLoggedIn: boolean;
	accessToken: string | null;
	name: string | null;
};

export type LoginPayload = {
	username: string;
	password: string;
};

export type SignUpPayload = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type Post = {
	id: number;
	user_name: string;
	game_name: string;
	during_time: number;
	participant_num: number;
	subject: string;
	content?: string | null;
	picture?: string | null;
};

export interface Game {
	id: number;
	name: string;
}
