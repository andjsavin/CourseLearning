import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function viewAllProducts() {
  const db = await open({
    filename: path.join('database.db'), 
    driver: sqlite3.Database
  });

  try {
    const products = await db.all('SELECT * FROM products')
    console.table(products) 
  } catch (err) {
    console.error('Error fetching products:', err.message)
  } finally {
    await db.close()
  }
}

async function viewAllUsers() {
  const db = await open({
    filename: path.join('database.db'), 
    driver: sqlite3.Database
  });

  try {
    const users = await db.all('SELECT * FROM users')
    console.table(users) 
  } catch (err) {
    console.error('Error fetching users:', err.message)
  } finally {
    await db.close()
  }
}

async function viewCart() {
  const db = await open({
    filename: path.join('database.db'), 
    driver: sqlite3.Database
  });

  const tableName = 'cart_items'

  try { 
    const table = await db.all(`SELECT * FROM ${tableName}`)
    console.table(table)

  } catch (err) {

    console.error('Error fetching table:', err.message)

  } finally {

    await db.close()

  }
}


viewCart()