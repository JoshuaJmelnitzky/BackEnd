const express = require('express');
const Contenedor = require('../../contenedor');
const fs = require('fs');


let producto = new Contenedor("Productos");

const { Router } = express;
 
let router = new Router();


router.get('/:id?', (req, res) => {
    if (req.params.id){
        let id = parseInt(req.params.id);
        producto.getById(id).then(prod => res.send(prod));
    }else{
        producto.getAll().then(prod =>res.send(prod));
    }
})


router.post('/', (req, res) => {

    if(req.query.admin){

        let {title, descripcion, price, stock, codigo, thumbnail} = req.body;

        producto.save({title, descripcion, price, stock, codigo, "timestamp": Date.now(), thumbnail})
            .then(prod => producto.getById(parseInt(prod)))
            .then(prod => res.send(prod));   

    }else{
        res.send({error: -1, método: "post", descripcion: `Acceso no autorizado a ${req.url}`} );
    }

})


router.put('/:id', (req, res) => {

    if(req.query.admin){

        producto.getAll().then((prod)=> {
            let id = parseInt(req.params.id);
            let index = prod.findIndex(index => index.id == id);
    
            if (index != -1){
                prod[index] = {...req.body, "id": id};
                fs.writeFile(`${producto.name}.json`, JSON.stringify(prod,null,2), error => {
                    !error?  res.send(`Producto modificado`): res.send('Error en la escritura');
                });
              
            }else{
                res.send(`No existe el ID: ${id}`);
            }       
        }) 

    }else{
        res.send({error: -1, método: "put", descripcion: `Acceso no autorizado a ${req.url}`} );
    }
}) 


router.delete('/:id', (req, res) => {

    if(req.query.admin){

        let id = parseInt(req.params.id);

        producto.deleteById(id).then((resp)=>{
    
            if (resp){
                res.json(resp);
            }else{
                res.send(`El producto con ID: ${id} no existe`);
            }
            
        })

    }else{
        res.send({error: -1, método: "delete", descripcion: `Acceso no autorizado a ${req.url}`} );
    }
}) 



module.exports = router; 
