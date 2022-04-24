import session from '../db/index.js'
export default {
  fetch: (productId, page, count) => {
    let questions = [];
    return session
      .run(`match (q:Question) where q.product_id=${productId} return q limit ${count};`)
      .then(({records}) => {
          records.forEach(record => {
            questions.push(record._fields[0].properties)
          })
        })
      .then(() => questions)
      .catch(err => console.log('error in model catch'));
  }
}