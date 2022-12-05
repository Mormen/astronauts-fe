import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setToastAlert } from '@ordelogy/ordelogy-fe-lib'
import { useGetAstronautQuery } from 'store/queries/astronauts'

import queryErrorMessageHelper from 'myUtils/queryErrorMessageHelper'

import LoadingSpinner from 'src/components/LoadingSpinner'
import ErrorLogo from 'src/components/ErrorLogo'

import AstronautNewEditForm from '../components/newEdit/Form'


const AstronautEdit: React.FC = React.memo(() => {

	const { astronaut_id: astronautId } = useParams<{ astronaut_id: string }>()

	const {
		data: astronautData,
		isLoading: astronautIsLoading,
		isFetching: astronautIsFetching,
		isError: astronautIsError,
		error: astronautError
	} = useGetAstronautQuery({ astronautId })

	const dispatch: any = useDispatch()

	useEffect(() => {
		if (astronautIsError) {
			const errorMessage = queryErrorMessageHelper(astronautError)

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
	}, [astronautIsError])

	if (astronautIsLoading || astronautIsFetching) return (
		<div className="page-content">
			<div className="p-7"><LoadingSpinner /></div>
		</div>
	)

	if (astronautIsError) return (
		<div className="page-content">
			<ErrorLogo />
		</div>
	)

	if (astronautData) return (
		<div className="page-content">
			<AstronautNewEditForm astronautId={astronautId} />
		</div>
	)

	return null
}, (prevProps, nextProps) => (true))

export default AstronautEdit