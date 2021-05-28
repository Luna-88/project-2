import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'
import FormPage from './pages/FormPage'
import Admin from './pages/AdminPage'

import PlayerMenu from './components/PlayerMenu'
import InGameMenu from './components/InGameMenu'
import Player from './components/Player'
import World from './components/World'
import TileGrid from './components/TileGrid'

import mainSkin from './assets/images/skins/main.png'
import sidekickSkin from './assets/images/skins/ghost.png'
import world from './assets/images/worlds/world_1.png'
import lightbeam from './assets/images/energies/lightbeam2.png'
import GroundTile from './features/groundTile'

// import grass from './assets/tileset/tiles/grass.png'
import tree from './assets/tileset/tiles/tree-0_0.png'
import tile, { tileValuePairs } from './features/tileValuePairs'

import AdminState from './contexts/admin/AdminState'

import { grassPatch } from './features/getTileImage'

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {/* <GroundTile tile={tileValuePairs[0]}/> */}
                        <div className="fullscreen-container">
                            <div className="fullscreen-container-grass">
                                {grassPatch}
                            </div>
                        </div>
                        {/* <Maptest /> */}
                    </Route>
                    {/* <Route exact path="/">
                        <WelcomePage />
                    </Route> */}
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
                        {/* <World image={world} /> */}

                        {/* <TileGrid /> */}

                        <div className="fullscreen-container">
                            <div
                                className="fullscreen-container-grass"
                                id="heres-your-id-name-duh"
                            >
                                {grassPatch}
                                {/* {mistyForest className="zindex3"} */}
                                {/* <Player
                            skin={lightbeam}
                            sidekick={true}
                            xOffset={0}
                            yOffset={-32}
                            light={true}
                        /> */}
                                <Player skin={mainSkin} />
                                {/* <Player
                            skin={sidekickSkin}
                            sidekick={true}
                            xOffset={16}
                            yOffset={32}
                        /> */}
                            </div>
                        </div>
                        <AdminState>
                            <InGameMenu />
                        </AdminState>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
