import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import UserForm from './components/UserForm'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <UserForm
              api='/api/register'
            />
          </Route>
          <Route exact path="/signIn">
            <UserForm
              api='/api/signIn'
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
