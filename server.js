const express = require('express');
const app = express();

// our airports json
const airports = require('./airports.json');

// swagger components
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// swagger config
const swaggerOptions = require('./openapi');

/**
 * @swagger
 * tags:
 *   name: Airports
 *   description: Airport management
 *
 */

/**
 * @swagger
 * /airports:
 *   get:
 *    summary: Returns a list of all airports
 *    responses:
 *      200:
 *        description: an array of JSON objects that represent each airport
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Airport'
 *      500:
 *        description: Internal Server Error (something went wrong)
 *      503:
 *        description: Service currently unavailable
 */
app.get('/airports', (req, res) => {
  res.send(airports);
});

/**
 * @swagger
 * /airports/{icao}:
 *   get:
 *    summary: Return a specific airport based on its unique ID.
 *    parameters:
 *      - in: path
 *        required: true
 *        name: icao
 *        description: Unique airport ID
 *        schema:
 *          type: string
 *          required:
 *            - icao
 *          properties:
 *            icao:
 *              type: string
 *    responses:
 *      200:
 *        description: Successfully located and returned an airport with the specified ID.
 *      400:
 *        description: Bad Request. Does the specified ID relate to an airport?
 */
app.get('/airports/:icao', (req, res) => {
  const icao = req.params.icao;
  const result = airports.filter((airport) => {
    airport.icao === icao;
  });
  res.send(result);
});

/**
 * @swagger
 * /airports:
 *  post:
 *    summary: Add a new airport
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref:  '#/components/schemas/Airport'
 *    responses:
 *      201:
 *        description: New Airport Object Created.
 *      400:
 *        description: Bad request. Was your syntax correct?
 */
app.post('/airports', (req, res) => {});

/**
 * @swagger
 * /airports/{icao}:
 *  put:
 *    summary: Replace the entire representation of a target airport
 *    parameters:
 *      - in: path
 *        required: true
 *        name: icao
 *        description: Unique airport ID
 *        schema:
 *          type: string
 *          required:
 *            - icao
 *          properties:
 *            icao:
 *              type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref:  '#/components/schemas/Airport'
 *    responses:
 *      200:
 *        description: OK. Target airport replaced.
 *      401:
 *        description: Unauthorized attempt to replace a target airport.
 *      400:
 *        description: Bad request. Check syntax of request body.
 */
app.put('/airports/:icao', (req, res) => {});

/**
 * @swagger
 * /airports/{icao}:
 *  patch:
 *    summary: Replace a specific property of a specific airport
 *    parameters:
 *      - in: path
 *        required: true
 *        name: icao
 *        description: Unique airport ID
 *        schema:
 *          type: string
 *          required:
 *            - icao
 *          properties:
 *            icao:
 *              type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Airport'
 *    responses:
 *      200:
 *        description: OK. Target property of target airport replaced.
 *      401:
 *        description: Unauthorized attempt to replace target properties of a target airport.
 *      400:
 *        description: Bad request. Check syntax of request body.
 */
app.patch('/airports/:icao', (req, res) => {});

/**
 * @swagger
 * /airports/{icao}:
 *  delete:
 *    summary: Delete an airport from the collection of airports
 *    parameters:
 *      - in: path
 *        required: true
 *        name: icao
 *        description: Unique airport ID
 *        schema:
 *          type: string
 *          required:
 *            - icao
 *          properties:
 *            icao:
 *              type: string
 *    responses:
 *      200:
 *        description: OK. Specified airport has been deleted.
 *      401:
 *        description: Unauthorised attempt to delete an airport.
 *      400:
 *        description: Bad request. Does this id relate to an existing airport.
 */
app.delete('/airports/:icao', (req, res) => {});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

module.exports = app;