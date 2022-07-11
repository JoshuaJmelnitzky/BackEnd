const knex = require('./src/db');
const norm = require ("normalizr");
const normalizrSchema = require("./utils/normalize");

class Contenedor{

    constructor(name){
        this.name = name;
    }


    save = async (obj) => {
        try{
            await knex(this.name).insert({
                email: obj.author.id,
                name: obj.author.name,
                lastName: obj.author.lastName,
                alias: obj.author.alias,
                age: obj.author.age,
                thumbnail: obj.author.thumbnail,
                msn: obj.msn,
            });
        }
        catch(err){
            console.log("Error en la escritura");
        }
    }
 

    getById = async (num) => {
        try{
            return await knex.from(this.name).select("*").where({id: num});

        }catch(err){
            console.log("Error en la consulta");
        }
    }


    getAll = async () => {
        try{
            let chatArray = [];
            let id = 0;
            let getAll =  await knex.from(this.name).select("*");
            for (let mensaje of getAll){
                chatArray.push({
                    id: id++,
                    msn: mensaje.msn,
                    date: mensaje.date,
                    author: {
                        id: mensaje.email,
                        name: mensaje.name,
                        lastName: mensaje.lastName,
                        alias: mensaje.alias,
                        age: mensaje.age,
                        thumbnail: mensaje.thumbnail,
                    }
                })    
            }
            return chatArray;

        }catch(err){
            console.log("Error en la consulta");
        }
    }


    updateById = async (num, obj) => {
        const {title, price, thumbnail} = obj; 

        try{
            await knex(this.name)
                .where({id: num})
                .update({title, price, thumbnail});
        }catch{
            console.log("Error en la actualización");
        }
    }


    deleteById = async (num) => {
        try{
            await knex(this.name)
                .where({id: num})
                .del();

        }catch(err){
            console.log('Error al borrar');
        }
    }

    normalize = async () => {
        const messages = await this.getAll();
        return norm.normalize(messages, [normalizrSchema]);   
    }

}

module.exports = Contenedor;