const express = require('express');
const server = express();
const dotenv = require('dotenv');
dotenv.config();

const loginRouter = require('./routes/loginRoute');
const userWriteFormRouter = require('./routes/userWriteForm');
const submissionRouter = require('./routes/submissionsRoutes');
const dashboardCountController = require('./controllers/dashboardCountController')

const dbConnect = require('./config/dbConnect');
const tokenValidator = require('./middlewares/tokenValidator');
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors')

const port = process.env.PORT || 3001;

dbConnect();
server.use(express.json());
server.use(cors())
server.use('/api', loginRouter,userWriteFormRouter,submissionRouter,dashboardCountController);
// server.use('/api',)

server.use(errorHandler);


server.listen(port, () => {
    console.log(`Server started listening to PORT:${process.env.PORT}`);
})