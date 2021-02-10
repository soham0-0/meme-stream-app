import pool from "../database/db.js";

export const getMemes = async (request, response) => {
    try {
        const {rows: memes} = await pool.query(
            "SELECT * FROM tab_memes ORDER BY id DESC LIMIT 100"
        );
        response.json(memes);
    } catch (error) {
        console.log(error.message);
    }
};

export const getMeme = async (request, response) => {
    try {
        const {id} = request.params;
        const meme = await fetchByID(id);
        if(meme) {
            response.json(meme); 
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const createMeme = async (request, response) => {
    try {
        const { name, url, caption } = request.body;
        if(await checkDuplicate(name, url, caption)){
            response.sendStatus(409);
            return ;
        }
        
        const { rows: newMeme } = await pool.query(
            "INSERT INTO tab_memes (name, url, caption) VALUES($1, $2, $3) RETURNING id",
            [name, url, caption]
        );
        response.json(newMeme[0]);
    } catch (error) {
        console.log(error.message);   
    }
};

export const patchMeme = async (request, response) => {
    try {
        const { id } = request.params;
        let meme = await fetchByID(id);
        if(!meme) {
            response.sendStatus(404);
            return ;
        }
        
        const { url, caption } = request.body;
        if(url) {
            meme.url = url;
        }
        if(caption) {
            meme.caption = caption;
        }

        if(await checkDuplicate(meme.name, meme.url, meme.caption)) {
            response.sendStatus(409);
            return ;
        }
        const newMeme = await pool.query(
            "UPDATE tab_memes SET url = $1, caption = $2 WHERE id = $3",
            [meme.url, meme.caption, id]
        );
        response.sendStatus(200);
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteMeme = async (request, response) => {
    try {
        const {id} = request.params;
        const {pass} = request.body;
        if(pass != "lieutenant") {
            response.sendStatus(401);
            return ;
        }
        const { rowCount } = await pool.query(
            "DELETE FROM tab_memes WHERE id = $1",
            [id]
        )
        if(rowCount) {
            response.sendStatus(200);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const fetchByID = async (id) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM tab_memes WHERE id = $1",
            [id]
        );
        return rows[0];
    } catch (error) {
        console.log(error.message);
    }
};

const checkDuplicate = async (name, url, caption) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM tab_memes WHERE name = $1 AND url = $2 AND caption = $3",
            [name, url, caption]
        );
        return rows.length !== 0;
    } catch (error) {
        console.log(error.message);
    }
};