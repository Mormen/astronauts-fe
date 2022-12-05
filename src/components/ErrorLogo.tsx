import React from 'react'
import './ErrorLogo.scss'

import { TfiFaceSad } from 'react-icons/tfi'


const ErrorLogo: React.FC<{ message?: string }> = ({ message = "" }) => (
	<>
		<div className="error-logo--icon">
			<TfiFaceSad size={40} />
		</div>
		<div className="error-logo--message">
			{message ? message : "Upps :("}
		</div>
	</>
)

export default ErrorLogo