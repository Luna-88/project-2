import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import UserForm from './pages/FormPage'
import HomePage from './pages/HomePage'
import PlayerMenu from './components/PlayerMenu'
import Admin from './pages/AdminPage'
import InGameMenu from './components/InGameMenu'
import Player from './components/Player'
import World from './components/World'
import mainSkin from './assets/images/skins/main.png'
import sidekickSkin from './assets/images/skins/ghost.png'
import world from './assets/images/worlds/world_1.png'
import lightbeam from './assets/images/energies/lightbeam2.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <h1>Welcome to Gaia</h1>
            <a href='/register'>Start</a>
          </Route>
          <Route exact path='/admin'>
            <Admin />
          </Route>
          <Route exact path='/register'>
            <UserForm
              api='/api/register'
              redirect='/sign-in'
            />
            <p>Already have an account? <a href='/sign-in'>Sign In</a></p>
          </Route>
          <Route exact path='/sign-in'>
            <UserForm
              api='/api/sign-in'
              redirect='/home-page'
            />
            <p>Don't have an account? <a href='/register'>Register</a></p>
          </Route>
          <Route exact path='/home-page'>
            <HomePage />
          </Route>
          <Route exact path='/home-page/single-player'>
            <PlayerMenu />
          </Route>
          <Route exact path='/home-page/multiplayer'>
            <PlayerMenu multiplayer={true} />
          </Route>
          <Route exact path='/gaia'>
            <World image={world} />
            <Player skin={lightbeam} sidekick={true} xOffset={0} yOffset={-32} light={true}/>
            <Player skin={mainSkin} />
            <Player skin={sidekickSkin} sidekick={true} xOffset={16} yOffset={32}/>
            <InGameMenu />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App