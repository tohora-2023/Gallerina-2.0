import connection from '../connection'
import { getAllArt } from '../artworks'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getAllBooks all artworks', () => {
    it('returns all artworks', async () => {
      expect.assertions(1)

      const artworks = await getAllArt()
      
      expect(artworks).toHaveLength(4)
        
    })
})