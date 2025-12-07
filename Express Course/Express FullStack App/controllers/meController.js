import { getDBConnection } from '../db/db.js'

export async function getCurrentUser(req, res) {
  try {
    const db = await getDBConnection();
    const userId = req.session.userId;

    if (!userId) {
      return res.json({ isLoggedIn: false });
    }

    const query = 'SELECT name FROM users WHERE id = ?';
    const user = await db.get(query, [userId]);

    if (user) {
      return res.json({ isLoggedIn: true, name: user.name });
    } else {
      return res.json({ isLoggedIn: false });
    }

  } catch (err) {
    console.error('getCurrentUser error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
} 