'use strict';
let exports = {};
Object.defineProperty(exports, '__esModule', { value: true });
function generateFakeFoodItems(count) {
	if (count === void 0) {
		count = 10;
	}
	var categories = [
		'Fruits',
		'Vegetables',
		'Grains',
		'Dairy',
		'Protein',
		'Canned',
		'Beverages',
		'Snacks'
	];
	var locations = [
		'New York',
		'Los Angeles',
		'Chicago',
		'Houston',
		'Phoenix',
		'Philadelphia',
		'San Antonio'
	];
	var statuses = ['Available', 'Reserved', 'Claimed', 'Expired'];
	var donators = [
		'Community Kitchen',
		'Local Farm',
		'Grocery Outlet',
		'Food Bank',
		'Restaurant Alliance'
	];
	var getFutureDate = function (daysAhead) {
		var date = new Date();
		date.setDate(date.getDate() + daysAhead);
		return date.toISOString().split('T')[0];
	};
	return Array.from({ length: count }, function (_, i) {
		var createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
		var updatedAt = new Date(
			new Date(createdAt).getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000
		).toISOString();
		return {
			id: 'food-'.concat(i + 1),
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
			description: 'High quality food item donated by local providers. Item '.concat(
				i + 1,
				' in great condition.'
			),
			donator: donators[Math.floor(Math.random() * donators.length)],
			quantity: Math.floor(Math.random() * 20) + 1,
			expirationDate: getFutureDate(Math.floor(Math.random() * 30) + 5),
			category: categories[Math.floor(Math.random() * categories.length)],
			location: locations[Math.floor(Math.random() * locations.length)],
			status: statuses[Math.floor(Math.random() * statuses.length)],
			image: 'https://picsum.photos/seed/'.concat(i + 1, '/300/200'),
			createdAt: createdAt,
			updatedAt: updatedAt
		};
	});
}
console.log(generateFakeFoodItems(10));
