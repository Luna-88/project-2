import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'
import FormPage from './pages/FormPage'
import Admin from './pages/AdminPage'

import PlayerMenu from './components/PlayerMenu'
import InGameMenu from './components/InGameMenu'
import Player from './components/Player'

import mainSkin from './assets/images/skins/main.png'

import AdminState from './contexts/admin/AdminState'
// import PlayerState from './contexts/player/PlayerState'
import DrawTileMap from './components/DrawTileMap'

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
                    </Route>
                    <Route exact path="/home-page/single-player">
                        <PlayerMenu />
                        <a href="/gaia">Explore Gaia</a>
                    </Route>
                    <Route exact path="/home-page/multiplayer">
                        <PlayerMenu multiplayer={true} />
                    </Route>
                    <Route exact path="/gaia">
                        <div className='camera'>
                            <div id='parent' >
                                <DrawTileMap />
                                <Player skin={mainSkin} />
                            </div>

                        </div>
                        <AdminState>
                            {/* <PlayerState> */}
                            {/* <InGameMenu /> */}
                            {/* </PlayerState> */}
                        </AdminState>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App