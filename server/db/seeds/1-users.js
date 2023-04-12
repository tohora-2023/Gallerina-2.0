exports.seed = async (knex) => {
  await knex('users').insert([
    { id: 1, username: 'elisab', auth0id: 'bsd24gyg55w56dd7a'},
    { id: 2, username: 'ellar', auth0id: '8hskgyg55is830pa'},
    { id: 3, username: 'biddym', auth0id: '4gyg5bs6dd7ad25w5'},
    { id: 4, username: 'rhap', auth0id: 'ege666bsd2w5744g20p'}
  ])
}
