import HttpStatus from 'http-status';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import Response from './helpers/Response';
import router from './routes'

const app = express();
app.use(cors(), helmet())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/', router);

app.get('/', (req, res) =>
  Response.successMessage(
  res, 
  'Pesa Space APIs',
  '',
  HttpStatus.OK)
);
app.use('*', (req, res) =>
 Response.errorMessage(
  res, 
  'Oops, this route does not exist',
  HttpStatus.NOT_FOUND)
);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on PORT ${port}...`);
})

export default app;
