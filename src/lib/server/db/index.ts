import { drizzle } from 'drizzle-orm/mysql2';

import * as schema from './schema';

import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined');
}

export const db = drizzle(DATABASE_URL, { schema, mode: 'default' });

export { schema };
