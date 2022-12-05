import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import ErrorLogo from 'src/components/ErrorLogo'

import Home from './Home'

import AstronautsOverview from './app/astronauts/pages/Overview'
import AstronautNew from './app/astronauts/pages/New'
import AstronautEdit from './app/astronauts/pages/Edit'


const App: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/error">
                <ErrorLogo message="An error occured" />
            </Route>
            <Route exact path={["/", "/astronauts", "/astronauts/overview"]}>
                <Home>
                    <AstronautsOverview />
                </Home>
            </Route>
            <Route exact path={["/astronauts/new"]}>
                <Home>
                    <AstronautNew />
                </Home>
            </Route>
            <Route exact path={["/astronauts/edit/:astronaut_id"]}>
                <Home>
                    <AstronautEdit />
                </Home>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default App