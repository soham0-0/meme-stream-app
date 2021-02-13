import express from "express";
import { getMemes, getMeme, createMeme, patchMeme, deleteMeme } from "../controllers/memes.js"

const router = express.Router();

/**
* @swagger
* /memes:
*   get: 
*       summary: Get recent 100 memes
*       responses: 
*           '200':
*                description: Success
*/
router.get("/", getMemes);

/**
 * @swagger
 * /memes/{id}:
 *  get:
 *      summary: Get meme by id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Meme ID
 *            schema:
 *              type: integer
 *              required : true
 *      responses:
 *          '200': 
 *              description: Success
 *          '404': 
 *              description: Does Not Exist
 */
router.get("/:id", getMeme);

/**
 * @swagger
 * /memes:
 *  post:
 *      summary: Create new meme post
 *      consumes: 
 *          -   application/json
 *      parameters: 
 *          -   in: body
 *              name: meme
 *              description: The meme data
 *              schema:
 *                  type: object
 *                  required: 
 *                      - name
 *                      - url
 *                      - caption
 *                  properties: 
 *                      name:
 *                          type: string
 *                      url: 
 *                          type: string
 *                      caption:
 *                          type: string  
 *      responses: 
 *          '200': 
 *              description: Success
 *          '409': 
 *              description: Already Exists
 *          '400':
 *              description: Invalid Image URL / Input Field Missing / Undocumented Error
 */
router.post("/", createMeme);

/**
 * @swagger
 * /memes/{id}:
 *  patch:
 *      summary: Edit meme using id
 *      consumes: 
 *          -   application/json
 *      parameters: 
 *          -   in: path
 *              name: id
 *              schema: 
 *                  type: integer
 *                  required: true
 *          -   in: body
 *              name: meme
 *              description: The meme data
 *              schema:
 *                  type: object
 *                  required:
 *                      - url
 *                      - caption
 *                  properties:
 *                      url: 
 *                          type: string
 *                      caption:
 *                          type: string  
 *      responses: 
 *          '200': 
 *              description: Success
 *          '404': 
 *              description: Does Not Exist
 *          '409': 
 *              description: Already Exists
 *          '400':
 *              description: Invalid Image URL / No Input / Undocumented Error
 */
router.patch("/:id", patchMeme);

/**
 * @swagger
 * /memes/{id}:
 *  delete:
 *      summary: Delete meme by id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Meme ID
 *            schema:
 *              type: integer
 *              required : true
 *          - in: body
 *            name: Password
 *            description: Delete Password
 *            schema:
 *              type: object
 *              required:
 *                  - pass
 *              properties:
 *                  pass:
 *                      type: string 
 *      responses:
 *          '200': 
 *              description: Success
 *          '404': 
 *              description: Does Not Exist
 *          '401':
 *              description: Unauthorized
 */
router.delete("/:id", deleteMeme);

export default router;