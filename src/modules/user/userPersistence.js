const { ClientMongoDb } = require('../../../database/mongoDB')
const { userSchema } = require('../../../database/models/userSchema');
const { Database } = require('../../../database/connection');

const connect = Database.getConnection(); 

class UserDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(userSchema, connect);
  }


  async getUserById(username) {
    const dto = await this.clientMongoDb.getUserById(username);
    if (dto.length == 0) return dto;
    else return (dto[0]);
  }

};

module.exports = { UserDaoMongoDb };