const express = require('express');
const server = express();
const dotenv = require('dotenv');
dotenv.config();
const loginRouter = require('./routes/loginRoute');
const dbConnect = require('./config/dbConnect');
const tokenValidator = require('./middlewares/tokenValidator');
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors')

const port = process.env.PORT || 3001;

dbConnect();
server.use(express.json());
server.use(cors())
server.use('/api', loginRouter);

server.use(errorHandler);


server.listen(port, () => {
    console.log(`Server started listening to PORT:${process.env.PORT}`);
})