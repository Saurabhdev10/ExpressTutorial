import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  // plain text on browser
  // response.send('Hello world');
  //    json text in browser
  //  response.send({'msg':'Hello world'});
  response.status(201).send({ msg: "hello" });
});

app.get("/users", (request, response) => {
  response.send([
    { id: 1, username: "saurabh", displayName: 'Saurabh' },
    { id: 2, username: "sarvesh", displayName: "Sarvesh"},
    { id: 3, username: "nanhi", displayName: "Nanhi" },
  ]);
});

app.get('/api/products',(request,response)=>{
    response.send([
        { id: 1, name: "chicken-breast", price: "$250" },
    { id: 2, name: "mutton-breast", price: "$700"},
    { id: 3, name: "fish-cury", price: "$400" },
    ])
})
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
