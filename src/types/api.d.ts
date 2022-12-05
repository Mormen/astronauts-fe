import { superpowersEnum } from 'src/enums'


interface pagination {
    per_page: number,
    total_results: number
}

export interface astronautType {
    id: number,
    name: string,
    surname: string,
    birthdate: string,
    superpower: superpowersEnum
}

export interface astronautsType {
    astronauts: astronautType[],
    pagination: pagination
}