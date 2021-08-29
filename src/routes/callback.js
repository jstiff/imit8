import { client_id, secret_id } from './config';
import fetch from 'node-fetch';

const token_url = 'https://github.com/login/oauth/access_token';
const user_url = 'https://api.github.com/user';

export async function get(request) {
	const code = request.query.get('code');
	const token = await getToken(code);
	const user = await getUser(token);

	request.locals.user = user.login;

	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
}

function getToken(code) {
	return fetch(token_url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			client_id,
			client_secret: secret_id,
			code
		})
	})
		.then((r) => r.json())
		.then((r) => r.access_token);
}

function getUser(token) {
	return fetch(user_url, {
		headers: {
			Accept: 'application/json',
			Authorization: `token ${token}`
		}
	}).then((r) => r.json());
}
