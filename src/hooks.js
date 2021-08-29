// these act as 'middlewares' to intercept the req object and comes with a
// 'resolve()' function that will provide a 'response' object

import cookie from 'cookie';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || { user: null });

	request.locals.user = cookies.user;
	const response = await resolve(request);

	response.headers['set-cookie'] = `user=${request.locals.user || ''}; path=/; HttpOnly`;
	return response;
}

export async function getSession(request) {
	return request.locals.user
		? {
				user: request.locals.user
		  }
		: {};
}
