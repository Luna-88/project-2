import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

import WelcomePage from './pages/WelcomePage'
import FormPage from './pages/FormPage'
import Admin from './pages/AdminPage'
import HomePage from './pages/HomePage'

// import AdminState from './contexts/admin/AdminState'
import InGameMenu from './components/InGameMenu'
import EditUserForm from './components/EditUserForm'
import EditGameForm from './components/EditGameForm'
import GaiaGame from './components/GaiaGame'

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route exact path="/admin">
                        <Admin />
                    </Route>
                    <Route exact path="/register">
                        <FormPage />
                    </Route>
                    <Route exact path="/sign-in">
                        <FormPage isRegister={true} />
                    </Route>
                    <Route exact path="/home-page">
                        <HomePage />
                        <a href="/gaia">Explore Gaia</a>
                    </Route>
                    <Route path="/edit/user/:userId">
                        <EditUserForm />
                    </Route>
                    <Route path="/edit/game/:gameId">
                        <EditGameForm />
                    </Route>
                    <Route exact path="/gaia">
                        <GaiaGame />
                        <InGameMenu />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
