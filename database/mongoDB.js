class ClientMongoDb {
    constructor (collection, connect) {
      this.connection = connect;
      this.collection = collection;
      this.id = 1;
    }    
  
    async save(dto) {
      try {
        const allItems = await this.collection.find(); 
        dto['id'] = allItems.length + 1;
        try {
          const elementToSave = new this.collection(dto)
          const newElement = await elementToSave.save();
          console.log(`agregado exitoso ${dto.id}`);
          return newElement
        }
        catch (error) {
          console.log(`el error al guardar fue: ${error}`);
          return null
        }
      }
      catch (error) {
        console.log(`error en Save ${error}`);
      }
    } 
  
    async saveUser(user) {
      try {
        const userToSave = new this.collection(user[0])
        await userToSave.save();
        console.log(`agregado exitoso ${user.username}`);
      }
      catch (error) {
        console.log(`el error al guardar fue: ${error}`);
      }
      return user.username;
    }
          
    async replaceById(idSearch, data) {
      try {
        await this.collection.findOneAndUpdate({id: idSearch}, {$set: data});
        const result = await this.collection.find({id: idSearch});
        console.log(`replace id: ${result[0].id}`);
        return result
      }
      catch (error) {
        console.log(`error al reemplazar datos ${error}`);
        return null
      }
    }  
  
    async replaceUserById(username, data) {
      try {
        await this.collection.findOneAndUpdate({username: username}, {$set: data});
        const result = await this.collection.find({username: username});
        console.log(`replace id: ${result[0].username}`);
        return result
      }
      catch (error) {
        console.log(`error al reemplazar datos ${error}`);
        return null
      }
    }
  
    async getById(idSearch) {
      try {
        const objectFinded = await this.collection.find({id: idSearch}).lean();
        if (objectFinded.length > 0) {
            return objectFinded;
        }
        else return null;
      }
      catch (error) {
        console.log(`error al buscar por id ${error}`);
      }
    }
  
    async getByCategory(categorySearch) {
      try {
        const items = await this.collection.find({category: categorySearch});
        if (items.length > 0) {
            console.log(`items encontrados en getByCategory, category: ${categorySearch}`);
            return items;
        }
        else return null;
      }
      catch (error) {
        console.log(`error al buscar por category ${error}`);
      }
    }
  
  
    async getUserById(username) {
      try {
        const userFinded = await this.collection.find({username: username});
        return userFinded;
      }
      catch (error) {
        console.log(`error al buscar por id ${error}`);
      }
    }
  
    async getAll() {
      try {
        const allItems = await this.collection.find().lean();
        return allItems;
      }
      catch (error) {
        console.log(`error en getAll ${error}`);
        return [];
      }
    }
  
    async deleteById(idSearch) {
      try {
        const result = await this.collection.deleteOne({id: idSearch});
        return result;
      }
      catch (error) {
        console.log(`error en deleteById ${error}`);
      }
    }
  };
  
  module.exports = { ClientMongoDb };