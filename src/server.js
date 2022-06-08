import express from 'express';
import fs from 'fs';

const { Router } = express;

import {productosDao, carritosDao} from './daos/index.js';


// server instance
const app = express();

// Product router config
const productosRouter = new Router();
const carritosRouter = new Router();

productosRouter.get('/:id?', (req, res) => {
    if (req.params.id){
        let id = parseInt(req.params.id);
        productosDao.getById(id).then(prod => res.send(prod));
    }else{
        productosDao.getAll().then(prod =>res.send(prod));
    }
})


productosRouter.post('/', (req, res) => {

    if(req.query.admin){

        let {title, descripcion, price, stock, codigo, thumbnail} = req.body;

        productosDao.save({title, descripcion, price, stock, codigo, "timestamp": Date.now(), thumbnail})
            .then(prod => productosDao.getById(parseInt(prod)))
            .then(prod => res.send(prod));   

    }else{
        res.send({error: -1, método: "post", descripcion: `Acceso no autorizado a ${req.url}`} );
    }

})


productosRouter.put('/:id', (req, res) => {

    if(req.query.admin){

        productosDao.getAll().then((prod)=> {
            let id = parseInt(req.params.id);
            let index = prod.findIndex(index => index.id == id);
    
            if (index != -1){
                prod[index] = {...req.body, "id": id};
                fs.writeFile(`./db/${productosDao.name}.json`, JSON.stringify(prod,null,2), error => {
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


productosRouter.delete('/:id', (req, res) => {

    if(req.query.admin){

        let id = parseInt(req.params.id);

        productosDao.deleteById(id).then((resp)=>{
    
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


// Cart router config
carritosRouter.post('/', (req, res) => {
    carritosDao.save({"productos": [],"timestamp": Date.now()})
    .then(cart => carritosDao.getById(parseInt(cart)))
    .then(cart => res.send(cart));   
})



carritosRouter.delete('/:id', (req, res) => {

    let id = parseInt(req.params.id);

    carritosDao.deleteById(id).then((resp)=>{

        if (resp){
            res.json(resp);
        }else{
            res.send(`El carrito con ID: ${id} no existe`);
        }
    })
}) 


carritosRouter.get('/:id/productos', (req, res) => {

    let id = parseInt(req.params.id);

    carritosDao.getById(id).then((prod) => {
        prod.productos? res.send(prod.productos): res.send(`No existe el carrito con id: ${id}`);
    })
}) 


carritosRouter.post('/:id/productos/:id_prod', (req, res) => {

    let id = parseInt(req.params.id);
    let id_prod = req.params.id_prod;

    productosDao.getById(parseInt(id_prod)).then((prod) => {

        if (!isNaN(id_prod) && (typeof prod) != "string" ){

            fs.readFile(`./db/${carritosDao.name}.json`, 'utf-8', (error, contenido) => {
                let read = JSON.parse(contenido);
    
                read[id-1].productos.push(prod);
    
                fs.writeFile(`./db/${carritosDao.name}.json`, JSON.stringify(read,null,2), error => {
                    !error?  res.send(`Producto añadido al carrito`): res.send('Error en la escritura');
                });
            })

        }else{
            res.send(`El producto con ID: ${id_prod} no se encuentra`);
        }
        
    })
})


carritosRouter.delete('/:id/productos/:id_prod', (req, res) => {

    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);

    fs.readFile(`./db/${carritosDao.name}.json`, 'utf-8', (error, contenido) => {
        let read = JSON.parse(contenido);
        let prodCart = read[id-1].productos;

        let index = prodCart.findIndex(ind => ind.id == id_prod);

        if(index !== -1){
            prodCart.splice(index, 1);

            fs.writeFile(`./db/${carritosDao.name}.json`, JSON.stringify(read, null, 2), error => {
                !error?  res.send(`Producto eliminado`): res.send('Error en el borrado');
            });


        }else{
            res.send(`No hay productos en el carrito con ID: ${id_prod}`);
        }

    })
}) 





// server config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);

export default app;



