//const { get } = require('svelte/store');
//import { clientId } from './config';
const target = 'https://github.com/login/oauth/authorize';

export async function get(request) {
	console.log('INSIDE GET', request.locals);
	const state = 'this9?1!isMe';

	return {
		status: 302,
		headers: {
			location: `${target}?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&state=${state}`
		}
	};
}
