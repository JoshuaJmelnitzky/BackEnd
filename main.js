const fs = require('fs');
const express = require('express');

const app = express();

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
 })
 

app.get('/', (req, res) => {
    res.send({ mensaje: 'hola mundo' });
})


app.get('/productos', (req, res) => {
    producto.getAll().then(prod =>res.send(prod));
})


app.get('/productoRandom', (req, res) => {
    producto.getAll().then( (resp) => {
        let random = Math.round(Math.random() * (resp.length - 1) + 1);
        producto.getById(random).then(resp => res.send(resp));
    })
})
 

let id = 1;


class Contenedor{

    constructor(name){
        this.name = name;
    }
 

    save = async (obj) => {
        try{
            
            if(fs.existsSync(`${this.name}.json`)){
                let read = await fs.promises.readFile(`${this.name}.json`, "utf-8");
                let file = JSON.parse(read);
                file.push(obj);
                await fs.promises.writeFile(`${this.name}.json`, JSON.stringify(file.map(prod => ({...prod, id: id++})), null, 2), "utf-8");
                return file.length;
            }else{
                await fs.promises.writeFile(`${this.name}.json`, JSON.stringify([{...obj, id: 1}], null, 2), "utf-8");
            }
            
            return 1;

        }catch(err){
            console.log('Error al escribir');
        }
    }


    getById = async (num) => {
        try{
            let read = JSON.parse(await fs.promises.readFile(`${this.name}.json`, "utf-8"));
            return read.find(prod => prod.id === num);
        }catch(err){
            console.log("Error en la lectura");
        }
    }


    getAll = async () => {
        try{
            return JSON.parse(await fs.promises.readFile(`${this.name}.json`, "utf-8"));
        }catch(err){
            console.log("Error en la lectura");
        }
    }


    deleteById = async (num) => {
        try{
            let read = JSON.parse(await fs.promises.readFile(`${this.name}.json`, "utf-8"));

            let index = read.findIndex(prod => prod.id  === num);

            if (index !== -1){
                read.splice(prueba, 1);
                await fs.promises.writeFile(`${this.name}.json`, JSON.stringify(read, null, 2), "utf-8");
            }else{
                console.log(`No existe producto con ID: ${num}`);
            }

        }catch(err){
            console.log('Error al borrar');
        }
    }


    deleteAll = async () =>{
        await fs.promises.writeFile(`${this.name}.json`, '[]', "utf-8");
    }
}


// class Instance
let producto = new Contenedor("Productos");

//  Save()  --> uncomment code below
// producto.save({title: "Escuadra", price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}).then(res => console.log(res));

// getById()  --> uncomment code below
// producto.getById(1).then(res => console.log(res));

// getAll()  --> uncomment code below
// producto.getAll().then(res => console.log(res));

// deleteById()  --> uncomment code below
// producto.deleteById(2);

// deleteAll()  --> uncomment code below
// producto.deleteAll();

