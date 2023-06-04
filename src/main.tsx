import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {configure} from "mobx";

configure({
    enforceActions: "never"
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
