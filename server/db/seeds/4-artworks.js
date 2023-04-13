exports.seed = async (knex) => {
  await knex('artworks').insert([
   { id: 1, title: 'Der Kuss', image: 'https://d32dm0rphc51dk.cloudfront.net/NOpIAwQa-3r51Cg9qXKbfA/medium.jpg'},
   { id: 2, title: 'The Third of May', image: 'https://d32dm0rphc51dk.cloudfront.net/m4X41Fun8gpDjn7Gat9cUg/medium.jpg'},
   { id: 3, title: 'The Night Watch', image: 'https://d32dm0rphc51dk.cloudfront.net/IG8ZLvVmZgQiTn2zK0Bp8w/medium.jp '},
   { id: 4, title: 'leonardo-da-vinci-mona-lisa', image: 'https://d32dm0rphc51dk.cloudfront.net/5L1xjKC_und1uiKCpUPHhw/medium.jpg'}
  ])
}
