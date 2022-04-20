const fs = require('fs');

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
            let findProd = read.find(prod => prod.id === num);
            
            return findProd? findProd : "El ID ingresado no corresponde a un producto";  

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
                let erase = read.splice(index, 1);
                await fs.promises.writeFile(`${this.name}.json`, JSON.stringify(read, null, 2), "utf-8");
                return erase;
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

module.exports = Contenedor;