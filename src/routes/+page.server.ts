import { db } from '$lib/database';
import type { FoodItem } from '$lib/interfaces';
import nodemailer from "nodemailer";
import { SELF_EMAIL, SELF_PASS } from '$env/static/private';

const service = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: SELF_EMAIL,
		pass: SELF_PASS
	}
});

export async function load() {
	try {
		const result = await db.getFoodItems();
		return {
			foodItems: result.rows as FoodItem[]
		};
	} catch (error) {
		console.error('Error fetching food items:', error);
		return {
			foodItems: []
		};
	}
}

export const actions = {
	sendEmail: async ({ request, cookies }) => {
		const data = await request.formData();
		const foodItemData = data.get('foodItem');
		
		if (!foodItemData) {
			return { success: false, message: 'Food item data is missing' };
		}
		
		const foodItem = JSON.parse(foodItemData.toString()) as FoodItem;
		const username = cookies.get('username');
		let userEmailD = await db.getUserByEmailOrUsername(username || `defsarthak`)
		let userEmail = userEmailD.rows[0].email;
		
		if (!userEmail) {
			return { success: false, message: 'User email not found' };
		}
		
		try {
			await service.sendMail({
				from: SELF_EMAIL,
				to: userEmail,
				subject: `Food Item Information: ${foodItem.name}`,
				html: `
					<h1>Food Item Details</h1>
					<p><strong>Name:</strong> ${foodItem.name}</p>
					<p><strong>Quantity:</strong> ${foodItem.quantity}</p>
					<p><strong>Description:</strong> ${foodItem.description}</p>
					<p><strong>Donator:</strong> ${foodItem.donator}</p>
					<p><strong>Location:</strong> ${foodItem.location}</p>
					<p>Thank you for using MealBridge!</p>
				`
			});
			
			return { success: true, message: 'Email sent successfully' };
		} catch (error) {
			console.error('Error sending email:', error);
			return { success: false, message: 'Failed to send email' };
		}
	}
};
