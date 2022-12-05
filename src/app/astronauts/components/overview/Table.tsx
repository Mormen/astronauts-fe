import React, { useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setToastAlert } from '@ordelogy/ordelogy-fe-lib'
import { useGetAstronautsQuery, useDeleteAstronautMutation } from 'src/store/queries/astronauts'

import convertDateTime from 'myUtils/convertDateTime'
import queryErrorMessageHelper from 'myUtils/queryErrorMessageHelper'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

import {
    Table,
    Thead,
    TheadTr,
    Th,
    Tbody,
    TbodyTr,
    Td,
    Button
} from '@ordelogy/ordelogy-fe-lib'

import { astronautType } from 'src/types/api'


const AstronautsTable: React.FC = React.memo(() => {

    const location = useLocation()

    const {
        data: astronautsData,
        isFetching: astronautsIsFetching
    } = useGetAstronautsQuery({ filters: location.search })

    return (
        <Table loading={astronautsIsFetching}>
            <Thead>
                <TheadTr>
                    <Th
                        className="
                            width-35-db text-align-left-db 
                            width-35-btb text-align-left-btb
                        "
                    >
                        Full name
                    </Th>
                    <Th
                        className="
                            width-25-db text-align-left-db 
                            width-25-btb text-align-left-btb
                        "
                    >
                        Birthdate
                    </Th>
                    <Th
                        className="
                            width-20-db text-align-left-db 
                            width-20-btb text-align-left-btb
                        "
                    >
                        Superpower
                    </Th>
                    <Th
                        className="
                            width-20-db text-align-right-db 
                            width-20-btb text-align-right-btb
                        "
                    >
                        Actions
                    </Th>
                </TheadTr>
            </Thead>
            <Tbody>
                {
                    astronautsData.astronauts.map((astronaut, index) => (
                        <AstronautsTableRow
                            key={index}
                            astronaut={astronaut}
                        />
                    ))
                }
            </Tbody>
        </Table>
    )
}, (prevProps, nextProps) => (true))

export default AstronautsTable

const AstronautsTableRow: React.FC<{ astronaut: astronautType }> = React.memo(({ astronaut }) => {

    const history = useHistory()

    const [deleteAstronaut, {
        data: deleteAstronautData,
        isLoading: deleteAstronautLoading,
        isSuccess: deleteAstronautIsSuccess,
        isError: deleteAstronautIsError,
        error: deleteAstronautError,
    }] = useDeleteAstronautMutation()

    const dispatch: any = useDispatch()

    useEffect(() => {
        if (deleteAstronautIsSuccess) {
            dispatch(
                setToastAlert(
                    "primary success",
                    deleteAstronautData?.message ?
                        deleteAstronautData.message
                        :
                        "The operation was successful"
                )
            )
        }
    }, [deleteAstronautIsSuccess])
    useEffect(() => {
        if (deleteAstronautIsError) {
            const errorMessage = queryErrorMessageHelper(deleteAstronautError)

            dispatch(
                setToastAlert(
                    "primary danger",
                    errorMessage ?
                        errorMessage
                        :
                        "An error occured"
                )
            )
        }
    }, [deleteAstronautIsError])

    const handleEditRedirect = () => {
        history.push(`/astronauts/edit/${astronaut.id}`)
    }
    const handleDelete = () => {
        deleteAstronaut({ astronautId: astronaut.id })
    }

    return (
        <TbodyTr loading={deleteAstronautLoading}>
            <Td>
                {astronaut.name} {astronaut.surname}
            </Td>
            <Td>
                {convertDateTime(astronaut.birthdate)}
            </Td>
            <Td>
                {astronaut.superpower}
            </Td>
            <Td>
                <div
                    className="
                        flex-db justify-content-end-db 
                        flex-btb justify-content-end-btb
                        flex-stb justify-content-center-stb
                        flex-mb justify-content-center-mb
                    "
                >
                    <div className="m-r-2">
                        <Button
                            className="small secondary normal"
                            title="Edit astronaut"
                            onClick={handleEditRedirect}
                        >
                            <span className="btn-icon">
                                <FaRegEdit />
                            </span>
                        </Button>
                    </div>
                    <div>
                        <Button
                            className="small secondary normal"
                            title="Delete astronaut"
                            onClick={handleDelete}
                        >
                            <span className="btn-icon">
                                <FaRegTrashAlt />
                            </span>
                        </Button>
                    </div>
                </div>
            </Td>
        </TbodyTr>
    )
}, (prevProps, nextProps) => (true))