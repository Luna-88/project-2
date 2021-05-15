import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import UserForm from './components/UserForm'
import HomePage from './components/HomePage'
import SinglePlayer from './components/SinglePlayer'
import InGameMenu from './components/InGameMenu'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/register">
            <UserForm
              api='/api/register'
            />
          </Route>
          <Route exact path="/sign-in">
            <UserForm
              api='/api/sign-in'
            />
          </Route>
          <Route exact path="/home-page">
            <HomePage />
          </Route>
          <Route exact path="/home-page/single-player">
            <SinglePlayer />
          </Route>
          <Route exact path="/in-game-menu">
            <InGameMenu />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
