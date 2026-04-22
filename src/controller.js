//consultas en la base de datos

import {pool} from './database.js';

class LibroController{
    
    async getAll(req, res){

        try {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);

        }   catch(error) {
            console.log(error);
            res.status(500).json({ error: "Error del servidor"});

        }
    }

    async getOne(req,res){

        try {
        const { id } = req.params;

        const [result] = await pool.query('SELECT * FROM libros WHERE id=(?)', [id]);
        
        if(result.length === 0){
            return res.status(404).json({ error: "No se encontro el libro"})
        }
        
        res.json(result[0]);


        }catch (error){
            console.log(error);
            res.status(500).json({ error: "Error del servidor"});
        }
    }

    async add(req, res){

        try {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, fecha_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.fecha_publicacion, libro.isbn])
        
        res.status(201).json({
            mensaje: "Libro creado",
            id: result.insertId
        });
        
        res.json({"Libro insertado": result.insertId});

        }catch (error){
            console.log(error);
            res.status(500).json({ error: "Error del servidor"});
        }
    }

    async update(req, res){
        const { id } = req.params;

        try {
        const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), fecha_publicacion=(?), isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.fecha_publicacion, libro.isbn, id]);
        
        if(result.affectedRows === 0){
            return res.status(404).json({ mensaje: "Libro no actualizado"})
        }

        res.json({ mensaje: "Libro actualizado"});

    } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error del servidor"});
        }
    }

    
    async delete(req, res){

        try{
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros where isbn=(?)`, [libro.isbn]);
        
        if(result.affectedRows === 0){
            return res.status(404).json({ error: "Libro no encontrado"})
        }
        
        res.json({"Libro eliminado": result.affectedRows});

    } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error del servidor"});
        }
    }

    
}

export const libro = new LibroController();