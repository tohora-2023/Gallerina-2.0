import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <Auth0Provider
  domain=''
  clientId=''
  redirectUri={window.location.origin}
  audience='https://gallerina/api'
>
  <BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter >
  </Auth0Provider>
)
