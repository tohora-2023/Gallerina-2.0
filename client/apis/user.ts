import request from 'superagent'

export async function addNewUser(token: string, username: string) {
  const response = await request
    .post('/api/v1/user/')
    .set('Authorization', `Bearer ${token}`)
    .send({ username })
  return response.body
}
