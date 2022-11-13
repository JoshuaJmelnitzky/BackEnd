const { UserDaoMongoDb } = require('./userPersistence');

class UserService {
  constructor() {
    this.dao = new UserDaoMongoDb();
  }
  

  async findUser(username) {
    return await this.dao.getUserById(username);
  }
    
};
    
module.exports = { UserService };