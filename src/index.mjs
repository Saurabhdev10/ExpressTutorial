import express, { response } from "express";
import routes from '../src/routes/index.mjs';
import cookieParser from "cookie-parser";

const app = express();
const loggingMiddleware = (request, response, next) => {
  console.log("Request Body:", request.body);
  console.log("Request Method:", request.method);
  console.log("Request URL:", request.url);
  next();
};
app.use(loggingMiddleware);
app.use(express.json());
app.use(cookieParser("secretKey"));
app.use(routes);


//Globally declared middleware
//app.use(loggingMiddleware);


//port environment variable
const PORT = process.env.PORT || 3000;


app.get("/", (request, response) => {
  response.cookie("hello","world",{maxAge:100000 ,signed:true});
  response.status(201).send({ msg: "hello" });
});


/// localhost:3000
/// localhost:3000/users
/// localhost:3000/products?key=value&key2=value2

//Query Params

//Express will http server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
