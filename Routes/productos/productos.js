const express = require('express');
const Contenedor = require('../../contenedor');
const fs = require('fs');


let producto = new Contenedor("Productos");

const { Router } = express;
 
let router = new Router();

router.get('/productos', (req, res) => {
    producto.getAll().then(prod =>res.send(prod));
})


router.get('/productos/:id', (req, res) => {
    let id = parseInt(req.params.id);
    producto.getById(id).then(prod => res.send(prod));
})


router.post('/productos', (req, res) => {

    let {title, price, thumbnail} = req.body;

    producto.save({title, price, thumbnail})
    res.redirect('/');   
})


router.put('/productos/:id', (req, res) => {

    let read = JSON.parse(fs.readFileSync(`${producto.name}.json`));
    
    let id = parseInt(req.params.id);

    if (read.length >= id){

        read [id-1] = {...req.body, id: id};
    
        fs.writeFileSync(`${producto.name}.json`, JSON.stringify(read,null,2));

        res.send(`Producto modificado`);

    }else{
        res.send(`No existe el ID: ${id}`);
    }
}) 


router.delete('/productos/:id', (req, res) => {

    let id = parseInt(req.params.id);

    producto.deleteById(id).then((resp)=>{

        if (resp){
            res.json(resp);
        }else{
            res.send(`El producto con ID: ${id} no existe`);
        }
        
    })
}) 



module.exports = router; 
