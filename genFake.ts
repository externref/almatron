import { FoodItem } from './src/lib/interfaces';

function generateFakeFoodItems(count: number = 10): FoodItem[] {
	const categories = [
		'Fruits',
		'Vegetables',
		'Grains',
		'Dairy',
		'Protein',
		'Canned',
		'Beverages',
		'Snacks'
	];
	const locations = [
		'New York',
		'Los Angeles',
		'Chicago',
		'Houston',
		'Phoenix',
		'Philadelphia',
		'San Antonio'
	];
	const statuses = ['Available', 'Reserved', 'Claimed', 'Expired'];
	const donators = [
		'Community Kitchen',
		'Local Farm',
		'Grocery Outlet',
		'Food Bank',
		'Restaurant Alliance'
	];

	const getFutureDate = (daysAhead: number) => {
		const date = new Date();
		date.setDate(date.getDate() + daysAhead);
		return date.toISOString().split('T')[0];
	};

	return Array.from({ length: count }, (_, i) => {
		const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
		const updatedAt = new Date(
			new Date(createdAt).getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000
		).toISOString();

		return {
			id: `food-${i + 1}`,
			name: [
				'Apples',
				'Rice',
				'Milk',
				'Pasta',
				'Bread',
				'Carrots',
				'Chicken',
				'Beans',
				'Soup',
				'Cereal'
			][i % 10],
			description: `High quality food item donated by local providers. Item ${i + 1} in great condition.`,
			donator: donators[Math.floor(Math.random() * donators.length)],
			quantity: Math.floor(Math.random() * 20) + 1,
			expirationDate: getFutureDate(Math.floor(Math.random() * 30) + 5),
			category: categories[Math.floor(Math.random() * categories.length)],
			location: locations[Math.floor(Math.random() * locations.length)],
			status: statuses[Math.floor(Math.random() * statuses.length)],
			image: `https://picsum.photos/seed/${i + 1}/300/200`,
			createdAt,
			updatedAt
		};
	});
}

console.log(generateFakeFoodItems(10));
