import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/database';

export const load: PageServerLoad = async ({ cookies }) => {
	const username = cookies.get('username');

	if (!username) {
		throw error(401, 'You must be logged in to view this page');
	}

	try {
		const result = await db.getUserByEmailOrUsername(username);
		const userData = result.rows[0];

		if (!userData) {
			throw error(404, 'User not found');
		}

		return {
			user: {
				id: userData.id,
				name: userData.name,
				username: userData.username,
				email: userData.email,
				phone: userData.phone,
				location: userData.location,
				created_at: userData.created_at
			}
		};
	} catch (err) {
		console.error('Error fetching user data:', err);
		throw error(500, 'Failed to load user profile');
	}
};
