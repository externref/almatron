import { db } from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// @ts-ignore
		const userId = locals.user?.id || 'anonymous-user';

		try {
			const formData = await request.formData();

			// Extract form data
			const name = formData.get('foodname')?.toString() || '';
			const description = formData.get('description')?.toString() || '';
			const location = formData.get('location')?.toString() || '';
			const quantity = parseInt(formData.get('quantity')?.toString() || '1');
			const expirationDate = formData.get('expirationDate')?.toString() || '';
			// Removed imageFile extraction

			// Validate inputs
			if (!name || !location || !expirationDate) {
				return fail(400, {
					error: 'Please fill in all required fields',
					values: { name, description, location, quantity, expirationDate }
				});
			}

			// Generate a unique ID for the food item
			const id = uuidv4();

			// Removed image path generation

			// Save to database
			const result = await db.createFoodItem({
				id,
				name,
				description,
				donator: userId, // Using the user ID as donator for now
				quantity,
				expiration_date: expirationDate,
				category: 'General', // Could be added to form later
				location,
				status: 'Available',
				image: 'https://picsum.photos/300/200'
			});
			// @ts-ignore
			if (result.rowCount > 0) {
				return {
					success: true
				};
			} else {
				return fail(500, { error: 'Failed to save food item' });
			}
		} catch (error) {
			console.error('Error saving food item:', error);
			return fail(500, { error: 'Internal server error' });
		}
	}
};
