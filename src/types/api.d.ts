import { superpowersEnum } from 'src/enums'


interface pagination {
    limit: number,
    total_results: number
}

export interface astronautType {
    id: number,
    name: string,
    surname: string,
    birthdate: string,
    superpower: superpowersEnum
}

export interface astronautResultType {
    astronaut: astronaut
}

export interface astronautsResultType {
    astronauts: astronautType[],
    pagination: pagination
}
