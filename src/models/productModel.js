const db = require('../config/db');

class ProductModel {
  static async initTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        sku VARCHAR(100) UNIQUE NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await db.query(query);
  }

  static async getAll() {
    const res = await db.query('SELECT * FROM products ORDER BY id DESC');
    return res.rows;
  }

  static async getById(id) {
    const res = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return res.rows[0];
  }

  static async create(data) {
    const { title, sku, price, stock, category } = data;
    const query = `
      INSERT INTO products (title, sku, price, stock, category)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const res = await db.query(query, [title, sku, price, stock, category]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { title, sku, price, stock, category } = data;
    const query = `
      UPDATE products
      SET title = $1, sku = $2, price = $3, stock = $4, category = $5
      WHERE id = $6
      RETURNING *;
    `;
    const res = await db.query(query, [title, sku, price, stock, category, id]);
    return res.rows[0];
  }

  static async delete(id) {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
  }
}

module.exports = ProductModel;