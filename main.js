let fs = require('fs');
let id = 1;

class Contenedor{

    constructor(name){
        this.name = name;
        this.array = [];
    }
 

    save = async (obj) => {
        try{
            let read = await fs.promises.readFile(`${this.name}.json`, "utf-8");
            if (!read){
                this.array.push(obj);
                await fs.promises.writeFile(`${this.name}.json`, JSON.stringify(this.array.map(prod => ({...prod, id: 1})), null, 2), "utf-8");
            }else{
                let file = JSON.parse(read);
                file.push(obj);
                await fs.promises.writeFile(`${this.name}.json`, JSON.stringify(file.map(prod => ({...prod, id: id++})), null, 2), "utf-8");
                return file.length;
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
            let read = JSON.parse(await fs.promises.readFile(`${this.name}.json`, "utf-8"));
            return read;
        }catch(err){
            console.log("Error en la lectura");
        }
    }


    deleteById = async (num) => {
        try{
            let read = JSON.parse(await fs.promises.readFile(`${this.name}.json`, "utf-8"));
            read.splice(num-1, 1);

            await fs.promises.writeFile(`${this.name}.json`, JSON.stringify(read, null, 2), "utf-8");

        }catch(err){
            console.log('Error al borrar');
        }
    }


    deleteAll = async () =>{
        await fs.promises.writeFile(`${this.name}.json`, '', "utf-8");
    }
}


// class Instance
let producto = new Contenedor("Productos");

//  Save()  --> uncomment code below
producto.save({title: "Escuadra", price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}).then(res => console.log(res));

// getById()  --> uncomment code below
// producto.getById(1).then(res => console.log(res));

// getAll()  --> uncomment code below
// producto.getAll().then(res => console.log(res));

// deleteById()  --> uncomment code below
//producto.deleteById(2);

// deleteAll()  --> uncomment code below
// producto.deleteAll();



