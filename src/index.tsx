import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Users } from "./components/users"
import 'bootstrap/dist/css/bootstrap.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Users/>
  </React.StrictMode>
)

reportWebVitals()
