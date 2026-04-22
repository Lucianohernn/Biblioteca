//consultas en la base de datos

import {pool} from './database.js';

class LibroController{

    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req,res){
        const { id } = req.params;

        const [result] = await pool.query('SELECT * FROM libros WHERE id=(?)', [id]);
        res.json(result);
    }

    /*async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros where isbn=(?)`, [libro.isbn]);
        res.json({"Libro eliminado": result.affectedRows});
    }*/

    
}

export const libro = new LibroController();