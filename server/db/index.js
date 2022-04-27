// const neo4j = require('neo4j-driver');
import neo4j from 'neo4j-driver';
import 'dotenv/config';
console.log(process.env.NEO4J, process.env.PASS)
const driver = neo4j.driver(
  process.env.DATABASE,
  neo4j.auth.basic(process.env.NEO4J, process.env.PASS),
  {disableLosslessIntegers: true}
);

const session = driver.session({
  database: 'questionsandanswers',
});

export default driver;

