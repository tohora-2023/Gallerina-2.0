exports.seed = async (knex) => {
  await knex('users').insert([
    {
      id: 1,
      username: 'elisab',
      auth0id: 'google-oauth2|112183669155211890686',
    },
    {
      id: 2,
      username: 'ellar',
      auth0id: 'google-oauth2|112183669155211890686',
    },
    {
      id: 3,
      username: 'biddym',
      auth0id: 'google-oauth2|104589919171674569148',
    },
    { id: 4, username: 'rhap', auth0id: 'google-oauth2|112183669155211890686' },
    {
      id: 5,
      username: 'samuela',
      auth0id: 'google-oauth2|101799526145136227734',
    },
    {
      id: 6,
      username: 'Baerey',
      auth0id: 'google-oauth2|106631567612753268757',
    },
  ])
}
