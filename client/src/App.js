import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import UserForm from './components/UserForm'
import HomePage from './components/HomePage'
import PlayerMenu from './components/PlayerMenu'
import Admin from './components/Admin'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
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
          <Route path='/'>
            <h1>Welcome to Gaia</h1>
            <a href='/register'>Start</a>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App