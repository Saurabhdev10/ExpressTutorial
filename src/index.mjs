import express, { response } from "express";
import routes from '../src/routes/index.mjs';
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from "./utils/constants.mjs";

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
app.use(session({
  secret:'anson the dev',
  saveUninitialized:false,  //dont save unmodified,
  resave:false,  //dont save if not modified
  cookie:{
    maxAge:60000 * 60,
  }
}));
app.use(routes);


//Globally declared middleware
//app.use(loggingMiddleware);


//port environment variable
const PORT = process.env.PORT || 3000;


app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited=true;
  response.cookie("hello","world",{maxAge:100000 ,signed:true});
  response.status(201).send({ msg: "hello" });
});

app.post("/api/auth", (request, response) => {
  const { body:{username,password} } = request;
  const findUser=mockUser.find(user=>user.username===username&&user.password===password);
  if(!findUser||findUser.password!==password)
    return response.status(401).send({msg:"Invalid Credentials"});

  request.session.user=findUser;
  return response.status(200).send(findUser);
});
app.get("/api/auth/status",(request,response)=>{
  request.sessionStore.get(request.session.id,(err,sessionData)=>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  }) 
  if(request.session.user)
    return request.session.user?response.send(request.session.user):response.status(401).send({msg:"Unauthenticated"});
});

/// localhost:3000
/// localhost:3000/users
/// localhost:3000/products?key=value&key2=value2

//Query Params

//Express will http server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
