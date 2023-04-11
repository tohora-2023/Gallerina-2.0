import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import nock from 'nock'

import App from './App'
import store from '../store'

it('renders fruits', async () => {
  nock('http://localhost')
    .get('/api/v1/fruits')
    .reply(200, { fruits: ['apple', 'banana'] })

  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(await screen.findAllByRole('listitem')).toHaveLength(2)
})
