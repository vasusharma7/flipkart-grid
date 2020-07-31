const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();
connectDB();

const port = process.env.PORT || 5000;
const usersRouter = require('./routes/users');
const commonsRouter = require('./routes/commons');

//app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ limit: '50mb' }));
// app.use('/api/users', usersRouter);
app.use('/api/users', usersRouter);
app.use('/api/commons', commonsRouter);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
