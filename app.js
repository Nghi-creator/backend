import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRoute from './routes/auth.js';
import orderRoute from './routes/order.js';
import wardRoute from './routes/ward.js';
import provinceRoute from './routes/province.js';
import userRoute from './routes/user.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import auth from './middlewares/auth.js';
import restResponse from './middlewares/restResponse.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(restResponse);
app.use(auth);

app.use('/auth', authRoute);
app.use('/orders', orderRoute);
app.use('/wards', wardRoute);
app.use('/provinces', provinceRoute);
app.use('/users', userRoute);

app.use(notFound);
app.use(errorHandler);

export default app;
