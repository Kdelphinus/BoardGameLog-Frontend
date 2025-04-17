export const backendURL = import.meta.env.VITE_BACKEND_URL
export const apiVersion = import.meta.env.VITE_API_VERSION

export const apiURL = {
	user: {
		login: `${backendURL}/api/${apiVersion}/users/login`,
		signup: `${backendURL}/api/${apiVersion}/users/create`,
		refresh: `${backendURL}/api/${apiVersion}/users/refresh`,
		logout: `${backendURL}/api/${apiVersion}/users/logout`,
		resetPassword: `${backendURL}/api/${apiVersion}/users/reset-password`,
		resetPasswordConfirm: `${backendURL}/api/${apiVersion}/users/reset-password/confirm`,
		me: `${backendURL}/api/${apiVersion}/users/me`,
		list: `${backendURL}/api/${apiVersion}/users/list`,
		listDeactivate: `${backendURL}/api/${apiVersion}/users/list/deactivate`,
		update: `${backendURL}/api/${apiVersion}/users/patch`,
		updateDeactivate: `${backendURL}/api/${apiVersion}/users/deactivate`,
		restore: `${backendURL}/api/${apiVersion}/users/restore`,
		restoreConfirm: `${backendURL}/api/${apiVersion}/users/restore/confirm`,
		delete: `${backendURL}/api/${apiVersion}/users/delete`,
	},
}