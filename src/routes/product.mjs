import { Router } from "express";

import { mockProduct } from "../utils/constants.mjs";

const router =Router();

router.get("/api/products", (request, response) => {
  response.send(mockProduct);
});


//request params
router.get("/api/products/:id", (request, response) => {
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
  });
  

export default router