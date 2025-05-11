// src/models/userModel.ts

import { Pool } from 'pg';
import { User } from 'firebase/auth';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
});

export async function createUser(user: User) {
  const query = 'INSERT INTO users (id, email, created_at) VALUES ($1, $2, $3)';
  const values = [user.uid, user.email, new Date()];
  
  try {
    await pool.query(query, values);
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  const query = 'SELECT * FROM users WHERE id = $1';
  
  try {
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}
