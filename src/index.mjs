import express, { response } from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
  { id: 1, username: "saurabh", displayName: "Saurabh" },
  { id: 2, username: "sarvesh", displayName: "Sarvesh" },
  { id: 3, username: "nanhi", displayName: "Nanhi" },
];
const mockProduct = [
  { id: 1, name: "chicken-breast", price: "$250" },
  { id: 2, name: "mutton-breast", price: "$700" },
  { id: 3, name: "fish-cury", price: "$400" },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "hello" });
});
//Users get request
app.get("/api/users", (request, response) => {
  response.send(mockUser);
});
//request params
app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad Request . Invalid ID ." });

  const findUser = mockUser.find((user) => user.id === parsedId);
  if (!findUser) return response.status(404);
  return response.send(findUser);
});
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
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
