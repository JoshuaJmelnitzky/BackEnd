const { UserDaoMongoDb } = require('./userPersistence');

class UserService {
  constructor() {
    this.dao = new UserDaoMongoDb();
  }
  

  async findUser(username) {
    const userFinded = await this.dao.getUserById(username);
    return userFinded;
  }
    
};
    
module.exports = { UserService };