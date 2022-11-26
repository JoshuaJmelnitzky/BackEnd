const { UserDaoMongoDb } = require('./userPersistence');

class UserService {
  constructor() {
    this.dao = new UserDaoMongoDb();
  }
  

  async findUser(username) {
    return await this.dao.getUserById(username);
  }


  async saveUser(user) {
    await this.dao.saveUser(user);
  }
    
};
    
module.exports = { UserService };