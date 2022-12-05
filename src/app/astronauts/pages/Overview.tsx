import React, { useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setToastAlert } from '@ordelogy/ordelogy-fe-lib'
import { useGetAstronautsQuery } from 'store/queries/astronauts'

import queryErrorMessageHelper from 'myUtils/queryErrorMessageHelper'

import { FaPlus } from 'react-icons/fa'

import { Button, Pagination } from '@ordelogy/ordelogy-fe-lib'

import LoadingSpinner from 'src/components/LoadingSpinner'
import ErrorLogo from 'src/components/ErrorLogo'

import AstronautsFilter from '../components/overview/Filters'
import AstronautsTable from '../components/overview/Table'


const AstronautsOverview: React.FC = React.memo(() => {

    const history = useHistory()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const params = Object.fromEntries(searchParams)

    const {
        data: astronautsData,
        isLoading: astronautsIsLoading,
        isError: astronautsIsError,
        error: astronautsError,
    } = useGetAstronautsQuery({ filters: location.search })

    const dispatch: any = useDispatch()

    useEffect(() => {
        if (astronautsIsError) {
            const errorMessage = queryErrorMessageHelper(astronautsError)

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
    }, [astronautsIsError])

    const handleNewAstronautRedirect = () => {
        history.push("/astronauts/new")
    }

    if (astronautsIsLoading) return (
        <div className="page-content">
            <div className="p-7"><LoadingSpinner /></div>
        </div>
    )

    if (astronautsIsError) return (
        <div className="page-content">
            <ErrorLogo />
        </div>
    )

    if (
        astronautsData &&
        !astronautsData.astronauts.length &&
        !Object.keys(params).length
    ) return (
        <div className="page-content">
            <div className="h1 text-align-center m-b-3">
                There is no astronaut saved in the database
            </div>
            <div className="flex justify-content-center">
                <div>
                    <Button className="primary normal" onClick={handleNewAstronautRedirect}>
                        <span>
                            Add astronaut
                        </span>
                        <span className="btn-icon right">
                            <FaPlus />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )

    if (astronautsData) return (
        <div className="page-content">
            <div className="flex justify-content-end m-b-4">
                <div>
                    <Button className="primary normal" onClick={handleNewAstronautRedirect}>
                        <span>
                            Add astronaut
                        </span>
                        <span className="btn-icon right">
                            <FaPlus />
                        </span>
                    </Button>
                </div>
            </div>
            <div className="m-b-4">
                <AstronautsFilter />
            </div>
            <div className="m-b-4">
                <AstronautsTable />
            </div>
            <div>
                <Pagination
                    totalResults={astronautsData.pagination.total_results}
                    perPage={astronautsData.pagination.limit}
                />
            </div>
        </div>
    )

    return null
}, (prevProps, nextProps) => (true))

export default AstronautsOverview
