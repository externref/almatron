import pg from 'pg';
import { env } from '$env/dynamic/private';

const pool = new pg.Pool({
	connectionString: env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/almatron',
	ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// pool.query(`
//     -- FoodItem table definition
// CREATE TABLE food_items (
//     id VARCHAR(255) PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     donator VARCHAR(255) NOT NULL,
//     quantity INT NOT NULL,
//     expiration_date VARCHAR(255) NOT NULL,
//     category VARCHAR(255) NOT NULL,
//     location VARCHAR(255) NOT NULL,
//     status VARCHAR(50) NOT NULL,
//     image VARCHAR(255),
//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

// -- User table definition
// CREATE TABLE users (
//     id VARCHAR(255) PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     username VARCHAR(255) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     phone VARCHAR(50) NOT NULL,
//     location VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

//     `)
// Export the database methods
export const db = {
	query: (text: string, params: any[]) => pool.query(text, params),

	// Create a new food item
	createFoodItem: async (foodItem: any) => {
		const {
			id,
			name,
			description,
			donator,
			quantity,
			expiration_date,
			category,
			location,
			status,
			image
		} = foodItem;

		return pool.query(
			'INSERT INTO food_items (id, name, description, donator, quantity, expiration_date, category, location, status, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
			[id, name, description, donator, quantity, expiration_date, category, location, status, image]
		);
	},

	// Get food items with optional filtering
	getFoodItems: async (filters: any = {}) => {
		let query = 'SELECT * FROM food_items';

		const queryParams: any[] = [];

		// Build WHERE clause based on filters
		const conditions = [];
		let paramCount = 1;

		if (filters.category) {
			conditions.push(`category = $${paramCount++}`);
			queryParams.push(filters.category);
		}

		if (filters.location) {
			conditions.push(`location = $${paramCount++}`);
			queryParams.push(filters.location);
		}

		if (filters.status) {
			conditions.push(`status = $${paramCount++}`);
			queryParams.push(filters.status);
		}

		if (conditions.length > 0) {
			query += ' WHERE ' + conditions.join(' AND ');
		}

		query += ' ORDER BY created_at DESC';
		return await pool.query(query, queryParams);
	},

	// Get a specific food item by ID
	getFoodItemById: async (id: string) => {
		return pool.query('SELECT * FROM food_items WHERE id = $1', [id]);
	},

	// Update a food item
	updateFoodItem: async (id: string, updates: any) => {
		const updateFields = Object.keys(updates)
			.filter((key) => key !== 'id')
			.map((key, index) => `${key} = $${index + 2}`);

		if (updateFields.length === 0) return null;

		const query = `
            UPDATE food_items
            SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *
        `;

		const values = [
			id,
			...Object.values(updates).filter((_, index) => Object.keys(updates)[index] !== 'id')
		];

		return pool.query(query, values);
	},

	// Delete a food item
	deleteFoodItem: async (id: string) => {
		return pool.query('DELETE FROM food_items WHERE id = $1 RETURNING *', [id]);
	},

	// Get user by email or username
	getUserByEmailOrUsername: async (emailOrUsername: string) => {
		return pool.query('SELECT * FROM users WHERE email = $1 OR username = $1', [emailOrUsername]);
	},

	// Get user by ID
	getUserById: async (id: string) => {
		return pool.query('SELECT * FROM users WHERE id = $1', [id]);
	}
};
