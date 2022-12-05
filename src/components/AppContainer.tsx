import React from 'react'
import './AppContainer.scss'

import { useHistory } from 'react-router-dom'

import { FaUserAstronaut } from 'react-icons/fa'


const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const history = useHistory()

	const handleAstronautsOverviewRedirect = () => {
		history.push("/astronauts/overview")
	}

	return (
		<div className="html-container">
			<div className="app-container">
				<div className="app-container--header">
					<div className="app-container--header--icon">
						<FaUserAstronaut size={30} />
					</div>
					<div
						className="app-container--header--title"
						onClick={handleAstronautsOverviewRedirect}
					>
						Astronaut system
					</div>
				</div>
				<div>
					{children}
				</div>
			</div>
		</div>
	)
}

export default AppContainer