import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

import WelcomePage from './pages/WelcomePage'
import FormPage from './pages/FormPage'
import Admin from './pages/AdminPage'
import HomePage from './pages/HomePage'

import InGameMenu from './components/InGameMenu'
import Player from './components/Player'

import mainSkin from './assets/images/skins/main.png'

// import AdminState from './contexts/admin/AdminState'
import UserState from './contexts/user/UserState'
import DrawTileMap from './components/DrawTileMap'
import EditForm from './components/EditForm'

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
                    <UserState>
                        <Route exact path="/gaia">
                            <div className="world-container">
                                <div className="game-parent-container">
                                    <div className="camera game-child">
                                        <div id="parent">
                                            <DrawTileMap />
                                            <Player skin={mainSkin} />
                                        </div>
                                    </div>
                                    <div className="dialog-box game-child">
                                        <div>Game dialogue goes here?</div>{' '}
                                    </div>
                                </div>
                            </div>
                            {/* <AdminState> */}

                            <InGameMenu />

                            {/* </AdminState> */}
                        </Route>
                    </UserState>
                    <Route path="/edits">
                        <div>EDITS</div>
                        {/* <EditForm /> */}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
