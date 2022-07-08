const knex = require('./src/db');

class Contenedor{

    constructor(name){
        this.name = name;
    }


    save = async (obj) => {
        try{
            await knex(this.name).insert(obj);
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
            return await knex.from(this.name).select("*");

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

}

module.exports = Contenedor;