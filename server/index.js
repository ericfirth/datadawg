const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

var os = require('os');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/load', (req, res) => {
  const [oneSecondAvg] = os.loadavg();
  const numCpus = os.cpus().length;

  res.setHeader('Content-Type', 'application/json');

  res.send(
    JSON.stringify({
      load: oneSecondAvg / numCpus,
    })
  );
});

app.listen(5000, () => console.log('Express server is running on localhost:5000'));
