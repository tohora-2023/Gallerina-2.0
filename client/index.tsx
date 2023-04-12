import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(

    // <Auth0Provider
    //   domain="tohora-2023-elisa.au.auth0.com"
    //   clientId="h4LN8e7tERYIjcoz09Lbj9EsvEsW35Sa"
    //   redirectUri={window.location.origin}
    //   audience="https://gallerina/api"
    // >
    <BrowserRouter >
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter >
    // </Auth0Provider>
  )
})
