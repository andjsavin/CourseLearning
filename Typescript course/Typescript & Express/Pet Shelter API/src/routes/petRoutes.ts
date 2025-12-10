import express from 'express'
import type { Router } from 'express'
import { getPetById, getPets } from '../controllers/petControllers'
import { pleaseAuth, validatePetId } from '../middleware/petMiddleware'

export const petRouter: Router = express.Router()

petRouter.get('/', getPets)

petRouter.get('/:id', pleaseAuth, validatePetId, getPetById)