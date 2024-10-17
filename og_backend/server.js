const express = require('express');
const server = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();


const loginRouter = require('./routes/loginRoute');
const userWriteFormRouter = require('./routes/userWriteForm');
const submissionRouter = require('./routes/submissionsRoutes');
const dashboardCountController = require('./controllers/dashboardCountController')
const userProfileRouter = require('./routes/userProfileRoute');

const dbConnect = require('./config/dbConnect');
const tokenValidator = require('./middlewares/tokenValidator');
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors')

const port = process.env.PORT || 3001;

dbConnect();
server.use(express.json({ limit: '10mb' })); // This handles JSON body parsing with a limit
server.use(express.urlencoded({ limit: '10mb', extended: true })); // Handles URL-encoded payloads

server.use(cors())

server.use('/api', loginRouter,userWriteFormRouter,submissionRouter,userProfileRouter,);
server.use('/api',dashboardCountController)

server.use(errorHandler);


server.listen(port, () => {
    console.log(`Server started listening to PORT:${process.env.PORT}`);
})