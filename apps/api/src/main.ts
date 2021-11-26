import * as express from 'express';
import { Health } from '@finnoconsult-test-trivia/api-interfaces';
import * as mysql from 'mysql';
import { checkBody, jwtSign, verifyToken, checkScore } from './utils.js';
import * as axios from 'axios';
import * as cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

//create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'finnoconsult',
});

const started = new Date();

app.get('/api/health', (req, res) => {
  res.send({
    status: 'OK',
    started,
  } as Health);
});

//create table
app.get('/createposttable', (req, res) => {
  const sql =
    'CREATE TABLE IF NOT EXISTS user(id BIGINT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), score INT)';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('table created');
  });
});

//login
app.post('/api/login', checkBody, async (req, res) => {
  try {
    const sql = `SELECT * FROM user WHERE name = '${req.body.name}' LIMIT 1`;
    db.query(sql, (err, payload) => {
      if (err) throw err;
      // if user already exist, tokenize its id
      if (payload.length > 0) {
        const accessToken = jwtSign(payload[0].id);
        return res.status(200).json({ accessToken });
      }
      // if user not exist, register and tokenize its id
      else {
        const detail = {
          name: req.body.name,
          score: 0,
        };
        const register = `INSERT INTO user SET ?`;
        const insertedUser = `SELECT * FROM user WHERE name = '${req.body.name}'`;
        db.query(register, detail, (err, result) => {
          if (err) throw err;
          db.query(insertedUser, (Err, payload) => {
            if (Err) throw Err;
            const accessToken = jwtSign(payload[0].id);
            return res.status(200).json({ accessToken });
          });
        });
      }
    });
  } catch (e) {
    res.status(500).json({ msg: 'uh Oh, somethings not right' });
  }
});

//get questions
app.get('/api/question', async (req, res) => {
  try {
    const questions = await axios.default.get(
      'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986'
    );

    res.status(200).json(questions.data);
  } catch (err) {
    res.status(500).json({ msg: 'uh Oh, somethings not right' });
  }
});

//update score
app.put('/api/score', verifyToken, checkScore, async (req, res) => {
  try {
    const { id } = req.user;
    const detail = {
      score: req.body.newScore,
    };
    const sql = `UPDATE user SET ? WHERE id = '${id}'`;
    db.query(sql, detail, (err, payload) => {
      if (err) throw err;
      res.status(200).json({ msg: `user's score updated` });
    });
  } catch (err) {
    res.status(500).json({ msg: 'uh Oh, somethings not right' });
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
