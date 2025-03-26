import { redirect, type Actions } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { db } from '$lib/database';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString() || '';
		const password = formData.get('password')?.toString() || '';

		// Validate the data
		const errors: Record<string, string> = {};

		if (!email) errors.email = 'Email is required';
		if (!password) errors.password = 'Password is required';
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Invalid email format';
		}
		if (Object.keys(errors).length > 0) {
			return {
				success: false,
				errors,
				data: { email }
			};
		}

		try {
			const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

			if (user.rows.length === 0) {
				return {
					success: false,
					message: 'Login failed. User not found.'
				};
			}
			const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

			if (!isPasswordValid) {
				return {
					success: false,
					message: 'Login failed. Invalid password.'
				};
			}
			cookies.set('username', user.rows[0].username, {
				path: '/'
			});

			return {
				success: true,
				message: 'Login successful!',
				user: {
					id: user.rows[0].id,
					name: user.rows[0].name,
					username: user.rows[0].username,
					email: user.rows[0].email
				}
			};
		} catch (error) {
			console.error('Login error:', error);
			return {
				success: false,
				message: 'Login failed. Please check your credentials.'
			};
		}
	},

	signup: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString() || '';
		const username = formData.get('username')?.toString() || '';
		const location = formData.get('location')?.toString() || '';
		const phone = formData.get('phone')?.toString() || '';
		const email = formData.get('email')?.toString() || '';
		const password = formData.get('password')?.toString() || '';

		// Validate the data
		const errors: Record<string, string> = {};

		if (!name) errors.name = 'Name is required';
		if (!username) errors.username = 'Username is required';
		if (!email) errors.email = 'Email is required';
		if (!password) errors.password = 'Password is required';
		else if (password.length < 8) errors.password = 'Password must be at least 8 characters';
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Invalid email format';
		}
		if (Object.keys(errors).length > 0) {
			return {
				success: false,
				errors,
				data: { name, username, location, phone, email }
			};
		}

		try {
			const existingUser = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [
				email,
				username
			]);

			if (existingUser.rows.length > 0) {
				return {
					success: false,
					message: 'User with this email or username already exists'
				};
			}
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const userId = uuidv4();
			await db.query(
				'INSERT INTO users (id, name, username, email, phone, location, password) VALUES ($1, $2, $3, $4, $5, $6, $7)',
				[userId, name, username, email, phone, location, hashedPassword]
			);

			return {
				success: true,
				message: 'Account created successfully!'
			};
		} catch (error) {
			console.error('Error creating account:', error);
			return {
				success: false,
				message: 'Failed to create account'
			};
		}
	}
} satisfies Actions;
