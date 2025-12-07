import { getDBConnection } from '../db/db.js'

export async function addToCart(req, res) {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ isLoggedIn: false })
    }
    const db = await getDBConnection()
    try {
        const { productId } = req.body
        if (isNaN(parseInt(productId, 10))) {
            return res.status(400).json({ error: 'Invalid product ID' })
        }
        let query = 'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?'
        let params = [userId, productId]
        const item = await db.get(query, params)
        if (item) {
            query = 'UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?'
            await db.run(query, [item.id])
        } else {
            query = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)'
            await db.run(query, params)
        }
        res.status(200).json({ message: 'Added to cart' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to add to cart', details: err.message })
    }
    db.close()
}

export async function getCartCount(req, res) {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ isLoggedIn: false })
    }
    const db = await getDBConnection()
    try {
        let query = 'SELECT SUM(quantity) as count FROM cart_items WHERE user_id = ?'
        const result = await db.get(query, [userId])
        const count = result.count || 0
        res.status(200).json({ totalItems: count })
    } catch (err) {
        res.status(500).json({ error: 'Failed get cart count', details: err.message })
    }
    db.close()
}

export async function getAll(req, res) {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ isLoggedIn: false })
    }
    const db = await getDBConnection()
    try {
        let query = `SELECT ci.id as cartItemId, ci.quantity, p.title, p.artist, p.price
                     FROM cart_items ci
                     JOIN products p ON ci.product_id = p.id
                     WHERE ci.user_id = ?`
        const items = await db.all(query, [userId])
        if (!items) {
            throw new Error('No items found in cart')
        }
        res.status(200).json({ items: items })   
    } catch (err) {
        console.log('error', err)
        res.status(500).json({ error: 'Failed to load cart items', details: err.message })
    }
    db.close()
} 

export async function deleteItem(req, res) {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ isLoggedIn: false })
    }
    const db = await getDBConnection()
    try {
        const { itemId } = req.params
        if (isNaN(parseInt(itemId, 10))) {
            return res.status(400).json({ error: 'Invalid item ID' })
        }
        const query = 'DELETE FROM cart_items WHERE id = ? AND user_id = ?'
        const result = await db.run(query, [itemId, userId])
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Item not found in cart' })
        }
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove item from cart', details: err.message })
    }
    db.close()
}

export async function deleteAll(req, res) {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ isLoggedIn: false })
    }
    const db = await getDBConnection()
    try {
        const query = 'DELETE FROM cart_items WHERE user_id = ?'
        await db.run(query, [userId])
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove items from cart', details: err.message })
    }
    db.close()

}