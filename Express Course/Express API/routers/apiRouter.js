import express from 'express'
import { getAllDataController } from '../controllers/getAllData.js'
import { getDataByPathParamsController } from '../controllers/getDataByPathParams.js'

export const apiRouter = express.Router()

apiRouter.get('/', getAllDataController)
apiRouter.get('/:field/:term', getDataByPathParamsController)