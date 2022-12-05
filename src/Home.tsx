import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { clearToastAlert, setClearToastAlertAfterTwoRedirect } from "@ordelogy/ordelogy-fe-lib"

import { Alert } from "@ordelogy/ordelogy-fe-lib"

import AppContainer from './components/AppContainer'


const ToastAlert: React.FC = () => {

	const location = useLocation()

	const { className, alert, clearAfterTwoRedirect } = useSelector((state: any) => state.toastAlert)

	const dispatch: any = useDispatch()

	useEffect(() => {
		if (!clearAfterTwoRedirect) dispatch(clearToastAlert())
		dispatch(setClearToastAlertAfterTwoRedirect(false))
	}, [location])

	const handleClearAlert = () => {
		dispatch(clearToastAlert())
	}

	if (!alert) return null

	return (
		<div className="position-sticky p-4">
			<Alert className={className} alert={alert} onClose={handleClearAlert} />
		</div>
	)
}

const Home: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<AppContainer>
		<ToastAlert />
		{children}
	</AppContainer>
)

export default Home