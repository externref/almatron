import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (url.pathname === '/start' || url.pathname == '/create') {
		return {};
	}

	const username = cookies.get('username');

	if (!username) {
		throw redirect(303, '/start');
	}
	return {};
};
