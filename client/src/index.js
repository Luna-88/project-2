import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

// Adding these in from sample react-rpg
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import store, { persistor } from "./config/store"
// import Spinner from './components/spinner';

// Original Game CSS
// import "./index_dark.css"

// supresses enormous amount of console.logs
/* global soundManager:false */
import "react-sound"

soundManager.setup({
    debugMode: false,
    ignoreMobileRestrictions: true,
})

//

ReactDOM.render(
    <React.StrictMode>
        {/* Adding these in from sample react-rpg */}
        <Provider store={store}>
            <PersistGate
                // loading={<Spinner />}
                persistor={persistor}
            >
                <App />
            </PersistGate>
        </Provider>
        {/*  */}
    </React.StrictMode>,
    document.getElementById("root")
)

reportWebVitals()
