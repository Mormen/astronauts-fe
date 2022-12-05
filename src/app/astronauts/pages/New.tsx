import React from 'react'

import AstronautNewEditForm from '../components/newEdit/Form'


const AstronautNew = React.memo(() => {
	return (
		<div className="page-content">
			<AstronautNewEditForm />
		</div>
	)
}, (prevProps, nextProps) => (true))

export default AstronautNew