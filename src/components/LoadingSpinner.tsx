import React from 'react'
import './LoadingSpinner.scss'

import { ImSpinner6 } from 'react-icons/im'


const LoadingSpinner: React.FC = () => (
	<div className="loading-spinner">
		<ImSpinner6 size={40} />
	</div>
)

export default LoadingSpinner