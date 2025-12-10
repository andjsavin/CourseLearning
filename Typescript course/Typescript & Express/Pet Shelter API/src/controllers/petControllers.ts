import { pets } from '../data/pets'

import type { Request, Response, Router } from 'express'
import type { Pet } from '../data/pets'

type petQueryParams = {
    species?: string,
    adopted?: string,
    minAge?: string,
    maxAge?: string
}

export const getPets = (
    req: Request<{}, unknown, {}, petQueryParams>,
    res: Response<Pet[] | { message: string }>
): void => {
    const { species, adopted, minAge, maxAge } = req.query
    let filteredPets: Pet[] = pets
    if (adopted) {
        const isAdopted = adopted.toLowerCase() === 'true'
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.adopted === isAdopted)
        if (filteredPets.length === 0) {
            res.status(404).json({ message: 'No pets found for the specified adoption status' })
            return
        }
        if (adopted.toLowerCase() !== 'true' && adopted.toLowerCase() !== 'false') {
            res.status(400).json({ message: 'Invalid value for adopted parameter. Use true or false.' })
            return
        }
    }
    if (species) {
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.species.toLowerCase() === species.toLowerCase())
        if (filteredPets.length === 0) {
            res.status(404).json({ message: 'No pets found for the specified species' })
            return
        }
    }
    if (minAge) {
        const minAgeNum = Number(minAge)
        if (isNaN(minAgeNum) || minAgeNum < 0) {
            res.status(400).json({ message: 'Invalid value for minAge parameter. Use a non-negative number.' })
            return
        }
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age >= minAgeNum)
    }
    if (maxAge) {
        const maxAgeNum = Number(maxAge)
        if (isNaN(maxAgeNum) || maxAgeNum < 0) {
            res.status(400).json({ message: 'Invalid value for maxAge parameter. Use a non-negative number.' })
            return
        }
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age <= maxAgeNum)
    }
    res.json(filteredPets)
}

export const getPetById = (
    req: Request<{ id: string }>,
    res: Response<Pet | { message: string }>
): void => {
    const pet = pets.find((pet: Pet): boolean => pet.id === Number(req.params.id))
    if (!pet) {
        res.status(404).json({ message: 'Pet not found' })
        return
    }
    res.json(pet)
}