const Chat = require('../../src/models/chat');
const norm = require ("normalizr");
const normalizrSchema = require('../../utils/normalize')

class Contenedor{

    constructor(){

    }

    save = async (obj) => {
        console.log('test', obj)
        try{
            const addMessage = new Chat(obj)
            addMessage.save();      
        }
        catch(err){
            console.log("Error en la escritura");
        }
    }


    getAll = async() => {
        let chatArray = [];
        let id = 0;
        let getAll = await Chat.find({});
        
        for(let mensaje of getAll){
            chatArray.push({
                id: id++,
                msn: mensaje.msn,
                date: mensaje.createdAt,
                author: {
                    id: mensaje.author.id,
                    name: mensaje.author.name,
                    lastName: mensaje.author.lastName,
                    alias: mensaje.author.alias,
                    age: mensaje.author.age,
                    thumbnail: mensaje.author.thumbnail,
                }
            })    
        }
        return chatArray;
    }


    normalize = async () => {
        const messages = await this.getAll();
        return norm.normalize(messages, [normalizrSchema]);   
    }
 
}

module.exports = Contenedor;