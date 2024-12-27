import express, { response } from "express";

const app = express();

app.use(express.json());

const loggingMiddleware =(request,response,next)=>{
  console.log("Request Body:",request.body);
  console.log("Request Method:",request.method);
  console.log("Request URL:",request.url);
  next();
}

//Globally declared middleware
app.use(loggingMiddleware);
//port environment variable
const PORT = process.env.PORT || 3000;

const mockUser = [
  { id: 1, username: "saurabh", displayName: "Saurabh" },
  { id: 2, username: "sarvesh", displayName: "Sarvesh" },
  { id: 3, username: "nanhi", displayName: "Nanhi" },
  { id: 4, username: "ananya", displayName: "Ananya" },
  { id: 5, username: "rohit", displayName: "Rohit" },
  { id: 6, username: "priya", displayName: "Priya" },
  { id: 7, username: "deepak", displayName: "Deepak" },
  { id: 8, username: "rahul", displayName: "Rahul" },
  { id: 9, username: "kavya", displayName: "Kavya" },
];
const mockProduct = [
  { id: 1, name: "chicken-breast", price: 250 },
  { id: 2, name: "mutton-breast", price: 700 },
  { id: 3, name: "fish-cury", price: 400 },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "hello" });
});
//Users get request
app.get("/api/users", (request, response) => {
  console.log("get users",request.query);
  const {
    query: { filter, value },
  } = request;
  //when filterand value arre undefined
  if(!filter && !value) return response.send(mockUser);
  if (filter && value)
    return response.send(
mockUser.filter((user)=>user[filter].includes(value))
);
});
//request params
app.get("/api/users/:id", (request, response) => {
  console.log("get users id:",request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad Request . Invalid ID ." });
  //find user using id
  const findUser = mockUser.find((user) => user.id === parsedId);
  if (!findUser) return response.status(404);
  return response.send(findUser);
});
//PUT Request
app.put("/api/users/:id",(request,response)=>{
  const {
    body,
    params :{id},
  } = request;
  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUser.findIndex((user)=>user.id===parsedId);
  if(findUserIndex===-1) return response.sendStatus(404);
  mockUser[findUserIndex]={id:parsedId,...body};
  return response.sendStatus(200);
})

///patch request
app.patch("/api/users/:id",(request,response)=>{
  const {
    body,
    params :{id},
  } = request;
  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUser.findIndex((user)=>user.id===parsedId);
  if(findUserIndex===-1) return response.sendStatus(404);
  mockUser[findUserIndex]={...mockUser[findUserIndex],...body};
  return response.sendStatus(200);
})

///delete request
app.delete("/api/users/:id",(request,response)=>{
  const {params :{id}} = request;
  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUser.findIndex((user)=>user.id===parsedId);
  if(findUserIndex===-1) return response.sendStatus(404);
  mockUser.splice(findUserIndex,1);
  return response.sendStatus(200);
})

//products get request
app.get("/api/products", (request, response) => {
  response.send(mockProduct);
});

//request params
app.get("/api/products/:id", (request, response) => {
  console.log(request.params);
  const parseProductId = parseInt(request.params.id);
  if (isNaN(parseProductId))
    return response.status(400).send({ msg: "Bad Request .Invalid ID ." });

  //find product using product id
  const findProduct = mockProduct.find(
    (product) => product.id === parseProductId
  );
  if (!findProduct)
    return response
      .status(404)
      .send({ msg: "Bad Request, Product not Exist with this id" });
  return response.send(findProduct);
  console.log(request.params.id);
});

/// localhost:3000
/// localhost:3000/users
/// localhost:3000/products?key=value&key2=value2

//Query Params

//Express will http server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
