import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import store from 'store/index'
import {
	setClearToastAlertAfterTwoRedirect,
	setToastAlert,
	initForm,
	getForm
} from '@ordelogy/ordelogy-fe-lib'
import {
	useGetAstronautQuery,
	useNewAstronautMutation,
	useEditAstronautMutation
} from 'src/store/queries/astronauts'

import queryErrorMessageHelper from 'myUtils/queryErrorMessageHelper'

import { Button } from '@ordelogy/ordelogy-fe-lib'

import CommonForm from './forms/Common'


interface Props {
	astronautId?: string
}

const AstronautNewEditForm: React.FC<Props> = React.memo(({
	astronautId
}) => {

	const form = "astronaut"

	const history = useHistory()

	const { data: astronautData } = useGetAstronautQuery(
		{ astronautId },
		{ skip: astronautId ? false : true }
	)

	const [newAstronaut, {
		data: newAstronautData,
		isLoading: newAstronautIsLoading,
		isSuccess: newAstronautIsSuccess,
		isError: newAstronautIsError,
		error: newAstronautError,
	}] = useNewAstronautMutation()

	const [editAstronaut, {
		data: editAstronautData,
		isLoading: editAstronautIsLoading,
		isSuccess: editAstronautIsSuccess,
		isError: editAstronautIsError,
		error: editAstronautError,
	}] = useEditAstronautMutation()

	const dispatch: any = useDispatch()

	useEffect(() => {
		if (!astronautId) {
			dispatch(initForm(form, {
				name: "",
				surname: "",
				birthdate: "",
				superpower: ""
			}))
		} else {
			dispatch(initForm(form, {
				name: astronautData.astronaut.name,
				surname: astronautData.astronaut.surname,
				birthdate: astronautData.astronaut.birthdate,
				superpower: astronautData.astronaut.superpower
			}))
		}
	}, [])

	useEffect(() => {
		if (newAstronautIsSuccess) {
			dispatch(setClearToastAlertAfterTwoRedirect(true))
			dispatch(
				setToastAlert(
					"primary success",
					newAstronautData?.message ?
						newAstronautData.message
						:
						"The operation was successful"
				)
			)

			history.push("/astronauts/overview")
		}
	}, [newAstronautIsSuccess])
	useEffect(() => {
		if (newAstronautIsError) {
			const errorMessage = queryErrorMessageHelper(newAstronautError)

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
	}, [newAstronautIsError])

	useEffect(() => {
		if (editAstronautIsSuccess) {
			dispatch(setClearToastAlertAfterTwoRedirect(true))
			dispatch(
				setToastAlert(
					"primary success",
					editAstronautData?.message ?
						editAstronautData.message
						:
						"The operation was successful"
				)
			)

			history.push("/astronauts/overview")
		}
	}, [editAstronautIsSuccess])
	useEffect(() => {
		if (editAstronautIsError) {
			const errorMessage = queryErrorMessageHelper(editAstronautError)

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
	}, [editAstronautIsError])

	const handleSubmit = () => {
		const _form = getForm(store, form)

		if (!astronautId) {
			newAstronaut({ form: _form })
		} else {
			editAstronaut({ astronautId, form: _form })
		}
	}
	const handleCancel = () => {
		history.replace("/astronauts/overview")
	}

	return (
		<div className="border-medium-grey big-radius p-3 position-relative">
			{
				(newAstronautIsLoading || editAstronautIsLoading) && <div className="loader" />
			}
			<div className="border-bottom-medium-grey h1 m-b-3">
				Astronaut detail
			</div>
			<div className="m-b-3">
				<CommonForm
					form={form}
					error={!astronautId ? newAstronautError : editAstronautError}
				/>
			</div>
			<div className="flex justify-content-end">
				<div className="m-r-2">
					<Button className="big secondary normal" onClick={handleCancel}>
						<span>
							Cancel
						</span>
					</Button>
				</div>
				<div>
					<Button className="big primary normal" onClick={handleSubmit}>
						<span>
							Save
						</span>
					</Button>
				</div>

			</div>
		</div >
	)
}, (prevProps, nextProps) => (true))

export default AstronautNewEditForm