import validator from 'validator'
import { getDBConnection } from '../db/db.js'
import bcrypt from 'bcryptjs'

export async function registerUser(req, res) {
    let { name, email, username, password } = req.body
    if (!(name && email && username && password)) {
        return res.status(400).json({ error: 'All fields are required.' })

    }
    name = name?.trim()

    email = email?.trim()
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' })
    }

    username = username?.trim()
    const usernameRegex = /^[a-zA-Z0-9_-]{1,20}$/
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: 'Username contains disallowed characters.' })
    }

    try {

        const db = await getDBConnection()
        let query = 'SELECT COUNT(*) as count FROM users WHERE email = ? OR username = ?'
        let params = []
        params.push(email, username)
        const existingUser = await db.get(query, params)

        if (existingUser.count > 0) {
            return res.status(409).json({ error: 'Email or username already in use.' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        query = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)'
        params = []
        params.push(name, email, username, hashedPassword)
        const result = await db.run(query, params)
        req.session.userId = result.lastID
        await db.close()
        res.status(201).json({ message: 'User registered' })

    } catch (err) {

        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Registration failed. Please try again.' })

    }
}

export async function loginUser(req, res) {
    let { username, password } = req.body
    if (!(username && password)) {
        return res.status(400).json({ error: 'All fields are required' })
    }
    username = username?.trim()
    try {
        const db = await getDBConnection()
        const query = 'SELECT id, password FROM users WHERE username = ?'
        const user = await db.get(query, [username])
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' })
        }
        req.session.userId = user.id
        res.status(200).json({ message: 'Logged in' })
        await db.close()
    } catch (err) {
        console.error('Login error:', err.message)
        res.status(500).json({ error: 'Login failed. Please try again.' })
    }
}

export async function logoutUser(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err.message)
            return res.status(500).json({ error: 'Logout failed. Please try again.' })
        }
        res.status(200).json({ message: 'Logged out' })
    })
}