import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import './styles/tailwind.css'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="gallerina-inc.au.auth0.com"
      clientId="lhLz4MdYY9IeyvDFmYzSwZUSqv4pp0rZ"
      redirectUri={window.location.origin}
      audience="https://gallerina/api"
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  )
})
