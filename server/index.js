import Express from 'express';
import morgan from 'morgan';
import session from './db/index.js';
import helmet from 'helmet';
import 'dotenv/config';

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded());
app.use(morgan('combined'));
app.use(helmet());
import router from './routes.js';
const port = process.env.PORT;

app.use('/', router);

// app.use('/', (req, res) => {
//   let questions = [];
//   session
//     .run('match (q:Question) return q limit 10;')
//     .then(({records}) => {
//       records.forEach(record => {
//         questions.push(record._fields[0].properties)
//       })
//     })
//     .then(() => res.send(questions))
//     .catch((err) => console.log('CATCH occurred'))
// });


app.listen(port, () => {
  console.log(`Server running listening on port ${port}`);
});