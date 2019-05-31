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
  const load = Math.round(oneSecondAvg / numCpus * 100);

  res.setHeader('Content-Type', 'application/json');

  console.log({ oneSecondAvg, load });

  res.send(
    JSON.stringify({
      load,
    })
  );
});

app.listen(5000, () => console.log('Express server is running on localhost:5000'));
