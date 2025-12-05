import express from 'express'
import cors from 'cors'
import { apiRouter } from './routers/apiRouter.js'
import { getErrorController } from './controllers/getError.js'

const PORT = 8000

const app = express()

app.use(cors())
app.use('/api', apiRouter)
app.use(getErrorController)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})