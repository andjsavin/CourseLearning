import type { Request, Response, NextFunction } from 'express'

export const validatePetId = (
    req: Request<{ id: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
): void => {
    const petId = Number(req.params.id)
    if (isNaN(petId) || petId <= 0) {
        res.status(400).json({ message: 'Invalid pet ID. It must be a positive number.' })
        return
    }
    next()
}

export const pleaseAuth = (
    req: Request<{}, unknown, {}, { password?: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
): void => {
    if (req.query.password === "please") {
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized: Missing or incorrect password' })
    }
}