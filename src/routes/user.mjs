import { Router } from "express";
import { query, validationResult, matchedData ,checkSchema} from "express-validator";
import { mockUser } from "../utils/constants.mjs";
import { resolveIndexByUserId } from '../utils/middlewares.mjs';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage(
      "filter should be string and length should be between 3 to 10"
    ),
  (request, response) => {
    const result = validationResult(request);
    console.log("result", result);
    //console.log("get users", request["express-validator#contexts"]);
    const {
      query: { filter, value },
    } = request;
    //when filterand value arre undefined
    if (filter && value)
      return response.send(
        mockUser.filter((user) => user[filter].includes(value))
      );
    return response.send(mockUser);
  }
);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    console.log("result", result);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });
    const data = matchedData(request);

    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...data };
    mockUser.push(newUser);
    return response.status(201).send(newUser);
  }
);
router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

///patch request
router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUser[findUserIndex] = { ...mockUser[findUserIndex], ...body };
  return response.sendStatus(200);
});

///delete request
router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUser.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
