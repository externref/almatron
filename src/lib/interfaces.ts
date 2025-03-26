export interface FoodItem {
	name: string;
	description: string;
	donator: string;
	quantity: number;
	expirationDate: string;
	category: string;
	location: string;
	status: string;
	image: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	name: string;
	id: string;
	username: string;
	email: string;
	phone: string;
	location: string;
	password: string;
	createdAt: string;
}
