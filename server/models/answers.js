import driver from '../db/index.js';
export default {
  fetch: async (questionId, offset, count) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    let answers = [];
    return session.readTransaction(async (txc) => {
      const result =
        await txc.run(`MATCH(q:Question {id: ${questionId}})-[:HAS_ANSWER]->(a:Answer) OPTIONAL MATCH (a)-[:HAS_PHOTO]->(ap: AnswerPhotos)
        WITH a, collect(ap{id:ap.id, url:ap.url}) AS answerPhotos
        RETURN (a {.*, photos: answerPhotos}) SKIP ${offset} LIMIT ${count}`);
      return result;
    })
      .then(({records}) => {
        records.forEach((record) => {
          const data=record._fields[0];
          answers.push({
            answer_id: data.id,
            body: data.body,
            date: new Date(data.date_written).toString(),
            answerer_name: data.answerer_name,
            helpfulness: data.helpful,
            photos: data.photos || []
          });
        })
        return ({
          question: questionId,
          page: page - 1,
          count: count,
          results: answers
        });

      })
      // .catch((err) => console.log('error in answer model catch'));
      .catch((err) => {throw err});

  },

  add: async (questionId, answer) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    return session.writeTransaction(async (txc) => {
      const result =
        await txc.run(`
        MATCH (q:Question {id: ${questionId}}) CREATE (q)-[:HAS_ANSWER]->(a:Answer {
          answerer_email: ${answer.email},
          answerer_name: ${answer.name},
          body: ${answer.body},
          date_written: ${Number(new Date()).toString()},
          helpful: ${0},
          question_id: ${questionId},
          reported: ${0}
        })
        `);
      return result;
    })
    .then((result) => result)
    .catch((err) => {throw err});
  },

  helpful: async(answerId) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    return session.writeTransaction(async (txc) => {
      const result =
        await txc.run(`
        MATCH (a:Answer {id: ${answerId}}) SET a.helpful = a.helpful + 1
        `);
      return result;
    })
    .then((result) => result)
    .catch((err) => {throw err});
  },

  report: async(answerId) => {
    const session = driver.session({
      database: 'questionsandanswers',
    });
    return session.writeTransaction(async (txc) => {
      const result =
        await txc.run(`
        MATCH (a:Answer {id: ${answerId}}) SET a.reported = a.reported + 1
        `);
      return result;
    })
    .then((result) => result)
    .catch((err) => {throw err});
  }
};
