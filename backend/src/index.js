require('dotenv').config();

const { createApp } = require('./app');

const port = process.env.PORT || 3001;

createApp().listen(port, () => {
  console.log(`API em http://127.0.0.1:${port}`);
});
