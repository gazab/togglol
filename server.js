const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// enable ssl redirect
app.use(sslRedirect());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));
