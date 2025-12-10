import express from 'express'
import cors from 'cors'
import type { Express, Request, Response } from 'express'
import { petRouter } from './routes/petRoutes'

const app: Express = express()
const PORT = 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/pets', petRouter)

app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, (): void => {
    console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (err): void => {
    console.error('Failed to start server:', err)
})